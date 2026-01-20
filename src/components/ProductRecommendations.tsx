import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, DollarSign, Cpu, HardDrive, Monitor, Zap, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number; // Rate to USD
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.79 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', exchangeRate: 1.36 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', exchangeRate: 1.53 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', exchangeRate: 149 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', exchangeRate: 83 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', exchangeRate: 4.97 },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', exchangeRate: 17.15 },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', exchangeRate: 1320 },
];

interface ProductRecommendation {
  id: string;
  name: string;
  category: 'gpu' | 'cpu' | 'ram' | 'storage' | 'psu' | 'monitor';
  priceUSD: number;
  amazonTag: string;
  tier: 'budget' | 'mid' | 'high' | 'enthusiast';
  description: string;
  specs: string;
}

const productDatabase: ProductRecommendation[] = [
  // GPUs
  { id: 'gpu-budget-1', name: 'NVIDIA GeForce GTX 1650', category: 'gpu', priceUSD: 150, amazonTag: 'B07QF1Y79P', tier: 'budget', description: 'Great entry-level GPU for 1080p gaming', specs: '4GB GDDR6, 896 CUDA Cores' },
  { id: 'gpu-budget-2', name: 'AMD Radeon RX 6500 XT', category: 'gpu', priceUSD: 140, amazonTag: 'B09RGX1P5H', tier: 'budget', description: 'Affordable AMD option for esports titles', specs: '4GB GDDR6, 1024 Stream Processors' },
  { id: 'gpu-mid-1', name: 'NVIDIA GeForce RTX 4060', category: 'gpu', priceUSD: 300, amazonTag: 'B0C7NMLXQF', tier: 'mid', description: 'Excellent 1080p performance with DLSS 3', specs: '8GB GDDR6, 3072 CUDA Cores' },
  { id: 'gpu-mid-2', name: 'AMD Radeon RX 7600', category: 'gpu', priceUSD: 270, amazonTag: 'B0C7XVBMS9', tier: 'mid', description: 'Strong 1080p gaming with great value', specs: '8GB GDDR6, 2048 Stream Processors' },
  { id: 'gpu-high-1', name: 'NVIDIA GeForce RTX 4070 Super', category: 'gpu', priceUSD: 600, amazonTag: 'B0CS6XF5YL', tier: 'high', description: 'Premium 1440p gaming experience', specs: '12GB GDDR6X, 7168 CUDA Cores' },
  { id: 'gpu-high-2', name: 'AMD Radeon RX 7800 XT', category: 'gpu', priceUSD: 500, amazonTag: 'B0CGJNLFF3', tier: 'high', description: 'Exceptional 1440p AMD performance', specs: '16GB GDDR6, 3840 Stream Processors' },
  { id: 'gpu-enthusiast-1', name: 'NVIDIA GeForce RTX 4080 Super', category: 'gpu', priceUSD: 1000, amazonTag: 'B0CS5WF5HS', tier: 'enthusiast', description: 'Top-tier 4K gaming powerhouse', specs: '16GB GDDR6X, 10240 CUDA Cores' },
  { id: 'gpu-enthusiast-2', name: 'NVIDIA GeForce RTX 4090', category: 'gpu', priceUSD: 1600, amazonTag: 'B0BJFKJXDQ', tier: 'enthusiast', description: 'Ultimate gaming & content creation', specs: '24GB GDDR6X, 16384 CUDA Cores' },

  // CPUs
  { id: 'cpu-budget-1', name: 'Intel Core i3-12100F', category: 'cpu', priceUSD: 90, amazonTag: 'B09NPJX7PV', tier: 'budget', description: 'Great budget gaming CPU', specs: '4 Cores, 8 Threads, 4.3GHz Boost' },
  { id: 'cpu-budget-2', name: 'AMD Ryzen 5 5500', category: 'cpu', priceUSD: 100, amazonTag: 'B09VCJ171S', tier: 'budget', description: 'Excellent value 6-core processor', specs: '6 Cores, 12 Threads, 4.2GHz Boost' },
  { id: 'cpu-mid-1', name: 'Intel Core i5-13400F', category: 'cpu', priceUSD: 200, amazonTag: 'B0BT1G4XTD', tier: 'mid', description: 'Best mid-range gaming CPU', specs: '10 Cores, 16 Threads, 4.6GHz Boost' },
  { id: 'cpu-mid-2', name: 'AMD Ryzen 5 7600', category: 'cpu', priceUSD: 220, amazonTag: 'B0BM4S8BTL', tier: 'mid', description: 'Powerful Zen 4 gaming performance', specs: '6 Cores, 12 Threads, 5.1GHz Boost' },
  { id: 'cpu-high-1', name: 'Intel Core i7-14700K', category: 'cpu', priceUSD: 400, amazonTag: 'B0CGJ4MLC7', tier: 'high', description: 'High-end gaming & multitasking', specs: '20 Cores, 28 Threads, 5.6GHz Boost' },
  { id: 'cpu-high-2', name: 'AMD Ryzen 7 7800X3D', category: 'cpu', priceUSD: 450, amazonTag: 'B0BTZB7F88', tier: 'high', description: 'Best gaming CPU with 3D V-Cache', specs: '8 Cores, 16 Threads, 5.0GHz Boost' },
  { id: 'cpu-enthusiast-1', name: 'Intel Core i9-14900K', category: 'cpu', priceUSD: 550, amazonTag: 'B0CGJ56QKS', tier: 'enthusiast', description: 'Ultimate performance flagship', specs: '24 Cores, 32 Threads, 6.0GHz Boost' },

  // RAM
  { id: 'ram-budget-1', name: 'Corsair Vengeance LPX 16GB', category: 'ram', priceUSD: 45, amazonTag: 'B0143UM4TC', tier: 'budget', description: 'Reliable DDR4 gaming memory', specs: '2x8GB DDR4-3200 CL16' },
  { id: 'ram-mid-1', name: 'G.Skill Trident Z5 32GB', category: 'ram', priceUSD: 100, amazonTag: 'B09QHXJJ11', tier: 'mid', description: 'Fast DDR5 with RGB lighting', specs: '2x16GB DDR5-6000 CL36' },
  { id: 'ram-high-1', name: 'Corsair Dominator Platinum 64GB', category: 'ram', priceUSD: 200, amazonTag: 'B09Q5T8LGW', tier: 'high', description: 'Premium high-capacity DDR5', specs: '2x32GB DDR5-6000 CL30' },

  // Storage
  { id: 'storage-budget-1', name: 'Samsung 980 500GB', category: 'storage', priceUSD: 50, amazonTag: 'B08V8GK1QW', tier: 'budget', description: 'Fast PCIe 3.0 SSD', specs: 'NVMe M.2, 3500MB/s Read' },
  { id: 'storage-mid-1', name: 'Samsung 990 Pro 1TB', category: 'storage', priceUSD: 110, amazonTag: 'B0BHJJ9Y77', tier: 'mid', description: 'Premium PCIe 4.0 performance', specs: 'NVMe M.2, 7450MB/s Read' },
  { id: 'storage-high-1', name: 'Samsung 990 Pro 2TB', category: 'storage', priceUSD: 180, amazonTag: 'B0BHJF2VRN', tier: 'high', description: 'Large capacity with top speeds', specs: 'NVMe M.2, 7450MB/s Read' },

  // PSU
  { id: 'psu-budget-1', name: 'Corsair CX550M', category: 'psu', priceUSD: 70, amazonTag: 'B01B72VXE6', tier: 'budget', description: 'Reliable 80+ Bronze PSU', specs: '550W, Semi-Modular' },
  { id: 'psu-mid-1', name: 'Corsair RM750e', category: 'psu', priceUSD: 100, amazonTag: 'B0BZ2MYVGM', tier: 'mid', description: 'Quiet 80+ Gold efficiency', specs: '750W, Fully Modular' },
  { id: 'psu-high-1', name: 'Corsair RM1000x', category: 'psu', priceUSD: 180, amazonTag: 'B08R5JPTMZ', tier: 'high', description: 'High wattage for powerful builds', specs: '1000W, 80+ Gold, Fully Modular' },

  // Monitors
  { id: 'monitor-budget-1', name: 'ASUS VG248QG', category: 'monitor', priceUSD: 180, amazonTag: 'B07TNM8L6S', tier: 'budget', description: 'Fast 165Hz gaming monitor', specs: '24" 1080p, 165Hz, 0.5ms' },
  { id: 'monitor-mid-1', name: 'LG 27GP850-B', category: 'monitor', priceUSD: 350, amazonTag: 'B093MTSTKD', tier: 'mid', description: 'Premium 1440p IPS panel', specs: '27" 1440p, 165Hz, Nano IPS' },
  { id: 'monitor-high-1', name: 'Samsung Odyssey G7', category: 'monitor', priceUSD: 500, amazonTag: 'B088HJ4VQK', tier: 'high', description: 'Curved 240Hz gaming beast', specs: '27" 1440p, 240Hz, 1ms, Curved' },
  { id: 'monitor-enthusiast-1', name: 'LG 27GR95QE-B', category: 'monitor', priceUSD: 800, amazonTag: 'B0BWDJ3WVG', tier: 'enthusiast', description: 'OLED gaming perfection', specs: '27" 1440p, 240Hz, OLED' },
];

