import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Calendar, Star, Tag, Monitor, Apple, Laptop, ExternalLink, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SteamGame {
  appid: number;
  name: string;
  releaseDate: string;
  headerImage: string;
  shortDescription: string;
  genres: string[];
  platforms: { windows: boolean; mac: boolean; linux: boolean };
  priceOverview?: { final_formatted: string; discount_percent: number };
  metacritic?: { score: number };
  screenshots: string[];
}

export function SteamNewReleases() {
  const [games, setGames] = useState<SteamGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<SteamGame | null>(null);

  useEffect(() => {
    fetchNewReleases();
  }, []);

  const fetchNewReleases = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fnError } = await supabase.functions.invoke('steam-games', {
        body: { type: 'new_releases' }
      });

      if (fnError) throw fnError;
      
      setGames(data.games || []);
    } catch (err: any) {
      console.error('Error fetching Steam games:', err);
      setError(err.message || 'Failed to fetch games');
    } finally {
      setLoading(false);
    }
  };

  const getMetacriticColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading new releases from Steam...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={fetchNewReleases} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.appid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card 
              className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all group"
              onClick={() => setSelectedGame(game)}
            >
              <div className="relative aspect-[460/215] overflow-hidden">
                <img
                  src={game.headerImage}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {game.priceOverview?.discount_percent > 0 && (
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    -{game.priceOverview.discount_percent}%
                  </Badge>
                )}
                {game.metacritic && (
                  <div className={`absolute top-2 left-2 w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold ${getMetacriticColor(game.metacritic.score)}`}>
                    {game.metacritic.score}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1 mb-2">{game.name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{game.releaseDate}</span>
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  {game.platforms.windows && (
                    <Monitor className="w-4 h-4 text-muted-foreground" aria-label="Windows" />
                  )}
                  {game.platforms.mac && (
                    <Apple className="w-4 h-4 text-muted-foreground" aria-label="macOS" />
                  )}
                  {game.platforms.linux && (
                    <Laptop className="w-4 h-4 text-muted-foreground" aria-label="Linux" />
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {game.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>

                {game.priceOverview && (
                  <p className="font-semibold text-primary">
                    {game.priceOverview.final_formatted}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          {selectedGame && (
            <ScrollArea className="max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedGame.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <img
                  src={selectedGame.headerImage}
                  alt={selectedGame.name}
                  className="w-full rounded-lg"
                />

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedGame.releaseDate}</span>
                  </div>
                  
                  {selectedGame.metacritic && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>Metacritic: {selectedGame.metacritic.score}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    {selectedGame.platforms.windows && <Monitor className="w-4 h-4" aria-label="Windows" />}
                    {selectedGame.platforms.mac && <Apple className="w-4 h-4" aria-label="macOS" />}
                    {selectedGame.platforms.linux && <Laptop className="w-4 h-4" aria-label="Linux" />}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedGame.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      <Tag className="w-3 h-3 mr-1" />
                      {genre}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedGame.shortDescription}
                </p>

                {selectedGame.screenshots.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedGame.screenshots.map((screenshot, i) => (
                      <img
                        key={i}
                        src={screenshot}
                        alt={`Screenshot ${i + 1}`}
                        className="rounded-lg w-full"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  {selectedGame.priceOverview ? (
                    <div className="flex items-center gap-2">
                      {selectedGame.priceOverview.discount_percent > 0 && (
                        <Badge className="bg-green-500">
                          -{selectedGame.priceOverview.discount_percent}%
                        </Badge>
                      )}
                      <span className="text-xl font-bold text-primary">
                        {selectedGame.priceOverview.final_formatted}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Price not available</span>
                  )}
                  
                  <Button asChild>
                    <a 
                      href={`https://store.steampowered.com/app/${selectedGame.appid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Steam
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
