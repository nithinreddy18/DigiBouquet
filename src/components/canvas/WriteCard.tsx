'use client';

import React from 'react';
import Image from 'next/image';
import { useCanvasStore } from '@/store/useCanvasStore';
import { FLOWER_ASSETS } from '@/lib/assets';
import { Button } from '@/components/ui/button';

interface WriteCardProps {
  onBack: () => void;
  onNext: () => void;
}

export const WriteCard = ({ onBack, onNext }: WriteCardProps) => {
  const { hiddenMessage, setMessage } = useCanvasStore();

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-[#FDFBF7]">
      <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-[#111827] mb-12">
        Write the Card
      </h2>

      <div className="flex items-center justify-center gap-12 w-full max-w-6xl relative">
        {/* Left Decorative Flowers */}
        <div className="hidden lg:flex items-end gap-2 h-48 opacity-80">
          <Image src={FLOWER_ASSETS.Daisy} alt="Daisy" width={80} height={80} className="rotate-[-15deg]" />
          <Image src={FLOWER_ASSETS.Anemone} alt="Anemone" width={100} height={100} className="mb-4" />
          <Image src={FLOWER_ASSETS.Tulip} alt="Tulip" width={90} height={90} className="rotate-[10deg]" />
        </div>

        {/* The Card */}
        <div className="relative w-full max-w-md aspect-[4/3] bg-white border border-[#111827] shadow-sm p-8 flex flex-col">
          <div className="flex items-baseline gap-2 mb-4 font-mono text-sm">
            <span className="font-bold">Dear</span>
            <input 
              type="text" 
              placeholder="Beloved," 
              className="border-none focus:ring-0 p-0 text-[#6B7280] w-full"
            />
          </div>
          
          <textarea
            value={hiddenMessage}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I have so much to tell you, but only this much space on this card! Still, you must know..."
            className="flex-1 w-full border-none focus:ring-0 resize-none font-mono text-sm leading-relaxed p-0 text-[#111827]"
          />

          <div className="mt-4 flex flex-col items-end font-mono text-sm">
            <span className="font-bold">Sincerely,</span>
            <input 
              type="text" 
              placeholder="Secret Admirer" 
              className="border-none focus:ring-0 p-0 text-[#6B7280] text-right"
            />
          </div>
        </div>

        {/* Right Decorative Flowers */}
        <div className="hidden lg:flex items-end gap-2 h-48 opacity-80">
          <Image src={FLOWER_ASSETS.Peony} alt="Peony" width={90} height={90} className="rotate-[-10deg]" />
          <Image src={FLOWER_ASSETS.Sunflower} alt="Sunflower" width={110} height={110} className="mb-2" />
          <Image src={FLOWER_ASSETS.Ranunculus} alt="Ranunculus" width={80} height={80} className="rotate-[15deg]" />
        </div>
      </div>

      <div className="flex gap-4 mt-12">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="rounded-none border-[#111827] px-8 py-4 font-mono text-xs uppercase tracking-widest"
        >
          Back
        </Button>
        <Button 
          onClick={onNext}
          className="rounded-none bg-[#111827] text-white hover:bg-gray-800 px-8 py-4 font-mono text-xs uppercase tracking-widest"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
