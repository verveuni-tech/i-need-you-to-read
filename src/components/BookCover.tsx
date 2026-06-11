import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';
import { WaxSeal } from './WaxSeal';

interface BookCoverProps {
  isEnding: boolean;
  onOpen: () => void;
  onUnsealSecret: () => void;
  isUnsealed: boolean;
}

export const BookCover: React.FC<BookCoverProps> = ({
  isEnding,
  onOpen,
  onUnsealSecret,
  isUnsealed,
}) => {
  return (
    <motion.div
      id={isEnding ? 'book-back-cover' : 'book-front-cover'}
      className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[3/4] bg-gradient-to-br from-[#401212] via-[#2F0B0B] to-[#1E0505] rounded-r-lg shadow-[10px_10px_35px_rgba(0,0,0,0.6)] border-l-[8px] border-[#1D0606] flex flex-col justify-between p-8 sm:p-10 select-none overflow-hidden"
      whileHover={{
        scale: isEnding && !isUnsealed ? 1 : 1.02,
        boxShadow: '15px 15px 45px rgba(0,0,0,0.7)',
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Golden Filigree Decorative Framing */}
      <div className="absolute inset-4 border-2 border-gold/30 pointer-events-none rounded-sm" />
      <div className="absolute inset-5 border border-gold/15 pointer-events-none rounded-xs" />
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold/40 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold/40 pointer-events-none" />

      {/* Subtle cover shine */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/3 to-transparent pointer-events-none -skew-y-12" />

      {/* Top Header Sparkle */}
      <div className="flex justify-center mt-6 text-gold/30">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>

      {/* Main Title Center Block */}
      <div className="text-center my-auto flex flex-col items-center">
        {!isEnding ? (
          /* Normal Front Cover */
          <>
            <motion.h1
              className="font-serif text-4xl sm:text-5xl text-gold font-light tracking-wide italic leading-normal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              For Khushi
            </motion.h1>
            <div className="h-[2px] w-24 bg-gold/30 my-4" />
            <motion.p
              className="font-body text-xs sm:text-sm text-paper/60 uppercase tracking-widest mt-1 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              A Few Pages I Need You To Read
            </motion.p>
          </>
        ) : (
          /* Ending Back Cover containing Wax Seal */
          <>
            <motion.h1
              className="font-serif text-3xl sm:text-4xl text-gold font-light tracking-wide italic leading-normal"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Thank You For Reading
            </motion.h1>
            <div className="h-[2px] w-32 bg-gold/20 my-4" />
            
            {/* Embedded Wax Seal Interaction */}
            <div className="pointer-events-auto my-2 z-20">
              <WaxSeal onUnseal={onUnsealSecret} isUnsealed={isUnsealed} />
            </div>
          </>
        )}
      </div>

      {/* Bottom Invitation */}
      <div className="text-center mb-4">
        {!isEnding ? (
          <motion.button
            id="open-book-btn"
            onClick={onOpen}
            className="px-6 py-2 border border-gold/40 text-gold hover:bg-gold/10 text-xs uppercase tracking-widest font-mono cursor-pointer pointer-events-auto transition-all rounded-xs shadow-xs hover:shadow-md active:scale-95 flex items-center gap-2 mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <BookOpen className="w-4 h-4" />
            <span>Open when you're ready</span>
          </motion.button>
        ) : (
          <p className="font-handwritten text-lg text-paper/40 italic">
            With eternal sincerity, Mohit
          </p>
        )}
      </div>
    </motion.div>
  );
};
