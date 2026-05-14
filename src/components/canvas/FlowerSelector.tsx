'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCanvasStore } from '@/store/useCanvasStore';
import { FLOWER_ASSETS, GREENERY_ASSETS, DECO_ASSETS } from '@/lib/assets';
import { FlowerType } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const FLOWER_INFO: Record<FlowerType, { meaning: string; month: string }> = {
  Daisy: { meaning: 'Innocence', month: 'April' },
  Rose: { meaning: 'Love', month: 'June' },
  Peony: { meaning: 'Romance', month: 'November' },
  Sunflower: { meaning: 'Adoration', month: 'August' },
  Zinnia: { meaning: 'Endurance', month: 'N/A' },
  Ranunculus: { meaning: 'Charm', month: 'January' },
  Carnation: { meaning: 'Fascination', month: 'January' },
  Anemone: { meaning: 'Anticipation', month: 'N/A' },
  Dahlia: { meaning: 'Elegance', month: 'August' },
  Orchid: { meaning: 'Beauty', month: 'N/A' },
  Lily: { meaning: 'Purity', month: 'May' },
  Tulip: { meaning: 'Perfect Love', month: 'Spring' },
};

export function FlowerSelector({ onNext }: { onNext: () => void }) {
  const { addFlower, removeFlowerByType, placedFlowers, selectedMode } = useCanvasStore();
  const flowerTypes = Object.keys(FLOWER_ASSETS) as FlowerType[];

  // Count occurrences of each flower type
  const counts = flowerTypes.reduce((acc, type) => {
    acc[type] = placedFlowers.filter(f => f.type === type).length;
    return acc;
  }, {} as Record<FlowerType, number>);

  const totalSelected = placedFlowers.length;

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto pb-48 pt-4 px-6 relative">
      {/* Flower Grid - More organic spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 w-full place-items-center">
        {flowerTypes.map((type, idx) => {
          const count = counts[type];
          // Slight random rotation for the "cluttered" look
          const randomRotate = (idx % 3 === 0 ? 5 : idx % 2 === 0 ? -5 : 0);
          
          return (
            <Tooltip key={type}>
              <TooltipTrigger
                render={
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: randomRotate * 1.5 }}
                    whileTap={{ scale: 0.95 }}
                    role="button"
                    tabIndex={0}
                    onClick={() => addFlower(type)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        addFlower(type);
                      }
                    }}
                    className="relative group w-28 h-28 md:w-36 md:h-36 transition-all duration-300 cursor-pointer outline-none focus:ring-0"
                    style={{ rotate: randomRotate }}
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-xl group-hover:bg-white/50 transition-all duration-500" />
                    <Image
                      src={FLOWER_ASSETS[type]}
                      alt={type}
                      fill
                      sizes="(max-width: 768px) 120px, 180px"
                      className={cn(
                         "object-contain relative z-10 drop-shadow-sm group-hover:drop-shadow-md",
                         selectedMode === 'mono' && "grayscale contrast-[1.2]"
                      )}
                    />
                    {/* Badge - Custom flower shape or just lovely */}
                    {count > 0 && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-[#111827] text-white text-[10px] font-mono w-7 h-7 flex items-center justify-center rounded-full z-20 border-2 border-white shadow-lg"
                      >
                        {count}
                      </motion.div>
                    )}
                  </motion.div>
                }
              />
              <TooltipContent side="bottom" className="bg-[#111827] text-white px-6 py-4 shadow-2xl rounded-2xl z-50 border-none">
                <div className="text-center space-y-2">
                  <div className="font-bold tracking-widest uppercase text-xs italic" style={{ fontFamily: 'var(--font-playfair)' }}>{type}</div>
                  <div className="h-[1px] w-8 bg-white/20 mx-auto" />
                  <div className="font-mono text-[9px] uppercase tracking-tighter opacity-70">Meaning: {FLOWER_INFO[type].meaning}</div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Selected Tags at Bottom - More like a scrapbook */}
      <div className="fixed bottom-28 left-0 right-0 pointer-events-none flex justify-center z-40 px-4">
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl pointer-events-auto">
          {flowerTypes.map((type) => {
            if (counts[type] === 0) return null;
            return (
              <motion.button
                key={`tag-${type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                type="button"
                onClick={() => removeFlowerByType(type)}
                className="px-5 py-2 rounded-lg border border-dashed border-[#111827]/30 bg-white/80 backdrop-blur-sm text-[#111827] text-[10px] font-mono uppercase hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all shadow-sm flex items-center gap-2"
              >
                <span>{type}</span>
                <span className="opacity-40">×</span>
                <span className="font-bold">{counts[type]}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Next Button - Matching landing page style */}
      {totalSelected > 0 && (
        <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50 px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Button
              type="button"
              onClick={onNext}
              className="group relative overflow-hidden bg-[#111827] text-white px-12 py-7 rounded-full font-serif text-xl italic transition-all duration-300 hover:pr-16 active:scale-95 shadow-2xl"
            >
              <span className="relative z-10">Arrange Bouquet ({totalSelected})</span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
