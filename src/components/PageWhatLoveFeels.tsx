import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronRight, PenTool } from 'lucide-react';
import { keepsakeAudio } from '../utils/audio';

interface RevealItem {
  key: string;
  word: string;
  definition: string;
}

export const PageWhatLoveFeels: React.FC = () => {
  const [revealedCount, setRevealedCount] = useState<number>(0);

  const items: RevealItem[] = [
    {
      key: 'comfort',
      word: 'Comfort',
      definition: 'It is the complete relief of being able to tell you anything without filtering my thoughts, knowing I am entirely safe in your hands.',
    },
    {
      key: 'trust',
      word: 'Trust',
      definition: 'A quiet, unbreakable anchor. There are no frantic games, no second-guessing, and no secrets—just two people standing steady.',
    },
    {
      key: 'missing',
      word: 'Missing You',
      definition: 'Sitting in a busy room and realizing my eyes are holding an empty space, wishing you were next to me to share a secret glance.',
    },
    {
      key: 'partnership',
      word: 'Partnership',
      definition: 'Walking side by side, solving together, laughing through errors, and realizing we are a team that makes the world feel small.',
    },
    {
      key: 'home',
      word: 'Home',
      definition: 'The realization that regardless of where the map points, my heart settles into perfect stillness the moment you are in sight.',
    },
  ];

  const handleRevealNext = () => {
    if (revealedCount < items.length) {
      keepsakeAudio.playPenWritingSound();
      setRevealedCount((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 paper-texture relative overflow-hidden select-none">
      <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-accent/20" />

      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter V
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1 mb-2">
          What Love Actually Feels Like
        </h2>
        <p className="font-body text-xs sm:text-sm text-ink/70 leading-relaxed italic max-w-sm">
          It has never been a competition or a constant chase. Real love feels completely different. Let me show you:
        </p>
      </div>

      {/* Revealed content area */}
      <div id="reveal-sentences-stack" className="my-auto space-y-3 max-h-[300px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {items.slice(0, revealedCount).map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -10, y: 5 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              className="bg-[#F3EBE0]/80 border-l-2 border-accent p-3 shadow-xs select-none relative"
              transition={{ duration: 0.5 }}
            >
              <span className="font-handwritten text-xl text-accent font-bold block leading-none mb-1">
                {idx + 1}. {item.word}
              </span>
              <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed italic">
                {item.definition}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {revealedCount === items.length && (
          <motion.div
            id="reveal-climax-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gold/10 border border-gold/30 p-4 rounded-xs text-center border-double"
          >
            <p className="font-handwritten text-2xl text-accent leading-tight font-semibold">
              "And Khushi, you are every single one of these to me. My quiet home."
            </p>
          </motion.div>
        )}
      </div>

      {/* Button to unlock the next word */}
      <div className="flex justify-center py-2">
        {revealedCount < items.length ? (
          <motion.button
            id="reveal-next-sentiment-btn"
            onClick={handleRevealNext}
            whileHover={{ scale: 1.04, backgroundColor: '#8B5E3C', color: '#F8F2E7' }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-full border border-accent/30 text-accent font-handwritten text-xl flex items-center gap-1.5 cursor-pointer bg-transparent pointer-events-auto transition-all"
          >
            <PenTool className="w-4 h-4" />
            <span>Reveal what comes next</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <span className="font-handwritten text-lg text-[#C9A26B] tracking-wide animate-pulse flex items-center gap-1.5 select-none">
            <Heart className="w-4 h-4 fill-gold/40 text-gold" /> Completely revealed
          </span>
        )}
      </div>

      <div className="text-[9px] font-mono text-accent/30 text-center select-none uppercase">
        * Interactive: tap button and read line by line
      </div>
    </div>
  );
};
