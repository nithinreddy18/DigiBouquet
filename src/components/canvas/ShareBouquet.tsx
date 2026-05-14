'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCanvasStore } from '@/store/useCanvasStore';
import { FlowerType } from '@/types';
import { FLOWER_ASSETS, GREENERY_ASSETS, DECO_ASSETS } from '@/lib/assets';
import { Button } from '@/components/ui/button';
import { createBouquetAction } from '@/actions/createBouquet';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ShareBouquetProps {
  onBack: () => void;
}

export const ShareBouquet = ({ onBack }: ShareBouquetProps) => {
  const { 
    placedFlowers, 
    placedGreenery, 
    placedDeco, 
    selectedMode, 
    baseLayer, 
    topLayer, 
    hiddenMessage,
    recipient,
    sender
  } = useCanvasStore();

  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateLink = async () => {
      try {
        const fullMessage = `Dear ${recipient}\n\n${hiddenMessage}\n\nSincerely,\n${sender}`;
        
        const result = await createBouquetAction({
          themeMode: selectedMode,
          baseLayer,
          topLayer,
          flowers: placedFlowers,
          greenery: placedGreenery,
          deco: placedDeco,
          hiddenMessage: fullMessage
        });

        if (result.success && result.slug) {
          setShareUrl(`${window.location.origin}/bouquet/${result.slug}`);
        } else {
          toast.error("Failed to generate share link.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while sharing.");
      } finally {
        setIsGenerating(false);
      }
    };

    generateLink();
  }, [baseLayer, hiddenMessage, placedDeco, placedFlowers, placedGreenery, recipient, selectedMode, sender, topLayer]);

  const copyLink = async () => {
    if (!shareUrl) {
      toast.error("Link not ready yet. Please wait.");
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success("Link copied to clipboard!");
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          toast.error("Manual copy: " + shareUrl);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Manual copy: " + shareUrl);
    }
  };

  const handleShare = async () => {
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: 'Digital Bouquet',
          text: 'I made this digital bouquet for you!',
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-20">
        <Image src={FLOWER_ASSETS.Tulip} alt="" width={250} height={250} className="absolute -top-10 -right-10 rotate-[20deg] blur-[1px]" />
        <Image src={GREENERY_ASSETS['greenery-3']} alt="" width={350} height={350} className="absolute -bottom-10 -left-10 rotate-[-15deg] blur-[3px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-[#111827] italic mb-12" style={{ fontFamily: 'var(--font-playfair)' }}>
          Your Bouquet is Ready
        </h2>

        <div className="relative w-full max-w-lg aspect-square mb-16 group">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white shadow-2xl transition-all duration-700 group-hover:scale-105" />
          
          {/* Bouquet Preview */}
          <div className="relative w-full h-full p-12">
            {placedGreenery.map((green) => (
              <div
                key={green.id}
                className="absolute"
                style={{ 
                  zIndex: green.zIndex,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${green.x * 0.8}px, ${green.y * 0.8}px) rotate(${green.rotation}deg) scale(${green.scale * 0.8})`,
                }}
              >
                <Image src={GREENERY_ASSETS[green.type]} alt="" width={200} height={200} className={cn(selectedMode === 'mono' && "grayscale")} />
              </div>
            ))}

            {placedDeco.map((deco) => (
              <div
                key={deco.id}
                className="absolute"
                style={{ 
                  zIndex: deco.zIndex,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${deco.x * 0.8}px, ${deco.y * 0.8}px) rotate(${deco.rotation}deg) scale(${deco.scale * 0.8})`,
                }}
              >
                <Image src={DECO_ASSETS[deco.type]} alt="" width={100} height={100} className={cn(selectedMode === 'mono' && "grayscale")} />
              </div>
            ))}

            {placedFlowers.map((flower) => (
              <div
                key={flower.id}
                className="absolute"
                style={{ 
                  zIndex: flower.zIndex,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${flower.x * 0.8}px, ${flower.y * 0.8}px) rotate(${flower.rotation}deg) scale(${flower.scale * 0.8})`,
                }}
              >
                <Image src={FLOWER_ASSETS[flower.type as FlowerType]} alt="" width={160} height={160} className={cn(selectedMode === 'mono' && "grayscale")} />
              </div>
            ))}
          </div>

          {/* Card Overlay - Physical stationery style */}
          <div className="absolute -bottom-6 -right-6 w-56 aspect-[3/4] bg-[#FEFDFB] border border-[#111827]/5 p-6 shadow-2xl rotate-[3deg] z-[300] rounded-[2px]">
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#111827]/5 pointer-events-none" />
            <p className="font-serif italic text-[8px] md:text-[10px] text-[#111827] whitespace-pre-line leading-relaxed overflow-hidden h-full">
              {`Dear ${recipient}\n\n${hiddenMessage || "..."}\n\nSincerely,\n${sender}`}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <Button 
            variant="outline" 
            onClick={onBack}
            disabled={isGenerating}
            className="rounded-full border-[#111827] px-10 py-6 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-[#111827] hover:text-white transition-all duration-500"
          >
            Edit Arrangement
          </Button>
          <Button 
            onClick={copyLink}
            disabled={isGenerating}
            className="group relative overflow-hidden bg-[#111827] text-white px-12 py-7 rounded-full font-serif text-xl italic transition-all duration-300 hover:pr-16 active:scale-95 shadow-2xl"
          >
            <span className="relative z-10">{isGenerating ? 'Sealing...' : 'Copy Link'}</span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">🔗</span>
          </Button>
          <Button 
            onClick={handleShare}
            disabled={isGenerating}
            variant="outline"
            className="rounded-full border-[#111827] px-10 py-6 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-[#111827] hover:text-white transition-all duration-500"
          >
            External Share
          </Button>
        </div>
        
        {shareUrl && (
           <p className="mt-8 font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest animate-in fade-in duration-1000">
             Link generated successfully
           </p>
        )}
      </div>
    </div>
  );
};
