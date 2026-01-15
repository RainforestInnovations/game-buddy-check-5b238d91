import { motion } from 'framer-motion';
import { Coffee, Heart, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Donate = () => {
  const buyMeACoffeeUrl = 'https://buymeacoffee.com/hadimihashs';

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </nav>

      {/* Main Content */}
      <section className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-8"
          >
            <Coffee className="w-12 h-12 text-primary" />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Support This Project
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            If you find this tool helpful, consider buying me a coffee! Your support helps keep this project running and growing.
          </p>

          {/* Stats/Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          >
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Keep It Free</h3>
              <p className="text-sm text-muted-foreground">Your support helps keep this tool free for everyone</p>
            </div>
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <Coffee className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Fuel Development</h3>
              <p className="text-sm text-muted-foreground">Coffee powers late-night coding sessions</p>
            </div>
            <div className="p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Show Appreciation</h3>
              <p className="text-sm text-muted-foreground">Every donation means the world to me</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href={buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full gap-3 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Coffee className="w-5 h-5" />
                Buy Me a Coffee
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {/* Thank You Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-muted-foreground"
          >
            Thank you for your support! 💜
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
};

export default Donate;
