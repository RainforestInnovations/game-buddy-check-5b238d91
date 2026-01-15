import { Game, PerformanceResult, calculatePerformance, getGPUBenchmark, gpuBenchmarks } from '@/data/games';
import { SystemSpecs } from './SpecSelector';
import { motion } from 'framer-motion';
import { Activity, Cpu, Gauge, HardDrive, Monitor, TrendingDown, TrendingUp, AlertTriangle, ExternalLink, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface PerformanceDisplayProps {
  game: Game;
  specs: SystemSpecs;
}

export function PerformanceDisplay({ game, specs }: PerformanceDisplayProps) {
  const isSupported = game.supportedOS.includes(specs.os);
  const hasBenchmark = game.hasBenchmark !== false; // Default to true if not specified
  
  const performance = calculatePerformance(
    game,
    specs.gpuTier,
    specs.cpuTier,
    specs.ram,
    specs.vram,
    specs.resolution
  );

  const gpuBenchmark = getGPUBenchmark(specs.gpu);

  const getQualityColor = (quality: PerformanceResult['quality']) => {
    switch (quality) {
      case 'Ultra': return 'text-green-400';
      case 'High': return 'text-emerald-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-orange-400';
      case 'Unplayable': return 'text-red-400';
    }
  };

  const getFpsColor = (fps: number) => {
    if (fps >= 120) return 'text-green-400';
    if (fps >= 60) return 'text-emerald-400';
    if (fps >= 45) return 'text-yellow-400';
    if (fps >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const coverUrl = game.coverUrl 
    ? game.coverUrl
    : game.steamAppId > 0 
      ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamAppId}/header.jpg`
      : 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png';

  if (!isSupported) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-2xl"
      >
        <div className="flex items-start gap-4 mb-6">
          <img
            src={coverUrl}
            alt={game.name}
            className="w-32 h-auto rounded-lg object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-foreground">{game.name}</h2>
            <div className="flex gap-2 mt-2">
              {game.genre.map((g) => (
                <span key={g} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <h3 className="text-xl font-bold text-destructive">Not Supported on {specs.os === 'macos' ? 'macOS' : specs.os === 'linux' ? 'Linux' : 'Windows'}</h3>
          </div>
          
          <p className="text-muted-foreground mb-4">
            This game is not officially supported on your operating system. However, you may be able to play it using compatibility layers or alternative solutions.
          </p>

          {specs.os === 'macos' && (
            <div className="bg-background/50 rounded-lg p-4 mt-4">
              <p className="text-sm text-muted-foreground mb-3">
                For macOS gaming compatibility information, check out:
              </p>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open(`https://macgamingdb.app/search?q=${encodeURIComponent(game.name)}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Check on MacGamingDB
              </Button>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Information sourced from macgamingdb.app
              </p>
            </div>
          )}

          {specs.os === 'linux' && (
            <div className="bg-background/50 rounded-lg p-4 mt-4">
              <p className="text-sm text-muted-foreground mb-3">
                For Linux gaming compatibility, check Proton/Wine compatibility:
              </p>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open(`https://www.protondb.com/search?q=${encodeURIComponent(game.name)}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Check on ProtonDB
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 rounded-2xl"
    >
      {/* Game Header */}
      <div className="flex items-start gap-4 mb-8">
        <img
          src={coverUrl}
          alt={game.name}
          className="w-48 h-auto rounded-lg object-cover"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-foreground mb-2">{game.name}</h2>
          <div className="flex gap-2 mb-4">
            {game.genre.map((g) => (
              <span key={g} className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                {g}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Recommended Quality:</span>
            <span className={`text-xl font-bold ${getQualityColor(performance.quality)}`}>
              {performance.quality}
            </span>
          </div>
        </div>
      </div>

      {/* No Benchmark Warning */}
      {!hasBenchmark && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">Game-Specific Benchmark Unavailable</h4>
              <p className="text-sm text-muted-foreground">
                We don't have specific benchmark data for {game.name} yet. The estimates below are based on system requirements and general performance metrics. Below you'll also find general benchmarks for your GPU.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Average FPS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-background/30 rounded-xl p-6 border border-border/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Gauge className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground">Average FPS {!hasBenchmark && <span className="text-xs">(Est.)</span>}</span>
          </div>
          <div className={`text-5xl font-bold ${getFpsColor(performance.avgFps)}`}>
            {performance.avgFps}
          </div>
          <div className="text-sm text-muted-foreground mt-2">frames per second</div>
        </motion.div>

        {/* Low FPS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background/30 rounded-xl p-6 border border-border/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-6 h-6 text-orange-400" />
            <span className="text-muted-foreground">1% Low FPS {!hasBenchmark && <span className="text-xs">(Est.)</span>}</span>
          </div>
          <div className={`text-5xl font-bold ${getFpsColor(performance.lowFps)}`}>
            {performance.lowFps}
          </div>
          <div className="text-sm text-muted-foreground mt-2">worst case scenario</div>
        </motion.div>

        {/* High FPS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-background/30 rounded-xl p-6 border border-border/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="text-muted-foreground">Peak FPS {!hasBenchmark && <span className="text-xs">(Est.)</span>}</span>
          </div>
          <div className={`text-5xl font-bold ${getFpsColor(performance.highFps)}`}>
            {performance.highFps}
          </div>
          <div className="text-sm text-muted-foreground mt-2">best case scenario</div>
        </motion.div>
      </div>

      {/* Hardware Usage */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Hardware Utilization
        </h3>

        <div className="space-y-4">
          {/* GPU Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Monitor className="w-4 h-4" />
                GPU Usage
              </span>
              <span className="text-foreground font-medium">{performance.gpuUsage}%</span>
            </div>
            <Progress value={performance.gpuUsage} className="h-2" />
          </div>

          {/* CPU Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Cpu className="w-4 h-4" />
                CPU Usage
              </span>
              <span className="text-foreground font-medium">{performance.cpuUsage}%</span>
            </div>
            <Progress value={performance.cpuUsage} className="h-2" />
          </div>

          {/* RAM Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <HardDrive className="w-4 h-4" />
                RAM Usage
              </span>
              <span className="text-foreground font-medium">{(performance.ramUsage / 1024).toFixed(1)} GB</span>
            </div>
            <Progress value={(performance.ramUsage / 1024 / specs.ram) * 100} className="h-2" />
          </div>
        </div>
      </div>

      {/* GPU Benchmark Section - Show when no game-specific benchmark */}
      {!hasBenchmark && gpuBenchmark && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/20"
        >
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary" />
            {specs.gpu} General Benchmarks
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Average FPS across popular AAA titles at different resolutions (High/Ultra settings):
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-background/50 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">1080p</div>
              <div className={`text-3xl font-bold ${getFpsColor(gpuBenchmark.avg1080pFps)}`}>
                {gpuBenchmark.avg1080pFps}
              </div>
              <div className="text-xs text-muted-foreground">avg FPS</div>
            </div>
            <div className="bg-background/50 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">1440p</div>
              <div className={`text-3xl font-bold ${getFpsColor(gpuBenchmark.avg1440pFps)}`}>
                {gpuBenchmark.avg1440pFps}
              </div>
              <div className="text-xs text-muted-foreground">avg FPS</div>
            </div>
            <div className="bg-background/50 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">4K</div>
              <div className={`text-3xl font-bold ${getFpsColor(gpuBenchmark.avg4kFps)}`}>
                {gpuBenchmark.avg4kFps}
              </div>
              <div className="text-xs text-muted-foreground">avg FPS</div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-muted/30 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${gpuBenchmark.benchmarkScore}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground w-24">
              Score: {gpuBenchmark.benchmarkScore}/100
            </span>
          </div>
        </motion.div>
      )}

      {/* Benchmark Video Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-background/30 rounded-xl p-6 border border-border/30"
      >
        <h3 className="text-lg font-bold text-foreground mb-4">Benchmark Reference</h3>
        <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border border-border/30">
          <div className="text-center text-muted-foreground">
            <Monitor className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Benchmark videos coming soon</p>
            <p className="text-sm">Search YouTube for "{game.name} {specs.gpu} benchmark"</p>
          </div>
        </div>
      </motion.div>

      {/* Your Specs Summary */}
      <div className="mt-8 pt-6 border-t border-border/30">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Testing with your specs:</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            {specs.gpu} ({specs.vram}GB)
          </span>
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            {specs.cpu}
          </span>
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            {specs.ram}GB RAM
          </span>
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full uppercase">
            {specs.resolution}
          </span>
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full capitalize">
            {specs.os}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
