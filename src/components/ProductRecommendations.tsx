import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, DollarSign, Cpu, HardDrive, Monitor, Zap, ExternalLink, CircuitBoard, ChevronDown, ChevronUp } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number;
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

type Category = 'gpu' | 'cpu' | 'motherboard' | 'ram' | 'storage' | 'psu' | 'monitor';

interface ProductRecommendation {
  id: string;
  name: string;
  category: Category;
  priceUSD: number;
  searchQuery: string;
  tier: 'budget' | 'mid' | 'high' | 'enthusiast';
  description: string;
  specs: string;
}

const productDatabase: ProductRecommendation[] = [
  // GPUs - 2026 Pricing
  { id: 'gpu-budget-1', name: 'NVIDIA GeForce RTX 4050', category: 'gpu', priceUSD: 200, searchQuery: 'NVIDIA RTX 4050 graphics card', tier: 'budget', description: 'Great entry-level GPU for 1080p gaming', specs: '6GB GDDR6, 2560 CUDA Cores' },
  { id: 'gpu-budget-2', name: 'AMD Radeon RX 7500 XT', category: 'gpu', priceUSD: 180, searchQuery: 'AMD Radeon RX 7500 XT graphics card', tier: 'budget', description: 'Affordable AMD option for esports titles', specs: '8GB GDDR6, 2048 Stream Processors' },
  { id: 'gpu-mid-1', name: 'NVIDIA GeForce RTX 5060', category: 'gpu', priceUSD: 350, searchQuery: 'NVIDIA RTX 5060 graphics card', tier: 'mid', description: 'Excellent 1080p/1440p with DLSS 4', specs: '8GB GDDR7, 4608 CUDA Cores' },
  { id: 'gpu-mid-2', name: 'AMD Radeon RX 9060 XT', category: 'gpu', priceUSD: 320, searchQuery: 'AMD Radeon RX 9060 XT graphics card', tier: 'mid', description: 'Strong 1440p gaming with FSR 4', specs: '12GB GDDR6, 3072 Stream Processors' },
  { id: 'gpu-high-1', name: 'NVIDIA GeForce RTX 5070 Ti', category: 'gpu', priceUSD: 750, searchQuery: 'NVIDIA RTX 5070 Ti graphics card', tier: 'high', description: 'Premium 1440p/4K gaming experience', specs: '16GB GDDR7, 8960 CUDA Cores' },
  { id: 'gpu-high-2', name: 'AMD Radeon RX 9070 XT', category: 'gpu', priceUSD: 650, searchQuery: 'AMD Radeon RX 9070 XT graphics card', tier: 'high', description: 'Exceptional 1440p AMD performance', specs: '16GB GDDR6, 4608 Stream Processors' },
  { id: 'gpu-enthusiast-1', name: 'NVIDIA GeForce RTX 5080', category: 'gpu', priceUSD: 1200, searchQuery: 'NVIDIA RTX 5080 graphics card', tier: 'enthusiast', description: 'Top-tier 4K gaming powerhouse', specs: '16GB GDDR7, 10752 CUDA Cores' },
  { id: 'gpu-enthusiast-2', name: 'NVIDIA GeForce RTX 5090', category: 'gpu', priceUSD: 2000, searchQuery: 'NVIDIA RTX 5090 graphics card', tier: 'enthusiast', description: 'Ultimate gaming & content creation', specs: '32GB GDDR7, 21760 CUDA Cores' },

  // CPUs - 2026 Pricing
  { id: 'cpu-budget-1', name: 'Intel Core i3-14100F', category: 'cpu', priceUSD: 110, searchQuery: 'Intel Core i3-14100F processor', tier: 'budget', description: 'Great budget gaming CPU', specs: '4 Cores, 8 Threads, 4.7GHz Boost' },
  { id: 'cpu-budget-2', name: 'AMD Ryzen 5 8500G', category: 'cpu', priceUSD: 130, searchQuery: 'AMD Ryzen 5 8500G processor', tier: 'budget', description: 'Excellent value with integrated graphics', specs: '6 Cores, 12 Threads, 5.0GHz Boost' },
  { id: 'cpu-mid-1', name: 'Intel Core i5-14600KF', category: 'cpu', priceUSD: 280, searchQuery: 'Intel Core i5-14600KF processor', tier: 'mid', description: 'Best mid-range gaming CPU', specs: '14 Cores, 20 Threads, 5.3GHz Boost' },
  { id: 'cpu-mid-2', name: 'AMD Ryzen 7 9700X', category: 'cpu', priceUSD: 320, searchQuery: 'AMD Ryzen 7 9700X processor', tier: 'mid', description: 'Powerful Zen 5 gaming performance', specs: '8 Cores, 16 Threads, 5.5GHz Boost' },
  { id: 'cpu-high-1', name: 'Intel Core i7-15700K', category: 'cpu', priceUSD: 450, searchQuery: 'Intel Core i7-15700K processor', tier: 'high', description: 'High-end gaming & multitasking', specs: '20 Cores, 28 Threads, 5.8GHz Boost' },
  { id: 'cpu-high-2', name: 'AMD Ryzen 7 9800X3D', category: 'cpu', priceUSD: 480, searchQuery: 'AMD Ryzen 7 9800X3D processor', tier: 'high', description: 'Best gaming CPU with 3D V-Cache', specs: '8 Cores, 16 Threads, 5.2GHz Boost' },
  { id: 'cpu-enthusiast-1', name: 'Intel Core i9-15900K', category: 'cpu', priceUSD: 600, searchQuery: 'Intel Core i9-15900K processor', tier: 'enthusiast', description: 'Ultimate performance flagship', specs: '24 Cores, 32 Threads, 6.2GHz Boost' },
  { id: 'cpu-enthusiast-2', name: 'AMD Ryzen 9 9950X', category: 'cpu', priceUSD: 650, searchQuery: 'AMD Ryzen 9 9950X processor', tier: 'enthusiast', description: 'AMD flagship for creators', specs: '16 Cores, 32 Threads, 5.7GHz Boost' },

  // Motherboards - 2026 Pricing
  { id: 'mobo-budget-1', name: 'ASUS Prime B760M-A', category: 'motherboard', priceUSD: 120, searchQuery: 'ASUS Prime B760M-A motherboard', tier: 'budget', description: 'Solid Intel budget board', specs: 'LGA1700, DDR5, PCIe 5.0' },
  { id: 'mobo-budget-2', name: 'MSI PRO B650M-A', category: 'motherboard', priceUSD: 130, searchQuery: 'MSI PRO B650M-A motherboard', tier: 'budget', description: 'Reliable AMD budget option', specs: 'AM5, DDR5, PCIe 5.0' },
  { id: 'mobo-mid-1', name: 'ASUS TUF Gaming Z790-Plus', category: 'motherboard', priceUSD: 220, searchQuery: 'ASUS TUF Gaming Z790 Plus motherboard', tier: 'mid', description: 'Feature-rich Intel gaming board', specs: 'LGA1700, DDR5, WiFi 7' },
  { id: 'mobo-mid-2', name: 'MSI MAG X670E Tomahawk', category: 'motherboard', priceUSD: 250, searchQuery: 'MSI MAG X670E Tomahawk motherboard', tier: 'mid', description: 'Premium AMD mid-range board', specs: 'AM5, DDR5, PCIe 5.0 x2' },
  { id: 'mobo-high-1', name: 'ASUS ROG Strix Z890-E', category: 'motherboard', priceUSD: 400, searchQuery: 'ASUS ROG Strix Z890-E motherboard', tier: 'high', description: 'High-end Intel enthusiast board', specs: 'LGA1851, DDR5-8000+, WiFi 7' },
  { id: 'mobo-high-2', name: 'Gigabyte X870E Aorus Master', category: 'motherboard', priceUSD: 450, searchQuery: 'Gigabyte X870E Aorus Master motherboard', tier: 'high', description: 'Premium AMD enthusiast board', specs: 'AM5, DDR5-8000+, WiFi 7' },

  // RAM - 2026 Pricing
  { id: 'ram-budget-1', name: 'Corsair Vengeance DDR5 16GB', category: 'ram', priceUSD: 55, searchQuery: 'Corsair Vengeance DDR5 16GB 5600', tier: 'budget', description: 'Reliable DDR5 gaming memory', specs: '2x8GB DDR5-5600 CL36' },
  { id: 'ram-budget-2', name: 'G.Skill Ripjaws S5 16GB', category: 'ram', priceUSD: 50, searchQuery: 'G.Skill Ripjaws S5 DDR5 16GB', tier: 'budget', description: 'Affordable DDR5 option', specs: '2x8GB DDR5-5200 CL40' },
  { id: 'ram-mid-1', name: 'G.Skill Trident Z5 RGB 32GB', category: 'ram', priceUSD: 120, searchQuery: 'G.Skill Trident Z5 RGB DDR5 32GB', tier: 'mid', description: 'Fast DDR5 with RGB lighting', specs: '2x16GB DDR5-6400 CL32' },
  { id: 'ram-mid-2', name: 'Corsair Vengeance RGB 32GB', category: 'ram', priceUSD: 110, searchQuery: 'Corsair Vengeance RGB DDR5 32GB', tier: 'mid', description: 'RGB DDR5 gaming memory', specs: '2x16GB DDR5-6000 CL36' },
  { id: 'ram-high-1', name: 'Corsair Dominator Titanium 64GB', category: 'ram', priceUSD: 240, searchQuery: 'Corsair Dominator Titanium DDR5 64GB', tier: 'high', description: 'Premium high-capacity DDR5', specs: '2x32GB DDR5-7200 CL30' },

  // Storage - 2026 Pricing
  { id: 'storage-budget-1', name: 'Samsung 990 EVO 500GB', category: 'storage', priceUSD: 55, searchQuery: 'Samsung 990 EVO 500GB NVMe SSD', tier: 'budget', description: 'Fast PCIe 5.0 SSD', specs: 'NVMe M.2, 5000MB/s Read' },
  { id: 'storage-budget-2', name: 'WD Blue SN580 500GB', category: 'storage', priceUSD: 45, searchQuery: 'WD Blue SN580 500GB NVMe SSD', tier: 'budget', description: 'Reliable budget NVMe', specs: 'NVMe M.2, 4150MB/s Read' },
  { id: 'storage-mid-1', name: 'Samsung 990 Pro 1TB', category: 'storage', priceUSD: 100, searchQuery: 'Samsung 990 Pro 1TB NVMe SSD', tier: 'mid', description: 'Premium PCIe 4.0 performance', specs: 'NVMe M.2, 7450MB/s Read' },
  { id: 'storage-mid-2', name: 'WD Black SN850X 1TB', category: 'storage', priceUSD: 95, searchQuery: 'WD Black SN850X 1TB NVMe SSD', tier: 'mid', description: 'High-performance gaming SSD', specs: 'NVMe M.2, 7300MB/s Read' },
  { id: 'storage-high-1', name: 'Samsung 9100 Pro 2TB', category: 'storage', priceUSD: 200, searchQuery: 'Samsung 9100 Pro 2TB NVMe SSD', tier: 'high', description: 'Next-gen PCIe 5.0 speeds', specs: 'NVMe M.2, 14000MB/s Read' },

  // PSU - 2026 Pricing
  { id: 'psu-budget-1', name: 'Corsair CX650M', category: 'psu', priceUSD: 75, searchQuery: 'Corsair CX650M power supply', tier: 'budget', description: 'Reliable 80+ Bronze PSU', specs: '650W, Semi-Modular' },
  { id: 'psu-budget-2', name: 'EVGA 600 BR', category: 'psu', priceUSD: 60, searchQuery: 'EVGA 600 BR power supply', tier: 'budget', description: 'Affordable 80+ Bronze', specs: '600W, Non-Modular' },
  { id: 'psu-mid-1', name: 'Corsair RM850e', category: 'psu', priceUSD: 120, searchQuery: 'Corsair RM850e power supply', tier: 'mid', description: 'Quiet 80+ Gold efficiency', specs: '850W, Fully Modular' },
  { id: 'psu-mid-2', name: 'be quiet! Pure Power 12 M 850W', category: 'psu', priceUSD: 110, searchQuery: 'be quiet Pure Power 12 M 850W', tier: 'mid', description: 'Silent operation 80+ Gold', specs: '850W, Fully Modular' },
  { id: 'psu-high-1', name: 'Corsair RM1200x', category: 'psu', priceUSD: 200, searchQuery: 'Corsair RM1200x power supply', tier: 'high', description: 'High wattage for powerful builds', specs: '1200W, 80+ Platinum, Fully Modular' },

  // Monitors - 2026 Pricing
  { id: 'monitor-budget-1', name: 'ASUS TUF VG27AQ1A', category: 'monitor', priceUSD: 200, searchQuery: 'ASUS TUF VG27AQ1A gaming monitor', tier: 'budget', description: 'Fast 170Hz gaming monitor', specs: '27" 1440p, 170Hz, 1ms' },
  { id: 'monitor-budget-2', name: 'AOC 27G2SP', category: 'monitor', priceUSD: 180, searchQuery: 'AOC 27G2SP gaming monitor', tier: 'budget', description: 'Great value IPS gaming', specs: '27" 1080p, 165Hz, IPS' },
  { id: 'monitor-mid-1', name: 'LG 27GP95R-B', category: 'monitor', priceUSD: 400, searchQuery: 'LG 27GP95R-B gaming monitor', tier: 'mid', description: 'Premium 1440p IPS panel', specs: '27" 1440p, 180Hz, Nano IPS' },
  { id: 'monitor-mid-2', name: 'Dell S2722DGM', category: 'monitor', priceUSD: 350, searchQuery: 'Dell S2722DGM gaming monitor', tier: 'mid', description: 'Curved 1440p VA panel', specs: '27" 1440p, 165Hz, Curved VA' },
  { id: 'monitor-high-1', name: 'Samsung Odyssey G8', category: 'monitor', priceUSD: 600, searchQuery: 'Samsung Odyssey G8 QD-OLED monitor', tier: 'high', description: 'QD-OLED 240Hz gaming beast', specs: '27" 1440p, 240Hz, QD-OLED' },
  { id: 'monitor-enthusiast-1', name: 'LG UltraGear 32GS95UE', category: 'monitor', priceUSD: 900, searchQuery: 'LG UltraGear 32GS95UE OLED monitor', tier: 'enthusiast', description: '4K OLED gaming perfection', specs: '32" 4K, 240Hz, OLED' },
];

