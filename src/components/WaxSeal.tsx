import React, { useState } from 'react';
import { motion } from 'motion/react';
import { keepsakeAudio } from '../utils/audio';

interface WaxSealProps {
  onUnseal: () => void;
  isUnsealed: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({ onUnseal, isUnsealed }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isUnsealed) {
      keepsakeAudio.playPaperUnfoldSound();
      onUnseal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 select-none">
      <motion.div
        id="wax-seal-container"
        className="relative cursor-pointer"
        whileHover={{ scale: isUnsealed ? 1 : 1.05 }}
        whileTap={{ scale: isUnsealed ? 1 : 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Absolute glow ring around seal */}
        {!isUnsealed && (
          <motion.div
            className="absolute -inset-4 rounded-full bg-gold/15 blur-md"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
        )}

        {/* Wax Seal Body */}
        <motion.div
          id="wax-seal-body"
          className="relative w-20 h-20 rounded-full bg-[#8A1F1F] border-2 border-[#631414] shadow-lg flex items-center justify-center"
          animate={
            isUnsealed
              ? {
                  scale: [1, 0.8, 1.2],
                  opacity: 0,
                  rotate: [0, -10, 45],
                  y: -50,
                  transition: { duration: 0.8, ease: 'easeInOut' },
                }
              : {}
          }
          style={{
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4), 0 6px 12px rgba(0,0,0,0.3)',
          }}
        >
          {/* Rough edge look */}
          <div className="absolute -inset-1.5 rounded-full border-[3px] border-dashed border-[#A72B2B]/45 mix-blend-overlay" />
          <div className="absolute w-16 h-16 rounded-full border border-[#520E0E] bg-[#9C2424] shadow-inner flex items-center justify-center">
            {/* Stamp monogram inside the seal */}
            <span className="font-serif text-2xl font-semibold text-[#FFD700]/70 select-none tracking-widest leading-none">
              K
            </span>
          </div>
        </motion.div>

        {/* Small split pieces if unsealed */}
        {isUnsealed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="absolute w-10 h-10 rounded-full bg-[#8A1F1F] border border-[#631414]"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
              animate={{ x: -40, y: 20, rotate: -35, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.7 }}
            />
            <motion.div
              className="absolute w-10 h-10 rounded-full bg-[#8A1F1F] border border-[#631414]"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.8 }}
              animate={{ x: 40, y: -15, rotate: 45, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.7 }}
            />
          </div>
        )}
      </motion.div>

      {!isUnsealed && (
        <motion.p
          className="text-xs font-handwritten text-accent/60 mt-4 tracking-wide text-center"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Break Wax Seal to Read
        </motion.p>
      )}
    </div>
  );
};
