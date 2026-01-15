import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

interface GameReviewSectionProps {
  gameId: string;
  gameName: string;
}

export function GameReviewSection({ gameId, gameName }: GameReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleReviewSuccess = () => {
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Action Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Community Reviews</h2>
        {user ? (
          <Button 
            onClick={() => setShowForm(!showForm)} 
            variant={showForm ? "outline" : "default"}
            className="gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            {showForm ? 'Cancel' : 'Write a Review'}
          </Button>
        ) : (
          <Button asChild variant="outline" className="gap-2">
            <Link to="/auth">
              <LogIn className="w-4 h-4" />
              Login to Review
            </Link>
          </Button>
        )}
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && user && (
          <ReviewForm
            gameId={gameId}
            gameName={gameName}
            onClose={() => setShowForm(false)}
            onSuccess={handleReviewSuccess}
          />
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <ReviewList gameId={gameId} refreshTrigger={refreshTrigger} />
    </motion.div>
  );
}