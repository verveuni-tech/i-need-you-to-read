import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { keepsakeAudio } from '../utils/audio';

interface AudioControllerProps {
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (soundEnabled) {
      keepsakeAudio.startAmbientMusic();
    } else {
      keepsakeAudio.stopAmbientMusic();
    }
    return () => {
      keepsakeAudio.stopAmbientMusic();
    };
  }, [soundEnabled]);

  const handleToggle = () => {
    onToggleSound(!soundEnabled);
    setHasInteracted(true);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      {/* Soft nudge for first-time visitors */}
      {!hasInteracted && !soundEnabled && (
        <span className="hidden md:inline-block text-xs font-handwritten text-accent/80 select-none animate-pulse">
          Listen with music
        </span>
      )}
      
      <button
        id="toggle-audio-btn"
        onClick={handleToggle}
        className={`w-10 h-10 rounded-full border border-accent/20 bg-paper/90 backdrop-blur-xs flex items-center justify-center text-accent/80 hover:text-accent shadow-xs active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer ${
          soundEnabled ? 'shadow-inner ring-1 ring-gold/30' : ''
        }`}
        title={soundEnabled ? 'Mute ambience' : 'Enable ambient piano'}
      >
        {soundEnabled ? (
          <div className="relative">
            <Volume2 className="w-5 h-5" />
            <Music className="w-3 h-3 absolute -top-1.5 -right-1.5 text-gold animate-bounce" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 opacity-60" />
        )}
      </button>
    </div>
  );
};
