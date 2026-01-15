import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Bug, Lightbulb, Plus, Clock, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { User } from '@supabase/supabase-js';

type FeedbackType = 'feature' | 'bug';
type FeedbackStatus = 'open' | 'in_progress' | 'completed' | 'closed';
type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';

interface Feedback {
  id: string;
  title: string;
  description: string | null;
  type: FeedbackType;
  status: FeedbackStatus;
  priority: FeedbackPriority;
  created_at: string;
  updated_at: string;
}

const statusIcons: Record<FeedbackStatus, React.ReactNode> = {
  open: <Circle className="w-4 h-4 text-muted-foreground" />,
  in_progress: <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />,
  completed: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  closed: <Circle className="w-4 h-4 text-gray-400" />,
};

const statusLabels: Record<FeedbackStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  closed: 'Closed',
};

const priorityColors: Record<FeedbackPriority, string> = {
  low: 'bg-gray-500/10 text-gray-500',
  medium: 'bg-yellow-500/10 text-yellow-500',
  high: 'bg-orange-500/10 text-orange-500',
  critical: 'bg-red-500/10 text-red-500',
};

export default function Feedback() {
  const [user, setUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<FeedbackType>('feature');
  const [newPriority, setNewPriority] = useState<FeedbackPriority>('medium');
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: feedbackItems = [], isLoading } = useQuery({
    queryKey: ['feedback'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Feedback[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newFeedback: { title: string; description: string; type: FeedbackType; priority: FeedbackPriority }) => {
      const { error } = await supabase.from('feedback').insert({
        title: newFeedback.title,
        description: newFeedback.description || null,
        type: newFeedback.type,
        priority: newFeedback.priority,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      setIsDialogOpen(false);
      setNewTitle('');
      setNewDescription('');
      setNewType('feature');
      setNewPriority('medium');
      toast({ title: 'Feedback submitted!', description: 'Thank you for your feedback.' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast({ title: 'Error', description: 'Please enter a title', variant: 'destructive' });
      return;
    }
    createMutation.mutate({ title: newTitle, description: newDescription, type: newType, priority: newPriority });
  };

  const features = feedbackItems.filter((item) => item.type === 'feature');
  const bugs = feedbackItems.filter((item) => item.type === 'bug');

  const FeedbackCard = ({ item }: { item: Feedback }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {statusIcons[item.status]}
            <h3 className="font-medium text-foreground truncate">{item.title}</h3>
          </div>
          {item.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={priorityColors[item.priority]}>
              {item.priority}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {statusLabels[item.status]}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-20 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Feedback & Roadmap</h1>
          <p className="text-muted-foreground">
            Track feature requests and bug reports. Help us improve by submitting your feedback!
          </p>
        </motion.div>

        {/* Add Feedback Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6 gap-2" disabled={!user}>
              <Plus className="w-4 h-4" />
              {user ? 'Submit Feedback' : 'Login to Submit Feedback'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Feedback</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={newType} onValueChange={(v) => setNewType(v as FeedbackType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feature">
                      <span className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Feature Request
                      </span>
                    </SelectItem>
                    <SelectItem value="bug">
                      <span className="flex items-center gap-2">
                        <Bug className="w-4 h-4" /> Bug Report
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newPriority} onValueChange={(v) => setNewPriority(v as FeedbackPriority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of your feedback"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  maxLength={1000}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Feedback Tabs */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="mb-6 grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="features" className="gap-2">
              <Lightbulb className="w-4 h-4" />
              Features ({features.length})
            </TabsTrigger>
            <TabsTrigger value="bugs" className="gap-2">
              <Bug className="w-4 h-4" />
              Bugs ({bugs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : features.length === 0 ? (
              <Card>
                <CardHeader className="text-center">
                  <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <CardTitle>No Feature Requests Yet</CardTitle>
                  <CardDescription>Be the first to suggest a new feature!</CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="space-y-3">
                {features.map((item) => (
                  <FeedbackCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bugs">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : bugs.length === 0 ? (
              <Card>
                <CardHeader className="text-center">
                  <Bug className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <CardTitle>No Bug Reports</CardTitle>
                  <CardDescription>Great! No bugs have been reported yet.</CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="space-y-3">
                {bugs.map((item) => (
                  <FeedbackCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
