import React from 'react';
import { Heart } from 'lucide-react';

export const PageDearYou: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 paper-texture relative select-none">
      {/* Antique border accents */}
      <div className="absolute top-0 bottom-0 left-2 w-[1px] border-l border-dashed border-accent/20" />

      {/* Chapter Indicator */}
      <div>
        <span className="text-[11px] font-mono tracking-widest text-[#C9A26B] uppercase font-bold">
          Chapter I
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-tight mt-1">
          Dear You
        </h2>
      </div>

      {/* Sincere Content with roomy margins */}
      <div id="dear-you-content" className="my-auto max-w-sm mx-auto space-y-4 text-justify px-2">
        <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed italic">
          "I know there are nights when your mind starts to whisper doubts. I know there are times when you wonder, silently, if there is some hidden comparison you're constantly measured against."
        </p>
        
        <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed mb-6 italic">
          "I am writing this because those thoughts, though natural, couldn't be further from the truth. I understand why you feel the way you do. And I want to make you feel as chosen and irreplaceably safe as you truly are."
        </p>
      </div>

      {/* Signature section */}
      <div className="flex justify-between items-end border-t border-accent/10 pt-4">
        <div>
          <p className="text-[10px] font-mono text-accent/50 uppercase tracking-widest">
            Always yours,
          </p>
          <p className="font-script text-2xl text-accent leading-none mt-1">
            Mohit
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent/40 italic">
          <Heart className="w-3 h-3 text-[#A84444]" /> Page 1 of 10
        </div>
      </div>
    </div>
  );
};
