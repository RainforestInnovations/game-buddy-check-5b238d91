import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Game } from "@/data/games";
import { Calendar, Star, Tag, Monitor, Users, Globe, ExternalLink, Loader2, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SteamGameDetails {
  appid: number;
  name: string;
  releaseDate: string;
  headerImage: string;
  shortDescription: string;
  detailedDescription: string;
  genres: string[];
  platforms: { windows: boolean; mac: boolean; linux: boolean };
  priceOverview?: { final_formatted: string; discount_percent: number };
  metacritic?: { score: number };
  screenshots: string[];
  developers: string[];
  publishers: string[];
  categories: string[];
  recommendations?: number;
  website?: string;
}

interface GameDetailsModalProps {
  game: Game | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GameDetailsModal({ game, open, onOpenChange }: GameDetailsModalProps) {
  const [details, setDetails] = useState<SteamGameDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && game?.steamAppId) {
      fetchGameDetails(game.steamAppId);
    } else if (!open) {
      setDetails(null);
      setError(null);
    }
  }, [open, game?.steamAppId]);

  const fetchGameDetails = async (appId: number) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fnError } = await supabase.functions.invoke('steam-games', {
        body: { type: 'game_details', appid: appId }
      });

      if (fnError) throw fnError;
      if (data.error) throw new Error(data.error);

      setDetails(data.game);
    } catch (err: any) {
      console.error('Error fetching game details:', err);
      setError(err.message || 'Failed to fetch game details');
    } finally {
      setLoading(false);
    }
  };

  const getMetacriticColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!game) return null;

  // For games without Steam App ID, show basic info from local data
  const showLocalOnly = !game.steamAppId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <ScrollArea className="max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{game.name}</DialogTitle>
          </DialogHeader>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading game details from Steam...</p>
            </div>
          )}

          {error && !loading && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-4">
                {showLocalOnly ? "This game doesn't have Steam integration." : error}
              </p>
              <div className="space-y-4">
                <img
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.steamAppId}/header.jpg`}
                  alt={game.name}
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="flex flex-wrap gap-2 justify-center">
                  {game.genre.map((g) => (
                    <Badge key={g} variant="secondary">{g}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Released: {game.releaseYear}</p>
              </div>
            </div>
          )}

          {details && !loading && (
            <div className="space-y-4 mt-4">
              <img
                src={details.headerImage}
                alt={details.name}
                className="w-full rounded-lg"
              />

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{details.releaseDate}</span>
                </div>

                {details.metacritic && (
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold ${getMetacriticColor(details.metacritic.score)}`}>
                      {details.metacritic.score}
                    </div>
                    <span className="text-muted-foreground">Metacritic</span>
                  </div>
                )}

                {details.recommendations && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{formatNumber(details.recommendations)} reviews</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {details.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {genre}
                  </Badge>
                ))}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">About This Game</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {details.shortDescription}
                </p>
              </div>

              {details.developers.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Developer:</span>
                  <span>{details.developers.join(', ')}</span>
                </div>
              )}

              {details.publishers.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Publisher:</span>
                  <span>{details.publishers.join(', ')}</span>
                </div>
              )}

              {details.categories.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {details.categories.slice(0, 6).map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {details.screenshots.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3">Screenshots</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {details.screenshots.map((screenshot, i) => (
                        <img
                          key={i}
                          src={screenshot}
                          alt={`Screenshot ${i + 1}`}
                          className="rounded-lg w-full hover:scale-105 transition-transform cursor-pointer"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="flex items-center justify-between pt-2">
                {details.priceOverview ? (
                  <div className="flex items-center gap-2">
                    {details.priceOverview.discount_percent > 0 && (
                      <Badge className="bg-green-500">
                        -{details.priceOverview.discount_percent}%
                      </Badge>
                    )}
                    <span className="text-xl font-bold text-primary">
                      {details.priceOverview.final_formatted}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Free to Play / Price unavailable</span>
                )}

                <div className="flex gap-2">
                  {details.website && (
                    <Button variant="outline" asChild>
                      <a href={details.website} target="_blank" rel="noopener noreferrer">
                        Official Site
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                  <Button asChild>
                    <a
                      href={`https://store.steampowered.com/app/${details.appid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Steam
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showLocalOnly && !loading && !error && (
            <div className="py-8 space-y-4">
              <div className="flex flex-wrap gap-2">
                {game.genre.map((g) => (
                  <Badge key={g} variant="secondary">{g}</Badge>
                ))}
              </div>
              <p className="text-muted-foreground">
                Released: {game.releaseYear}
              </p>
              <p className="text-sm text-muted-foreground">
                This game is available on: {game.supportedOS.join(', ')}
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
