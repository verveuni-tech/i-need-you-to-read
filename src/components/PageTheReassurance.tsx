import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const PageTheReassurance: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 paper-texture relative overflow-hidden select-none">
      {/* Background binding/spine crease */}
      <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />

      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter VIII
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1">
          The Reassurance
        </h2>
      </div>

      {/* Heavy whitespace center message */}
      <div id="reassurance-lines" className="my-auto space-y-8 text-center max-w-md mx-auto select-none pt-4">
        
        <motion.p
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif text-2xl sm:text-3xl text-ink/90 font-light tracking-wide leading-relaxed italic"
        >
          "You are not competing with anyone."
        </motion.p>

        {/* Short dash layout indicator for pause */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.4, width: 30 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="h-[1px] bg-accent mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.2 }}
          className="font-serif text-3xl sm:text-4xl text-accent font-medium tracking-wide leading-relaxed"
        >
          "You never were."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.4, width: 30 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="h-[1px] bg-accent mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 4.0 }}
          className="font-handwritten text-3xl sm:text-4xl text-gold font-bold tracking-wide"
        >
          "There is nobody in this world I would ever choose over you."
        </motion.p>
        
      </div>

      <div className="flex justify-between items-center border-t border-accent/10 pt-4 text-[10px] font-mono text-accent/30 italic">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> THE CHOSEN PRESENT
        </span>
        <span>Page 8 of 10</span>
      </div>
    </div>
  );
};
