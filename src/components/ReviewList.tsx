import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Cpu, Monitor, HardDrive, Maximize, MessageSquare, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  game_id: string;
  content: string;
  rating: number;
  gpu: string | null;
  cpu: string | null;
  ram: string | null;
  os: string | null;
  resolution: string | null;
  created_at: string;
}

interface ReviewListProps {
  gameId: string;
  refreshTrigger?: number;
}

export function ReviewList({ gameId, refreshTrigger }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('game_id', gameId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setReviews(data);
      }
      setIsLoading(false);
    }

    fetchReviews();
  }, [gameId, refreshTrigger]);

  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Reviews</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-1/4 mb-2" />
              <div className="h-3 bg-muted rounded w-full mb-1" />
              <div className="h-3 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Reviews</h3>
        </div>
        <p className="text-muted-foreground text-center py-8">
          No reviews yet. Be the first to share your experience!
        </p>
      </div>
    );
  }

  const averageRating = reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length;

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Reviews</h3>
          <span className="text-muted-foreground text-sm">({reviews.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">{averageRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        <AnimatePresence>
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-background/30 rounded-xl border border-border/30"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= (review.rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>

              {/* System Specs */}
              {(review.gpu || review.cpu || review.ram || review.resolution) && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {review.gpu && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                      <Monitor className="w-3 h-3" />
                      {review.gpu}
                    </span>
                  )}
                  {review.cpu && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                      <Cpu className="w-3 h-3" />
                      {review.cpu}
                    </span>
                  )}
                  {review.ram && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                      <HardDrive className="w-3 h-3" />
                      {review.ram} GB
                    </span>
                  )}
                  {review.resolution && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                      <Maximize className="w-3 h-3" />
                      {review.resolution}
                    </span>
                  )}
                  {review.os && (
                    <span className="px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground capitalize">
                      {review.os}
                    </span>
                  )}
                </div>
              )}

              {/* Content */}
              <p className="text-sm text-foreground leading-relaxed">{review.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}