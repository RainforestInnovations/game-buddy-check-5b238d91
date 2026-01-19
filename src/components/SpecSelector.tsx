import { useState, useEffect } from 'react';
import { gpuOptions, nvidiaGpuOptions, amdGpuOptions, intelGpuOptions, intelCpuOptions, amdCpuOptions, appleCpuOptions, ramOptions, osOptions, resolutionOptions, qualityOptions, QualityPreset } from '@/data/games';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Monitor, Settings2, Maximize, Apple, Sliders } from 'lucide-react';

export interface SystemSpecs {
  gpu: string;
  gpuTier: number;
  vram: number;
  cpu: string;
  cpuTier: number;
  ram: number;
  os: 'windows' | 'macos' | 'linux';
  resolution: '1080p' | '1440p' | '4k';
  quality: QualityPreset;
}

interface SpecSelectorProps {
  onSpecsChange: (specs: SystemSpecs) => void;
}

export function SpecSelector({ onSpecsChange }: SpecSelectorProps) {
  const [selectedGpu, setSelectedGpu] = useState(nvidiaGpuOptions[0]);
  const [selectedVram, setSelectedVram] = useState(nvidiaGpuOptions[0].vramOptions[0]);
  const [selectedCpu, setSelectedCpu] = useState(intelCpuOptions[0]);
  const [selectedRam, setSelectedRam] = useState(16);
  const [selectedOs, setSelectedOs] = useState<'windows' | 'macos' | 'linux'>('windows');
  const [selectedResolution, setSelectedResolution] = useState<'1080p' | '1440p' | '4k'>('1080p');
  const [selectedQuality, setSelectedQuality] = useState<QualityPreset>('high');
  const [isAppleSilicon, setIsAppleSilicon] = useState(false);

  // Check if current CPU is Apple Silicon
  const checkAppleCpu = (cpuName: string) => {
    return appleCpuOptions.some(c => c.name === cpuName);
  };

  useEffect(() => {
    if (isAppleSilicon) {
      const appleCpu = appleCpuOptions.find(c => c.name === selectedCpu.name);
      if (appleCpu) {
        onSpecsChange({
          gpu: appleCpu.gpu,
          gpuTier: appleCpu.gpuTier,
          vram: appleCpu.vram,
          cpu: selectedCpu.name,
          cpuTier: selectedCpu.tier,
          ram: selectedRam,
          os: 'macos',
          resolution: selectedResolution,
          quality: selectedQuality
        });
      }
    } else {
      onSpecsChange({
        gpu: selectedGpu.name,
        gpuTier: selectedGpu.tier,
        vram: selectedVram,
        cpu: selectedCpu.name,
        cpuTier: selectedCpu.tier,
        ram: selectedRam,
        os: selectedOs,
        resolution: selectedResolution,
        quality: selectedQuality
      });
    }
  }, [selectedGpu, selectedVram, selectedCpu, selectedRam, selectedOs, selectedResolution, selectedQuality, isAppleSilicon, onSpecsChange]);

  const handleGpuChange = (gpuName: string) => {
    const gpu = gpuOptions.find(g => g.name === gpuName);
    if (gpu) {
      setSelectedGpu(gpu);
      setSelectedVram(gpu.vramOptions[0]);
    }
  };

  const handleCpuChange = (cpuName: string) => {
    // Check Apple CPUs first
    const appleCpu = appleCpuOptions.find(c => c.name === cpuName);
    if (appleCpu) {
      setSelectedCpu(appleCpu);
      setIsAppleSilicon(true);
      setSelectedOs('macos');
      return;
    }

    // Check Intel CPUs
    const intelCpu = intelCpuOptions.find(c => c.name === cpuName);
    if (intelCpu) {
      setSelectedCpu(intelCpu);
      setIsAppleSilicon(false);
      return;
    }

    // Check AMD CPUs
    const amdCpu = amdCpuOptions.find(c => c.name === cpuName);
    if (amdCpu) {
      setSelectedCpu(amdCpu);
      setIsAppleSilicon(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl space-y-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Settings2 className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-foreground">System Specifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GPU Selection with NVIDIA/AMD/Intel Tabs */}
        <div className={`space-y-2 md:col-span-2 lg:col-span-3 ${isAppleSilicon ? 'opacity-50' : ''}`}>
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="w-4 h-4" />
            Graphics Card
            {isAppleSilicon && <span className="text-xs text-accent">(Integrated)</span>}
          </Label>
          {isAppleSilicon ? (
            <div className="bg-background/50 border border-border/50 rounded-md px-3 py-2 text-muted-foreground cursor-not-allowed">
              {appleCpuOptions.find(c => c.name === selectedCpu.name)?.gpu || 'Apple GPU'}
            </div>
          ) : (
            <Tabs 
              defaultValue="nvidia" 
              className="w-full"
              onValueChange={(tab) => {
                if (tab === 'nvidia') {
                  handleGpuChange(nvidiaGpuOptions[0].name);
                } else if (tab === 'amd') {
                  handleGpuChange(amdGpuOptions[0].name);
                } else if (tab === 'intel') {
                  handleGpuChange(intelGpuOptions[0].name);
                }
              }}
            >
              <TabsList className="grid w-full grid-cols-3 mb-3">
                <TabsTrigger value="nvidia" className="text-green-400 data-[state=active]:text-green-400 data-[state=active]:bg-green-400/20">
                  NVIDIA
                </TabsTrigger>
                <TabsTrigger value="amd" className="text-red-400 data-[state=active]:text-red-400 data-[state=active]:bg-red-400/20">
                  AMD
                </TabsTrigger>
                <TabsTrigger value="intel" className="text-blue-400 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-400/20">
                  Intel
                </TabsTrigger>
              </TabsList>
              <TabsContent value="nvidia">
                <Select value={selectedGpu.name} onValueChange={handleGpuChange}>
                  <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Select NVIDIA GPU" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {nvidiaGpuOptions.map((gpu) => (
                      <SelectItem key={gpu.name} value={gpu.name}>
                        {gpu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="amd">
                <Select value={selectedGpu.name} onValueChange={handleGpuChange}>
                  <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Select AMD GPU" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {amdGpuOptions.map((gpu) => (
                      <SelectItem key={gpu.name} value={gpu.name}>
                        {gpu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="intel">
                <Select value={selectedGpu.name} onValueChange={handleGpuChange}>
                  <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Select Intel GPU" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {intelGpuOptions.map((gpu) => (
                      <SelectItem key={gpu.name} value={gpu.name}>
                        {gpu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* VRAM Selection */}
        <div className={`space-y-2 ${isAppleSilicon ? 'opacity-50' : ''}`}>
          <Label className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="w-4 h-4" />
            VRAM
            {isAppleSilicon && <span className="text-xs text-accent">(Unified Memory)</span>}
          </Label>
          <Select 
            value={isAppleSilicon ? '' : selectedVram.toString()} 
            onValueChange={(v) => setSelectedVram(parseInt(v))}
            disabled={isAppleSilicon}
          >
            <SelectTrigger className={`bg-background/50 border-border/50 transition-colors ${isAppleSilicon ? 'cursor-not-allowed' : 'hover:border-primary/50'}`}>
              <SelectValue placeholder={isAppleSilicon ? `${appleCpuOptions.find(c => c.name === selectedCpu.name)?.vram || 8} GB` : undefined} />
            </SelectTrigger>
            <SelectContent>
              {selectedGpu.vramOptions.map((vram) => (
                <SelectItem key={vram} value={vram.toString()}>
                  {vram} GB
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CPU Selection with Intel/AMD/Apple Tabs */}
        <div className="space-y-2 md:col-span-2 lg:col-span-3">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="w-4 h-4" />
            Processor
          </Label>
          <Tabs 
            defaultValue="intel" 
            className="w-full"
            onValueChange={(tab) => {
              if (tab === 'intel') {
                handleCpuChange(intelCpuOptions[0].name);
              } else if (tab === 'amd') {
                handleCpuChange(amdCpuOptions[0].name);
              } else if (tab === 'apple') {
                handleCpuChange(appleCpuOptions[0].name);
              }
            }}
          >
            <TabsList className="grid w-full grid-cols-3 mb-3">
              <TabsTrigger value="intel" className="text-blue-400 data-[state=active]:text-blue-400 data-[state=active]:bg-blue-400/20">
                Intel
              </TabsTrigger>
              <TabsTrigger value="amd" className="text-red-400 data-[state=active]:text-red-400 data-[state=active]:bg-red-400/20">
                AMD
              </TabsTrigger>
              <TabsTrigger value="apple" className="data-[state=active]:bg-muted flex items-center gap-1">
                <Apple className="w-3 h-3" /> Apple
              </TabsTrigger>
            </TabsList>
            <TabsContent value="intel">
              <Select value={isAppleSilicon ? '' : selectedCpu.name} onValueChange={handleCpuChange}>
                <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="Select Intel CPU" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {intelCpuOptions.map((cpu) => (
                    <SelectItem key={cpu.name} value={cpu.name}>
                      {cpu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsContent>
            <TabsContent value="amd">
              <Select value={isAppleSilicon ? '' : selectedCpu.name} onValueChange={handleCpuChange}>
                <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="Select AMD CPU" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {amdCpuOptions.map((cpu) => (
                    <SelectItem key={cpu.name} value={cpu.name}>
                      {cpu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsContent>
            <TabsContent value="apple">
              <Select value={isAppleSilicon ? selectedCpu.name : ''} onValueChange={handleCpuChange}>
                <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="Select Apple Chip" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {appleCpuOptions.map((cpu) => (
                    <SelectItem key={cpu.name} value={cpu.name}>
                      {cpu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TabsContent>
          </Tabs>
        </div>

        {/* RAM Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="w-4 h-4" />
            RAM
          </Label>
          <Select value={selectedRam.toString()} onValueChange={(v) => setSelectedRam(parseInt(v))}>
            <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ramOptions.map((ram) => (
                <SelectItem key={ram} value={ram.toString()}>
                  {ram} GB
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Resolution Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Maximize className="w-4 h-4" />
            Resolution
          </Label>
          <Select value={selectedResolution} onValueChange={(v) => setSelectedResolution(v as typeof selectedResolution)}>
            <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {resolutionOptions.map((res) => (
                <SelectItem key={res.value} value={res.value}>
                  {res.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quality Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Sliders className="w-4 h-4" />
            Graphics Quality
          </Label>
          <Tabs 
            value={selectedQuality} 
            onValueChange={(v) => setSelectedQuality(v as QualityPreset)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger 
                value="low" 
                className="text-xs data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
              >
                Low
              </TabsTrigger>
              <TabsTrigger 
                value="medium" 
                className="text-xs data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
              >
                Medium
              </TabsTrigger>
              <TabsTrigger 
                value="high" 
                className="text-xs data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
              >
                High
              </TabsTrigger>
              <TabsTrigger 
                value="ultra" 
                className="text-xs data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
              >
                Ultra
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* OS Selection */}
        <div className={`space-y-2 ${isAppleSilicon ? 'opacity-50' : ''}`}>
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="w-4 h-4" />
            Operating System
            {isAppleSilicon && <span className="text-xs text-accent">(macOS only)</span>}
          </Label>
          <Select 
            value={selectedOs} 
            onValueChange={(v) => {
              const newOs = v as typeof selectedOs;
              setSelectedOs(newOs);
              if (newOs === 'macos') {
                setIsAppleSilicon(true);
                setSelectedCpu(appleCpuOptions[0]);
              }
            }}
            disabled={isAppleSilicon}
          >
            <SelectTrigger className={`bg-background/50 border-border/50 transition-colors ${isAppleSilicon ? 'cursor-not-allowed' : 'hover:border-primary/50'}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {osOptions.map((os) => (
                <SelectItem key={os.value} value={os.value}>
                  {os.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}
