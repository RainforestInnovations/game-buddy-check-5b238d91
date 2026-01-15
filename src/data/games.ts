export interface Game {
  id: string;
  name: string;
  steamAppId: number;
  coverUrl?: string; // Custom cover URL for non-Steam games
  releaseYear: number;
  genre: string[];
  supportedOS: ('windows' | 'macos' | 'linux')[];
  hasBenchmark?: boolean; // Whether we have specific benchmark data for this game
  minRequirements: {
    gpu: string;
    cpu: string;
    ram: number;
    vram: number;
  };
  recommendedRequirements: {
    gpu: string;
    cpu: string;
    ram: number;
    vram: number;
  };
}

// GPU benchmark data for when game-specific benchmarks aren't available
export interface GPUBenchmark {
  gpuName: string;
  benchmarkScore: number;
  avg1080pFps: number;
  avg1440pFps: number;
  avg4kFps: number;
}

export const gpuBenchmarks: GPUBenchmark[] = [
  // NVIDIA RTX 50 Series
  { gpuName: "RTX 5090", benchmarkScore: 100, avg1080pFps: 280, avg1440pFps: 220, avg4kFps: 145 },
  { gpuName: "RTX 5080", benchmarkScore: 92, avg1080pFps: 255, avg1440pFps: 195, avg4kFps: 125 },
  { gpuName: "RTX 5070 Ti", benchmarkScore: 85, avg1080pFps: 235, avg1440pFps: 175, avg4kFps: 110 },
  { gpuName: "RTX 5070", benchmarkScore: 78, avg1080pFps: 215, avg1440pFps: 160, avg4kFps: 95 },
  // NVIDIA RTX 40 Series
  { gpuName: "RTX 4090", benchmarkScore: 95, avg1080pFps: 265, avg1440pFps: 205, avg4kFps: 135 },
  { gpuName: "RTX 4080 Super", benchmarkScore: 88, avg1080pFps: 245, avg1440pFps: 185, avg4kFps: 115 },
  { gpuName: "RTX 4080", benchmarkScore: 85, avg1080pFps: 235, avg1440pFps: 175, avg4kFps: 105 },
  { gpuName: "RTX 4070 Ti Super", benchmarkScore: 80, avg1080pFps: 220, avg1440pFps: 165, avg4kFps: 95 },
  { gpuName: "RTX 4070 Ti", benchmarkScore: 77, avg1080pFps: 210, avg1440pFps: 155, avg4kFps: 88 },
  { gpuName: "RTX 4070 Super", benchmarkScore: 74, avg1080pFps: 200, avg1440pFps: 145, avg4kFps: 82 },
  { gpuName: "RTX 4070", benchmarkScore: 70, avg1080pFps: 185, avg1440pFps: 135, avg4kFps: 75 },
  { gpuName: "RTX 4060 Ti", benchmarkScore: 60, avg1080pFps: 155, avg1440pFps: 110, avg4kFps: 58 },
  { gpuName: "RTX 4060", benchmarkScore: 55, avg1080pFps: 140, avg1440pFps: 98, avg4kFps: 48 },
  // NVIDIA RTX 30 Series
  { gpuName: "RTX 3090 Ti", benchmarkScore: 82, avg1080pFps: 225, avg1440pFps: 170, avg4kFps: 100 },
  { gpuName: "RTX 3090", benchmarkScore: 78, avg1080pFps: 210, avg1440pFps: 158, avg4kFps: 92 },
  { gpuName: "RTX 3080 Ti", benchmarkScore: 75, avg1080pFps: 200, avg1440pFps: 148, avg4kFps: 85 },
  { gpuName: "RTX 3080", benchmarkScore: 72, avg1080pFps: 190, avg1440pFps: 140, avg4kFps: 78 },
  { gpuName: "RTX 3070 Ti", benchmarkScore: 65, avg1080pFps: 170, avg1440pFps: 125, avg4kFps: 65 },
  { gpuName: "RTX 3070", benchmarkScore: 62, avg1080pFps: 160, avg1440pFps: 118, avg4kFps: 60 },
  { gpuName: "RTX 3060 Ti", benchmarkScore: 58, avg1080pFps: 150, avg1440pFps: 108, avg4kFps: 52 },
  { gpuName: "RTX 3060", benchmarkScore: 52, avg1080pFps: 135, avg1440pFps: 95, avg4kFps: 45 },
  { gpuName: "RTX 3050", benchmarkScore: 38, avg1080pFps: 95, avg1440pFps: 65, avg4kFps: 32 },
  // NVIDIA RTX 20 Series
  { gpuName: "RTX 2080 Ti", benchmarkScore: 68, avg1080pFps: 175, avg1440pFps: 130, avg4kFps: 70 },
  { gpuName: "RTX 2080 Super", benchmarkScore: 62, avg1080pFps: 160, avg1440pFps: 115, avg4kFps: 60 },
  { gpuName: "RTX 2080", benchmarkScore: 58, avg1080pFps: 150, avg1440pFps: 108, avg4kFps: 55 },
  { gpuName: "RTX 2070 Super", benchmarkScore: 55, avg1080pFps: 142, avg1440pFps: 100, avg4kFps: 50 },
  { gpuName: "RTX 2070", benchmarkScore: 52, avg1080pFps: 135, avg1440pFps: 95, avg4kFps: 45 },
  { gpuName: "RTX 2060 Super", benchmarkScore: 48, avg1080pFps: 125, avg1440pFps: 88, avg4kFps: 40 },
  { gpuName: "RTX 2060", benchmarkScore: 45, avg1080pFps: 118, avg1440pFps: 82, avg4kFps: 38 },
  // NVIDIA GTX 10 Series
  { gpuName: "GTX 1080 Ti", benchmarkScore: 55, avg1080pFps: 142, avg1440pFps: 100, avg4kFps: 50 },
  { gpuName: "GTX 1080", benchmarkScore: 48, avg1080pFps: 125, avg1440pFps: 88, avg4kFps: 42 },
  { gpuName: "GTX 1070 Ti", benchmarkScore: 44, avg1080pFps: 115, avg1440pFps: 80, avg4kFps: 38 },
  { gpuName: "GTX 1070", benchmarkScore: 42, avg1080pFps: 108, avg1440pFps: 75, avg4kFps: 35 },
  { gpuName: "GTX 1660 Ti", benchmarkScore: 40, avg1080pFps: 102, avg1440pFps: 70, avg4kFps: 32 },
  { gpuName: "GTX 1660 Super", benchmarkScore: 38, avg1080pFps: 98, avg1440pFps: 68, avg4kFps: 30 },
  { gpuName: "GTX 1660", benchmarkScore: 35, avg1080pFps: 90, avg1440pFps: 62, avg4kFps: 28 },
  { gpuName: "GTX 1650 Super", benchmarkScore: 32, avg1080pFps: 82, avg1440pFps: 55, avg4kFps: 25 },
  { gpuName: "GTX 1650", benchmarkScore: 28, avg1080pFps: 72, avg1440pFps: 48, avg4kFps: 22 },
  { gpuName: "GTX 1060", benchmarkScore: 32, avg1080pFps: 82, avg1440pFps: 55, avg4kFps: 25 },
  { gpuName: "GTX 1050 Ti", benchmarkScore: 24, avg1080pFps: 62, avg1440pFps: 40, avg4kFps: 18 },
  { gpuName: "GTX 1050", benchmarkScore: 20, avg1080pFps: 52, avg1440pFps: 32, avg4kFps: 14 },
  // AMD RX 9000 Series
  { gpuName: "RX 9070 XT", benchmarkScore: 85, avg1080pFps: 235, avg1440pFps: 175, avg4kFps: 105 },
  { gpuName: "RX 9070", benchmarkScore: 78, avg1080pFps: 210, avg1440pFps: 155, avg4kFps: 90 },
  // AMD RX 7000 Series
  { gpuName: "RX 7900 XTX", benchmarkScore: 88, avg1080pFps: 245, avg1440pFps: 185, avg4kFps: 110 },
  { gpuName: "RX 7900 XT", benchmarkScore: 80, avg1080pFps: 220, avg1440pFps: 165, avg4kFps: 95 },
  { gpuName: "RX 7900 GRE", benchmarkScore: 72, avg1080pFps: 190, avg1440pFps: 140, avg4kFps: 80 },
  { gpuName: "RX 7800 XT", benchmarkScore: 65, avg1080pFps: 170, avg1440pFps: 125, avg4kFps: 68 },
  { gpuName: "RX 7700 XT", benchmarkScore: 58, avg1080pFps: 150, avg1440pFps: 108, avg4kFps: 55 },
  { gpuName: "RX 7600 XT", benchmarkScore: 52, avg1080pFps: 135, avg1440pFps: 95, avg4kFps: 45 },
  { gpuName: "RX 7600", benchmarkScore: 48, avg1080pFps: 125, avg1440pFps: 88, avg4kFps: 40 },
  // AMD RX 6000 Series
  { gpuName: "RX 6950 XT", benchmarkScore: 75, avg1080pFps: 200, avg1440pFps: 148, avg4kFps: 85 },
  { gpuName: "RX 6900 XT", benchmarkScore: 72, avg1080pFps: 190, avg1440pFps: 140, avg4kFps: 78 },
  { gpuName: "RX 6800 XT", benchmarkScore: 68, avg1080pFps: 178, avg1440pFps: 130, avg4kFps: 70 },
  { gpuName: "RX 6800", benchmarkScore: 62, avg1080pFps: 160, avg1440pFps: 118, avg4kFps: 62 },
  { gpuName: "RX 6750 XT", benchmarkScore: 55, avg1080pFps: 142, avg1440pFps: 102, avg4kFps: 52 },
  { gpuName: "RX 6700 XT", benchmarkScore: 52, avg1080pFps: 135, avg1440pFps: 95, avg4kFps: 48 },
  { gpuName: "RX 6650 XT", benchmarkScore: 45, avg1080pFps: 118, avg1440pFps: 82, avg4kFps: 38 },
  { gpuName: "RX 6600 XT", benchmarkScore: 42, avg1080pFps: 110, avg1440pFps: 75, avg4kFps: 35 },
  { gpuName: "RX 6600", benchmarkScore: 38, avg1080pFps: 98, avg1440pFps: 68, avg4kFps: 32 },
  { gpuName: "RX 6500 XT", benchmarkScore: 25, avg1080pFps: 65, avg1440pFps: 42, avg4kFps: 20 },
  // AMD RX 5000 Series
  { gpuName: "RX 5700 XT", benchmarkScore: 48, avg1080pFps: 125, avg1440pFps: 88, avg4kFps: 42 },
  { gpuName: "RX 5700", benchmarkScore: 45, avg1080pFps: 118, avg1440pFps: 82, avg4kFps: 38 },
  { gpuName: "RX 5600 XT", benchmarkScore: 40, avg1080pFps: 102, avg1440pFps: 70, avg4kFps: 32 },
  { gpuName: "RX 580", benchmarkScore: 32, avg1080pFps: 82, avg1440pFps: 55, avg4kFps: 25 },
  { gpuName: "RX 570", benchmarkScore: 28, avg1080pFps: 72, avg1440pFps: 48, avg4kFps: 22 },
  // Intel Arc
  { gpuName: "Intel Arc B580", benchmarkScore: 52, avg1080pFps: 135, avg1440pFps: 95, avg4kFps: 45 },
  { gpuName: "Intel Arc A770", benchmarkScore: 52, avg1080pFps: 135, avg1440pFps: 95, avg4kFps: 45 },
  { gpuName: "Intel Arc A750", benchmarkScore: 45, avg1080pFps: 118, avg1440pFps: 82, avg4kFps: 38 },
  { gpuName: "Intel Arc A580", benchmarkScore: 38, avg1080pFps: 98, avg1440pFps: 68, avg4kFps: 30 },
  { gpuName: "Intel Arc A380", benchmarkScore: 20, avg1080pFps: 52, avg1440pFps: 32, avg4kFps: 14 },
];

export function getGPUBenchmark(gpuName: string): GPUBenchmark | undefined {
  return gpuBenchmarks.find(b => b.gpuName === gpuName);
}

