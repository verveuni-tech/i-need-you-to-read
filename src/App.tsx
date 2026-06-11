import React, { useState } from 'react';
import { DustParticles } from './components/DustParticles';
import { AudioController } from './components/AudioController';
import { PageFlipEngine } from './components/PageFlipEngine';
import { Heart } from 'lucide-react';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleToggleSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
  };

  return (
    <div className="relative min-h-screen bg-vintage text-ink flex flex-col justify-between overflow-hidden">
      {/* Decorative old paper subtle grain background pattern */}
      <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none select-none" />
      
      {/* Warm ambient diagonal glow rays overlay */}
      <div className="absolute inset-0 ambient-glow select-none" />

      {/* Floating Sparkling Dust particles */}
      <DustParticles />

      {/* Retro Calligraphy Music Action Disk */}
      <AudioController soundEnabled={soundEnabled} onToggleSound={handleToggleSound} />

      {/* Tiny subtle watermark header, styled humble and elegant */}
      <header className="pt-8 px-4 text-center select-none z-20">
        <span className="font-serif text-sm tracking-[0.2em] font-light text-accent/50 uppercase">
          A Keepsake Portfolio
        </span>
      </header>

      {/* Central 3D Interactive Scrapbook Flip Container */}
      <main className="flex-1 w-full flex items-center justify-center z-20">
        <PageFlipEngine />
      </main>

      {/* Humble, warm page footer with matching fonts */}
      <footer className="pb-6 px-4 text-center text-xs font-handwritten text-accent/60 tracking-wider select-none z-20 flex items-center justify-center gap-1.5">
        <span>Handwritten forever with sincere care</span>
        <Heart className="w-3.5 h-3.5 text-[#8A1F1F] fill-[#8A1F1F]/40 animate-pulse" />
        <span>for Khushi</span>
      </footer>
    </div>
  );
}
