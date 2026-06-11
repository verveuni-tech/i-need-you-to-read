import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import { History, Compass, Milestone } from 'lucide-react';

export const PageThenVsNow: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Reset or start animation on load
    setHasAnimated(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 paper-texture relative overflow-hidden select-none">
      <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-accent/20" />

      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter IV
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1 mb-2">
          Then vs Now
        </h2>
      </div>

      {/* Grid container representing the two-page spread within the page leaf */}
      <div className="my-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative min-h-[220px]">
        {/* Left Page (THEN): representing the past */}
        <motion.div
          id="then-panel"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{
            delay: 1.5,
            duration: 3.5,
            ease: 'easeInOut',
          }}
          className="bg-[#2D241C]/5 border border-[#2D241C]/10 p-5 rounded-xs flex flex-col justify-between text-[#2D241C]/50 select-none pb-8"
        >
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase mb-1 block">
              The Scattered Past
            </span>
            <h3 className="font-serif text-2xl font-light italic mb-4">Then...</h3>
          </div>
          
          <ul className="space-y-3 font-body text-xs sm:text-sm italic">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/30" /> Learning (trying to figure out who I was)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/30" /> Immature (scared of making a mistake)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/30" /> Uncertain (not knowing where my loyalty rested)
            </li>
          </ul>

          <div className="text-[9px] font-mono text-center tracking-widest uppercase mt-4">
            Disappearing...
          </div>
        </motion.div>

        {/* Vertical divider line that fades as well */}
        <motion.div
          id="then-now-divider"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 3.5 }}
          className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#2D241C]/20"
        />

        {/* Right Page (NOW): representing present and future */}
        <motion.div
          id="now-panel"
          initial={{ opacity: 0.8, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gold/5 border border-gold/20 p-5 rounded-xs flex flex-col justify-between text-ink select-none relative shadow-xs col-span-1"
        >
          {/* Subtle warm ambient highlight */}
          <div className="absolute inset-0 bg-gold/3 rounded-xs pointer-events-none mix-blend-color-burn" />

          <div>
            <span className="text-[10px] font-mono text-accent tracking-widest uppercase mb-1 block font-semibold animate-pulse">
              The Present Light
            </span>
            <h3 className="font-serif text-2xl font-medium text-accent mb-4">Now</h3>
          </div>

          <ul className="space-y-4 font-body text-xs sm:text-sm font-medium">
            <li className="flex items-center gap-2 text-ink">
              <span className="w-2 h-2 rounded-full bg-[#8A1F1F]" /> 
              <span>Certain <span className="font-handwritten text-lg text-accent font-normal pl-1">(I want you)</span></span>
            </li>
            <li className="flex items-center gap-2 text-ink">
              <span className="w-2 h-2 rounded-full bg-[#8A1F1F]" /> 
              <span>Secure <span className="font-handwritten text-lg text-accent font-normal pl-1">(This is real)</span></span>
            </li>
            <li className="flex items-center gap-2 text-ink">
              <span className="w-2 h-2 rounded-full bg-[#8A1F1F]" /> 
              <span>Committed <span className="font-handwritten text-lg text-accent font-normal pl-1">(No turning back)</span></span>
            </li>
          </ul>

          <div className="text-[9px] font-mono text-center text-accent/60 tracking-wider uppercase mt-4 font-semibold">
            Only the present remains
          </div>
        </motion.div>
      </div>

      <p className="text-[10px] font-mono text-accent/30 text-center select-none italic">
        * Watch as the temporary fades, leaving only what's true
      </p>
    </div>
  );
};
