import { useState, useCallback, useMemo } from 'react';
import { games, Game } from '@/data/games';
import { GameCard } from '@/components/GameCard';
import { SearchBar } from '@/components/SearchBar';
import { SpecSelector, SystemSpecs } from '@/components/SpecSelector';
import { PerformanceDisplay } from '@/components/PerformanceDisplay';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, ChevronDown, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
const GAMES_PER_PAGE = 24;
const Index = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [specs, setSpecs] = useState<SystemSpecs | null>(null);
  const [displayCount, setDisplayCount] = useState(GAMES_PER_PAGE);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const genres = useMemo(() => {
    const allGenres = games.flatMap(g => g.genre);
    return [...new Set(allGenres)].sort();
  }, []);
  const filteredGames = useMemo(() => {
    let filtered = games;

    // Filter by OS if specs are selected
    if (specs?.os) {
      filtered = filtered.filter(g => g.supportedOS.includes(specs.os));
    }

    // Filter by genre
    if (activeGenre) {
      filtered = filtered.filter(g => g.genre.includes(activeGenre));
    }
    return filtered;
  }, [activeGenre, specs?.os]);
  const displayedGames = useMemo(() => {
    return filteredGames.slice(0, displayCount);
  }, [filteredGames, displayCount]);
  const handleSpecsChange = useCallback((newSpecs: SystemSpecs) => {
    setSpecs(newSpecs);
  }, []);
  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const loadMore = () => {
    setDisplayCount(prev => prev + GAMES_PER_PAGE);
  };
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Performance Checker</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">Will it Potato?<span className="text-gradient">Run It?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Check game performance on your system. Get FPS estimates, hardware usage, 
              and find out if your PC can handle the latest games.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            <SearchBar onGameSelect={handleGameSelect} />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        {/* Spec Selector */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="mb-12">
          <SpecSelector onSpecsChange={handleSpecsChange} />
        </motion.div>

        {/* Selected Game Performance */}
        <AnimatePresence mode="wait">
          {selectedGame && specs && <motion.div key={selectedGame.id} initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.95
        }} className="mb-12 relative">
              <button onClick={() => setSelectedGame(null)} className="absolute -top-4 -right-4 z-10 p-2 bg-card rounded-full border border-border hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
              <PerformanceDisplay game={selectedGame} specs={specs} />
            </motion.div>}
        </AnimatePresence>

        {/* Genre Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Browse Games</h2>
            <span className="text-muted-foreground">({filteredGames.length} games)</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant={activeGenre === null ? "default" : "outline"} size="sm" onClick={() => setActiveGenre(null)} className="rounded-full">
              All
            </Button>
            {genres.map(genre => <Button key={genre} variant={activeGenre === genre ? "default" : "outline"} size="sm" onClick={() => {
            setActiveGenre(activeGenre === genre ? null : genre);
            setDisplayCount(GAMES_PER_PAGE);
          }} className="rounded-full">
                {genre}
              </Button>)}
          </div>
        </div>

        {/* Games Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {displayedGames.map((game, index) => <motion.div key={game.id} layout initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.8
          }} transition={{
            delay: index * 0.02
          }}>
                <GameCard game={game} onClick={() => handleGameSelect(game)} />
              </motion.div>)}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {displayCount < filteredGames.length && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="flex justify-center mt-12">
            <Button onClick={loadMore} variant="outline" size="lg" className="gap-2 rounded-full px-8">
              <ChevronDown className="w-5 h-5" />
              Load More ({filteredGames.length - displayCount} remaining)
            </Button>
          </motion.div>}
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Performance estimates are approximations based on hardware specifications.
            Actual performance may vary based on drivers, settings, and other factors.
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;