'use client';

import React from 'react';
import Image from 'next/image';
import { useCanvasStore } from '@/store/useCanvasStore';
import { FLOWER_ASSETS, GREENERY_ASSETS, DECO_ASSETS } from '@/lib/assets';
import { Button } from '@/components/ui/button';

interface WriteCardProps {
  onBack: () => void;
  onNext: () => void;
}

export const WriteCard = ({ onBack, onNext }: WriteCardProps) => {
  const { hiddenMessage, setMessage, recipient, setRecipient, sender, setSender } = useCanvasStore();

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-[#FDFBF7] relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-[#111827] italic mb-12" style={{ fontFamily: 'var(--font-playfair)' }}>
          Write Your Sentiment
        </h2>

        <div className="flex items-center justify-center gap-12 w-full max-w-6xl relative">
          {/* Left Decorative Flowers */}
          <div className="hidden lg:flex flex-col gap-4 opacity-40">
            <Image src={FLOWER_ASSETS.Daisy} alt="" width={100} height={100} className="rotate-[-15deg] blur-[1px]" />
            <Image src={FLOWER_ASSETS.Anemone} alt="" width={120} height={120} className="ml-8 rotate-[10deg]" />
            <Image src={GREENERY_ASSETS['greenery-1']} alt="" width={150} height={150} className="-mt-4 rotate-[45deg] opacity-50" />
          </div>

          {/* The Card - More like a physical piece of stationery */}
          <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[4/3] bg-[#FEFDFB] border border-[#111827]/10 shadow-[20px_20px_60px_rgba(0,0,0,0.05),-10px_-10px_60px_rgba(255,255,255,0.8)] p-10 md:p-14 flex flex-col rounded-[2px] transform rotate-[-1deg]">
            {/* Fine stationery details */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#111827]/5 pointer-events-none" />
            
            <div className="relative space-y-8 flex flex-col h-full">
              <div className="flex items-baseline gap-4 border-b border-[#111827]/10 pb-2">
                <span className="font-serif italic text-xl text-[#111827]/40">Dear</span>
                <input 
                  type="text" 
                  placeholder="Recipient Name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="border-none focus:ring-0 p-0 text-[#111827] w-full bg-transparent font-serif italic text-2xl placeholder:opacity-20"
                />
              </div>
              
              <textarea
                value={hiddenMessage}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Compose your secret message here..."
                className="flex-1 w-full border-none focus:ring-0 resize-none font-serif text-lg md:text-xl leading-relaxed p-0 text-[#111827] bg-transparent placeholder:opacity-20"
              />

              <div className="pt-4 flex flex-col items-end border-t border-[#111827]/10">
                <span className="font-serif italic text-lg text-[#111827]/40">With love,</span>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="border-none focus:ring-0 p-0 text-[#111827] text-right bg-transparent font-serif italic text-2xl placeholder:opacity-20 w-full"
                />
              </div>
            </div>
          </div>

          {/* Right Decorative Flowers */}
          <div className="hidden lg:flex flex-col gap-4 opacity-40">
            <Image src={FLOWER_ASSETS.Peony} alt="" width={110} height={110} className="rotate-[15deg] blur-[1px]" />
            <Image src={FLOWER_ASSETS.Sunflower} alt="" width={130} height={130} className="-ml-6 rotate-[-5deg]" />
            <Image src={DECO_ASSETS['deco-white']} alt="" width={80} height={80} className="ml-10 opacity-60" />
          </div>
        </div>

        <div className="flex gap-6 mt-16">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="rounded-full border-[#111827] px-10 py-6 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-[#111827] hover:text-white transition-all duration-500"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            className="group relative overflow-hidden bg-[#111827] text-white px-12 py-7 rounded-full font-serif text-xl italic transition-all duration-300 hover:pr-16 active:scale-95 shadow-2xl"
          >
            <span className="relative z-10">Seal & Share</span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
