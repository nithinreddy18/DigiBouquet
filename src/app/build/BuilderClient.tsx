'use client';

import React, { useEffect, useState } from 'react';
import { BouquetCanvas } from '@/components/canvas/BouquetCanvas';
import { FlowerSelector } from '@/components/canvas/FlowerSelector';
import { WriteCard } from '@/components/canvas/WriteCard';
import { ShareBouquet } from '@/components/canvas/ShareBouquet';
import { useCanvasStore } from '@/store/useCanvasStore';
import { Button } from '@/components/ui/button';
import { Moon, Sun, RotateCcw, ArrowLeft } from 'lucide-react';
import { ThemeMode } from '@/types';
import Image from 'next/image';
import { FLOWER_ASSETS, GREENERY_ASSETS } from '@/lib/assets';

export function BuilderClient({ initialMode }: { initialMode: ThemeMode }) {
  const { selectedMode, setSelectedMode, resetCanvas, autoArrange, placedFlowers } = useCanvasStore();
  const [phase, setPhase] = useState<'select' | 'arrange' | 'write' | 'share'>('select');

  useEffect(() => {
    setSelectedMode(initialMode);
  }, [initialMode, setSelectedMode]);

  const handleNext = () => {
    if (phase === 'select') {
      autoArrange();
      setPhase('arrange');
    } else if (phase === 'arrange') {
      setPhase('write');
    } else if (phase === 'write') {
      setPhase('share');
    }
  };

  const handleBack = () => {
    if (phase === 'arrange') setPhase('select');
    else if (phase === 'write') setPhase('arrange');
    else if (phase === 'share') setPhase('write');
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col items-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-20">
        <Image src={FLOWER_ASSETS.Rose} alt="" width={200} height={200} className="absolute -top-10 -left-10 rotate-[-15deg] blur-[2px]" />
        <Image src={FLOWER_ASSETS.Peony} alt="" width={200} height={200} className="absolute -bottom-10 -right-10 rotate-[15deg] blur-[2px]" />
        <Image src={GREENERY_ASSETS['greenery-1']} alt="" width={300} height={300} className="absolute top-1/2 -left-20 -translate-y-1/2 rotate-[45deg] blur-[4px]" />
        <Image src={GREENERY_ASSETS['greenery-2']} alt="" width={300} height={300} className="absolute top-1/2 -right-20 -translate-y-1/2 rotate-[-30deg] blur-[4px]" />
      </div>

      {/* Header Controls - Only show in select/arrange phases */}
      {(phase === 'select' || phase === 'arrange') && (
        <div className="relative w-full max-w-6xl px-4 py-8 md:py-12 flex items-center justify-between z-50">
          <div className="flex space-x-3">
            {phase === 'arrange' && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleBack}
                className="rounded-full border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedMode(selectedMode === 'color' ? 'mono' : 'color')}
              className="rounded-full border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white transition-all duration-300"
            >
              {selectedMode === 'color' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetCanvas}
              className="rounded-full border-[#111827] text-[#111827] hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-col items-end">
            <h1 className="text-2xl font-bold tracking-tighter text-[#111827] italic" style={{ fontFamily: 'var(--font-playfair)' }}>
              {phase === 'select' ? 'Select Blooms' : 'Arrange Bouquet'}
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#6B7280]">
              Step {phase === 'select' ? '1' : '2'} of 4
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full flex-1 flex flex-col">
        {phase === 'select' && (
          <div className="flex-1 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <FlowerSelector onNext={handleNext} />
          </div>
        )}

        {phase === 'arrange' && (
          <div className="flex-1 w-full flex flex-col items-center pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4 mb-8 px-4">
              <p className="text-sm font-mono text-[#6B7280] max-w-md mx-auto">
                Drag flowers to position them, or use the magic button for an instant organic arrangement.
              </p>
              <Button
                onClick={autoArrange}
                variant="outline"
                className="border-[#111827] text-[#111827] hover:bg-[#111827] hover:text-white rounded-none px-8 py-6 font-mono text-xs tracking-widest uppercase transition-all duration-500"
              >
                Auto-Arrange Magic
              </Button>
            </div>
            
            <div className="w-full max-w-2xl mx-auto flex-1 flex items-center justify-center p-4">
              <div className="relative p-8 bg-white/40 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
                <BouquetCanvas readOnly={false} />
              </div>
            </div>

            <div className="fixed bottom-12 left-0 right-0 flex justify-center px-4 z-50">
              <Button
                onClick={handleNext}
                disabled={placedFlowers.length === 0}
                className="group relative overflow-hidden bg-[#111827] text-white px-12 py-7 rounded-full font-serif text-xl italic transition-all duration-300 hover:pr-16 active:scale-95 shadow-2xl"
              >
                <span className="relative z-10">Write Your Message</span>
                <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
              </Button>
            </div>
          </div>
        )}

        {phase === 'write' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full">
            <WriteCard onBack={handleBack} onNext={handleNext} />
          </div>
        )}

        {phase === 'share' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full">
            <ShareBouquet onBack={handleBack} />
          </div>
        )}
      </div>
    </main>
  );
}
