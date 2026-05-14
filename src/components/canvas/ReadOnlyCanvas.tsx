'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FLOWER_ASSETS, GREENERY_ASSETS, DECO_ASSETS } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { PlacedFlower, ThemeMode, FlowerType } from '@/types';
import { Share, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ReadOnlyCanvasProps {
  flowers: PlacedFlower[];
  greenery: PlacedFlower[];
  deco: PlacedFlower[];
  baseLayer: string;
  topLayer: string;
  themeMode: ThemeMode;
  hiddenMessage: string | null;
}

export const ReadOnlyCanvas = ({ 
  flowers, 
  greenery,
  deco,
  themeMode,
  hiddenMessage 
}: ReadOnlyCanvasProps) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#FDFBF7] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-20">
        <Image src={FLOWER_ASSETS.Rose} alt="" width={300} height={300} className="absolute -top-20 -left-20 rotate-[-15deg] blur-[2px]" />
        <Image src={FLOWER_ASSETS.Peony} alt="" width={300} height={300} className="absolute -bottom-20 -right-20 rotate-[15deg] blur-[2px]" />
        <Image src={GREENERY_ASSETS['greenery-1']} alt="" width={400} height={400} className="absolute top-1/2 -left-40 -translate-y-1/2 rotate-[45deg] blur-[4px]" />
      </div>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div 
            key="bouquet"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-[800px] cursor-pointer select-none group"
            onClick={() => setRevealed(true)}
          >
            {/* Soft Glow Behind */}
            <div className="absolute inset-0 bg-white/40 rounded-full blur-[100px] scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Greenery Layer */}
            {greenery?.map((green) => (
              <div
                key={green.id}
                className="absolute"
                style={{ 
                  zIndex: green.zIndex,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${green.x}px, ${green.y}px) rotate(${green.rotation}deg) scale(${green.scale})`,
                }}
              >
                <Image src={GREENERY_ASSETS[green.type] || GREENERY_ASSETS['greenery-1']} alt="" width={200} height={200} className={cn("object-contain", themeMode === 'mono' && "grayscale")} />
              </div>
            ))}

            {/* Decorative Layer */}
            {deco?.map((d) => (
              <div
                key={d.id}
                className="absolute"
                style={{ 
                  zIndex: d.zIndex,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${d.x}px, ${d.y}px) rotate(${d.rotation}deg) scale(${d.scale})`,
                }}
              >
                <Image src={DECO_ASSETS[d.type] || DECO_ASSETS['deco-white']} alt="" width={100} height={100} className={cn("object-contain", themeMode === 'mono' && "grayscale")} />
              </div>
            ))}

            {/* Flowers Layer */}
            {flowers.map((flower) => (
              <div
                key={flower.id}
                className="absolute"
                style={{ 
                  zIndex: flower.zIndex,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${flower.x}px, ${flower.y}px) rotate(${flower.rotation}deg) scale(${flower.scale})`,
                }}
              >
                <Image src={FLOWER_ASSETS[flower.type as FlowerType]} alt={flower.type} width={160} height={160} className={cn("object-contain", themeMode === 'mono' && "grayscale")} />
              </div>
            ))}

            {/* Floating Hint */}
            <motion.div 
              animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[200] font-serif italic text-lg text-[#111827] tracking-wider"
            >
              Touch to reveal the card
            </motion.div>

            {/* Share Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyLink();
              }}
              className="absolute top-8 right-8 z-[210] flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full border border-white hover:bg-white transition-all duration-300 shadow-xl group/btn"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#111827] opacity-0 group-hover/btn:opacity-100 transition-opacity">Copy Link</span>
              {copied ? <Check className="w-3 h-3" /> : <Share className="w-3 h-3" />}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="z-[300] w-full max-w-xl p-8"
          >
            {/* Stationery Card */}
            <div className="relative aspect-[4/5] sm:aspect-[4/3] bg-[#FEFDFB] border border-[#111827]/10 shadow-[40px_40px_80px_rgba(0,0,0,0.1)] p-12 md:p-16 flex flex-col rounded-[2px] transform rotate-[1deg]">
               <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#111827]/5 pointer-events-none" />
               
               <div className="flex-1 overflow-auto scrollbar-hide">
                 <p className="font-serif italic text-2xl md:text-3xl text-[#111827] leading-relaxed whitespace-pre-wrap">
                   {hiddenMessage || "A quiet thought, delivered in bloom."}
                 </p>
               </div>

               <button 
                onClick={() => setRevealed(false)}
                className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                ← Back to Arrangement
              </button>
            </div>
            
            <Link 
              href="/build"
              className="mt-12 block text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#A1A1AA] hover:text-[#111827] transition-colors underline underline-offset-4"
            >
              Build your own bouquet
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
