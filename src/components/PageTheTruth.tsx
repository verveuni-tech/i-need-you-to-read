import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const PageTheTruth: React.FC = () => {
  // Staggered writing container lines
  const lines = [
    "The truth is simple:",
    "Before you, I didn't know what it meant to build.",
    "I was younger, seeking shadows, and trying to learn",
    "the alphabet of love without ever knowing how to write.",
    "But paths are walked so we can learn how to stand.",
    "I was younger and didn't understand love the way I do now.",
    "With you, the childish stories stopped.",
    "The real book began."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 paper-texture relative select-none">
      <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-accent/20" />

      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter III
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1">
          The Truth
        </h2>
      </div>

      {/* Sincere Lines displayed with structured spacing */}
      <motion.div
        id="the-truth-content"
        className="my-auto space-y-4 max-w-sm mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {lines.map((line, idx) => {
          const isAccent = line.includes("didn't understand love") || line.includes("real book began");
          return (
            <motion.p
              key={idx}
              variants={itemVariants}
              className={`font-body text-xs sm:text-sm leading-relaxed ${
                isAccent 
                  ? 'text-accent font-semibold text-sm sm:text-base border-y border-accent/5 py-1.5 font-handwritten text-xl tracking-wide' 
                  : 'text-ink/85'
              }`}
            >
              {line}
            </motion.p>
          );
        })}
      </motion.div>

      <div className="flex justify-between items-center border-t border-accent/10 pt-4 text-[10px] font-mono text-accent/40 italic">
        <span>GROWTH & PERSPECTIVE</span>
        <span>Page 3 of 10</span>
      </div>
    </div>
  );
};
