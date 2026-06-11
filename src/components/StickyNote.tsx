import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, Heart, Star, Sparkles, X } from 'lucide-react';
import { StickyNoteData } from '../types';
import { keepsakeAudio } from '../utils/audio';

interface StickyNoteProps {
  note: StickyNoteData;
  detailedMessage: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ note, detailedMessage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    keepsakeAudio.playPaperUnfoldSound();
    setIsOpen(true);
  };

  const handleClose = () => {
    keepsakeAudio.playPaperUnfoldSound();
    setIsOpen(false);
  };

  // Get sticky icon based on random criteria for handmade vibe
  const renderNoteIcon = () => {
    if (note.id.includes('staying')) return <Heart className="w-5 h-5 text-accent/50 fill-accent/10" />;
    if (note.id.includes('believing')) return <Star className="w-5 h-5 text-gold/60 fill-gold/10" />;
    if (note.id.includes('understanding')) return <Sparkles className="w-5 h-5 text-[#6c5b7b]/50" />;
    return <Smile className="w-5 h-5 text-accent/50" />;
  };

  return (
    <>
      {/* Scattered Note on the page */}
      <motion.div
        id={`sticky-note-preview-${note.id}`}
        style={{
          left: note.x,
          top: note.y,
          rotate: note.rotate,
          transformOrigin: 'top left',
        }}
        onClick={handleOpen}
        whileHover={{
          scale: 1.05,
          rotate: note.rotate + (note.rotate > 0 ? -2 : 2),
          y: -4,
          boxShadow: '0 8px 16px rgba(45,36,28,0.12)',
          zIndex: 10,
        }}
        className={`absolute w-[140px] sm:w-[170px] min-h-[140px] sm:min-h-[170px] p-4 ${note.color} border border-accent/10 shadow-xs cursor-pointer select-none flex flex-col justify-between transition-shadow pointer-events-auto`}
      >
        {/* Transparent cellotape marker at the top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-paper/40 backdrop-blur-[1px] rotate-1 border-x border-accent/5 opacity-80 shadow-xs" />

        <div className="font-handwritten text-lg sm:text-xl text-ink/80 leading-snug pt-2">
          {note.text}
        </div>

        <div className="flex justify-end pt-2 opacity-60">
          {renderNoteIcon()}
        </div>
      </motion.div>

      {/* Expanded Lightbox Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark fuzzy backdrop overlay */}
            <motion.div
              id="sticky-note-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-[#2D241C]/45 backdrop-blur-xs cursor-zoom-out"
            />

            {/* Note expands */}
            <motion.div
              id={`sticky-note-modal-${note.id}`}
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative max-w-sm w-full p-8 ${note.color} border border-accent/20 shadow-2xl flex flex-col pointer-events-auto rounded-xs`}
            >
              {/* Retro metallic binder clip or paper tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-7 bg-paper border-b border-accent/15 flex items-center justify-center shadow-xs">
                <span className="w-10 h-0.5 bg-accent/30" />
              </div>

              <button
                id="close-sticky-btn"
                onClick={handleClose}
                className="absolute top-3 right-3 text-ink/40 hover:text-ink hover:bg-ink/5 p-1 rounded-full cursor-pointer transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="font-handwritten text-3xl text-accent pb-1 border-b border-accent/10 mb-4 select-none mt-2">
                {note.text}
              </h2>

              <p className="font-body text-sm sm:text-base text-ink/90 leading-relaxed italic pr-1">
                "{detailedMessage}"
              </p>

              <div className="flex justify-between items-center mt-6 pt-3 border-t border-accent/5 text-[10px] font-mono text-accent/50">
                <span>MEMORIES CHERISHED</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#A84444] fill-[#A84444]" /> FOR KHUSHI
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