export const games: Game[] = [
  { id: "cyberpunk2077", name: "Cyberpunk 2077", steamAppId: 1091500, releaseYear: 2020, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-3570K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-12700", ram: 16, vram: 8 } },
  { id: "eldenring", name: "Elden Ring", steamAppId: 1245620, releaseYear: 2022, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 12, vram: 3 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "hogwartslegacy", name: "Hogwarts Legacy", steamAppId: 990080, releaseYear: 2023, genre: ["RPG", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-6600", ram: 16, vram: 4 }, recommendedRequirements: { gpu: "RTX 3090", cpu: "Intel Core i7-10700K", ram: 32, vram: 8 } },
  { id: "baldursgate3", name: "Baldur's Gate 3", steamAppId: 1086940, releaseYear: 2023, genre: ["RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4690", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060 Ti", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "rdr2", name: "Red Dead Redemption 2", steamAppId: 1174180, releaseYear: 2019, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-2500K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "gtav", name: "Grand Theft Auto V", steamAppId: 271590, releaseYear: 2015, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3470", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1660", cpu: "Intel Core i7-8700", ram: 16, vram: 4 } },
  { id: "thewitcher3", name: "The Witcher 3: Wild Hunt", steamAppId: 292030, releaseYear: 2015, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2500K", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-7700", ram: 16, vram: 8 } },
  { id: "csgo2", name: "Counter-Strike 2", steamAppId: 730, releaseYear: 2023, genre: ["FPS", "Action"], supportedOS: ["windows", "linux"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-750", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 6 } },
  { id: "valorant", name: "Valorant", steamAppId: 0, coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png", releaseYear: 2020, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 730", cpu: "Intel Core i3-4150", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-9400F", ram: 8, vram: 4 } },
  { id: "apex", name: "Apex Legends", steamAppId: 1172470, releaseYear: 2019, genre: ["FPS", "Battle Royale"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 640", cpu: "Intel Core i3-6300", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "fortnite", name: "Fortnite", steamAppId: 0, coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3wk8.png", releaseYear: 2017, genre: ["Battle Royale", "Action"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i3-3225", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-8700", ram: 16, vram: 8 } },
  { id: "minecraft", name: "Minecraft", steamAppId: 0, coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.png", releaseYear: 2011, genre: ["Sandbox", "Survival"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core i3-3210", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4690", ram: 8, vram: 4 } },
  { id: "dota2", name: "Dota 2", steamAppId: 570, releaseYear: 2013, genre: ["MOBA", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo E7400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "lol", name: "League of Legends", steamAppId: 0, coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49wj.png", releaseYear: 2009, genre: ["MOBA", "Strategy"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i3-530", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-3300", ram: 8, vram: 2 } },
  { id: "overwatch2", name: "Overwatch 2", steamAppId: 2357570, releaseYear: 2022, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 600", cpu: "Intel Core i3", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 6 } },
  { id: "destiny2", name: "Destiny 2", steamAppId: 1085660, releaseYear: 2019, genre: ["FPS", "MMO"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i3-3250", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-8700", ram: 16, vram: 8 } },
  { id: "callofdutywarzone", name: "Call of Duty: Warzone", steamAppId: 1962663, releaseYear: 2020, genre: ["FPS", "Battle Royale"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-2500K", ram: 12, vram: 2 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i9-9900K", ram: 16, vram: 10 } },
  { id: "mw3", name: "Call of Duty: Modern Warfare III", steamAppId: 2519060, releaseYear: 2023, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-6600", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700K", ram: 16, vram: 12 } },
  { id: "starfield", name: "Starfield", steamAppId: 1716740, releaseYear: 2023, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "AMD Ryzen 5 2600X", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4080", cpu: "AMD Ryzen 7 7800X3D", ram: 32, vram: 12 } },
  { id: "diablo4", name: "Diablo IV", steamAppId: 2344520, releaseYear: 2023, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2500K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060 Ti", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "fc24", name: "EA Sports FC 24", steamAppId: 2195250, releaseYear: 2023, genre: ["Sports", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-6600K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-12700K", ram: 16, vram: 8 } },
  { id: "nba2k24", name: "NBA 2K24", steamAppId: 2338770, releaseYear: 2023, genre: ["Sports", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i3-2100", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "palworld", name: "Palworld", steamAppId: 1623730, releaseYear: 2024, genre: ["Survival", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-3570K", ram: 16, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 32, vram: 8 } },
  { id: "helldivers2", name: "Helldivers 2", steamAppId: 553850, releaseYear: 2024, genre: ["Action", "Shooter"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i7-4790K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "lethalcompany", name: "Lethal Company", steamAppId: 1966720, releaseYear: 2023, genre: ["Horror", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-7400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "persona5royal", name: "Persona 5 Royal", steamAppId: 1687950, releaseYear: 2022, genre: ["RPG", "JRPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650 Ti", cpu: "Intel Core i5-2300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1650", cpu: "Intel Core i7-4790", ram: 16, vram: 4 } },
  { id: "persona3reload", name: "Persona 3 Reload", steamAppId: 2161700, releaseYear: 2024, genre: ["RPG", "JRPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1650", cpu: "Intel Core i5-2300", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-4790", ram: 16, vram: 6 } },
  { id: "ffxvi", name: "Final Fantasy XVI", steamAppId: 2515020, releaseYear: 2024, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "AMD Ryzen 5 1600", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "AMD Ryzen 7 5700X", ram: 32, vram: 12 } },
  { id: "ffxiv", name: "Final Fantasy XIV", steamAppId: 39210, releaseYear: 2013, genre: ["MMO", "RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 750", cpu: "Intel Core i5-2500", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-7700", ram: 16, vram: 6 } },
  { id: "terraria", name: "Terraria", steamAppId: 105600, releaseYear: 2011, genre: ["Sandbox", "Adventure"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3470", ram: 8, vram: 2 } },
  { id: "stardewvalley", name: "Stardew Valley", steamAppId: 413150, releaseYear: 2016, genre: ["Simulation", "RPG"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2500", ram: 4, vram: 2 } },
  { id: "rimworld", name: "RimWorld", steamAppId: 294100, releaseYear: 2018, genre: ["Simulation", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 8, vram: 2 } },
  { id: "factorio", name: "Factorio", steamAppId: 427520, releaseYear: 2020, genre: ["Simulation", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-6600K", ram: 8, vram: 2 } },
  { id: "satisfactory", name: "Satisfactory", steamAppId: 526870, releaseYear: 2024, genre: ["Simulation", "Factory"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-3570K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "hollowknightsilksong", name: "Hollow Knight: Silksong", steamAppId: 1030300, releaseYear: 2025, genre: ["Action", "Metroidvania"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2300", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-6600", ram: 8, vram: 4 } },
  { id: "dysonsphereprog", name: "Dyson Sphere Program", steamAppId: 1366540, releaseYear: 2021, genre: ["Simulation", "Strategy"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i3-530", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1660 Super", cpu: "Intel Core i7-7700", ram: 16, vram: 6 } },
  { id: "valheim", name: "Valheim", steamAppId: 892970, releaseYear: 2021, genre: ["Survival", "Adventure"], supportedOS: ["windows", "linux"], minRequirements: { gpu: "GTX 950", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 6 } },
  { id: "rust", name: "Rust", steamAppId: 252490, releaseYear: 2018, genre: ["Survival", "Action"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 670", cpu: "Intel Core i7-3770", ram: 10, vram: 2 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "AMD Ryzen 5 3600", ram: 16, vram: 8 } },
  { id: "ark", name: "ARK: Survival Evolved", steamAppId: 346110, releaseYear: 2017, genre: ["Survival", "Adventure"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 670", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "arkasa", name: "ARK: Survival Ascended", steamAppId: 2399830, releaseYear: 2023, genre: ["Survival", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "RTX 2060", cpu: "AMD Ryzen 5 2600X", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "AMD Ryzen 7 5800X3D", ram: 32, vram: 12 } },
  { id: "seaofthieves", name: "Sea of Thieves", steamAppId: 1172620, releaseYear: 2020, genre: ["Adventure", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-4460", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "nomannsky", name: "No Man's Sky", steamAppId: 275850, releaseYear: 2016, genre: ["Adventure", "Exploration"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 480", cpu: "Intel Core i3-4330", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "subnautica", name: "Subnautica", steamAppId: 264710, releaseYear: 2018, genre: ["Adventure", "Survival"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 550 Ti", cpu: "Intel Haswell 2 cores", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 8, vram: 4 } },
  { id: "subnauticabz", name: "Subnautica: Below Zero", steamAppId: 848450, releaseYear: 2021, genre: ["Adventure", "Survival"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 550 Ti", cpu: "Intel Core i3-530", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-8400", ram: 16, vram: 4 } },
  { id: "deathstranding", name: "Death Stranding", steamAppId: 1190460, releaseYear: 2020, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-3470", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "monsterhunterworld", name: "Monster Hunter: World", steamAppId: 582010, releaseYear: 2018, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-4460", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-7700K", ram: 16, vram: 6 } },
  { id: "monsterhunterrise", name: "Monster Hunter Rise", steamAppId: 1446780, releaseYear: 2022, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4460", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "residentevil4", name: "Resident Evil 4 Remake", steamAppId: 2050650, releaseYear: 2023, genre: ["Horror", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "AMD Ryzen 3 1200", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "AMD Ryzen 5 3600", ram: 16, vram: 8 } },
  { id: "residentevil2", name: "Resident Evil 2 Remake", steamAppId: 883710, releaseYear: 2019, genre: ["Horror", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-4460", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8700", ram: 16, vram: 3 } },
  { id: "alanwake2", name: "Alan Wake 2", steamAppId: 2172810, releaseYear: 2023, genre: ["Horror", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "RTX 2060", cpu: "Intel Core i5-7600K", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700", ram: 32, vram: 12 } },
  { id: "silenthill2", name: "Silent Hill 2 Remake", steamAppId: 2124490, releaseYear: 2024, genre: ["Horror", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1080", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-10700K", ram: 16, vram: 12 } },
  { id: "deadspace", name: "Dead Space Remake", steamAppId: 1693980, releaseYear: 2023, genre: ["Horror", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "AMD Ryzen 5 2600X", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i5-11600K", ram: 16, vram: 8 } },
  { id: "sekiro", name: "Sekiro: Shadows Die Twice", steamAppId: 814380, releaseYear: 2019, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i3-2100", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-2500K", ram: 8, vram: 4 } },
  { id: "darksouls3", name: "Dark Souls III", steamAppId: 374320, releaseYear: 2016, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "AMD FX-6300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-3770", ram: 8, vram: 4 } },
  { id: "darksoulsremastered", name: "Dark Souls Remastered", steamAppId: 570940, releaseYear: 2018, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 465", cpu: "Intel Core i5-2300", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-4790", ram: 8, vram: 4 } },
  { id: "armored6", name: "Armored Core VI: Fires of Rubicon", steamAppId: 1888160, releaseYear: 2023, genre: ["Action", "Mech"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1650", cpu: "Intel Core i5-4690K", ram: 12, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "liesofp", name: "Lies of P", steamAppId: 1627720, releaseYear: 2023, genre: ["Action", "RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "AMD FX-8350", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "hollowknight", name: "Hollow Knight", steamAppId: 367520, releaseYear: 2017, genre: ["Metroidvania", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 8, vram: 2 } },
  { id: "hades", name: "Hades", steamAppId: 1145360, releaseYear: 2020, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 5500", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 950", cpu: "Intel Core i5-4670K", ram: 8, vram: 2 } },
  { id: "hades2", name: "Hades II", steamAppId: 1145350, releaseYear: 2024, genre: ["Roguelike", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 950", cpu: "Intel Core i5-4590", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "deadcells", name: "Dead Cells", steamAppId: 588650, releaseYear: 2018, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 4, vram: 2 } },
  { id: "celeste", name: "Celeste", steamAppId: 504230, releaseYear: 2018, genre: ["Platformer", "Indie"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i3-2100", ram: 4, vram: 2 } },
  { id: "cuphead", name: "Cuphead", steamAppId: 268910, releaseYear: 2017, genre: ["Platformer", "Action"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 4, vram: 2 } },
  { id: "ori", name: "Ori and the Will of the Wisps", steamAppId: 1057090, releaseYear: 2020, genre: ["Platformer", "Metroidvania"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 950", cpu: "AMD Athlon X4 850", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 4 } },
  { id: "civvi", name: "Sid Meier's Civilization VI", steamAppId: 289070, releaseYear: 2016, genre: ["Strategy", "Turn-Based"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core i3-3120M", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-7700K", ram: 16, vram: 4 } },
  { id: "totalwarhammer3", name: "Total War: Warhammer III", steamAppId: 1142710, releaseYear: 2022, genre: ["Strategy", "RTS"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 900", cpu: "Intel Core i3-9100", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "ageof4", name: "Age of Empires IV", steamAppId: 1466860, releaseYear: 2021, genre: ["Strategy", "RTS"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-6300U", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "crusaderkings3", name: "Crusader Kings III", steamAppId: 1158310, releaseYear: 2020, genre: ["Strategy", "Grand Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i3-2120", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "GTX 1650", cpu: "Intel Core i5-8400", ram: 8, vram: 4 } },
  { id: "eu4", name: "Europa Universalis IV", steamAppId: 236850, releaseYear: 2013, genre: ["Strategy", "Grand Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Pentium 4", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 750", cpu: "Intel Core i5-3570K", ram: 8, vram: 2 } },
  { id: "hoi4", name: "Hearts of Iron IV", steamAppId: 394360, releaseYear: 2016, genre: ["Strategy", "Grand Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4400", cpu: "Intel Core 2 Quad Q9400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "stellaris", name: "Stellaris", steamAppId: 281990, releaseYear: 2016, genre: ["Strategy", "4X"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "AMD HD 5850", cpu: "Intel Core i3-530", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1660", cpu: "Intel Core i5-8400", ram: 16, vram: 4 } },
  { id: "citieskylines2", name: "Cities: Skylines II", steamAppId: 949230, releaseYear: 2023, genre: ["Simulation", "City Builder"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-6700K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i7-12700K", ram: 16, vram: 10 } },
  { id: "citieskylines", name: "Cities: Skylines", steamAppId: 255710, releaseYear: 2015, genre: ["Simulation", "City Builder"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 260", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3470", ram: 8, vram: 2 } },
  { id: "planetcoaster2", name: "Planet Coaster 2", steamAppId: 2688950, releaseYear: 2024, genre: ["Simulation", "Theme Park"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 12, vram: 4 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "sims4", name: "The Sims 4", steamAppId: 1222670, releaseYear: 2014, genre: ["Simulation", "Life Sim"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2500", ram: 8, vram: 2 } },
  { id: "footballmanager24", name: "Football Manager 2024", steamAppId: 2252570, releaseYear: 2023, genre: ["Simulation", "Sports"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "rainbowsixsiege", name: "Rainbow Six Siege", steamAppId: 359550, releaseYear: 2015, genre: ["FPS", "Tactical"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i3-560", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-2500K", ram: 8, vram: 4 } },
  { id: "escapefromtarkov", name: "Escape from Tarkov", steamAppId: 0, coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ycf.png", releaseYear: 2017, genre: ["FPS", "Survival"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2500K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "pubg", name: "PUBG: Battlegrounds", steamAppId: 578080, releaseYear: 2017, genre: ["Battle Royale", "FPS"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4430", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i5-6600K", ram: 16, vram: 6 } },
  { id: "huntshowdown", name: "Hunt: Showdown 1896", steamAppId: 594650, releaseYear: 2019, genre: ["FPS", "Horror"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660 Ti", cpu: "Intel Core i5-4590", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-8700K", ram: 32, vram: 8 } },
  { id: "tarkov", name: "Arena Breakout: Infinite", steamAppId: 2095040, releaseYear: 2024, genre: ["FPS", "Extraction"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-6600K", ram: 12, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "theforest", name: "The Forest", steamAppId: 242760, releaseYear: 2018, genre: ["Survival", "Horror"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4590", ram: 8, vram: 4 } },
  { id: "sonsoftheforest", name: "Sons of the Forest", steamAppId: 1326470, releaseYear: 2023, genre: ["Survival", "Horror"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 12, vram: 3 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "AMD Ryzen 5 3600X", ram: 16, vram: 8 } },
  { id: "raft", name: "Raft", steamAppId: 648800, releaseYear: 2022, genre: ["Survival", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 700", cpu: "Intel Core i5-2400", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "7daystodie", name: "7 Days to Die", steamAppId: 251570, releaseYear: 2013, genre: ["Survival", "Horror"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-4430", ram: 12, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "projectzomboid", name: "Project Zomboid", steamAppId: 108600, releaseYear: 2013, genre: ["Survival", "Horror"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 2500", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4430", ram: 8, vram: 2 } },
  { id: "phasmophobia", name: "Phasmophobia", steamAppId: 739630, releaseYear: 2020, genre: ["Horror", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4590", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i5-10600K", ram: 16, vram: 6 } },
  { id: "amongus", name: "Among Us", steamAppId: 945360, releaseYear: 2018, genre: ["Social Deduction", "Party"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core i3-2100", ram: 4, vram: 1 } },
  { id: "fallguys", name: "Fall Guys", steamAppId: 1097150, releaseYear: 2020, genre: ["Battle Royale", "Party"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7", ram: 16, vram: 4 } },
  { id: "rocketleague", name: "Rocket League", steamAppId: 252950, releaseYear: 2015, genre: ["Sports", "Racing"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 260", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770K", ram: 8, vram: 3 } },
  { id: "warthunder", name: "War Thunder", steamAppId: 236390, releaseYear: 2013, genre: ["Action", "Simulation"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4670K", ram: 16, vram: 4 } },
  { id: "worldoftanks", name: "World of Tanks", steamAppId: 0, coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.png", releaseYear: 2010, genre: ["Action", "MMO"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i5-3330", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-7400", ram: 8, vram: 4 } },
  { id: "worldofwarships", name: "World of Warships", steamAppId: 552990, releaseYear: 2017, genre: ["Action", "MMO"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i3-3210", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770K", ram: 8, vram: 4 } },
  { id: "mechwarrior5", name: "MechWarrior 5: Mercenaries", steamAppId: 784080, releaseYear: 2021, genre: ["Action", "Mech"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "thecrewmotorfest", name: "The Crew Motorfest", steamAppId: 1941640, releaseYear: 2024, genre: ["Racing", "Open World"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-4460", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060 Ti", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "forzahorizon5", name: "Forza Horizon 5", steamAppId: 1551360, releaseYear: 2021, genre: ["Racing", "Open World"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4460", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i7-10700K", ram: 16, vram: 10 } },
  { id: "assettocorsa", name: "Assetto Corsa Competizione", steamAppId: 805550, releaseYear: 2019, genre: ["Racing", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i5-4460", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "iracing", name: "iRacing", steamAppId: 266410, releaseYear: 2008, genre: ["Racing", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Quad Q6600", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "f1-24", name: "F1 24", steamAppId: 2488620, releaseYear: 2024, genre: ["Racing", "Sports"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-8600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "dirtRally2", name: "DiRT Rally 2.0", steamAppId: 690790, releaseYear: 2019, genre: ["Racing", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650 Ti", cpu: "AMD FX-4300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-6700K", ram: 16, vram: 8 } },
  { id: "needforspeedheat", name: "Need for Speed Heat", steamAppId: 0, coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vdl.png", releaseYear: 2019, genre: ["Racing", "Arcade"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-3570K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "needforspeedunbound", name: "Need for Speed Unbound", steamAppId: 1846380, releaseYear: 2022, genre: ["Racing", "Arcade"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "AMD Ryzen 5 2600", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "godofwar", name: "God of War (2018)", steamAppId: 1593500, releaseYear: 2022, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-2500K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-7700K", ram: 16, vram: 8 } },
  { id: "godofwarragnarok", name: "God of War Ragnarök", steamAppId: 2322010, releaseYear: 2024, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-4670K", ram: 8, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700K", ram: 16, vram: 12 } },
  { id: "horizonzerodawn", name: "Horizon Zero Dawn", steamAppId: 1151640, releaseYear: 2020, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 780", cpu: "Intel Core i5-2500K", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-4770K", ram: 16, vram: 6 } },
  { id: "horizonforbiddenwest", name: "Horizon Forbidden West", steamAppId: 2420110, releaseYear: 2024, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1650", cpu: "Intel Core i5-8600K", ram: 16, vram: 4 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-10700K", ram: 32, vram: 12 } },
  { id: "spidermanremastered", name: "Marvel's Spider-Man Remastered", steamAppId: 1817070, releaseYear: 2022, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 950", cpu: "Intel Core i3-4160", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i5-8400", ram: 16, vram: 8 } },
  { id: "spidermanmm", name: "Marvel's Spider-Man: Miles Morales", steamAppId: 1817190, releaseYear: 2022, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 950", cpu: "Intel Core i3-4160", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i5-11400", ram: 16, vram: 8 } },
  { id: "spiderman2", name: "Marvel's Spider-Man 2", steamAppId: 0, coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6bpg.png", releaseYear: 2025, genre: ["Action", "Adventure"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "RTX 2060", cpu: "Intel Core i5-9600K", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700K", ram: 32, vram: 12 } },
  { id: "ghostoftsushima", name: "Ghost of Tsushima: Director's Cut", steamAppId: 2215430, releaseYear: 2024, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-8600", ram: 16, vram: 4 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "thelastofus", name: "The Last of Us Part I", steamAppId: 1888930, releaseYear: 2023, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "AMD Ryzen 5 1500X", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "AMD Ryzen 7 5800X", ram: 32, vram: 10 } },
  { id: "daysgone", name: "Days Gone", steamAppId: 1259420, releaseYear: 2021, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 780", cpu: "Intel Core i5-2500K", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-4770K", ram: 16, vram: 6 } },
  { id: "unrealtourn", name: "Unrecord", steamAppId: 2188370, releaseYear: 2025, genre: ["FPS", "Action"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "RTX 2060", cpu: "Intel Core i5-10400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4080", cpu: "Intel Core i9-12900K", ram: 32, vram: 12 } },
  { id: "blackmythwukong", name: "Black Myth: Wukong", steamAppId: 2358720, releaseYear: 2024, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700K", ram: 32, vram: 12 } },
  { id: "indianajones", name: "Indiana Jones and the Great Circle", steamAppId: 2677660, releaseYear: 2024, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-10700K", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4080", cpu: "Intel Core i7-12900K", ram: 32, vram: 16 } },
  { id: "dragonsdogma2", name: "Dragon's Dogma 2", steamAppId: 2054970, releaseYear: 2024, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-10600K", ram: 16, vram: 8 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700K", ram: 32, vram: 12 } },
  { id: "kingdomcomedeliverance2", name: "Kingdom Come: Deliverance II", steamAppId: 1771300, releaseYear: 2025, genre: ["RPG", "Action"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-10700K", ram: 32, vram: 12 } },
  { id: "avowed", name: "Avowed", steamAppId: 2054910, releaseYear: 2025, genre: ["RPG", "Action"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700K", ram: 32, vram: 12 } },
  { id: "stalker2", name: "S.T.A.L.K.E.R. 2: Heart of Chornobyl", steamAppId: 1643320, releaseYear: 2024, genre: ["FPS", "Survival"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-7700K", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700K", ram: 32, vram: 12 } },
  { id: "metroexodus", name: "Metro Exodus", steamAppId: 412020, releaseYear: 2019, genre: ["FPS", "Survival"], supportedOS: ["windows", "linux"], minRequirements: { gpu: "GTX 670", cpu: "Intel Core i5-4440", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-4770K", ram: 16, vram: 8 } },
  { id: "farcry6", name: "Far Cry 6", steamAppId: 0, releaseYear: 2021, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "AMD Ryzen 3 1200", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "AMD Ryzen 5 5600X", ram: 16, vram: 8 } },
  { id: "assassinscreedmirage", name: "Assassin's Creed Mirage", steamAppId: 2551630, releaseYear: 2024, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 8, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070 Ti", cpu: "Intel Core i7-11700K", ram: 16, vram: 8 } },
  { id: "assassinscreedshadows", name: "Assassin's Creed Shadows", steamAppId: 3035510, releaseYear: 2025, genre: ["Action", "Adventure"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 4070", cpu: "Intel Core i7-12700K", ram: 32, vram: 12 } },
  { id: "dyinglight2", name: "Dying Light 2 Stay Human", steamAppId: 534380, releaseYear: 2022, genre: ["Action", "Survival"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i3-9100", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i7-9700K", ram: 16, vram: 10 } },
  { id: "biomutant", name: "Biomutant", steamAppId: 597820, releaseYear: 2021, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "outerworlds", name: "The Outer Worlds", steamAppId: 578650, releaseYear: 2019, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650 Ti", cpu: "Intel Core i3-3225", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-7700K", ram: 8, vram: 6 } },
  { id: "watchdogslegion", name: "Watch Dogs: Legion", steamAppId: 0, releaseYear: 2020, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4460", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i9-9900K", ram: 16, vram: 10 } },
  { id: "pathofexile", name: "Path of Exile", steamAppId: 238960, releaseYear: 2013, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650 Ti", cpu: "Intel Core i3-7100", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-7700", ram: 16, vram: 4 } },
  { id: "pathofexile2", name: "Path of Exile 2", steamAppId: 2694490, releaseYear: 2024, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1650", cpu: "Intel Core i5-8400", ram: 16, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060 Ti", cpu: "Intel Core i7-9700K", ram: 32, vram: 8 } },
  { id: "grimdawn", name: "Grim Dawn", steamAppId: 219990, releaseYear: 2016, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 460", cpu: "AMD Athlon 64 X2", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-3470", ram: 6, vram: 2 } },
  { id: "lastepoch", name: "Last Epoch", steamAppId: 899770, releaseYear: 2024, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2500", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-6500", ram: 16, vram: 8 } },
  { id: "torchlight2", name: "Torchlight II", steamAppId: 200710, releaseYear: 2012, genre: ["RPG", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2500", ram: 4, vram: 2 } },
  { id: "titanquest", name: "Titan Quest Anniversary Edition", steamAppId: 475150, releaseYear: 2016, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2500", ram: 4, vram: 2 } },
  { id: "divinity2", name: "Divinity: Original Sin 2", steamAppId: 435150, releaseYear: 2017, genre: ["RPG", "Strategy"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 550 Ti", cpu: "Intel Core i5-2400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 770", cpu: "Intel Core i7-4770K", ram: 8, vram: 2 } },
  { id: "pillarsofeternity2", name: "Pillars of Eternity II: Deadfire", steamAppId: 560130, releaseYear: 2018, genre: ["RPG", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4400", cpu: "Intel Core i3-2100", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 960", cpu: "Intel Core i7-7700K", ram: 8, vram: 4 } },
  { id: "tyranny", name: "Tyranny", steamAppId: 362960, releaseYear: 2016, genre: ["RPG"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2500K", ram: 8, vram: 2 } },
  { id: "disco", name: "Disco Elysium: The Final Cut", steamAppId: 632470, releaseYear: 2019, genre: ["RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 520", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8550U", ram: 8, vram: 4 } },
  { id: "wasteland3", name: "Wasteland 3", steamAppId: 719040, releaseYear: 2020, genre: ["RPG", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-3.0 GHz", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-3.5 GHz", ram: 16, vram: 4 } },
  { id: "xcom2", name: "XCOM 2", steamAppId: 268500, releaseYear: 2016, genre: ["Strategy", "Turn-Based"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core i3-3240", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-2500K", ram: 8, vram: 4 } },
  { id: "phoenixpoint", name: "Phoenix Point", steamAppId: 839770, releaseYear: 2020, genre: ["Strategy", "Turn-Based"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i3-530", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "battletech", name: "BATTLETECH", steamAppId: 637090, releaseYear: 2018, genre: ["Strategy", "Turn-Based"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 560 Ti", cpu: "Intel Core i3-4350", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "GTX 670", cpu: "Intel Core i5-4690K", ram: 16, vram: 2 } },
  { id: "intothebreach", name: "Into the Breach", steamAppId: 590380, releaseYear: 2018, genre: ["Strategy", "Roguelike"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core i3-2100", ram: 2, vram: 1 } },
  { id: "ftl", name: "FTL: Faster Than Light", steamAppId: 212680, releaseYear: 2012, genre: ["Strategy", "Roguelike"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core i3-2100", ram: 2, vram: 1 } },
  { id: "slayspire", name: "Slay the Spire", steamAppId: 646570, releaseYear: 2019, genre: ["Roguelike", "Card Game"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "slayspire2", name: "Slay the Spire 2", steamAppId: 2868840, releaseYear: 2025, genre: ["Roguelike", "Card Game"], supportedOS: ["windows", "macos"], hasBenchmark: false, minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700K", ram: 16, vram: 4 } },
  { id: "monster_train", name: "Monster Train", steamAppId: 1102190, releaseYear: 2020, genre: ["Roguelike", "Card Game"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 8, vram: 2 } },
  { id: "inscryption", name: "Inscryption", steamAppId: 1092790, releaseYear: 2021, genre: ["Roguelike", "Card Game"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2500", ram: 8, vram: 2 } },
  { id: "cult_of_lamb", name: "Cult of the Lamb", steamAppId: 1313140, releaseYear: 2022, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 } },
  { id: "vampire_survivors", name: "Vampire Survivors", steamAppId: 1794680, releaseYear: 2022, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Pentium 4", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "enter_gungeon", name: "Enter the Gungeon", steamAppId: 311690, releaseYear: 2016, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "risk_rain2", name: "Risk of Rain 2", steamAppId: 632360, releaseYear: 2020, genre: ["Roguelike", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 580", cpu: "Intel Core i5-4670K", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 680", cpu: "Intel Core i5-4670K", ram: 4, vram: 2 } },
  { id: "binding_isaac", name: "The Binding of Isaac: Rebirth", steamAppId: 250900, releaseYear: 2014, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "spelunky2", name: "Spelunky 2", steamAppId: 418530, releaseYear: 2020, genre: ["Roguelike", "Platformer"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750", cpu: "Intel Core i5-2500K", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770K", ram: 8, vram: 4 } },
  { id: "returnal", name: "Returnal", steamAppId: 1649240, releaseYear: 2023, genre: ["Roguelike", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-8700", ram: 32, vram: 8 } },
  { id: "noita", name: "Noita", steamAppId: 881100, releaseYear: 2020, genre: ["Roguelike", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770K", ram: 8, vram: 4 } },
  { id: "rottengrail", name: "Rogue Legacy 2", steamAppId: 1253920, releaseYear: 2022, genre: ["Roguelike", "Platformer"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 680", cpu: "Intel Core i5-6600", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8700", ram: 16, vram: 4 } },
  { id: "gunfire", name: "Gunfire Reborn", steamAppId: 1217060, releaseYear: 2021, genre: ["Roguelike", "FPS"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4590", ram: 8, vram: 4 } },
  { id: "deathloopg", name: "Deathloop", steamAppId: 1252330, releaseYear: 2021, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 12, vram: 5 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i9-10900K", ram: 16, vram: 10 } },
  { id: "prey", name: "Prey (2017)", steamAppId: 480490, releaseYear: 2017, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-2600K", ram: 16, vram: 4 } },
  { id: "dishonored2", name: "Dishonored 2", steamAppId: 403640, releaseYear: 2016, genre: ["Action", "Stealth"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770", ram: 16, vram: 4 } },
  { id: "hitman3", name: "Hitman 3", steamAppId: 1659040, releaseYear: 2021, genre: ["Action", "Stealth"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2500K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060 Super", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "mgsv", name: "Metal Gear Solid V: The Phantom Pain", steamAppId: 287700, releaseYear: 2015, genre: ["Action", "Stealth"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-4460", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 760", cpu: "Intel Core i7-4790", ram: 8, vram: 2 } },
  { id: "splintercell", name: "Tom Clancy's Splinter Cell: Blacklist", steamAppId: 235600, releaseYear: 2013, genre: ["Action", "Stealth"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 450", cpu: "Intel Core 2 Duo E6700", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2500", ram: 4, vram: 2 } },
  { id: "alienisolation", name: "Alien: Isolation", steamAppId: 214490, releaseYear: 2014, genre: ["Horror", "Stealth"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core 2 Duo E8500", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1050", cpu: "Intel Core i7-870", ram: 8, vram: 4 } },
  { id: "outerwilds", name: "Outer Wilds", steamAppId: 753640, releaseYear: 2020, genre: ["Adventure", "Exploration"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2300", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 8, vram: 4 } },
  { id: "controlg", name: "Control", steamAppId: 870780, releaseYear: 2019, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 780", cpu: "Intel Core i5-4690", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i5-9600K", ram: 16, vram: 6 } },
  { id: "quantumbreak", name: "Quantum Break", steamAppId: 474960, releaseYear: 2016, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-4460", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 980 Ti", cpu: "Intel Core i7-4790", ram: 16, vram: 6 } },
  { id: "psychonauts2", name: "Psychonauts 2", steamAppId: 607080, releaseYear: 2021, genre: ["Platformer", "Adventure"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 1050", cpu: "Intel Core i3-3225", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "itakestwog", name: "It Takes Two", steamAppId: 1426210, releaseYear: 2021, genre: ["Adventure", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i3-2100", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 980", cpu: "Intel Core i5-3570K", ram: 16, vram: 4 } },
  { id: "asackedboyg", name: "Sackboy: A Big Adventure", steamAppId: 1599660, releaseYear: 2022, genre: ["Platformer", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i3-2100", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i5-7300U", ram: 16, vram: 6 } },
  { id: "crashbandicoot4", name: "Crash Bandicoot 4: It's About Time", steamAppId: 1378610, releaseYear: 2021, genre: ["Platformer"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 780", cpu: "Intel Core i5-2500", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "GTX 1660", cpu: "Intel Core i7-4770", ram: 16, vram: 6 } },
  { id: "ratchetclank", name: "Ratchet & Clank: Rift Apart", steamAppId: 1895880, releaseYear: 2023, genre: ["Action", "Platformer"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4590", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i5-8600", ram: 16, vram: 8 } },
  { id: "spiritfarer", name: "Spiritfarer", steamAppId: 972660, releaseYear: 2020, genre: ["Simulation", "Adventure"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 5500", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 } },
  { id: "cozygrove", name: "Cozy Grove", steamAppId: 1458100, releaseYear: 2021, genre: ["Simulation", "Adventure"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 } },
  { id: "animalwell", name: "Animal Well", steamAppId: 813230, releaseYear: 2024, genre: ["Metroidvania", "Puzzle"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 } },
  { id: "tunic", name: "Tunic", steamAppId: 553420, releaseYear: 2022, genre: ["Action", "Adventure"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core i5-2300", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6500", ram: 8, vram: 4 } },
  { id: "cocoon", name: "Cocoon", steamAppId: 1497440, releaseYear: 2023, genre: ["Puzzle", "Adventure"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6500", ram: 16, vram: 4 } },
  { id: "dredge", name: "Dredge", steamAppId: 1562430, releaseYear: 2023, genre: ["Adventure", "Horror"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6500", ram: 16, vram: 4 } },
  { id: "davethedivers", name: "Dave the Diver", steamAppId: 1868140, releaseYear: 2023, genre: ["Adventure", "RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i3-6100", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 4 } },
  { id: "oxenfree2", name: "Oxenfree II: Lost Signals", steamAppId: 1574310, releaseYear: 2023, genre: ["Adventure", "Horror"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i3-3220", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "thealfheim", name: "Tchia", steamAppId: 1051050, releaseYear: 2023, genre: ["Adventure", "Open World"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700K", ram: 12, vram: 4 } },
  { id: "seaofstars", name: "Sea of Stars", steamAppId: 1244090, releaseYear: 2023, genre: ["RPG", "Turn-Based"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 4 } },
  { id: "chiralityg", name: "Chained Echoes", steamAppId: 1229240, releaseYear: 2022, genre: ["RPG", "Turn-Based"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 } },
  { id: "octopathtraveler2", name: "Octopath Traveler II", steamAppId: 1971650, releaseYear: 2023, genre: ["RPG", "Turn-Based"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750", cpu: "Intel Core i5-6400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-9400", ram: 16, vram: 4 } },
  { id: "trianglestrategy", name: "Triangle Strategy", steamAppId: 1850510, releaseYear: 2022, genre: ["Strategy", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-3330", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700", ram: 16, vram: 4 } },
  { id: "fireemblem3hopes", name: "Fire Emblem Warriors: Three Hopes", steamAppId: 0, releaseYear: 2022, genre: ["Action", "Strategy"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3570K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8700", ram: 16, vram: 4 } },
  { id: "nioh2", name: "Nioh 2", steamAppId: 1325200, releaseYear: 2021, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4460", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "codeveinn", name: "Code Vein", steamAppId: 678960, releaseYear: 2019, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-2300", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-7400", ram: 8, vram: 4 } },
  { id: "scarletnnexus", name: "Scarlet Nexus", steamAppId: 775500, releaseYear: 2021, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-3470", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-6600", ram: 8, vram: 4 } },
  { id: "talesofaarise", name: "Tales of Arise", steamAppId: 740130, releaseYear: 2021, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-2300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4590", ram: 16, vram: 4 } },
  { id: "nierreplicant", name: "NieR Replicant ver.1.22474487139...", steamAppId: 1113560, releaseYear: 2021, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-6400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1660", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "nierautomata", name: "NieR: Automata", steamAppId: 524220, releaseYear: 2017, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i3-2100", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 980", cpu: "Intel Core i5-4670", ram: 8, vram: 4 } },
  { id: "devilmaycry5", name: "Devil May Cry 5", steamAppId: 601150, releaseYear: 2019, genre: ["Action", "Hack and Slash"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-4460", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770", ram: 16, vram: 4 } },
  { id: "bayonetta3", name: "Bayonetta 3", steamAppId: 0, releaseYear: 2022, genre: ["Action", "Hack and Slash"], supportedOS: [], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3570K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8700", ram: 16, vram: 4 } },
  { id: "doom2016", name: "DOOM (2016)", steamAppId: 379720, releaseYear: 2016, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 670", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-3770", ram: 8, vram: 4 } },
  { id: "doomeeternal", name: "DOOM Eternal", steamAppId: 782330, releaseYear: 2020, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i9-9900K", ram: 16, vram: 10 } },
  { id: "wolfensteinneworder", name: "Wolfenstein: The New Order", steamAppId: 201810, releaseYear: 2014, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i5-2400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 770", cpu: "Intel Core i7-4770", ram: 8, vram: 4 } },
  { id: "wolfensteinnyoungblood", name: "Wolfenstein: Youngblood", steamAppId: 1056960, releaseYear: 2019, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-3570K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "borderlands3", name: "Borderlands 3", steamAppId: 397540, releaseYear: 2020, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 680", cpu: "Intel Core i5-3570", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770", ram: 16, vram: 4 } },
  { id: "tinytinaswonderlands", name: "Tiny Tina's Wonderlands", steamAppId: 1286680, releaseYear: 2022, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-3570", ram: 6, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "outriders", name: "Outriders", steamAppId: 680420, releaseYear: 2021, genre: ["Shooter", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-3470", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-7700K", ram: 16, vram: 8 } },
  { id: "backbore4", name: "Back 4 Blood", steamAppId: 924970, releaseYear: 2021, genre: ["FPS", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-6600K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i5-9600K", ram: 16, vram: 6 } },
  { id: "left4dead2", name: "Left 4 Dead 2", steamAppId: 550, releaseYear: 2009, genre: ["FPS", "Co-op"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Pentium 4", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 } },
  { id: "deeprock", name: "Deep Rock Galactic", steamAppId: 548430, releaseYear: 2020, genre: ["FPS", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "deeeprocksurvivors", name: "Deep Rock Galactic: Survivor", steamAppId: 2321470, releaseYear: 2024, genre: ["Roguelike", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "vermintide2", name: "Warhammer: Vermintide 2", steamAppId: 552500, releaseYear: 2018, genre: ["FPS", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i5-2300", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-4770K", ram: 8, vram: 4 } },
  { id: "darktide", name: "Warhammer 40,000: Darktide", steamAppId: 1361210, releaseYear: 2022, genre: ["FPS", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1660", cpu: "Intel Core i5-6600", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "payday3", name: "Payday 3", steamAppId: 1272080, releaseYear: 2023, genre: ["FPS", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "readyornot", name: "Ready or Not", steamAppId: 1144200, releaseYear: 2023, genre: ["FPS", "Tactical"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4430", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "AMD Ryzen 5 1600", ram: 8, vram: 6 } },
  { id: "groundbranch", name: "Ground Branch", steamAppId: 16900, releaseYear: 2018, genre: ["FPS", "Tactical"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 6, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-4770K", ram: 16, vram: 4 } },
  { id: "squadg", name: "Squad", steamAppId: 393380, releaseYear: 2020, genre: ["FPS", "Tactical"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-4430", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-6700K", ram: 16, vram: 8 } },
  { id: "arma3", name: "Arma 3", steamAppId: 107410, releaseYear: 2013, genre: ["FPS", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2300", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "armarreforger", name: "Arma Reforger", steamAppId: 1874880, releaseYear: 2022, genre: ["FPS", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-8600K", ram: 8, vram: 8 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "insurgencysandstorm", name: "Insurgency: Sandstorm", steamAppId: 581320, releaseYear: 2018, genre: ["FPS", "Tactical"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-4440", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 980", cpu: "Intel Core i7-8700", ram: 16, vram: 4 } },
  { id: "hellletloose", name: "Hell Let Loose", steamAppId: 686810, releaseYear: 2021, genre: ["FPS", "Tactical"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-6600K", ram: 12, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-9700K", ram: 16, vram: 6 } },
  { id: "postscriptum", name: "Post Scriptum", steamAppId: 736220, releaseYear: 2018, genre: ["FPS", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-4430", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-6700K", ram: 16, vram: 8 } },
  { id: "thenextworld", name: "The Finals", steamAppId: 2073850, releaseYear: 2023, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-6600", ram: 12, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i5-9600K", ram: 16, vram: 8 } },
  { id: "xdefiant", name: "XDefiant", steamAppId: 0, releaseYear: 2024, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "wutheringwaves", name: "Wuthering Waves", steamAppId: 0, releaseYear: 2024, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "genshinimpact", name: "Genshin Impact", steamAppId: 0, releaseYear: 2020, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1030", cpu: "Intel Core i5-6600K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "honkaistarrail", name: "Honkai: Star Rail", steamAppId: 0, releaseYear: 2023, genre: ["RPG", "Turn-Based"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "zenlesszonezero", name: "Zenless Zone Zero", steamAppId: 2329820, releaseYear: 2024, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "bluuearchive", name: "Blue Archive", steamAppId: 0, releaseYear: 2021, genre: ["RPG", "Strategy"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6500", ram: 8, vram: 4 } },
  { id: "arknights", name: "Arknights", steamAppId: 0, releaseYear: 2019, genre: ["Strategy", "Tower Defense"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6500", ram: 8, vram: 4 } },
  { id: "lostark", name: "Lost Ark", steamAppId: 1599340, releaseYear: 2022, genre: ["MMO", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i3-6300", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-7600K", ram: 16, vram: 4 } },
  { id: "newworld", name: "New World", steamAppId: 1063730, releaseYear: 2021, genre: ["MMO", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 670", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "guildwars2", name: "Guild Wars 2", steamAppId: 1284210, releaseYear: 2012, genre: ["MMO", "RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-4770K", ram: 8, vram: 4 } },
  { id: "elderscrollsonline", name: "The Elder Scrolls Online", steamAppId: 306130, releaseYear: 2014, genre: ["MMO", "RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i3-540", ram: 3, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-3570K", ram: 8, vram: 4 } },
  { id: "blackdesert", name: "Black Desert Online", steamAppId: 582660, releaseYear: 2017, genre: ["MMO", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-650", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-6700", ram: 16, vram: 8 } },
  { id: "wowclassic", name: "World of Warcraft", steamAppId: 0, releaseYear: 2004, genre: ["MMO", "RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-3450", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1080", cpu: "Intel Core i7-6700K", ram: 8, vram: 8 } },
  { id: "throneandliberty", name: "Throne and Liberty", steamAppId: 2429640, releaseYear: 2024, genre: ["MMO", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 32, vram: 8 } },
  { id: "toweroffantasy", name: "Tower of Fantasy", steamAppId: 2064650, releaseYear: 2022, genre: ["MMO", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-7400", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-9700K", ram: 16, vram: 6 } },
  { id: "warframe", name: "Warframe", steamAppId: 230410, releaseYear: 2013, genre: ["Action", "Shooter"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 580", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "kerbalspace2", name: "Kerbal Space Program 2", steamAppId: 954850, releaseYear: 2023, genre: ["Simulation", "Space"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-9400F", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i7-10700K", ram: 32, vram: 10 } },
  { id: "kerbalspace", name: "Kerbal Space Program", steamAppId: 220200, releaseYear: 2015, genre: ["Simulation", "Space"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4590", ram: 8, vram: 2 } },
  { id: "elitedangerous", name: "Elite Dangerous", steamAppId: 359320, releaseYear: 2015, genre: ["Simulation", "Space"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 470", cpu: "Intel Core i7-3770K", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "GTX 770", cpu: "Intel Core i7-4770K", ram: 8, vram: 2 } },
  { id: "starciitizen", name: "Star Citizen", steamAppId: 0, releaseYear: 2014, genre: ["Simulation", "Space"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-6700K", ram: 16, vram: 8 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i9-10900K", ram: 32, vram: 10 } },
  { id: "everspace2", name: "Everspace 2", steamAppId: 1128920, releaseYear: 2023, genre: ["Action", "Space"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 780", cpu: "Intel Core i5-4590", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770K", ram: 16, vram: 4 } },
  { id: "xrebirth", name: "X4: Foundations", steamAppId: 392160, releaseYear: 2018, genre: ["Simulation", "Space"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 780", cpu: "Intel Core i5-4590", ram: 8, vram: 3 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-6700K", ram: 16, vram: 8 } },
  { id: "flightsim2020", name: "Microsoft Flight Simulator", steamAppId: 1250410, releaseYear: 2020, genre: ["Simulation", "Flight"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "AMD Ryzen 3 1200", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 4090", cpu: "Intel Core i9-13900K", ram: 32, vram: 16 } },
  { id: "eurotrucksimu2", name: "Euro Truck Simulator 2", steamAppId: 227300, releaseYear: 2012, genre: ["Simulation", "Driving"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-3470", ram: 6, vram: 2 } },
  { id: "americantrucksimu", name: "American Truck Simulator", steamAppId: 270880, releaseYear: 2016, genre: ["Simulation", "Driving"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core 2 Duo", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "farmsimu22", name: "Farming Simulator 22", steamAppId: 1248130, releaseYear: 2021, genre: ["Simulation", "Farming"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3330", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8700K", ram: 8, vram: 4 } },
  { id: "snowrunner", name: "SnowRunner", steamAppId: 1465360, releaseYear: 2021, genre: ["Simulation", "Driving"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2500", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "beamng", name: "BeamNG.drive", steamAppId: 284160, releaseYear: 2015, genre: ["Simulation", "Driving"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 550 Ti", cpu: "Intel Core i5-2300", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700", ram: 16, vram: 6 } },
  { id: "carxdrift2", name: "CarX Drift Racing Online", steamAppId: 635260, releaseYear: 2017, genre: ["Racing", "Simulation"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 } },
  { id: "mysuummeercar", name: "My Summer Car", steamAppId: 516750, releaseYear: 2016, genre: ["Simulation", "Survival"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 } },
  { id: "thelong_dark", name: "The Long Dark", steamAppId: 305620, releaseYear: 2017, genre: ["Survival", "Adventure"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 } },
  { id: "thehunter", name: "theHunter: Call of the Wild", steamAppId: 518790, releaseYear: 2017, genre: ["Simulation", "Hunting"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3470", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-4770K", ram: 8, vram: 8 } },
  { id: "greenhelll", name: "Green Hell", steamAppId: 815370, releaseYear: 2019, genre: ["Survival", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4430", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "icarus", name: "Icarus", steamAppId: 1149460, releaseYear: 2021, genre: ["Survival", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3060 Ti", cpu: "Intel Core i7-9700K", ram: 32, vram: 8 } },
  { id: "enssemble", name: "Enshrouded", steamAppId: 1203620, releaseYear: 2024, genre: ["Survival", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 32, vram: 8 } },
  { id: "vrisingssurvival", name: "V Rising", steamAppId: 1604030, releaseYear: 2024, genre: ["Survival", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-6600K", ram: 12, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "corekeeper", name: "Core Keeper", steamAppId: 1621690, releaseYear: 2024, genre: ["Survival", "Mining"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 4600", cpu: "Intel Core i5-2400", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700", ram: 16, vram: 4 } },
  { id: "dont_starve_together", name: "Don't Starve Together", steamAppId: 322330, releaseYear: 2016, genre: ["Survival", "Adventure"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 } },
  { id: "grounded", name: "Grounded", steamAppId: 962130, releaseYear: 2022, genre: ["Survival", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3570K", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700K", ram: 8, vram: 4 } },
  { id: "stranded_deep", name: "Stranded Deep", steamAppId: 313120, releaseYear: 2023, genre: ["Survival", "Adventure"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-4770K", ram: 8, vram: 4 } },
  { id: "astroneer", name: "Astroneer", steamAppId: 361420, releaseYear: 2019, genre: ["Adventure", "Sandbox"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 550", cpu: "Intel Core i5-2400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  // Additional games
  { id: "deadisland2", name: "Dead Island 2", steamAppId: 934700, releaseYear: 2023, genre: ["Action", "Horror"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4790K", ram: 8, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i9-9900K", ram: 16, vram: 8 } },
  { id: "atomicheart", name: "Atomic Heart", steamAppId: 668580, releaseYear: 2023, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-2500", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-7700K", ram: 16, vram: 8 } },
  { id: "remnant2", name: "Remnant II", steamAppId: 1282100, releaseYear: 2023, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1650", cpu: "Intel Core i5-7600K", ram: 16, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "remnant", name: "Remnant: From the Ashes", steamAppId: 617290, releaseYear: 2019, genre: ["Action", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-4430", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770K", ram: 16, vram: 6 } },
  { id: "tekken8", name: "Tekken 8", steamAppId: 1778820, releaseYear: 2024, genre: ["Fighting", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i7-10700K", ram: 16, vram: 10 } },
  { id: "streetfighter6", name: "Street Fighter 6", steamAppId: 1364780, releaseYear: 2023, genre: ["Fighting", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-7500", ram: 8, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "mortalkombat1", name: "Mortal Kombat 1", steamAppId: 1971870, releaseYear: 2023, genre: ["Fighting", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "guiltygearbstrive", name: "Guilty Gear -Strive-", steamAppId: 1384160, releaseYear: 2021, genre: ["Fighting", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3450", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770", ram: 8, vram: 4 } },
  { id: "dragonballfighterz", name: "Dragon Ball FighterZ", steamAppId: 678950, releaseYear: 2018, genre: ["Fighting", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650 Ti", cpu: "Intel Core i5-3470", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-3770", ram: 8, vram: 4 } },
  { id: "multiversus", name: "MultiVersus", steamAppId: 1818750, releaseYear: 2024, genre: ["Fighting", "Platform"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "brawlhalla", name: "Brawlhalla", steamAppId: 291550, releaseYear: 2017, genre: ["Fighting", "Platform"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "dragonquest11", name: "Dragon Quest XI S", steamAppId: 1295510, releaseYear: 2020, genre: ["RPG", "JRPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-4570", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700", ram: 16, vram: 4 } },
  { id: "xenobladechron3", name: "Xenoblade Chronicles 3", steamAppId: 0, releaseYear: 2022, genre: ["RPG", "JRPG"], supportedOS: [], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3570K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8700", ram: 16, vram: 4 } },
  { id: "likeadragon8", name: "Like a Dragon: Infinite Wealth", steamAppId: 2072450, releaseYear: 2024, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-3470", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-8700", ram: 16, vram: 8 } },
  { id: "yakuza0", name: "Yakuza 0", steamAppId: 638970, releaseYear: 2018, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-3470", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-6700", ram: 8, vram: 4 } },
  { id: "yakuzakiwami", name: "Yakuza Kiwami", steamAppId: 834530, releaseYear: 2019, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-3470", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-6700", ram: 8, vram: 4 } },
  { id: "yakuzalike", name: "Yakuza: Like a Dragon", steamAppId: 1235140, releaseYear: 2020, genre: ["RPG", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-3470", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-6700", ram: 16, vram: 8 } },
  { id: "judgement", name: "Judgment", steamAppId: 2058190, releaseYear: 2022, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3470", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700", ram: 8, vram: 4 } },
  { id: "lostjudgement", name: "Lost Judgment", steamAppId: 2058190, releaseYear: 2022, genre: ["Action", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3470", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-6700", ram: 16, vram: 8 } },
  { id: "singularity", name: "Stellar Blade", steamAppId: 0, releaseYear: 2024, genre: ["Action", "Adventure"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "deathmustdie", name: "Death Must Die", steamAppId: 2334730, releaseYear: 2024, genre: ["Roguelike", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "brotato", name: "Brotato", steamAppId: 1942280, releaseYear: 2023, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "20minutestilldawn", name: "20 Minutes Till Dawn", steamAppId: 1966900, releaseYear: 2022, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "crabchampions", name: "Crab Champions", steamAppId: 774801, releaseYear: 2023, genre: ["Roguelike", "Shooter"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "shapesofblight", name: "Halls of Torment", steamAppId: 2218750, releaseYear: 2023, genre: ["Roguelike", "Action"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 4, vram: 2 } },
  { id: "wildermyth", name: "Wildermyth", steamAppId: 763890, releaseYear: 2021, genre: ["RPG", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 4, vram: 2 } },
  { id: "solasta", name: "Solasta: Crown of the Magister", steamAppId: 1096530, releaseYear: 2021, genre: ["RPG", "Strategy"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-3570K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700K", ram: 16, vram: 4 } },
  { id: "darkest", name: "Darkest Dungeon", steamAppId: 262060, releaseYear: 2016, genre: ["RPG", "Roguelike"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 4, vram: 2 } },
  { id: "darkest2", name: "Darkest Dungeon II", steamAppId: 1940340, releaseYear: 2023, genre: ["RPG", "Roguelike"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4590", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-8700", ram: 16, vram: 6 } },
  { id: "stoneshard", name: "Stoneshard", steamAppId: 625960, releaseYear: 2020, genre: ["RPG", "Roguelike"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 4, vram: 2 } },
  { id: "battlebrothers", name: "Battle Brothers", steamAppId: 365360, releaseYear: 2017, genre: ["Strategy", "RPG"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 4, vram: 2 } },
  { id: "wartales", name: "Wartales", steamAppId: 1527950, releaseYear: 2023, genre: ["Strategy", "RPG"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4460", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-6700K", ram: 16, vram: 4 } },
  { id: "spiritislander", name: "Spirit Island", steamAppId: 1236930, releaseYear: 2023, genre: ["Strategy", "Board Game"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 8, vram: 2 } },
  { id: "glaresmasters", name: "Gloomhaven", steamAppId: 780290, releaseYear: 2021, genre: ["Strategy", "RPG"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "warhammertotalwar3", name: "Total War: Warhammer III", steamAppId: 1142710, releaseYear: 2022, genre: ["Strategy", "RTS"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-4570", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "ageof4", name: "Age of Empires IV", steamAppId: 1466860, releaseYear: 2021, genre: ["Strategy", "RTS"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-6300U", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "ageof2de", name: "Age of Empires II: Definitive Edition", steamAppId: 813780, releaseYear: 2019, genre: ["Strategy", "RTS"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core i5-3470", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "company3", name: "Company of Heroes 3", steamAppId: 1677280, releaseYear: 2023, genre: ["Strategy", "RTS"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 950", cpu: "Intel Core i5-6600K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i9-9900K", ram: 16, vram: 8 } },
  { id: "homeworldd3", name: "Homeworld 3", steamAppId: 1840080, releaseYear: 2024, genre: ["Strategy", "RTS"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8600K", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "frostpunk2", name: "Frostpunk 2", steamAppId: 1601580, releaseYear: 2024, genre: ["Strategy", "City Builder"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 32, vram: 8 } },
  { id: "frostpunk", name: "Frostpunk", steamAppId: 323190, releaseYear: 2018, genre: ["Strategy", "City Builder"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2500K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-4790K", ram: 16, vram: 4 } },
  { id: "cityskylines2", name: "Cities: Skylines II", steamAppId: 949230, releaseYear: 2023, genre: ["Simulation", "City Builder"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-6700K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i7-12700K", ram: 16, vram: 10 } },
  { id: "cityskylines", name: "Cities: Skylines", steamAppId: 255710, releaseYear: 2015, genre: ["Simulation", "City Builder"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 260", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3470", ram: 6, vram: 2 } },
  { id: "timberborn", name: "Timberborn", steamAppId: 1062090, releaseYear: 2021, genre: ["Simulation", "City Builder"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-3330", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-9400F", ram: 16, vram: 4 } },
  { id: "foundationbuilder", name: "Foundation", steamAppId: 690830, releaseYear: 2019, genre: ["Simulation", "City Builder"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-3330", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "avorionbuilder", name: "Avorion", steamAppId: 445220, releaseYear: 2020, genre: ["Simulation", "Space"], supportedOS: ["windows", "linux"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2500", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i7-4790K", ram: 8, vram: 4 } },
  { id: "avorionn", name: "Empyrion - Galactic Survival", steamAppId: 383120, releaseYear: 2020, genre: ["Survival", "Space"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 680", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770K", ram: 16, vram: 4 } },
  { id: "shapezz", name: "shapez", steamAppId: 1318690, releaseYear: 2020, genre: ["Simulation", "Puzzle"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 8, vram: 2 } },
  { id: "mindustry", name: "Mindustry", steamAppId: 1127400, releaseYear: 2019, genre: ["Strategy", "Tower Defense"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "creeperworldd4", name: "Creeper World 4", steamAppId: 848480, releaseYear: 2020, genre: ["Strategy", "Tower Defense"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "bpm", name: "BPM: Bullets Per Minute", steamAppId: 1286350, releaseYear: 2020, genre: ["FPS", "Rhythm"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4590", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4770K", ram: 16, vram: 6 } },
  { id: "metalhelllsinger", name: "Metal: Hellsinger", steamAppId: 1061910, releaseYear: 2022, genre: ["FPS", "Rhythm"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4590", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "hifilerum", name: "Hi-Fi Rush", steamAppId: 1817230, releaseYear: 2023, genre: ["Action", "Rhythm"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-6400", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "crypto", name: "Crypt of the NecroDancer", steamAppId: 247080, releaseYear: 2015, genre: ["Roguelike", "Rhythm"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "beatssaber", name: "Beat Saber", steamAppId: 620980, releaseYear: 2019, genre: ["VR", "Rhythm"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4590", ram: 8, vram: 6 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "halflifealyx", name: "Half-Life: Alyx", steamAppId: 546560, releaseYear: 2020, genre: ["VR", "FPS"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-7500", ram: 12, vram: 6 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "boneworksvr", name: "BONEWORKS", steamAppId: 823500, releaseYear: 2019, genre: ["VR", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-7500", ram: 8, vram: 6 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "bonelab", name: "BONELAB", steamAppId: 1592190, releaseYear: 2022, genre: ["VR", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-7500", ram: 16, vram: 8 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-9700K", ram: 32, vram: 8 } },
  { id: "bladeandsorcery", name: "Blade & Sorcery", steamAppId: 629730, releaseYear: 2020, genre: ["VR", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-6600K", ram: 8, vram: 8 }, recommendedRequirements: { gpu: "RTX 2080", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "vorpx", name: "VRChat", steamAppId: 438100, releaseYear: 2017, genre: ["VR", "Social"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4590", ram: 4, vram: 4 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-8700K", ram: 8, vram: 8 } },
  { id: "asgardswrath2", name: "Asgard's Wrath 2", steamAppId: 0, releaseYear: 2023, genre: ["VR", "Action"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "GTX 1070", cpu: "Intel Core i5-8400", ram: 16, vram: 8 }, recommendedRequirements: { gpu: "RTX 3080", cpu: "Intel Core i7-10700K", ram: 32, vram: 10 } },
  { id: "pistolwhip", name: "Pistol Whip", steamAppId: 1079800, releaseYear: 2019, genre: ["VR", "Rhythm"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4590", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "superliminal", name: "Superliminal", steamAppId: 1049410, releaseYear: 2019, genre: ["Puzzle", "Adventure"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2300", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 } },
  { id: "thewitnessss", name: "The Witness", steamAppId: 210970, releaseYear: 2016, genre: ["Puzzle", "Adventure"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i3-2100", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 780", cpu: "Intel Core i7-4790K", ram: 8, vram: 3 } },
  { id: "talosssss", name: "The Talos Principle", steamAppId: 257510, releaseYear: 2014, genre: ["Puzzle", "Adventure"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 } },
  { id: "talosssss2", name: "The Talos Principle 2", steamAppId: 835960, releaseYear: 2023, genre: ["Puzzle", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 12, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "portal2", name: "Portal 2", steamAppId: 620, releaseYear: 2011, genre: ["Puzzle", "FPS"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 } },
  { id: "portal", name: "Portal", steamAppId: 400, releaseYear: 2007, genre: ["Puzzle", "FPS"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Pentium 4", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 } },
  { id: "halflife2", name: "Half-Life 2", steamAppId: 220, releaseYear: 2004, genre: ["FPS", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Pentium 4", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 } },
  { id: "garrysmod", name: "Garry's Mod", steamAppId: 4000, releaseYear: 2006, genre: ["Sandbox", "Physics"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Pentium 4", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i3-2100", ram: 4, vram: 2 } },
  { id: "stanleyparable", name: "The Stanley Parable: Ultra Deluxe", steamAppId: 1703340, releaseYear: 2022, genre: ["Adventure", "Walking Sim"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "whatremainsof", name: "What Remains of Edith Finch", steamAppId: 501300, releaseYear: 2017, genre: ["Adventure", "Walking Sim"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i3-2100", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4590", ram: 8, vram: 4 } },
  { id: "firewatch", name: "Firewatch", steamAppId: 383870, releaseYear: 2016, genre: ["Adventure", "Walking Sim"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 450", cpu: "Intel Core i3-2100", ram: 6, vram: 1 }, recommendedRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-760", ram: 8, vram: 2 } },
  { id: "kentuckyroute", name: "Kentucky Route Zero", steamAppId: 231200, releaseYear: 2020, genre: ["Adventure", "Walking Sim"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 } },
  { id: "mouthwashing", name: "Mouthwashing", steamAppId: 2475490, releaseYear: 2024, genre: ["Horror", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "amnesiabunker", name: "Amnesia: The Bunker", steamAppId: 1944430, releaseYear: 2023, genre: ["Horror", "Survival"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-8400", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-9700K", ram: 16, vram: 6 } },
  { id: "amnesiarebirthh", name: "Amnesia: Rebirth", steamAppId: 999220, releaseYear: 2020, genre: ["Horror", "Adventure"], supportedOS: ["windows", "linux"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-3330", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-7700K", ram: 16, vram: 6 } },
  { id: "somahorror", name: "SOMA", steamAppId: 282140, releaseYear: 2015, genre: ["Horror", "Adventure"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i3-530", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 780", cpu: "Intel Core i5-4690K", ram: 8, vram: 3 } },
  { id: "outlast", name: "Outlast", steamAppId: 238320, releaseYear: 2013, genre: ["Horror", "Survival"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 260", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 } },
  { id: "outlast2", name: "Outlast 2", steamAppId: 414700, releaseYear: 2017, genre: ["Horror", "Survival"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4430", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 980", cpu: "Intel Core i7-4790K", ram: 8, vram: 4 } },
  { id: "theoutlasttrials", name: "The Outlast Trials", steamAppId: 1304930, releaseYear: 2024, genre: ["Horror", "Co-op"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-8400", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "layersfear", name: "Layers of Fear (2023)", steamAppId: 1945500, releaseYear: 2023, genre: ["Horror", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-6400", ram: 12, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "madfathher", name: "Mad Father", steamAppId: 483980, releaseYear: 2016, genre: ["Horror", "Adventure"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Pentium 4", ram: 1, vram: 1 }, recommendedRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 } },
  { id: "signalis", name: "Signalis", steamAppId: 1262350, releaseYear: 2022, genre: ["Horror", "Survival"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 550 Ti", cpu: "Intel Core i3-2100", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4590", ram: 8, vram: 4 } },
  { id: "songsofsyx", name: "Songs of Syx", steamAppId: 1162750, releaseYear: 2021, genre: ["Strategy", "City Builder"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 8, vram: 2 } },
  { id: "dwarffortresss", name: "Dwarf Fortress", steamAppId: 975370, releaseYear: 2022, genre: ["Simulation", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 8, vram: 2 } },
  { id: "prisonarchitect2", name: "Prison Architect 2", steamAppId: 1971410, releaseYear: 2024, genre: ["Simulation", "Strategy"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4590", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "prisonarchitectt", name: "Prison Architect", steamAppId: 233450, releaseYear: 2015, genre: ["Simulation", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 8, vram: 1 } },
  { id: "oxygennotincluded", name: "Oxygen Not Included", steamAppId: 457140, releaseYear: 2019, genre: ["Simulation", "Survival"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4600", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 8, vram: 2 } },
  { id: "sheltered2", name: "Sheltered 2", steamAppId: 1289380, releaseYear: 2021, genre: ["Survival", "Strategy"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "thisswarofmine", name: "This War of Mine", steamAppId: 282070, releaseYear: 2014, genre: ["Survival", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 260", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 } },
  { id: "sonofsaints", name: "Songs of Conquest", steamAppId: 867210, releaseYear: 2024, genre: ["Strategy", "Turn-Based"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "heroes3", name: "Heroes of Might and Magic III HD", steamAppId: 297000, releaseYear: 2015, genre: ["Strategy", "Turn-Based"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Core 2 Duo", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 460", cpu: "Intel Core i3-2100", ram: 4, vram: 1 } },
  { id: "endlesslegend", name: "Endless Legend", steamAppId: 289130, releaseYear: 2014, genre: ["Strategy", "4X"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 } },
  { id: "stellarissss", name: "Stellaris", steamAppId: 281990, releaseYear: 2016, genre: ["Strategy", "4X"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i5-2300", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4670K", ram: 8, vram: 4 } },
  { id: "crusaderkings3", name: "Crusader Kings III", steamAppId: 1158310, releaseYear: 2020, genre: ["Strategy", "Grand Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4670K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1650", cpu: "Intel Core i7-8700K", ram: 16, vram: 4 } },
  { id: "europauni4", name: "Europa Universalis IV", steamAppId: 236850, releaseYear: 2013, genre: ["Strategy", "Grand Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690K", ram: 8, vram: 2 } },
  { id: "heartsofiron4", name: "Hearts of Iron IV", steamAppId: 394360, releaseYear: 2016, genre: ["Strategy", "Grand Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i5-750", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4670K", ram: 8, vram: 4 } },
  { id: "victoria3", name: "Victoria 3", steamAppId: 529340, releaseYear: 2022, genre: ["Strategy", "Grand Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4670K", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "civvi", name: "Civilization VI", steamAppId: 289070, releaseYear: 2016, genre: ["Strategy", "4X"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 460", cpu: "Intel Core i3-2100", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 } },
  { id: "humankind", name: "Humankind", steamAppId: 1124300, releaseYear: 2021, genre: ["Strategy", "4X"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "oldworld", name: "Old World", steamAppId: 597180, releaseYear: 2022, genre: ["Strategy", "4X"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-2400", ram: 8, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "millennia", name: "Millennia", steamAppId: 1268590, releaseYear: 2024, genre: ["Strategy", "4X"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-4590", ram: 8, vram: 6 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "arapahoe", name: "Against the Storm", steamAppId: 1336490, releaseYear: 2023, genre: ["Strategy", "City Builder"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "sifu", name: "Sifu", steamAppId: 2138710, releaseYear: 2022, genre: ["Action", "Fighting"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "ultrakill", name: "ULTRAKILL", steamAppId: 1229490, releaseYear: 2020, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "turbo_overkill", name: "Turbo Overkill", steamAppId: 1328350, releaseYear: 2023, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 760", cpu: "Intel Core i5-4430", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "dusk", name: "DUSK", steamAppId: 519860, releaseYear: 2018, genre: ["FPS", "Action"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 3000", cpu: "Intel Pentium 4", ram: 2, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i3-2100", ram: 4, vram: 1 } },
  { id: "midnightanarchy", name: "Amid Evil", steamAppId: 673130, releaseYear: 2019, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2400", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 } },
  { id: "projectwingman", name: "Project Wingman", steamAppId: 895870, releaseYear: 2020, genre: ["Action", "Flight"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "acecombat7", name: "Ace Combat 7: Skies Unknown", steamAppId: 502500, releaseYear: 2019, genre: ["Action", "Flight"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i5-4460", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i7-4790", ram: 16, vram: 4 } },
  { id: "straysss", name: "Stray", steamAppId: 1332010, releaseYear: 2022, genre: ["Adventure", "Puzzle"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 650 Ti", cpu: "Intel Core i5-2300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-8400", ram: 16, vram: 4 } },
  { id: "littlekitty", name: "Little Kitty, Big City", steamAppId: 1177980, releaseYear: 2024, genre: ["Adventure", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2400", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "unpacking", name: "Unpacking", steamAppId: 1135690, releaseYear: 2021, genre: ["Puzzle", "Simulation"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i3-2100", ram: 8, vram: 1 } },
  { id: "powerwash", name: "PowerWash Simulator", steamAppId: 1290000, releaseYear: 2022, genre: ["Simulation", "Casual"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-2300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "houseflipper", name: "House Flipper", steamAppId: 613100, releaseYear: 2018, genre: ["Simulation", "Casual"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 560", cpu: "Intel Core i3-530", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 } },
  { id: "houseflipper2", name: "House Flipper 2", steamAppId: 1190970, releaseYear: 2023, genre: ["Simulation", "Casual"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-9700K", ram: 16, vram: 6 } },
  { id: "pcbs2", name: "PC Building Simulator 2", steamAppId: 1943910, releaseYear: 2022, genre: ["Simulation", "Casual"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-6500", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "GTX 1660", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "thesims4", name: "The Sims 4", steamAppId: 1222670, releaseYear: 2014, genre: ["Simulation", "Life Sim"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4570", ram: 8, vram: 2 } },
  { id: "twopointcampus", name: "Two Point Campus", steamAppId: 1649080, releaseYear: 2022, genre: ["Simulation", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 750 Ti", cpu: "Intel Core i3-6100", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 4 } },
  { id: "twopointhosp", name: "Two Point Hospital", steamAppId: 535930, releaseYear: 2018, genre: ["Simulation", "Strategy"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core i3-3210", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4590", ram: 8, vram: 2 } },
  { id: "planetcoaster", name: "Planet Coaster", steamAppId: 493340, releaseYear: 2016, genre: ["Simulation", "Theme Park"], supportedOS: ["windows", "macos"], minRequirements: { gpu: "GTX 560 Ti", cpu: "Intel Core i5-2300", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 980", cpu: "Intel Core i7-4770K", ram: 12, vram: 4 } },
  { id: "planetzoo", name: "Planet Zoo", steamAppId: 703080, releaseYear: 2019, genre: ["Simulation", "Management"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-2500", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-4770K", ram: 16, vram: 8 } },
  { id: "jurassicworld", name: "Jurassic World Evolution 2", steamAppId: 1244460, releaseYear: 2021, genre: ["Simulation", "Management"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1050", cpu: "Intel Core i5-4690", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-5820K", ram: 16, vram: 8 } },
  { id: "megaaquarium", name: "Megaquarium", steamAppId: 600480, releaseYear: 2018, genre: ["Simulation", "Management"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core i3-2100", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4590", ram: 8, vram: 2 } },
  { id: "softwareinccc", name: "Software Inc", steamAppId: 362620, releaseYear: 2015, genre: ["Simulation", "Business"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 560", cpu: "Intel Core i5-4690", ram: 8, vram: 1 } },
  { id: "madgamestyc", name: "Mad Games Tycoon 2", steamAppId: 1342330, releaseYear: 2021, genre: ["Simulation", "Business"], supportedOS: ["windows"], minRequirements: { gpu: "Intel HD 4000", cpu: "Intel Core 2 Duo", ram: 4, vram: 1 }, recommendedRequirements: { gpu: "GTX 660", cpu: "Intel Core i5-4690", ram: 8, vram: 2 } },
  { id: "theaccidentalhunter", name: "Slime Rancher 2", steamAppId: 1657630, releaseYear: 2022, genre: ["Adventure", "Simulation"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-2500K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2070", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 } },
  { id: "slimerancher", name: "Slime Rancher", steamAppId: 433340, releaseYear: 2017, genre: ["Adventure", "Simulation"], supportedOS: ["windows", "macos", "linux"], minRequirements: { gpu: "GTX 650", cpu: "Intel Core i5-2500K", ram: 4, vram: 2 }, recommendedRequirements: { gpu: "GTX 960", cpu: "Intel Core i5-4690K", ram: 8, vram: 4 } },
  { id: "snipergw", name: "Sniper Elite 5", steamAppId: 1029690, releaseYear: 2022, genre: ["FPS", "Stealth"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 970", cpu: "Intel Core i5-4460", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 6 } },
  { id: "snipercontraccts", name: "Sniper Ghost Warrior Contracts 2", steamAppId: 1338770, releaseYear: 2021, genre: ["FPS", "Stealth"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 770", cpu: "Intel Core i5-4460", ram: 8, vram: 2 }, recommendedRequirements: { gpu: "GTX 1070", cpu: "Intel Core i7-7700K", ram: 16, vram: 8 } },
  { id: "marvelrivals", name: "Marvel Rivals", steamAppId: 2767030, releaseYear: 2024, genre: ["FPS", "Action"], supportedOS: ["windows"], minRequirements: { gpu: "GTX 1060", cpu: "Intel Core i5-6600K", ram: 16, vram: 6 }, recommendedRequirements: { gpu: "RTX 3070", cpu: "Intel Core i7-10700K", ram: 16, vram: 8 } },
  { id: "deltaforcehawk", name: "Delta Force", steamAppId: 2519590, releaseYear: 2024, genre: ["FPS", "Tactical"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "GTX 1050 Ti", cpu: "Intel Core i5-6600K", ram: 8, vram: 4 }, recommendedRequirements: { gpu: "RTX 3060", cpu: "Intel Core i7-9700K", ram: 16, vram: 8 } },
  { id: "gtavi", name: "Grand Theft Auto VI", steamAppId: 0, releaseYear: 2025, genre: ["Action", "Adventure"], supportedOS: ["windows"], hasBenchmark: false, minRequirements: { gpu: "RTX 2060", cpu: "Intel Core i7-8700K", ram: 16, vram: 8 }, recommendedRequirements: { gpu: "RTX 4080", cpu: "Intel Core i9-12900K", ram: 32, vram: 16 } }
];

// Generate benchmark data based on specs
export interface PerformanceResult {
  avgFps: number;
  lowFps: number;
  highFps: number;
  gpuUsage: number;
  cpuUsage: number;
  ramUsage: number;
  quality: 'Low' | 'Medium' | 'High' | 'Ultra' | 'Unplayable';
  benchmarkVideoId: string;
}

export const resolutionOptions = [
  { value: '1080p', label: '1080p (1920x1080)', multiplier: 1 },
  { value: '1440p', label: '1440p (2560x1440)', multiplier: 0.65 },
  { value: '4k', label: '4K (3840x2160)', multiplier: 0.4 }
] as const;

// NVIDIA GPU options
export const nvidiaGpuOptions = [
  // NVIDIA RTX 50 Series
  { name: "RTX 5090", tier: 10, vramOptions: [32] },
  { name: "RTX 5080", tier: 9.7, vramOptions: [16] },
  { name: "RTX 5070 Ti", tier: 9.3, vramOptions: [16] },
  { name: "RTX 5070", tier: 9, vramOptions: [12] },
  // NVIDIA RTX 40 Series
  { name: "RTX 4090", tier: 9.5, vramOptions: [24] },
  { name: "RTX 4080 Super", tier: 9.2, vramOptions: [16] },
  { name: "RTX 4080", tier: 9, vramOptions: [16] },
  { name: "RTX 4070 Ti Super", tier: 8.7, vramOptions: [16] },
  { name: "RTX 4070 Ti", tier: 8.5, vramOptions: [12] },
  { name: "RTX 4070 Super", tier: 8.3, vramOptions: [12] },
  { name: "RTX 4070", tier: 8, vramOptions: [12] },
  { name: "RTX 4060 Ti", tier: 7.5, vramOptions: [8, 16] },
  { name: "RTX 4060", tier: 7.2, vramOptions: [8] },
  // NVIDIA RTX 30 Series
  { name: "RTX 3090 Ti", tier: 8.8, vramOptions: [24] },
  { name: "RTX 3090", tier: 8.5, vramOptions: [24] },
  { name: "RTX 3080 Ti", tier: 8.3, vramOptions: [12] },
  { name: "RTX 3080", tier: 8, vramOptions: [10, 12] },
  { name: "RTX 3070 Ti", tier: 7.5, vramOptions: [8] },
  { name: "RTX 3070", tier: 7.2, vramOptions: [8] },
  { name: "RTX 3060 Ti", tier: 6.8, vramOptions: [8] },
  { name: "RTX 3060", tier: 6.5, vramOptions: [8, 12] },
  { name: "RTX 3050", tier: 5.5, vramOptions: [8] },
  // NVIDIA RTX 20 Series
  { name: "RTX 2080 Ti", tier: 7.8, vramOptions: [11] },
  { name: "RTX 2080 Super", tier: 7.3, vramOptions: [8] },
  { name: "RTX 2080", tier: 7, vramOptions: [8] },
  { name: "RTX 2070 Super", tier: 6.8, vramOptions: [8] },
  { name: "RTX 2070", tier: 6.5, vramOptions: [8] },
  { name: "RTX 2060 Super", tier: 6.2, vramOptions: [8] },
  { name: "RTX 2060", tier: 6, vramOptions: [6, 12] },
  // NVIDIA GTX 10 Series
  { name: "GTX 1080 Ti", tier: 6.8, vramOptions: [11] },
  { name: "GTX 1080", tier: 6, vramOptions: [8] },
  { name: "GTX 1070 Ti", tier: 5.5, vramOptions: [8] },
  { name: "GTX 1070", tier: 5.2, vramOptions: [8] },
  { name: "GTX 1660 Ti", tier: 5, vramOptions: [6] },
  { name: "GTX 1660 Super", tier: 4.8, vramOptions: [6] },
  { name: "GTX 1660", tier: 4.5, vramOptions: [6] },
  { name: "GTX 1650 Super", tier: 4.2, vramOptions: [4] },
  { name: "GTX 1650", tier: 4, vramOptions: [4] },
  { name: "GTX 1060", tier: 4.2, vramOptions: [3, 6] },
  { name: "GTX 1050 Ti", tier: 3.5, vramOptions: [4] },
  { name: "GTX 1050", tier: 3.2, vramOptions: [2] },
  // NVIDIA GTX 9 Series
  { name: "GTX 980 Ti", tier: 4.8, vramOptions: [6] },
  { name: "GTX 980", tier: 4, vramOptions: [4] },
  { name: "GTX 970", tier: 3.8, vramOptions: [4] },
  { name: "GTX 960", tier: 3, vramOptions: [2, 4] },
  { name: "GTX 950", tier: 2.8, vramOptions: [2] },
];

// AMD GPU options
export const amdGpuOptions = [
  // AMD RX 9000 Series
  { name: "RX 9070 XT", tier: 9.3, vramOptions: [16] },
  { name: "RX 9070", tier: 8.8, vramOptions: [16] },
  // AMD RX 7000 Series
  { name: "RX 7900 XTX", tier: 9.2, vramOptions: [24] },
  { name: "RX 7900 XT", tier: 8.7, vramOptions: [20] },
  { name: "RX 7900 GRE", tier: 8.2, vramOptions: [16] },
  { name: "RX 7800 XT", tier: 7.7, vramOptions: [16] },
  { name: "RX 7700 XT", tier: 7.2, vramOptions: [12] },
  { name: "RX 7600 XT", tier: 6.5, vramOptions: [16] },
  { name: "RX 7600", tier: 6.2, vramOptions: [8] },
  // AMD RX 6000 Series
  { name: "RX 6950 XT", tier: 8.5, vramOptions: [16] },
  { name: "RX 6900 XT", tier: 8.3, vramOptions: [16] },
  { name: "RX 6800 XT", tier: 8, vramOptions: [16] },
  { name: "RX 6800", tier: 7.5, vramOptions: [16] },
  { name: "RX 6750 XT", tier: 7, vramOptions: [12] },
  { name: "RX 6700 XT", tier: 6.7, vramOptions: [12] },
  { name: "RX 6650 XT", tier: 6, vramOptions: [8] },
  { name: "RX 6600 XT", tier: 5.7, vramOptions: [8] },
  { name: "RX 6600", tier: 5.2, vramOptions: [8] },
  { name: "RX 6500 XT", tier: 3.8, vramOptions: [4] },
  // AMD RX 5000 Series
  { name: "RX 5700 XT", tier: 6.2, vramOptions: [8] },
  { name: "RX 5700", tier: 5.8, vramOptions: [8] },
  { name: "RX 5600 XT", tier: 5.2, vramOptions: [6] },
  { name: "RX 580", tier: 4.2, vramOptions: [4, 8] },
  { name: "RX 570", tier: 3.8, vramOptions: [4, 8] },
];

// Intel GPU options
export const intelGpuOptions = [
  { name: "Intel Arc B580", tier: 6.5, vramOptions: [12] },
  { name: "Intel Arc A770", tier: 6.5, vramOptions: [16] },
  { name: "Intel Arc A750", tier: 6, vramOptions: [8] },
  { name: "Intel Arc A580", tier: 5.2, vramOptions: [8] },
  { name: "Intel Arc A380", tier: 3.2, vramOptions: [6] },
];

// Combined for backward compatibility
export const gpuOptions = [...nvidiaGpuOptions, ...amdGpuOptions, ...intelGpuOptions];

export const intelCpuOptions = [
  // Intel Core Ultra 200 Series
  { name: "Intel Core Ultra 9 285K", tier: 10 },
  { name: "Intel Core Ultra 7 265K", tier: 9.7 },
  { name: "Intel Core Ultra 5 245K", tier: 9.3 },
  // Intel 14th Gen
  { name: "Intel Core i9-14900K", tier: 9.5 },
  { name: "Intel Core i9-14900KF", tier: 9.5 },
  { name: "Intel Core i7-14700K", tier: 9.2 },
  { name: "Intel Core i7-14700KF", tier: 9.2 },
  { name: "Intel Core i5-14600K", tier: 8.8 },
  { name: "Intel Core i5-14600KF", tier: 8.8 },
  // Intel 13th Gen
  { name: "Intel Core i9-13900K", tier: 9.3 },
  { name: "Intel Core i9-13900KF", tier: 9.3 },
  { name: "Intel Core i7-13700K", tier: 8.8 },
  { name: "Intel Core i7-13700KF", tier: 8.8 },
  { name: "Intel Core i5-13600K", tier: 8.5 },
  { name: "Intel Core i5-13600KF", tier: 8.5 },
  // Intel 12th Gen
  { name: "Intel Core i9-12900K", tier: 8.8 },
  { name: "Intel Core i7-12700K", tier: 8.3 },
  { name: "Intel Core i5-12600K", tier: 8 },
  // Intel 11th Gen
  { name: "Intel Core i9-11900K", tier: 7.8 },
  { name: "Intel Core i7-11700K", tier: 7.5 },
  { name: "Intel Core i5-11600K", tier: 7.2 },
  // Intel 10th Gen
  { name: "Intel Core i9-10900K", tier: 7.5 },
  { name: "Intel Core i7-10700K", tier: 7.2 },
  { name: "Intel Core i5-10600K", tier: 6.8 },
  // Older Gen
  { name: "Intel Core i7-9700K", tier: 6.5 },
  { name: "Intel Core i5-9600K", tier: 6.2 },
  { name: "Intel Core i7-8700K", tier: 6.2 },
  { name: "Intel Core i5-8600K", tier: 5.8 },
  { name: "Intel Core i5-8400", tier: 5.2 },
  { name: "Intel Core i7-7700K", tier: 5.5 },
  { name: "Intel Core i5-7600K", tier: 5 },
  { name: "Intel Core i7-6700K", tier: 5.2 },
  { name: "Intel Core i5-6600K", tier: 4.8 },
  { name: "Intel Core i7-4790K", tier: 4.8 },
  { name: "Intel Core i5-4690K", tier: 4.3 },
  { name: "Intel Core i5-3570K", tier: 3.8 },
  { name: "Intel Core i5-2500K", tier: 3.5 },
  { name: "Intel Core i3-14100", tier: 6.2 },
  { name: "Intel Core i3-13100", tier: 6 },
  { name: "Intel Core i3-12100", tier: 5.8 },
  { name: "Intel Core i3-10100", tier: 4.8 }
];

export const amdCpuOptions = [
  // AMD Ryzen 9000 Series
  { name: "AMD Ryzen 9 9950X", tier: 10 },
  { name: "AMD Ryzen 9 9900X", tier: 9.7 },
  { name: "AMD Ryzen 7 9800X3D", tier: 10 },
  { name: "AMD Ryzen 7 9700X", tier: 9.3 },
  { name: "AMD Ryzen 5 9600X", tier: 8.8 },
  // AMD Ryzen 7000 Series
  { name: "AMD Ryzen 9 7950X3D", tier: 9.7 },
  { name: "AMD Ryzen 9 7950X", tier: 9.5 },
  { name: "AMD Ryzen 9 7900X3D", tier: 9.4 },
  { name: "AMD Ryzen 9 7900X", tier: 9.2 },
  { name: "AMD Ryzen 7 7800X3D", tier: 9.5 },
  { name: "AMD Ryzen 7 7700X", tier: 8.8 },
  { name: "AMD Ryzen 7 7700", tier: 8.5 },
  { name: "AMD Ryzen 5 7600X", tier: 8.3 },
  { name: "AMD Ryzen 5 7600", tier: 8 },
  // AMD Ryzen 5000 Series
  { name: "AMD Ryzen 9 5950X", tier: 8.8 },
  { name: "AMD Ryzen 9 5900X", tier: 8.5 },
  { name: "AMD Ryzen 7 5800X3D", tier: 8.8 },
  { name: "AMD Ryzen 7 5800X", tier: 8.2 },
  { name: "AMD Ryzen 7 5700X", tier: 7.8 },
  { name: "AMD Ryzen 5 5600X", tier: 7.8 },
  { name: "AMD Ryzen 5 5600", tier: 7.5 },
  // AMD Ryzen 3000 Series
  { name: "AMD Ryzen 9 3950X", tier: 8 },
  { name: "AMD Ryzen 9 3900X", tier: 7.8 },
  { name: "AMD Ryzen 7 3800X", tier: 7.2 },
  { name: "AMD Ryzen 7 3700X", tier: 7 },
  { name: "AMD Ryzen 5 3600X", tier: 6.7 },
  { name: "AMD Ryzen 5 3600", tier: 6.5 },
  { name: "AMD Ryzen 3 3300X", tier: 5.3 },
  { name: "AMD Ryzen 3 3100", tier: 4.8 },
  // AMD Ryzen 2000 Series
  { name: "AMD Ryzen 7 2700X", tier: 6.2 },
  { name: "AMD Ryzen 5 2600X", tier: 5.8 },
  { name: "AMD Ryzen 5 2600", tier: 5.5 },
  { name: "AMD Ryzen 5 1600", tier: 4.8 }
];

export const appleCpuOptions = [
  // Apple M4 Series
  { name: "Apple M4 Ultra", tier: 10, gpu: "M4 Ultra GPU", gpuTier: 9.2, vram: 128 },
  { name: "Apple M4 Max", tier: 9.5, gpu: "M4 Max GPU", gpuTier: 8.5, vram: 64 },
  { name: "Apple M4 Pro", tier: 9.0, gpu: "M4 Pro GPU", gpuTier: 7.5, vram: 24 },
  { name: "Apple M4", tier: 8.2, gpu: "M4 GPU", gpuTier: 6.0, vram: 16 },
  // Apple M3 Series
  { name: "Apple M3 Ultra", tier: 9.5, gpu: "M3 Ultra GPU", gpuTier: 8.8, vram: 128 },
  { name: "Apple M3 Max", tier: 9.0, gpu: "M3 Max GPU", gpuTier: 8.0, vram: 48 },
  { name: "Apple M3 Pro", tier: 8.5, gpu: "M3 Pro GPU", gpuTier: 7.0, vram: 18 },
  { name: "Apple M3", tier: 7.8, gpu: "M3 GPU", gpuTier: 5.5, vram: 8 },
  // Apple M2 Series
  { name: "Apple M2 Ultra", tier: 9.0, gpu: "M2 Ultra GPU", gpuTier: 8.2, vram: 76 },
  { name: "Apple M2 Max", tier: 8.5, gpu: "M2 Max GPU", gpuTier: 7.5, vram: 38 },
  { name: "Apple M2 Pro", tier: 8.0, gpu: "M2 Pro GPU", gpuTier: 6.5, vram: 16 },
  { name: "Apple M2", tier: 7.2, gpu: "M2 GPU", gpuTier: 5.0, vram: 8 },
  // Apple M1 Series
  { name: "Apple M1 Ultra", tier: 8.5, gpu: "M1 Ultra GPU", gpuTier: 7.8, vram: 64 },
  { name: "Apple M1 Max", tier: 8.0, gpu: "M1 Max GPU", gpuTier: 7.0, vram: 32 },
  { name: "Apple M1 Pro", tier: 7.5, gpu: "M1 Pro GPU", gpuTier: 6.0, vram: 16 },
  { name: "Apple M1", tier: 6.8, gpu: "M1 GPU", gpuTier: 4.5, vram: 8 },
  // Intel Macs
  { name: "Intel Core i9 (Mac)", tier: 7.0, gpu: "AMD Radeon Pro 5600M", gpuTier: 5.5, vram: 8 },
  { name: "Intel Core i7 (Mac)", tier: 6.2, gpu: "AMD Radeon Pro 5500M", gpuTier: 4.8, vram: 8 },
  { name: "Intel Core i5 (Mac)", tier: 5.5, gpu: "Intel Iris Plus", gpuTier: 2.5, vram: 4 }
];

// Combined for backward compatibility
export const cpuOptions = [...intelCpuOptions, ...amdCpuOptions, ...appleCpuOptions];

export const ramOptions = [4, 8, 12, 16, 24, 32, 48, 64, 128];

export const osOptions = [
  { value: 'windows', label: 'Windows' },
  { value: 'macos', label: 'macOS' },
  { value: 'linux', label: 'Linux' }
] as const;

export type QualityPreset = 'low' | 'medium' | 'high' | 'ultra';

export const qualityOptions: { value: QualityPreset; label: string; multiplier: number }[] = [
  { value: 'low', label: 'Low', multiplier: 1.8 },
  { value: 'medium', label: 'Medium', multiplier: 1.3 },
  { value: 'high', label: 'High', multiplier: 1.0 },
  { value: 'ultra', label: 'Ultra', multiplier: 0.7 }
];

export function calculatePerformance(
  game: Game,
  gpuTier: number,
  cpuTier: number,
  ram: number,
  vram: number,
  resolution: '1080p' | '1440p' | '4k' = '1080p',
  qualityPreset: QualityPreset = 'high'
): PerformanceResult {
  // Get resolution multiplier
  const resMultiplier = resolutionOptions.find(r => r.value === resolution)?.multiplier ?? 1;
  
  // Get quality multiplier
  const qualityMultiplier = qualityOptions.find(q => q.value === qualityPreset)?.multiplier ?? 1;
  
  // Base performance calculation
  const minGpuTier = 3; // Approximate tier for min requirements
  const recGpuTier = 7; // Approximate tier for recommended requirements
  
  // Calculate performance score (0-100)
  let performanceScore = 0;
  
  // GPU contribution (50%)
  const gpuScore = Math.min(100, (gpuTier / 10) * 100);
  performanceScore += gpuScore * 0.5;
  
  // CPU contribution (30%)
  const cpuScore = Math.min(100, (cpuTier / 10) * 100);
  performanceScore += cpuScore * 0.3;
  
  // RAM contribution (15%)
  const ramScore = Math.min(100, (ram / game.recommendedRequirements.ram) * 100);
  performanceScore += ramScore * 0.15;
  
  // VRAM contribution (5%)
  const vramScore = Math.min(100, (vram / game.recommendedRequirements.vram) * 100);
  performanceScore += vramScore * 0.05;
  
  // Calculate FPS based on game requirements and performance score, adjusted for resolution and quality
  const baseFps = 30;
  const maxFps = 240;
  const rawAvgFps = baseFps + (performanceScore / 100) * (maxFps - baseFps);
  const avgFps = Math.round(rawAvgFps * resMultiplier * qualityMultiplier);
  
  // Low FPS (1% lows)
  const lowFps = Math.round(avgFps * 0.6);
  
  // High FPS
  const highFps = Math.round(avgFps * 1.3);
  
  // GPU Usage (higher usage at higher settings)
  const gpuUsage = Math.min(99, Math.round(70 + (performanceScore / 100) * 25));
  
  // CPU Usage
  const cpuUsage = Math.min(85, Math.round(40 + (cpuTier / 10) * 35));
  
  // RAM Usage
  const ramUsage = Math.min(ram * 1024, Math.round(game.recommendedRequirements.ram * 0.8 * 1024));
  
  // Determine quality setting
  let quality: PerformanceResult['quality'];
  if (avgFps < 25) quality = 'Unplayable';
  else if (avgFps < 45) quality = 'Low';
  else if (avgFps < 75) quality = 'Medium';
  else if (avgFps < 120) quality = 'High';
  else quality = 'Ultra';
  
  // Generate a pseudo benchmark video ID (in real app, would be actual video)
  const benchmarkVideoId = `benchmark_${game.id}_${Math.round(gpuTier)}`;
  
  return {
    avgFps,
    lowFps,
    highFps,
    gpuUsage,
    cpuUsage,
    ramUsage,
    quality,
    benchmarkVideoId
  };
}
