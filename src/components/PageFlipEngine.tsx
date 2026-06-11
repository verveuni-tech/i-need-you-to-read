import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RefreshCw, Star, Heart } from 'lucide-react';
import { keepsakeAudio } from '../utils/audio';

// Import All Page Components
import { PageDearYou } from './PageDearYou';
import { PageTheFear } from './PageTheFear';
import { PageTheTruth } from './PageTheTruth';
import { PageThenVsNow } from './PageThenVsNow';
import { PageWhatLoveFeels } from './PageWhatLoveFeels';
import { MemoryPage } from './MemoryPage';
import { PageThingsIDontSay } from './PageThingsIDontSay';
import { PageTheReassurance } from './PageTheReassurance';
import { LetterPage } from './LetterPage';
import { PageFinalChapter } from './PageFinalChapter';
import { BookCover } from './BookCover';

export const PageFlipEngine: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0); // 0 is cover, 1..10 is pages, 11 is ending cover
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isUnsealed, setIsUnsealed] = useState<boolean>(false);
  const [showSecretMessage, setShowSecretMessage] = useState<boolean>(false);

  // Touch handlers for mobile swipe guestures
  const touchStartX = useRef<number | null>(null);

  const totalPages = 11; // Cover (0) + 10 content pages + Ending Cover (11)

  const playFlip = (dir: 'next' | 'prev') => {
    if (isFlipping) return;
    setFlipDirection(dir);
    setIsFlipping(true);
    keepsakeAudio.playPageFlipSound();

    // The midpoint of 1000ms animation (500ms) is when the page is vertically flipped
    // That is the perfect time to switch the active page index underneath
    setTimeout(() => {
      if (dir === 'next') {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      } else {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    }, 500);

    // Reset flipping state at completion of animation
    setTimeout(() => {
      setIsFlipping(false);
    }, 1000);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !isFlipping) {
      playFlip('next');
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      playFlip('prev');
    }
  };

  // Support mobile swipes
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // Threshold of 60px swipe
    if (diffX > 60) {
      // Swiped Left -> go next
      handleNextPage();
    } else if (diffX < -60) {
      // Swiped Right -> go prev
      handlePrevPage();
    }
    touchStartX.current = null;
  };

  // Render individual page contents based on physical index
  const renderPageContent = (pageIndex: number) => {
    switch (pageIndex) {
      case 1:
        return <PageDearYou />;
      case 2:
        return <PageTheFear />;
      case 3:
        return <PageTheTruth />;
      case 4:
        return <PageThenVsNow />;
      case 5:
        return <PageWhatLoveFeels />;
      case 6:
        return <MemoryPage />;
      case 7:
        return <PageThingsIDontSay />;
      case 8:
        return <PageTheReassurance />;
      case 9:
        return <LetterPage />;
      case 10:
        return <PageFinalChapter />;
      default:
        return null;
    }
  };

  const handleUnsealSecret = () => {
    setIsUnsealed(true);
    // Short romantic delay before showing modal
    setTimeout(() => {
      setShowSecretMessage(true);
    }, 1200);
  };

  const handleRestart = () => {
    keepsakeAudio.playPageFlipSound();
    setCurrentPage(0);
    setIsUnsealed(false);
    setShowSecretMessage(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[85vh] py-10 px-4 md:px-8 select-none relative">
      
      {/* Absolute floating controls or page-stack guide indicator */}
      {currentPage > 0 && currentPage <= 10 && (
        <div className="text-xs font-mono text-accent/50 tracking-widest uppercase mb-4 text-center select-none">
          Chapter {currentPage} of 10
        </div>
      )}

      {/* Main 3D Book Container */}
      <div
        id="book-3d-scene"
        className="relative w-full max-w-[380px] sm:max-w-[430px] aspect-[3/4] book-perspective flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Layered Paper Stacking Lines (reveals underlying book thickness block on right or left sides) */}
        {currentPage > 0 && currentPage < 11 && (
          <div className="absolute inset-0 pointer-events-none select-none">
            {/* Underlying Stack - Left Side edge shadows */}
            <div
              className="absolute top-1 bottom-1 left-[-4px] w-2 bg-[#E1D3BF] border border-accent/10 rounded-l-xs shadow-xs"
              style={{ transform: `scaleY(0.995) rotate(-0.5deg)` }}
            />
            <div
              className="absolute top-2 bottom-2 left-[-8px] w-2 bg-[#D1C3AF] border border-accent/10 rounded-l-xs opacity-70"
              style={{ transform: `scaleY(0.98) rotate(-1deg)` }}
            />

            {/* Underlying Stack - Right Side edge shadows */}
            <div
              className="absolute top-1 bottom-1 right-[-4px] w-2 bg-[#E1D3BF] border border-accent/10 rounded-r-xs shadow-xs"
              style={{ transform: `scaleY(0.995) rotate(0.5deg)` }}
            />
            <div
              className="absolute top-2 bottom-2 right-[-8px] w-2 bg-[#D1C3AF] border border-accent/10 rounded-r-xs opacity-70"
              style={{ transform: `scaleY(0.98) rotate(1deg)` }}
            />
          </div>
        )}

        {/* 1. FRONT COVER */}
        {currentPage === 0 && (
          <BookCover
            isEnding={false}
            onOpen={handleNextPage}
            onUnsealSecret={() => {}}
            isUnsealed={false}
          />
        )}

        {/* 2. PAPER BOOK PAGES RENDERING */}
        {currentPage > 0 && currentPage <= 10 && (
          <div
            id={`book-page-leaf-${currentPage}`}
            className="w-full h-full bg-paper rounded-xs shadow-[5px_5px_22px_rgba(45,36,28,0.25)] border border-[#E5DECD] relative flex flex-col justify-between overflow-hidden cursor-default transition-all duration-300"
          >
            {/* Core Page Contents */}
            <div className="w-full h-full relative pointer-events-auto">
              {renderPageContent(currentPage)}
            </div>

            {/* Left and Right Page-Turning interactive tap regions (corners) */}
            <div
              id="tap-left-corner"
              onClick={handlePrevPage}
              className="absolute left-0 bottom-0 w-16 h-16 bg-gradient-to-tr from-accent/5 to-transparent cursor-pointer pointer-events-auto flex items-end p-2 text-accent/20 hover:text-accent/60 transition-colors"
              title="Previous Page"
            >
              <div className="w-3 h-3 border-b border-l border-accent/40" />
            </div>

            <div
              id="tap-right-corner"
              onClick={handleNextPage}
              className="absolute right-0 bottom-0 w-16 h-16 bg-gradient-to-tl from-accent/5 to-transparent cursor-pointer pointer-events-auto flex items-end justify-end p-2 text-accent/20 hover:text-accent/60 transition-colors"
              title="Next Page"
            >
              <div className="w-3 h-3 border-b border-r border-accent/40" />
            </div>

            {/* Center seam shadow of real physical book spine */}
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
          </div>
        )}

        {/* 3. END COVER (SECRET REACTION) */}
        {currentPage === totalPages && (
          <BookCover
            isEnding={true}
            onOpen={() => {}}
            onUnsealSecret={handleUnsealSecret}
            isUnsealed={isUnsealed}
          />
        )}

        {/* 3D Page flip leaf overlay animation */}
        <AnimatePresence>
          {isFlipping && (
            <motion.div
              id="flipping-leaf-3d"
              className="absolute inset-0 bg-[#E8E1D3] rounded-xs z-40 preserve-3d"
              style={{
                transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
                boxShadow: '10px 10px 30px rgba(0,0,0,0.15)',
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flipDirection === 'next' ? -180 : 180 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            >
              {/* Paper texture during rotation */}
              <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />
              {/* Spine shading during flip */}
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/10 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/10 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation controls underneath the book */}
      {currentPage > 0 && (
        <div className="flex items-center gap-6 mt-8 pointer-events-auto z-30">
          <button
            id="nav-prev-btn"
            onClick={handlePrevPage}
            disabled={isFlipping}
            className="w-10 h-10 rounded-full border border-accent/20 bg-paper/70 hover:bg-paper text-accent flex items-center justify-center transition-all cursor-pointer hover:shadow-xs active:scale-95 disabled:opacity-40"
            title="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Centered navigation ribbon detailing chapters */}
          <span className="font-handwritten text-xl text-accent/80 font-medium select-none text-center min-w-[130px]">
            {currentPage === totalPages ? 'The Backcover' : `Page ${currentPage} of 10`}
          </span>

          {currentPage < totalPages ? (
            <button
              id="nav-next-btn"
              onClick={handleNextPage}
              disabled={isFlipping}
              className="w-10 h-10 rounded-full border border-accent/20 bg-paper/70 hover:bg-paper text-accent flex items-center justify-center transition-all cursor-pointer hover:shadow-xs active:scale-95 disabled:opacity-40"
              title="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            isUnsealed && (
              <button
                id="restart-book-btn"
                onClick={handleRestart}
                className="w-10 h-10 rounded-full border border-[#C9A26B]/40 bg-gold/10 hover:bg-gold/20 text-[#C9A26B] flex items-center justify-center transition-all cursor-pointer hover:shadow-xs active:scale-95"
                title="Restart Book"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      )}

      {/* Wax Seal / Star Climax Overlay Hidden modal */}
      <AnimatePresence>
        {showSecretMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              id="secret-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecretMessage(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-zoom-out"
            />

            <motion.div
              id="secret-modal-envelope"
              initial={{ scale: 0.88, opacity: 0, rotate: 1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative bg-gradient-to-b from-[#FAF8F5] to-[#F1ECE3] border-4 border-[#C9A26B] shadow-[0px_20px_60px_rgba(0,0,0,0.5)] p-8 sm:p-12 max-w-md w-full text-center rounded-xs select-none border-double pointer-events-auto"
            >
              {/* Glossy corner sparkles */}
              <Star className="w-6 h-6 text-gold absolute top-4 left-4 animate-spin-slow opacity-60" style={{ animationDuration: '8s' }} />
              <Star className="w-6 h-6 text-gold absolute bottom-4 right-4 animate-spin-slow opacity-60" style={{ animationDuration: '8s' }} />

              <span className="text-xs font-mono text-accent/50 tracking-widest uppercase block mb-4">
                THE FINAL RECOVERY
              </span>

              {/* Heart signature indicator */}
              <div className="w-12 h-12 bg-[#8A1F1F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-6 h-6 text-[#8A1F1F] fill-[#8A1F1F]" />
              </div>

              {/* Secret Climax text */}
              <p className="font-serif text-2xl sm:text-3xl text-ink font-light italic leading-loose mb-6">
                "There was never another person I wanted to convince."
              </p>

              <p className="font-handwritten text-4xl sm:text-5xl text-accent font-bold tracking-wide mb-8 animate-pulse">
                "Only you."
              </p>

              <div className="h-[1px] w-20 bg-accent/20 mx-auto mb-6" />

              <motion.button
                id="close-secret-btn"
                onClick={() => setShowSecretMessage(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-accent text-paper font-handwritten text-xl rounded-full cursor-pointer transition-colors shadow-xs"
              >
                Close with love
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
