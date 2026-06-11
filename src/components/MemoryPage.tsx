import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Camera, ZoomIn, X } from 'lucide-react';
import { keepsakeAudio } from '../utils/audio';
import favSmile from '../assets/favsmile.jpeg';
import favMoment from '../assets/favmoment.jpeg';
import hOther from '../assets/hother.mp4';

interface PhotoData {
  id: string;
  caption: string;
  rotation: number;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  detailDescription: string;
}

export const MemoryPage: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);

  const photos: PhotoData[] = [
    {
      id: 'smile',
      caption: 'My favorite smile.',
      rotation: -5,
      mediaType: 'image',
      mediaSrc: favSmile,
      detailDescription: "The cutest smile in the world",
    },
    {
      id: 'memory',
      caption: 'Our favorite memory.',
      rotation: 4,
      mediaType: 'image',
      mediaSrc: favMoment,
      detailDescription: "The cheek grab should tell you",
    },
    {
      id: 'day',
      caption: 'Hottest girl.',
      rotation: -2,
      mediaType: 'video',
      mediaSrc: hOther,
      detailDescription: "Hottest diva to ever exist",
    },
  ];

  const handlePhotoClick = (photo: PhotoData) => {
    keepsakeAudio.playPaperUnfoldSound();
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    keepsakeAudio.playPaperUnfoldSound();
    setSelectedPhoto(null);
  };

  // New function to correctly handle real images and videos
  const renderMedia = (photo: PhotoData, isDetail = false) => {
    const sizeClasses = isDetail ? 'w-full max-h-[60vh] object-contain' : 'w-full h-32 sm:h-40 object-cover';

    if (photo.mediaType === 'video') {
      return (
        <video
          src={photo.mediaSrc}
          className={`${sizeClasses} bg-black`}
          controls={isDetail} // Playback controls only inside the expanded popup
          autoPlay={!isDetail} // Optional: autoplay small previews
          muted // Muted to ensure autoplay works seamlessly across browsers
          loop
          playsInline
        />
      );
    }

    return (
      <img
        src={photo.mediaSrc}
        alt={photo.caption}
        className={sizeClasses}
        loading="lazy"
      />
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 paper-texture relative overflow-hidden select-none">
      {/* Decorative Scrapbook borders */}
      <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-accent/20" />
      
      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter VI
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1 mb-3">
          Our Memories
        </h2>
        <p className="font-body text-xs sm:text-sm text-ink/75 leading-relaxed italic max-w-sm">
          A physical scrapbook gathers dusty pages, but these feelings live in high resolution inside my heart.
        </p>
      </div>

      {/* Polaroid Layout Grid */}
      <div className="grid grid-cols-3 gap-3 my-auto pt-4 relative">
        {photos.map((p) => (
          <motion.div
            key={p.id}
            id={`polaroid-wrapper-${p.id}`}
            onClick={() => handlePhotoClick(p)}
            style={{ rotate: p.rotation }}
            className="bg-white p-2 pb-5 border border-black/10 shadow-md flex flex-col cursor-zoom-in group select-none pointer-events-auto relative"
            whileHover={{
              scale: 1.06,
              rotate: p.rotation > 0 ? p.rotation - 2 : p.rotation + 2,
              boxShadow: '0 10px 20px rgba(45,36,28,0.18)',
              zIndex: 10,
            }}
          >
            {/* Glossy Cellotape Strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 bg-paper/60 backdrop-blur-[1px] -rotate-3 border-x border-accent/5 opacity-70 z-10" />
            
            {/* The photo space inside Polaroid */}
            <div className="bg-[#EEE] overflow-hidden relative aspect-square sm:aspect-auto">
              {renderMedia(p, false)}
              
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors flex items-center justify-center">
                <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
              </div>
            </div>

            {/* Polaroid Handwriting label */}
            <p className="font-handwritten text-[#3D2F22] text-center text-sm sm:text-base pt-3 select-none leading-none">
              {p.caption}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="text-[11px] font-mono text-accent/40 text-center select-none italic">
        * Click any polaroid to look closer
      </p>

      {/* Detail overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              id="selected-polaroid-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-[#2D241C]/50 backdrop-blur-xs cursor-zoom-out"
            />

            <motion.div
              id="selected-polaroid-panel"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white p-4 sm:p-6 pb-8 border border-black/15 shadow-2xl rounded-xs max-w-md w-full relative pointer-events-auto flex flex-col"
            >
              <button
                id="close-modal-btn"
                onClick={handleClose}
                className="absolute top-4 right-4 text-black/40 hover:text-black hover:bg-black/5 p-1 rounded-full cursor-pointer transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image/Video view */}
              <div className="bg-[#EEE] overflow-hidden border border-black/5 rounded-xs mt-2 flex items-center justify-center">
                {renderMedia(selectedPhoto, true)}
              </div>

              {/* Handwritten title */}
              <h3 className="font-handwritten text-3xl text-accent text-center pt-5 pb-2 leading-none border-b border-accent/10">
                {selectedPhoto.caption}
              </h3>

              {/* Emotional backstory message */}
              <p className="font-body text-sm text-ink/80 leading-relaxed italic text-center pt-4 px-2">
                "{selectedPhoto.detailDescription}"
              </p>

              <div className="flex justify-center items-center gap-1.5 text-[10px] font-mono text-accent/60 mt-6 pt-3 border-t border-accent/5">
                <Camera className="w-3.5 h-3.5" />
                <span>MEMORIES CAPTURED FOR KHUSHI</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};