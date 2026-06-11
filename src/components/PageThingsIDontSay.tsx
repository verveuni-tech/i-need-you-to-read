import React from 'react';
import { StickyNote } from './StickyNote';
import { StickyNoteData } from '../types';
import { Heart } from 'lucide-react';

export const PageThingsIDontSay: React.FC = () => {
  const notes: StickyNoteData[] = [
    {
      id: 'staying',
      text: 'Thank you for staying.',
      x: '5%',
      y: '22%',
      rotate: -5,
      color: 'bg-[#FDF9ED]'
    },
    {
      id: 'believing',
      text: 'Thank you for believing in me.',
      x: '51%',
      y: '18%',
      rotate: 4,
      color: 'bg-[#FAF2DF]'
    },
    {
      id: 'understanding',
      text: 'Thank you for understanding me.',
      x: '4%',
      y: '58%',
      rotate: 6,
      color: 'bg-[#F6EFE0]'
    },
    {
      id: 'loving',
      text: 'Thank you for loving me.',
      x: '52%',
      y: '56%',
      rotate: -4,
      color: 'bg-[#FAF0D5]'
    }
  ];

  // Detailed stories showing true love and gratitude
  const detailMessages: Record<string, string> = {
    staying: "Walking in step was never about having a trouble-free run. It was about knowing you would stand beside me to face each struggle, never letting go of my hand, and choosing me over and over.",
    believing: "Even on days when my own direction feels blurred, your belief in my heart and values serves as my quiet compass. It makes me want to be the honorable person you see in me.",
    understanding: "You read the gaps between my words. You notice when I am walking with heavy shoulders, and you ask questions that lighten the weight. Your patience is my favorite place of safety.",
    loving: "In every quiet smile and uncomplicated day. Your love doesn't require performance or proof—it is a calm, deep river, and I am incredibly grateful to stand beside you in it."
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-8 paper-texture relative overflow-hidden select-none">
      <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-accent/20" />

      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter VII
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1 mb-2">
          Things I Don't Say Enough
        </h2>
        <p className="font-body text-xs sm:text-sm text-ink/70 leading-relaxed italic max-w-sm">
          Simple things, written on scrap notes of my day, because you deserve to have them pinned up on your heart.
        </p>
      </div>

      {/* Main scrap paper canvas for scattered StickyNotes */}
      <div className="my-auto relative h-[320px] bg-accent/3 border border-dashed border-accent/10 rounded-xs pointer-events-auto">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 paper-lines opacity-20 pointer-events-none" />

        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            detailedMessage={detailMessages[note.id]}
          />
        ))}
      </div>

      <p className="text-[10px] font-mono text-accent/40 text-center select-none italic">
        * Feel free to tap on each note to read the full letters.
      </p>
    </div>
  );
};
