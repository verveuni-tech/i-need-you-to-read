import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';

export const PageTheFear: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 paper-texture relative overflow-hidden select-none">
      <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-accent/20" />

      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter II
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1">
          The Fear
        </h2>
      </div>

      {/* Sincere message with Faded Ink Effect */}
      <div id="the-fear-content" className="my-auto max-w-sm mx-auto space-y-4 px-2 select-none relative">
        {/* Soft custom ink wash backdrop */}
        <div className="absolute -inset-4 bg-[#8B5E3C]/3 rounded-full blur-xl pointer-events-none" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm sm:text-base text-ink/75 leading-relaxed italic text-justify"
        >
          "I know where the fear comes from. It sits in those quiet moments, wondering if the chapters that came before you took some part of me away that you'll never get to experience."
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-sm sm:text-base text-ink/90 leading-relaxed font-medium text-center text-accent"
        >
          "I understand why this hurts."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-sm sm:text-base text-ink/75 leading-relaxed italic text-justify"
        >
          "I want to sit with you in that fear, not brush it aside. Your feelings are valid, and you have every right to protect your heart. But please let me help you carry it."
        </motion.p>
      </div>

      <div className="flex justify-between items-center border-t border-accent/10 pt-4 text-[10px] font-mono text-accent/40 italic">
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5" /> EMOTIONAL HONESTY
        </span>
        <span>Page 2 of 10</span>
      </div>
    </div>
  );
};
