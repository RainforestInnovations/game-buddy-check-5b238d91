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
  { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.94 },
  { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.80 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', exchangeRate: 1.44 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', exchangeRate: 1.62 },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', exchangeRate: 1.78 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', exchangeRate: 158 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', exchangeRate: 86 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', exchangeRate: 6.10 },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', exchangeRate: 20.50 },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', exchangeRate: 1450 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', exchangeRate: 1.36 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', exchangeRate: 0.91 },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', exchangeRate: 11.20 },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', exchangeRate: 4.08 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', exchangeRate: 18.50 },
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
  // GPUs - 2026 Pricing
  { id: 'gpu-budget-1', name: 'NVIDIA GeForce RTX 4050', category: 'gpu', priceUSD: 200, amazonTag: 'B0D1234ABC', tier: 'budget', description: 'Great entry-level GPU for 1080p gaming', specs: '6GB GDDR6, 2560 CUDA Cores' },
  { id: 'gpu-budget-2', name: 'AMD Radeon RX 7500 XT', category: 'gpu', priceUSD: 180, amazonTag: 'B0D5678DEF', tier: 'budget', description: 'Affordable AMD option for esports titles', specs: '8GB GDDR6, 2048 Stream Processors' },
  { id: 'gpu-mid-1', name: 'NVIDIA GeForce RTX 5060', category: 'gpu', priceUSD: 350, amazonTag: 'B0D9ABCGHI', tier: 'mid', description: 'Excellent 1080p/1440p with DLSS 4', specs: '8GB GDDR7, 4608 CUDA Cores' },
  { id: 'gpu-mid-2', name: 'AMD Radeon RX 9060 XT', category: 'gpu', priceUSD: 320, amazonTag: 'B0DDEFGJKL', tier: 'mid', description: 'Strong 1440p gaming with FSR 4', specs: '12GB GDDR6, 3072 Stream Processors' },
  { id: 'gpu-high-1', name: 'NVIDIA GeForce RTX 5070 Ti', category: 'gpu', priceUSD: 750, amazonTag: 'B0DHIJKMNO', tier: 'high', description: 'Premium 1440p/4K gaming experience', specs: '16GB GDDR7, 8960 CUDA Cores' },
  { id: 'gpu-high-2', name: 'AMD Radeon RX 9070 XT', category: 'gpu', priceUSD: 650, amazonTag: 'B0DLMNOPQR', tier: 'high', description: 'Exceptional 1440p AMD performance', specs: '16GB GDDR6, 4608 Stream Processors' },
  { id: 'gpu-enthusiast-1', name: 'NVIDIA GeForce RTX 5080', category: 'gpu', priceUSD: 1200, amazonTag: 'B0DPQRSTUV', tier: 'enthusiast', description: 'Top-tier 4K gaming powerhouse', specs: '16GB GDDR7, 10752 CUDA Cores' },
  { id: 'gpu-enthusiast-2', name: 'NVIDIA GeForce RTX 5090', category: 'gpu', priceUSD: 2000, amazonTag: 'B0DTUVWXYZ', tier: 'enthusiast', description: 'Ultimate gaming & content creation', specs: '32GB GDDR7, 21760 CUDA Cores' },

  // CPUs - 2026 Pricing
  { id: 'cpu-budget-1', name: 'Intel Core i3-14100F', category: 'cpu', priceUSD: 110, amazonTag: 'B0C1234ABC', tier: 'budget', description: 'Great budget gaming CPU', specs: '4 Cores, 8 Threads, 4.7GHz Boost' },
  { id: 'cpu-budget-2', name: 'AMD Ryzen 5 8500G', category: 'cpu', priceUSD: 130, amazonTag: 'B0C5678DEF', tier: 'budget', description: 'Excellent value with integrated graphics', specs: '6 Cores, 12 Threads, 5.0GHz Boost' },
  { id: 'cpu-mid-1', name: 'Intel Core i5-14600KF', category: 'cpu', priceUSD: 280, amazonTag: 'B0C9ABCGHI', tier: 'mid', description: 'Best mid-range gaming CPU', specs: '14 Cores, 20 Threads, 5.3GHz Boost' },
  { id: 'cpu-mid-2', name: 'AMD Ryzen 7 9700X', category: 'cpu', priceUSD: 320, amazonTag: 'B0CDDEFGHIJ', tier: 'mid', description: 'Powerful Zen 5 gaming performance', specs: '8 Cores, 16 Threads, 5.5GHz Boost' },
  { id: 'cpu-high-1', name: 'Intel Core i7-15700K', category: 'cpu', priceUSD: 450, amazonTag: 'B0CHIJKLMNO', tier: 'high', description: 'High-end gaming & multitasking', specs: '20 Cores, 28 Threads, 5.8GHz Boost' },
  { id: 'cpu-high-2', name: 'AMD Ryzen 7 9800X3D', category: 'cpu', priceUSD: 480, amazonTag: 'B0CLMNOPQRS', tier: 'high', description: 'Best gaming CPU with 3D V-Cache', specs: '8 Cores, 16 Threads, 5.2GHz Boost' },
  { id: 'cpu-enthusiast-1', name: 'Intel Core i9-15900K', category: 'cpu', priceUSD: 600, amazonTag: 'B0CPQRSTUVW', tier: 'enthusiast', description: 'Ultimate performance flagship', specs: '24 Cores, 32 Threads, 6.2GHz Boost' },

  // RAM - 2026 Pricing
  { id: 'ram-budget-1', name: 'Corsair Vengeance DDR5 16GB', category: 'ram', priceUSD: 55, amazonTag: 'B0R1234ABC', tier: 'budget', description: 'Reliable DDR5 gaming memory', specs: '2x8GB DDR5-5600 CL36' },
  { id: 'ram-mid-1', name: 'G.Skill Trident Z5 RGB 32GB', category: 'ram', priceUSD: 120, amazonTag: 'B0R5678DEF', tier: 'mid', description: 'Fast DDR5 with RGB lighting', specs: '2x16GB DDR5-6400 CL32' },
  { id: 'ram-high-1', name: 'Corsair Dominator Titanium 64GB', category: 'ram', priceUSD: 240, amazonTag: 'B0R9ABCGHI', tier: 'high', description: 'Premium high-capacity DDR5', specs: '2x32GB DDR5-7200 CL30' },

  // Storage - 2026 Pricing
  { id: 'storage-budget-1', name: 'Samsung 990 EVO 500GB', category: 'storage', priceUSD: 55, amazonTag: 'B0S1234ABC', tier: 'budget', description: 'Fast PCIe 5.0 SSD', specs: 'NVMe M.2, 5000MB/s Read' },
  { id: 'storage-mid-1', name: 'Samsung 990 Pro 1TB', category: 'storage', priceUSD: 100, amazonTag: 'B0S5678DEF', tier: 'mid', description: 'Premium PCIe 4.0 performance', specs: 'NVMe M.2, 7450MB/s Read' },
  { id: 'storage-high-1', name: 'Samsung 9100 Pro 2TB', category: 'storage', priceUSD: 200, amazonTag: 'B0S9ABCGHI', tier: 'high', description: 'Next-gen PCIe 5.0 speeds', specs: 'NVMe M.2, 14000MB/s Read' },

  // PSU - 2026 Pricing
  { id: 'psu-budget-1', name: 'Corsair CX650M', category: 'psu', priceUSD: 75, amazonTag: 'B0P1234ABC', tier: 'budget', description: 'Reliable 80+ Bronze PSU', specs: '650W, Semi-Modular' },
  { id: 'psu-mid-1', name: 'Corsair RM850e', category: 'psu', priceUSD: 120, amazonTag: 'B0P5678DEF', tier: 'mid', description: 'Quiet 80+ Gold efficiency', specs: '850W, Fully Modular' },
  { id: 'psu-high-1', name: 'Corsair RM1200x', category: 'psu', priceUSD: 200, amazonTag: 'B0P9ABCGHI', tier: 'high', description: 'High wattage for powerful builds', specs: '1200W, 80+ Platinum, Fully Modular' },

  // Monitors - 2026 Pricing
  { id: 'monitor-budget-1', name: 'ASUS TUF VG27AQ1A', category: 'monitor', priceUSD: 200, amazonTag: 'B0M1234ABC', tier: 'budget', description: 'Fast 170Hz gaming monitor', specs: '27" 1440p, 170Hz, 1ms' },
  { id: 'monitor-mid-1', name: 'LG 27GP95R-B', category: 'monitor', priceUSD: 400, amazonTag: 'B0M5678DEF', tier: 'mid', description: 'Premium 1440p IPS panel', specs: '27" 1440p, 180Hz, Nano IPS' },
  { id: 'monitor-high-1', name: 'Samsung Odyssey G8', category: 'monitor', priceUSD: 600, amazonTag: 'B0M9ABCGHI', tier: 'high', description: 'QD-OLED 240Hz gaming beast', specs: '27" 1440p, 240Hz, QD-OLED' },
  { id: 'monitor-enthusiast-1', name: 'LG UltraGear 32GS95UE', category: 'monitor', priceUSD: 900, amazonTag: 'B0MDEFFGHIJ', tier: 'enthusiast', description: '4K OLED gaming perfection', specs: '32" 4K, 240Hz, OLED' },
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
    
    const categories: ProductRecommendation['category'][] = ['gpu', 'cpu', 'ram', 'storage', 'psu', 'monitor'];
    const selectedProducts: ProductRecommendation[] = [];
    let remainingBudget = budgetUSD;

    // Allocate budget proportionally: GPU 35%, CPU 20%, RAM 10%, Storage 10%, PSU 10%, Monitor 15%
    const budgetAllocation: Record<ProductRecommendation['category'], number> = {
      gpu: 0.35,
      cpu: 0.20,
      ram: 0.10,
      storage: 0.10,
      psu: 0.10,
      monitor: 0.15,
    };

    categories.forEach(category => {
      const categoryBudget = budgetUSD * budgetAllocation[category];
      
      // Get best product that fits within category budget
      const categoryProducts = productDatabase
        .filter(p => p.category === category && p.priceUSD <= categoryBudget * 1.1) // Allow 10% flexibility
        .sort((a, b) => b.priceUSD - a.priceUSD); // Highest price first (best within budget)

      const selected = categoryProducts[0] || productDatabase
        .filter(p => p.category === category)
        .sort((a, b) => a.priceUSD - b.priceUSD)[0]; // Fallback to cheapest
      
      if (selected) {
        selectedProducts.push(selected);
        remainingBudget -= selected.priceUSD;
      }
    });

    // Optimize: If total exceeds budget, downgrade most expensive items
    let total = selectedProducts.reduce((sum, p) => sum + p.priceUSD, 0);
    
    while (total > budgetUSD && selectedProducts.length > 0) {
      // Find the most expensive item and try to downgrade it
      const sortedByPrice = [...selectedProducts].sort((a, b) => b.priceUSD - a.priceUSD);
      let downgraded = false;
      
      for (const expensive of sortedByPrice) {
        const alternatives = productDatabase
          .filter(p => p.category === expensive.category && p.priceUSD < expensive.priceUSD)
          .sort((a, b) => b.priceUSD - a.priceUSD);
        
        if (alternatives.length > 0) {
          const idx = selectedProducts.findIndex(p => p.id === expensive.id);
          const newTotal = total - expensive.priceUSD + alternatives[0].priceUSD;
          
          if (newTotal <= budgetUSD || alternatives[0].priceUSD < expensive.priceUSD) {
            selectedProducts[idx] = alternatives[0];
            total = selectedProducts.reduce((sum, p) => sum + p.priceUSD, 0);
            downgraded = true;
            break;
          }
        }
      }
      
      if (!downgraded) break; // Can't downgrade further
    }

    return selectedProducts;
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