const categoryIcons = {
  gpu: Zap,
  cpu: Cpu,
  ram: HardDrive,
  storage: HardDrive,
  psu: Zap,
  monitor: Monitor,
};

const categoryLabels = {
  gpu: 'Graphics Card',
  cpu: 'Processor',
  ram: 'Memory',
  storage: 'Storage',
  psu: 'Power Supply',
  monitor: 'Monitor',
};

const tierLabels = {
  budget: 'Budget Build',
  mid: 'Mid-Range Build',
  high: 'High-End Build',
  enthusiast: 'Enthusiast Build',
};

const tierColors = {
  budget: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  mid: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  high: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  enthusiast: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
};

export function ProductRecommendations() {
  const [budget, setBudget] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const budgetUSD = useMemo(() => {
    const numericBudget = parseFloat(budget.replace(/[^0-9.]/g, ''));
    if (isNaN(numericBudget)) return 0;
    return numericBudget / selectedCurrency.exchangeRate;
  }, [budget, selectedCurrency]);

  const determineTier = (budgetUSD: number): ProductRecommendation['tier'] => {
    if (budgetUSD < 600) return 'budget';
    if (budgetUSD < 1200) return 'mid';
    if (budgetUSD < 2500) return 'high';
    return 'enthusiast';
  };

  const recommendations = useMemo(() => {
    if (budgetUSD <= 0) return [];
    
    const tier = determineTier(budgetUSD);
    const tierOrder: ProductRecommendation['tier'][] = ['budget', 'mid', 'high', 'enthusiast'];
    const tierIndex = tierOrder.indexOf(tier);
    const validTiers = tierOrder.slice(0, tierIndex + 1);

    const categories: ProductRecommendation['category'][] = ['gpu', 'cpu', 'ram', 'storage', 'psu', 'monitor'];
    
    return categories.map(category => {
      // Get products in valid tiers for this category
      const categoryProducts = productDatabase
        .filter(p => p.category === category && validTiers.includes(p.tier))
        .sort((a, b) => {
          // Sort by tier (higher first within budget), then by price
          const tierDiff = tierOrder.indexOf(b.tier) - tierOrder.indexOf(a.tier);
          if (tierDiff !== 0) return tierDiff;
          return b.priceUSD - a.priceUSD;
        });

      return categoryProducts[0] || productDatabase.find(p => p.category === category && p.tier === 'budget');
    }).filter(Boolean) as ProductRecommendation[];
  }, [budgetUSD]);

  const formatPrice = (priceUSD: number) => {
    const convertedPrice = priceUSD * selectedCurrency.exchangeRate;
    if (selectedCurrency.code === 'JPY' || selectedCurrency.code === 'KRW') {
      return `${selectedCurrency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    return `${selectedCurrency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const totalPrice = recommendations.reduce((sum, p) => sum + p.priceUSD, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetUSD > 0) {
      setShowRecommendations(true);
    }
  };

  const getAmazonLink = (product: ProductRecommendation) => {
    // Replace with your actual Amazon affiliate tag
    const affiliateTag = 'willitpotato-20';
    return `https://www.amazon.com/dp/${product.amazonTag}?tag=${affiliateTag}`;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-medium">PC Build Recommendations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Build Your Perfect Gaming PC
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your budget and we'll recommend the best parts for your build. Prices shown include affiliate links to Amazon.
          </p>
        </motion.div>

        {/* Budget Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-primary" />
                Set Your Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          <span className="flex items-center gap-2">
                            <span className="font-mono">{c.symbol}</span>
                            <span>{c.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                      {selectedCurrency.symbol}
                    </span>
                    <Input
                      id="budget"
                      type="text"
                      placeholder="1000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value.replace(/[^0-9.]/g, ''))}
                      className="pl-10"
                    />
                  </div>
                  {budgetUSD > 0 && currency !== 'USD' && (
                    <p className="text-xs text-muted-foreground">
                      ≈ ${budgetUSD.toFixed(2)} USD
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={!budget || budgetUSD <= 0}>
                  Get Recommendations
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence mode="wait">
          {showRecommendations && recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Summary */}
              <div className="text-center mb-8">
                <Badge variant="outline" className={`${tierColors[determineTier(budgetUSD)]} text-sm px-4 py-1`}>
                  {tierLabels[determineTier(budgetUSD)]}
                </Badge>
                <p className="text-muted-foreground mt-2">
                  Estimated total: <span className="font-semibold text-foreground">{formatPrice(totalPrice)}</span>
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((product, index) => {
                  const Icon = categoryIcons[product.category];
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                {categoryLabels[product.category]}
                              </p>
                              <h4 className="font-semibold text-foreground text-sm leading-tight mb-1">
                                {product.name}
                              </h4>
                              <p className="text-xs text-muted-foreground mb-2">
                                {product.specs}
                              </p>
                              <p className="text-xs text-muted-foreground mb-3">
                                {product.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-primary">
                                  {formatPrice(product.priceUSD)}
                                </span>
                                <a
                                  href={getAmazonLink(product)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs bg-amber-500 hover:bg-amber-600 text-black px-3 py-1.5 rounded-full font-medium transition-colors"
                                >
                                  View on Amazon
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
                * Prices are approximate and may vary. As an Amazon Associate, we earn from qualifying purchases. 
                Links may be affiliate links.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
