import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Cpu, Monitor, HardDrive, Maximize, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  gpuOptions, 
  nvidiaGpuOptions, 
  amdGpuOptions, 
  intelGpuOptions, 
  intelCpuOptions, 
  amdCpuOptions, 
  appleCpuOptions, 
  ramOptions, 
  osOptions, 
  resolutionOptions 
} from '@/data/games';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  gameId: string;
  gameName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReviewForm({ gameId, gameName, onClose, onSuccess }: ReviewFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState('');
  
  // System specs state
  const [selectedGpu, setSelectedGpu] = useState(nvidiaGpuOptions[0].name);
  const [selectedCpu, setSelectedCpu] = useState(intelCpuOptions[0].name);
  const [selectedRam, setSelectedRam] = useState('16');
  const [selectedOs, setSelectedOs] = useState<string>('windows');
  const [selectedResolution, setSelectedResolution] = useState('1080p');

  const handleGpuChange = (gpuName: string) => {
    setSelectedGpu(gpuName);
  };

  const handleCpuChange = (cpuName: string) => {
    setSelectedCpu(cpuName);
    // Auto-set OS for Apple Silicon
    const isApple = appleCpuOptions.some(c => c.name === cpuName);
    if (isApple) {
      setSelectedOs('macos');
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Feedback required",
        description: "Please write some feedback before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('reviews')
      .insert({
        game_id: gameId,
        content: content.trim(),
        rating,
        gpu: selectedGpu,
        cpu: selectedCpu,
        ram: selectedRam,
        os: selectedOs,
        resolution: selectedResolution
      });

    setIsSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Review already exists",
          description: "You've already reviewed this game.",
          variant: "destructive"
        });
      } else if (error.message.includes('violates row-level security')) {
        toast({
          title: "Login required",
          description: "Please log in to submit a review.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit review. Please try again.",
          variant: "destructive"
        });
      }
      return;
    }

    toast({
      title: "Review submitted!",
      description: "Thanks for sharing your experience."
    });
    
    onSuccess();
  };

  const isAppleSilicon = appleCpuOptions.some(c => c.name === selectedCpu);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card p-6 rounded-2xl space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">Write a Review</h3>
          <p className="text-muted-foreground text-sm">Share your experience with {gameName}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label className="text-muted-foreground">Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* System Specs Section */}
      <div className="space-y-4 p-4 bg-background/30 rounded-xl border border-border/50">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Monitor className="w-4 h-4 text-primary" />
          Your System Specs
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GPU Selection */}
          <div className={`space-y-2 ${isAppleSilicon ? 'opacity-50' : ''}`}>
            <Label className="flex items-center gap-2 text-muted-foreground text-sm">
              <Monitor className="w-3 h-3" />
              Graphics Card
            </Label>
            {isAppleSilicon ? (
              <div className="bg-background/50 border border-border/50 rounded-md px-3 py-2 text-muted-foreground text-sm">
                {appleCpuOptions.find(c => c.name === selectedCpu)?.gpu || 'Apple GPU'}
              </div>
            ) : (
              <Tabs defaultValue="nvidia" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-8">
                  <TabsTrigger value="nvidia" className="text-xs">NVIDIA</TabsTrigger>
                  <TabsTrigger value="amd" className="text-xs">AMD</TabsTrigger>
                  <TabsTrigger value="intel" className="text-xs">Intel</TabsTrigger>
                </TabsList>
                <TabsContent value="nvidia" className="mt-2">
                  <Select value={selectedGpu} onValueChange={handleGpuChange}>
                    <SelectTrigger className="bg-background/50 text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {nvidiaGpuOptions.map((gpu) => (
                        <SelectItem key={gpu.name} value={gpu.name}>{gpu.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TabsContent>
                <TabsContent value="amd" className="mt-2">
                  <Select value={selectedGpu} onValueChange={handleGpuChange}>
                    <SelectTrigger className="bg-background/50 text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {amdGpuOptions.map((gpu) => (
                        <SelectItem key={gpu.name} value={gpu.name}>{gpu.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TabsContent>
                <TabsContent value="intel" className="mt-2">
                  <Select value={selectedGpu} onValueChange={handleGpuChange}>
                    <SelectTrigger className="bg-background/50 text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {intelGpuOptions.map((gpu) => (
                        <SelectItem key={gpu.name} value={gpu.name}>{gpu.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {/* CPU Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground text-sm">
              <Cpu className="w-3 h-3" />
              Processor
            </Label>
            <Tabs defaultValue="intel" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-8">
                <TabsTrigger value="intel" className="text-xs">Intel</TabsTrigger>
                <TabsTrigger value="amd" className="text-xs">AMD</TabsTrigger>
                <TabsTrigger value="apple" className="text-xs">Apple</TabsTrigger>
              </TabsList>
              <TabsContent value="intel" className="mt-2">
                <Select value={selectedCpu} onValueChange={handleCpuChange}>
                  <SelectTrigger className="bg-background/50 text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {intelCpuOptions.map((cpu) => (
                      <SelectItem key={cpu.name} value={cpu.name}>{cpu.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="amd" className="mt-2">
                <Select value={selectedCpu} onValueChange={handleCpuChange}>
                  <SelectTrigger className="bg-background/50 text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {amdCpuOptions.map((cpu) => (
                      <SelectItem key={cpu.name} value={cpu.name}>{cpu.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="apple" className="mt-2">
                <Select value={selectedCpu} onValueChange={handleCpuChange}>
                  <SelectTrigger className="bg-background/50 text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {appleCpuOptions.map((cpu) => (
                      <SelectItem key={cpu.name} value={cpu.name}>{cpu.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
            </Tabs>
          </div>

          {/* RAM */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground text-sm">
              <HardDrive className="w-3 h-3" />
              RAM
            </Label>
            <Select value={selectedRam} onValueChange={setSelectedRam}>
              <SelectTrigger className="bg-background/50 text-sm h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ramOptions.map((ram) => (
                  <SelectItem key={ram} value={ram.toString()}>{ram} GB</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Resolution */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground text-sm">
              <Maximize className="w-3 h-3" />
              Resolution
            </Label>
            <Select value={selectedResolution} onValueChange={setSelectedResolution}>
              <SelectTrigger className="bg-background/50 text-sm h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resolutionOptions.map((res) => (
                  <SelectItem key={res.value} value={res.value}>{res.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* OS */}
          <div className={`space-y-2 ${isAppleSilicon ? 'opacity-50' : ''}`}>
            <Label className="flex items-center gap-2 text-muted-foreground text-sm">
              <Monitor className="w-3 h-3" />
              Operating System
            </Label>
            <Select 
              value={selectedOs} 
              onValueChange={setSelectedOs}
              disabled={isAppleSilicon}
            >
              <SelectTrigger className="bg-background/50 text-sm h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {osOptions.map((os) => (
                  <SelectItem key={os.value} value={os.value}>{os.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="space-y-2">
        <Label className="text-muted-foreground">Your Feedback</Label>
        <Textarea
          placeholder="Share your experience with this game... How did it perform on your system? Any tips for other players?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] bg-background/50 border-border/50 resize-none"
          maxLength={1000}
        />
        <p className="text-xs text-muted-foreground text-right">{content.length}/1000</p>
      </div>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        className="w-full gap-2"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </motion.div>
  );
}