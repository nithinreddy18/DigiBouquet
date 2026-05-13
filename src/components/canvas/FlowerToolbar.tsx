'use client';

import React from 'react';
import Image from 'next/image';
import { useCanvasStore } from '@/store/useCanvasStore';
import { FLOWER_ASSETS } from '@/lib/assets';
import { FlowerType } from '@/types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const FlowerToolbar = () => {
  const { addFlower, selectedMode } = useCanvasStore();

  const flowerTypes = Object.keys(FLOWER_ASSETS) as FlowerType[];

  return (
    <div className="w-full max-w-[600px] mx-auto mt-8">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border p-4 bg-white/50 backdrop-blur-sm">
        <div className="flex w-max space-x-4 p-4">
          {flowerTypes.map((type) => (
            <button
              key={type}
              onClick={() => addFlower(type)}
              className="group relative flex flex-col items-center space-y-2 transition-transform hover:scale-110 active:scale-95"
            >
              <div className="w-16 h-16 relative">
                <Image
                  src={FLOWER_ASSETS[type]}
                  alt={type}
                  fill
                  className={cn(
                    "object-contain",
                    selectedMode === 'mono' && "grayscale contrast-[1.2]"
                  )}
                />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {type}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