const categoryIcons: Record<Category, typeof Zap> = {
  gpu: Zap,
  cpu: Cpu,
  motherboard: CircuitBoard,
  ram: HardDrive,
  storage: HardDrive,
  psu: Zap,
  monitor: Monitor,
};

const categoryLabels: Record<Category, string> = {
  gpu: 'Graphics Card',
  cpu: 'Processor',
  motherboard: 'Motherboard',
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

const allCategories: Category[] = ['gpu', 'cpu', 'motherboard', 'ram', 'storage', 'psu', 'monitor'];

// Budget allocation percentages
const budgetAllocation: Record<Category, number> = {
  gpu: 0.30,
  cpu: 0.18,
  motherboard: 0.12,
  ram: 0.08,
  storage: 0.08,
  psu: 0.08,
  monitor: 0.16,
};

export function ProductRecommendations() {
  const [budget, setBudget] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Record<Category, string>>({} as Record<Category, string>);
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(new Set());

  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const budgetUSD = useMemo(() => {
    const numericBudget = parseFloat(budget.replace(/[^0-9.]/g, ''));
    if (isNaN(numericBudget)) return 0;
    return numericBudget / selectedCurrency.exchangeRate;
  }, [budget, selectedCurrency]);

  const determineTier = (budgetUSD: number): ProductRecommendation['tier'] => {
    if (budgetUSD < 700) return 'budget';
    if (budgetUSD < 1400) return 'mid';
    if (budgetUSD < 2800) return 'high';
    return 'enthusiast';
  };

  // Get all product options per category (sorted cheapest first for budget fitting)
  const productOptions = useMemo(() => {
    if (budgetUSD <= 0) return {} as Record<Category, ProductRecommendation[]>;
    
    const options: Record<Category, ProductRecommendation[]> = {} as Record<Category, ProductRecommendation[]>;

    allCategories.forEach(category => {
      const categoryProducts = productDatabase
        .filter(p => p.category === category)
        .sort((a, b) => a.priceUSD - b.priceUSD);

      options[category] = categoryProducts;
    });

    return options;
  }, [budgetUSD]);

  // Initialize selected products greedily within budget
  const initializeSelections = () => {
    const initial: Record<Category, string> = {} as Record<Category, string>;
    let remaining = budgetUSD;

    // First pass: pick the best item per category that fits within its allocated share
    allCategories.forEach(category => {
      const options = productOptions[category];
      if (!options || options.length === 0) return;
      const categoryBudget = budgetUSD * budgetAllocation[category];
      // Pick the most expensive option that fits the category allocation
      const fitting = [...options].reverse().find(p => p.priceUSD <= categoryBudget);
      const pick = fitting || options[0]; // fallback to cheapest
      initial[category] = pick.id;
      remaining -= pick.priceUSD;
    });

    // Second pass: upgrade categories if there's remaining budget (GPU priority first)
    const upgradePriority: Category[] = ['gpu', 'cpu', 'monitor', 'ram', 'storage', 'motherboard', 'psu'];
    for (const category of upgradePriority) {
      const options = productOptions[category];
      if (!options) continue;
      const currentProduct = productDatabase.find(p => p.id === initial[category]);
      if (!currentProduct) continue;
      // Try to upgrade to a better option that still keeps total in budget
      const betterOptions = options.filter(p => p.priceUSD > currentProduct.priceUSD).sort((a, b) => b.priceUSD - a.priceUSD);
      for (const better of betterOptions) {
        const extraCost = better.priceUSD - currentProduct.priceUSD;
        if (extraCost <= remaining) {
          initial[category] = better.id;
          remaining -= extraCost;
          break;
        }
      }
    }

    setSelectedProducts(initial);
  };

  // Calculate total based on selected products
  const totalPrice = useMemo(() => {
    return allCategories.reduce((sum, category) => {
      const selectedId = selectedProducts[category];
      const product = productDatabase.find(p => p.id === selectedId);
      return sum + (product?.priceUSD || 0);
    }, 0);
  }, [selectedProducts]);

  // Check if total exceeds budget
  const isOverBudget = totalPrice > budgetUSD;

  const formatPrice = (priceUSD: number) => {
    const convertedPrice = priceUSD * selectedCurrency.exchangeRate;
    if (selectedCurrency.code === 'JPY' || selectedCurrency.code === 'KRW') {
      return `${selectedCurrency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    return `${selectedCurrency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetUSD > 0) {
      initializeSelections();
      setShowRecommendations(true);
    }
  };

  const getAmazonLink = (product: ProductRecommendation) => {
    const affiliateTag = 'willitpotato-20';
    const searchQuery = encodeURIComponent(product.searchQuery);
    return `https://www.amazon.com/s?k=${searchQuery}&tag=${affiliateTag}`;
  };

  const toggleCategory = (category: Category) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const handleProductSelect = (category: Category, productId: string) => {
    const newProduct = productDatabase.find(p => p.id === productId);
    const oldProduct = productDatabase.find(p => p.id === selectedProducts[category]);
    if (!newProduct) return;
    const oldPrice = oldProduct?.priceUSD || 0;
    const newTotal = totalPrice - oldPrice + newProduct.priceUSD;
    // Only allow swap if it stays within budget
    if (newTotal <= budgetUSD) {
      setSelectedProducts(prev => ({
        ...prev,
        [category]: productId,
      }));
    }
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
            Enter your budget and we'll recommend the best parts for your build. Choose from multiple options per category!
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
          {showRecommendations && Object.keys(productOptions).length > 0 && (
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
                  Your Budget: <span className="font-semibold text-foreground">{formatPrice(budgetUSD)}</span>
                </p>
                <p className={`mt-1 ${isOverBudget ? 'text-destructive' : 'text-muted-foreground'}`}>
                  Estimated Total: <span className={`font-semibold ${isOverBudget ? 'text-destructive' : 'text-foreground'}`}>{formatPrice(totalPrice)}</span>
                  {isOverBudget && <span className="text-destructive text-sm ml-2">(Over budget!)</span>}
                </p>
              </div>

              {/* Category Cards with Options */}
              <div className="space-y-4">
                {allCategories.map((category, index) => {
                  const Icon = categoryIcons[category];
                  const options = productOptions[category] || [];
                  const selectedId = selectedProducts[category];
                  const selectedProduct = options.find(p => p.id === selectedId) || options[0];
                  const isExpanded = expandedCategories.has(category);

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-4">
                          {/* Category Header */}
                          <div 
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleCategory(category)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                  {categoryLabels[category]}
                                </p>
                                <h4 className="font-semibold text-foreground">
                                  {selectedProduct?.name || 'Select an option'}
                                </h4>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-primary">
                                {selectedProduct ? formatPrice(selectedProduct.priceUSD) : '-'}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Options */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 pt-4 border-t border-border/50">
                                  <RadioGroup
                                    value={selectedId}
                                    onValueChange={(value) => handleProductSelect(category, value)}
                                    className="space-y-3"
                                  >
                                    {options.map((product) => (
                                      <div
                                        key={product.id}
                                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                                          selectedId === product.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border/50 hover:border-primary/50'
                                        }`}
                                      >
                                        <RadioGroupItem value={product.id} id={product.id} className="mt-1" />
                                        <Label htmlFor={product.id} className="flex-1 cursor-pointer">
                                          <div className="flex items-start justify-between">
                                            <div>
                                              <p className="font-medium text-foreground">{product.name}</p>
                                              <p className="text-xs text-muted-foreground mt-0.5">{product.specs}</p>
                                              <p className="text-xs text-muted-foreground mt-1">{product.description}</p>
                                            </div>
                                            <div className="text-right ml-4">
                                              <p className="font-bold text-primary">{formatPrice(product.priceUSD)}</p>
                                              <a
                                                href={getAmazonLink(product)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-500 mt-1"
                                              >
                                                Amazon
                                                <ExternalLink className="w-3 h-3" />
                                              </a>
                                            </div>
                                          </div>
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Quick Amazon Link when collapsed */}
                          {!isExpanded && selectedProduct && (
                            <div className="mt-3 flex justify-end">
                              <a
                                href={getAmazonLink(selectedProduct)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs bg-amber-500 hover:bg-amber-600 text-black px-3 py-1.5 rounded-full font-medium transition-colors"
                              >
                                View on Amazon
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
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
