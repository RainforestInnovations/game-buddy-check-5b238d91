import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { games, Game } from '@/data/games';
import { GameCard } from '@/components/GameCard';
import { SearchBar } from '@/components/SearchBar';
import { SpecSelector, SystemSpecs } from '@/components/SpecSelector';
import { PerformanceDisplay } from '@/components/PerformanceDisplay';
import { GameReviewSection } from '@/components/GameReviewSection';
import { UserMenu } from '@/components/UserMenu';
import { SteamNewReleases } from '@/components/SteamNewReleases';
import { GameDetailsModal } from '@/components/GameDetailsModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, ChevronDown, X, Sparkles, Coffee, Flame, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const GAMES_PER_PAGE = 24;
const Index = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [detailsGame, setDetailsGame] = useState<Game | null>(null);
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
      {/* Top Navigation */}
      <nav className="relative z-20 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex justify-end gap-3">
          <ThemeToggle />
          <UserMenu />
          <Link to="/feedback" className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-full transition-colors">
            <MessageSquare className="w-4 h-4" />
            Feedback
          </Link>
          <Link to="/donate" className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-medium rounded-full transition-colors">
            <Coffee className="w-4 h-4" />
            Support Me
          </Link>
        </div>
      </nav>

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
              
              {/* Reviews Section */}
              <div className="mt-8">
                <GameReviewSection gameId={selectedGame.id} gameName={selectedGame.name} currentSpecs={specs} />
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* Browse Tabs */}
        <Tabs defaultValue="benchmarks" className="w-full">
          <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="benchmarks" className="gap-2">
              <Gamepad2 className="w-4 h-4" />
              Benchmarked Games
            </TabsTrigger>
            <TabsTrigger value="new-releases" className="gap-2">
              <Flame className="w-4 h-4" />
              New Releases
            </TabsTrigger>
          </TabsList>

          <TabsContent value="benchmarks">
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
                    <GameCard game={game} onClick={() => handleGameSelect(game)} onInfoClick={() => setDetailsGame(game)} />
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
          </TabsContent>

          <TabsContent value="new-releases">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-foreground">New Releases</h2>
                <span className="text-muted-foreground">Live from Steam</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Discover the latest games released on Steam. Click any game for full details, screenshots, and pricing.
              </p>
            </div>
            <SteamNewReleases />
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link to="/feedback" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Send Feedback</span>
            </Link>
            <Link to="/donate" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Coffee className="w-4 h-4" />
              <span className="font-medium">Support this project</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Performance estimates are approximations based on hardware specifications.
            Actual performance may vary based on drivers, settings, and other factors.
          </p>
        </div>
      </footer>

      {/* Game Details Modal */}
      <GameDetailsModal game={detailsGame} open={!!detailsGame} onOpenChange={open => !open && setDetailsGame(null)} />
    </div>;
};
export default Index;