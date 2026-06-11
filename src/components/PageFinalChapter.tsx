import React from 'react';
import { motion } from 'motion/react';
import { Heart, Stars } from 'lucide-react';

export const PageFinalChapter: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 paper-texture relative overflow-hidden select-none">
      <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-accent/20" />

      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold animate-pulse">
          Final Chapter
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1">
          Final Chapter
        </h2>
      </div>

      {/* Heavy impact calligraphy closing message */}
      <div id="final-chapter-message-box" className="my-auto max-w-sm mx-auto text-center space-y-6 select-none relative">
        <Stars className="w-6 h-6 text-gold/50 mx-auto animate-spin" style={{ animationDuration: '12s' }} />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="font-handwritten text-3xl sm:text-4xl text-ink leading-relaxed font-semibold italic text-slate-800"
        >
          "If I could relive every single chapter of my entire life..."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
          className="font-serif text-xl sm:text-2xl text-accent font-medium leading-relaxed tracking-wide px-3 py-4 border-y border-accent/10"
        >
          "I'd still choose the one that led me to you."
        </motion.p>

        <div className="flex justify-center pt-2">
          <Heart className="w-5 h-5 text-[#8A1F1F] fill-[#8A1F1F] animate-ping absolute opacity-34" />
          <Heart className="w-5 h-5 text-[#8A1F1F] fill-[#8A1F1F]" />
        </div>
      </div>

      {/* Signature */}
      <div className="flex justify-between items-end border-t border-accent/10 pt-4">
        <div>
          <p className="text-[10px] font-mono text-accent/50 uppercase tracking-widest">
            Yours forever,
          </p>
          <p className="font-script text-3xl text-accent mt-1 leading-none">
            Mohit
          </p>
        </div>
        <div className="text-[10px] font-mono text-accent/40 italic flex items-center gap-1">
          <span>THE END</span>
        </div>
      </div>
    </div>
  );
};
