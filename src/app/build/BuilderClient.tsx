'use client';

import React, { useEffect, useState } from 'react';
import { BouquetCanvas } from '@/components/canvas/BouquetCanvas';
import { FlowerSelector } from '@/components/canvas/FlowerSelector';
import { SendBouquetDialog } from '@/components/canvas/SendBouquetDialog';
import { useCanvasStore } from '@/store/useCanvasStore';
import { Button } from '@/components/ui/button';
import { Moon, Sun, RotateCcw, ArrowLeft } from 'lucide-react';
import { ThemeMode } from '@/types';

export function BuilderClient({ initialMode }: { initialMode: ThemeMode }) {
  const { selectedMode, setSelectedMode, resetCanvas, autoArrange, placedFlowers } = useCanvasStore();
  const [phase, setPhase] = useState<'select' | 'arrange'>('select');

  useEffect(() => {
    setSelectedMode(initialMode);
  }, [initialMode, setSelectedMode]);

  const handleNext = () => {
    autoArrange();
    setPhase('arrange');
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center p-4 md:p-8 relative">
      {/* Header Controls */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 flex items-center justify-between z-50">
        <div className="flex space-x-2 md:space-x-4">
          {phase === 'arrange' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPhase('select')}
              className="rounded-full text-[#111827] hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedMode(selectedMode === 'color' ? 'mono' : 'color')}
            className="rounded-full text-[#111827] hover:bg-gray-200 transition-colors"
          >
            {selectedMode === 'color' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetCanvas}
            className="rounded-full text-[#111827] hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
        <div className="font-sans text-xs font-semibold tracking-widest uppercase text-[#6B7280]">
          {phase === 'select' ? 'select flowers' : 'arrange bouquet'}
        </div>
      </div>

      {phase === 'select' ? (
        <div className="flex-1 w-full mt-24">
          <FlowerSelector onNext={handleNext} />
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col items-center mt-20 md:mt-24 pb-24">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-sm font-mono tracking-[0.2em] uppercase text-[#111827]">
              Customize Your Bouquet
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={autoArrange}
                className="bg-[#111827] text-white hover:bg-gray-800 rounded-none px-6 py-5 font-mono text-xs tracking-widest uppercase min-w-[240px]"
              >
                Try a new arrangement
              </Button>
            </div>
          </div>
          
          <div className="w-full max-w-2xl mx-auto flex-1 flex items-center justify-center">
            <BouquetCanvas readOnly={false} />
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {phase === 'arrange' && placedFlowers.length > 0 && (
        <div className="fixed bottom-6 md:bottom-12 left-0 right-0 flex justify-center px-4 z-50">
          <SendBouquetDialog />
        </div>
      )}
    </main>
  );
}
