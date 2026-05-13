'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FLOWER_ASSETS, BUSH_ASSETS } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { PlacedFlower, ThemeMode } from '@/types';
import { Share, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ReadOnlyCanvasProps {
  flowers: PlacedFlower[];
  baseLayer: string;
  topLayer: string;
  themeMode: ThemeMode;
  hiddenMessage: string | null;
}

export const ReadOnlyCanvas = ({ 
  flowers, 
  baseLayer, 
  themeMode,
  hiddenMessage 
}: ReadOnlyCanvasProps) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const bushAsset = BUSH_ASSETS[baseLayer] || BUSH_ASSETS['bush-1'];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      <AnimatePresence>
        {!revealed ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.2, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-square max-w-[800px] cursor-pointer"
            onClick={() => setRevealed(true)}
          >
            {/* Base Layer */}
            <div className="absolute inset-0 z-10">
              <Image 
                src={bushAsset.base} 
                alt="Bush base" 
                fill 
                className={cn(
                  "object-contain",
                  themeMode === 'mono' && "grayscale contrast-[1.2]"
                )}
                priority
              />
            </div>

            {/* Flowers Layer */}
            {flowers.map((flower) => (
              <div
                key={flower.id}
                className="absolute z-20"
                style={{ 
                  zIndex: flower.zIndex,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${flower.x}px, ${flower.y}px) rotate(${flower.rotation}deg) scale(${flower.scale})`,
                }}
              >
                <Image
                  src={FLOWER_ASSETS[flower.type]}
                  alt={flower.type}
                  width={160}
                  height={160}
                  className={cn(
                    "object-contain",
                    themeMode === 'mono' && "grayscale contrast-[1.2]"
                  )}
                />
              </div>
            ))}

            {/* Top Layer */}
            <div className="absolute inset-0 z-[100] pointer-events-none">
              <Image 
                src={bushAsset.top} 
                alt="Bush top" 
                fill 
                className={cn(
                  "object-contain",
                  themeMode === 'mono' && "grayscale contrast-[1.2]"
                )}
                priority
              />
            </div>

            {/* Floating Hint */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[110] font-mono text-[10px] uppercase tracking-[0.4em] opacity-40"
            >
              Tap to Reveal
            </motion.div>

            {/* Share Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyLink();
              }}
              className="absolute top-8 right-8 z-[110] p-4 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share className="w-4 h-4" />}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="z-[200] max-w-2xl px-8 text-center"
          >
            <p className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-zinc-900 whitespace-pre-wrap">
              {hiddenMessage || "No message attached."}
            </p>
            <button 
              onClick={() => setRevealed(false)}
              className="mt-12 font-mono text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity"
            >
              Back to Bouquet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
