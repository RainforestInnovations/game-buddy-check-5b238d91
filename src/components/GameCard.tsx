import { Game } from '@/data/games';
import { motion } from 'framer-motion';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  const coverUrl = game.coverUrl 
    ? game.coverUrl
    : game.steamAppId > 0 
      ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamAppId}/library_600x900.jpg`
      : 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png';

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
      onClick={onClick}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={coverUrl}
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg';
          }}
        />
        <div className="absolute inset-0 bg-background/60 group-hover:bg-background/70 transition-colors" />
        
        {/* OS badges */}
        <div className="absolute top-2 right-2 flex gap-1">
          {game.supportedOS.includes('windows') && (
            <span className="px-2 py-0.5 bg-primary/80 text-primary-foreground text-xs rounded-full backdrop-blur-sm">
              Win
            </span>
          )}
          {game.supportedOS.includes('macos') && (
            <span className="px-2 py-0.5 bg-accent/80 text-accent-foreground text-xs rounded-full backdrop-blur-sm">
              Mac
            </span>
          )}
          {game.supportedOS.includes('linux') && (
            <span className="px-2 py-0.5 bg-secondary/80 text-secondary-foreground text-xs rounded-full backdrop-blur-sm">
              Linux
            </span>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-bold text-lg text-foreground line-clamp-2 drop-shadow-lg">
          {game.name}
        </h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          {game.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="px-2 py-0.5 bg-muted/80 text-muted-foreground text-xs rounded-full backdrop-blur-sm"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-primary/30 rounded-xl" />
    </motion.div>
  );
}
