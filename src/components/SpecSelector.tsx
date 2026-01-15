import { useState, useEffect } from 'react';
import { gpuOptions, cpuOptions, ramOptions, osOptions } from '@/data/games';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Monitor, Settings2 } from 'lucide-react';

export interface SystemSpecs {
  gpu: string;
  gpuTier: number;
  vram: number;
  cpu: string;
  cpuTier: number;
  ram: number;
  os: 'windows' | 'macos' | 'linux';
}

interface SpecSelectorProps {
  onSpecsChange: (specs: SystemSpecs) => void;
}

export function SpecSelector({ onSpecsChange }: SpecSelectorProps) {
  const [selectedGpu, setSelectedGpu] = useState(gpuOptions[0]);
  const [selectedVram, setSelectedVram] = useState(gpuOptions[0].vramOptions[0]);
  const [selectedCpu, setSelectedCpu] = useState(cpuOptions[0]);
  const [selectedRam, setSelectedRam] = useState(16);
  const [selectedOs, setSelectedOs] = useState<'windows' | 'macos' | 'linux'>('windows');

  useEffect(() => {
    onSpecsChange({
      gpu: selectedGpu.name,
      gpuTier: selectedGpu.tier,
      vram: selectedVram,
      cpu: selectedCpu.name,
      cpuTier: selectedCpu.tier,
      ram: selectedRam,
      os: selectedOs
    });
  }, [selectedGpu, selectedVram, selectedCpu, selectedRam, selectedOs, onSpecsChange]);

  const handleGpuChange = (gpuName: string) => {
    const gpu = gpuOptions.find(g => g.name === gpuName);
    if (gpu) {
      setSelectedGpu(gpu);
      setSelectedVram(gpu.vramOptions[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl space-y-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Settings2 className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-foreground">System Specifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GPU Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="w-4 h-4" />
            Graphics Card
          </Label>
          <Select value={selectedGpu.name} onValueChange={handleGpuChange}>
            <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {gpuOptions.map((gpu) => (
                <SelectItem key={gpu.name} value={gpu.name}>
                  {gpu.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* VRAM Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="w-4 h-4" />
            VRAM
          </Label>
          <Select value={selectedVram.toString()} onValueChange={(v) => setSelectedVram(parseInt(v))}>
            <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectedGpu.vramOptions.map((vram) => (
                <SelectItem key={vram} value={vram.toString()}>
                  {vram} GB
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CPU Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="w-4 h-4" />
            Processor
          </Label>
          <Select 
            value={selectedCpu.name} 
            onValueChange={(name) => {
              const cpu = cpuOptions.find(c => c.name === name);
              if (cpu) setSelectedCpu(cpu);
            }}
          >
            <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {cpuOptions.map((cpu) => (
                <SelectItem key={cpu.name} value={cpu.name}>
                  {cpu.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* RAM Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="w-4 h-4" />
            RAM
          </Label>
          <Select value={selectedRam.toString()} onValueChange={(v) => setSelectedRam(parseInt(v))}>
            <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ramOptions.map((ram) => (
                <SelectItem key={ram} value={ram.toString()}>
                  {ram} GB
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* OS Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="w-4 h-4" />
            Operating System
          </Label>
          <Select value={selectedOs} onValueChange={(v) => setSelectedOs(v as typeof selectedOs)}>
            <SelectTrigger className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {osOptions.map((os) => (
                <SelectItem key={os.value} value={os.value}>
                  {os.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}
