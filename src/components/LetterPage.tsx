import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, AlertCircle, Heart, FileText, X } from 'lucide-react';
import { keepsakeAudio } from '../utils/audio';

export const LetterPage: React.FC = () => {
  const [isUnfolded, setIsUnfolded] = useState(false);

  const handleToggleFold = () => {
    keepsakeAudio.playPaperUnfoldSound();
    setIsUnfolded(!isUnfolded);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 paper-texture relative overflow-hidden select-none">
      {/* Small binding/crease shadow */}
      <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />

      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter IX
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1 mb-2">
          The Letter
        </h2>
        <p className="font-body text-xs sm:text-sm text-ink/75 leading-relaxed italic max-w-sm">
          Words written down are permanent proof of where my thoughts rest when they seek total peace.
        </p>
      </div>

      {/* The Envelope / Folded Letter Widget */}
      <div className="my-auto flex flex-col items-center justify-center py-4">
        <AnimatePresence mode="wait">
          {!isUnfolded ? (
            /* Folded state: A neat folded letter card */
            <motion.div
              key="folded"
              id="folded-letter-widget"
              onClick={handleToggleFold}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 12px 24px rgba(45,36,28,0.15)',
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-[280px] sm:max-w-[320px] bg-[#EFE9DF] border-2 border-[#D7CCBC] p-6 shadow-md rounded-xs cursor-pointer flex flex-col items-center justify-center select-none text-center relative border-dashed pointer-events-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              {/* Ribbon outline */}
              <div className="absolute inset-2 border border-[#8B5E3C]/20 pointer-events-none rounded-xs" />
              
              <Mail className="w-12 h-12 text-[#8B5E3C]/60 mb-4 animate-pulse" />

              <p className="font-handwritten text-2xl text-ink font-medium">
                To My Khushi
              </p>
              
              <p className="font-body text-[10px] text-accent/70 tracking-widest uppercase mt-3 select-none">
                Click to unfold
              </p>

              {/* Little red faux sticker seal */}
              <div className="absolute -bottom-3 right-4 w-7 h-7 bg-[#8A1F1F] rounded-full border border-[#631414] shadow-xs flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-[#FFD700]/80 fill-[#FFD700]/30" />
              </div>
            </motion.div>
          ) : (
            /* Unfolded active reading overlay / state */
            <motion.div
              key="unfolded"
              id="unfolded-letter-container"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Overlay Backdrop */}
              <div
                id="unfolded-backdrop"
                onClick={handleToggleFold}
                className="absolute inset-0 bg-[#2D241C]/55 backdrop-blur-xs cursor-zoom-out"
              />

              {/* The expanded Letter page itself */}
              <motion.div
                id="unfolded-letter-paper"
                className="relative bg-[#FBF9F4] border border-[#D7CCBC] shadow-2xl p-6 sm:p-10 max-w-lg w-full max-h-[85vh] overflow-y-auto flex flex-col pointer-events-auto rounded-xs scrollbar-thin"
                initial={{ scale: 0.9, y: 30, rotate: -1 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.9, y: 30, rotate: 1 }}
                transition={{ type: 'spring', damping: 25 }}
              >
                {/* Antique wax header strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent/40 via-gold/40 to-accent/40" />

                <button
                  id="close-letter-btn"
                  onClick={handleToggleFold}
                  className="absolute top-3 right-3 text-ink/40 hover:text-ink hover:bg-ink/5 p-1.5 rounded-full cursor-pointer transition-all"
                  title="Fold back"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Date header */}
                <span className="text-[11px] font-mono tracking-wider text-accent/50 text-right mb-6 select-none block">
                  MIDNIGHT THOUGHTS • SCRAPBOOK EDITION
                </span>

                <h3 className="font-handwritten text-4xl text-accent pb-2 border-b border-accent/15 mb-6 leading-none">
                  Dear Khushi,
                </h3>

                {/* Sincere Content */}
                <div id="unfolded-letter-content" className="space-y-4 font-body text-ink/90 text-sm sm:text-base leading-relaxed text-justify">
                  <p>
                    I wrote these words because sometimes, in the noise of everything else, what's most real gets drowned out. There is something I need you to know with absolute, unwavering clarity: <strong className="text-accent">you are my present, and you are my future.</strong>
                  </p>
                  
                  <p>
                    When I look at my life, and when I think about what it means to be understood and taken care of, my thoughts lead directly to you. In the past, I might have walked through chapters that were confusing or incomplete—chapters where I was younger, learning, and trying to navigate what it meant to care. But all of those minor steps were simply the road that brought me to a version of myself capable of loving you exactly the way you deserve to be loved.
                  </p>

                  <p>
                    There is no competition, Khushi. There is no standard you have to measure up to, no ghost you have to chase, and no shadow you have to stand behind. The history of before was just practice for the real thing. What we have built—the jokes, the late-night quiet, the trust that needs no words—is something completely and entirely unique. You have filled parts of my heart I didn't even realize were sitting empty.
                  </p>

                  <p>
                    I chose you. I choose you every single day when I wake up, and I will continue choosing you through every breeze and storm that comes our way. Thank you for staying, for trusting me, and for being the most warm, irreplaceably beautiful piece of my life.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-8 pt-6 border-t border-accent/10 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-mono text-accent/60 uppercase tracking-widest leading-none">
                      With all my love,
                    </p>
                    <p className="font-script text-3xl text-accent mt-2 leading-none">
                      Mohit
                    </p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Heart className="w-5 h-5 text-[#8A1F1F] fill-[#8A1F1F]/60" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[11px] font-mono text-accent/40 text-center select-none italic mt-2">
        * Folded carefully as a keepsake
      </p>
    </div>
  );
};
