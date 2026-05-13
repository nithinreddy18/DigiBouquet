'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCanvasStore } from '@/store/useCanvasStore';
import { FLOWER_ASSETS } from '@/lib/assets';
import { FlowerType } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-32 pt-8">
      {/* Flower Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 w-full place-items-center">
        {flowerTypes.map((type) => {
          const count = counts[type];
          return (
            <Tooltip key={type}>
              <TooltipTrigger
                render={
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => addFlower(type)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        addFlower(type);
                      }
                    }}
                    className="relative group w-24 h-24 md:w-32 md:h-32 transition-transform hover:scale-105 active:scale-95 cursor-pointer outline-none focus:ring-0"
                  >
                    <Image
                      src={FLOWER_ASSETS[type]}
                      alt={type}
                      fill
                      sizes="(max-width: 768px) 100px, 150px"
                      className={cn(
                        "object-contain",
                        selectedMode === 'mono' && "grayscale contrast-[1.2]"
                      )}
                    />
                    {/* Badge */}
                    {count > 0 && (
                      <div className="absolute -top-2 -right-2 bg-[#111827] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full z-10 border-2 border-[#FAFAFA]">
                        {count}
                      </div>
                    )}
                  </div>
                }
              />
              <TooltipContent side="bottom" className="bg-[#FAFAFA] border border-[#111827] text-[#111827] px-4 py-3 shadow-md rounded-md z-50">
                <div className="text-center space-y-1">
                  <div className="font-bold tracking-widest uppercase text-sm">{type}</div>
                  <div className="font-mono text-xs opacity-80">{FLOWER_INFO[type].meaning}</div>
                  <div className="font-mono text-xs opacity-80">Birth Month: {FLOWER_INFO[type].month}</div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Selected Tags at Bottom */}
      <div className="fixed bottom-24 left-0 right-0 pointer-events-none flex justify-center z-40 px-4">
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl pointer-events-auto">
          {flowerTypes.map((type) => {
            if (counts[type] === 0) return null;
            return (
              <button
                key={`tag-${type}`}
                type="button"
                onClick={() => removeFlowerByType(type)}
                className="px-4 py-1.5 rounded-full border border-[#111827] bg-[#FAFAFA] text-[#111827] text-xs font-mono uppercase hover:bg-gray-100 transition-colors shadow-sm"
              >
                {type} x{counts[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      {totalSelected > 0 && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-4 animate-in slide-in-from-bottom-4">
          <Button
            type="button"
            onClick={onNext}
            className="min-h-[44px] flex items-center justify-center px-10 py-6 bg-[#111827] text-white rounded-full font-medium transition-all duration-200 hover:bg-gray-800 active:scale-95 shadow-md tracking-wide"
          >
            ARRANGE BOUQUET ({totalSelected})
          </Button>
        </div>
      )}
    </div>
  );
}
