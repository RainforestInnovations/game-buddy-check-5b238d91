import { useState, useEffect, useRef } from 'react';
import { games, Game } from '@/data/games';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onGameSelect: (game: Game) => void;
}

export function SearchBar({ onGameSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = games
        .filter(game => 
          game.name.toLowerCase().includes(query.toLowerCase()) ||
          game.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 8);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (game: Game) => {
    onGameSelect(game);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for a game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          className="w-full h-14 pl-12 pr-12 text-lg bg-card/50 border-border/50 rounded-2xl focus:border-primary/50 focus:ring-primary/20 backdrop-blur-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl z-50"
          >
            {results.map((game, index) => {
              const coverUrl = game.coverUrl 
                ? game.coverUrl
                : game.steamAppId > 0 
                  ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamAppId}/capsule_sm_120.jpg`
                  : null;

              return (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(game)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-primary/10 transition-colors text-left"
                >
                  {coverUrl && (
                    <img
                      src={coverUrl}
                      alt={game.name}
                      className="w-16 h-8 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{game.name}</h4>
                    <div className="flex gap-2 mt-1">
                      {game.genre.slice(0, 2).map((g) => (
                        <span key={g} className="text-xs text-muted-foreground">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {game.supportedOS.includes('windows') && (
                      <span className="text-xs px-1.5 py-0.5 bg-primary/20 text-primary rounded">Win</span>
                    )}
                    {game.supportedOS.includes('macos') && (
                      <span className="text-xs px-1.5 py-0.5 bg-accent/20 text-accent-foreground rounded">Mac</span>
                    )}
                    {game.supportedOS.includes('linux') && (
                      <span className="text-xs px-1.5 py-0.5 bg-secondary/20 text-secondary-foreground rounded">Linux</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
