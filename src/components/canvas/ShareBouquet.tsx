'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCanvasStore } from '@/store/useCanvasStore';
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
    hiddenMessage 
  } = useCanvasStore();

  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const generateLink = async () => {
      try {
        const result = await createBouquetAction({
          themeMode: selectedMode,
          baseLayer,
          topLayer,
          flowers: placedFlowers,
          greenery: placedGreenery,
          deco: placedDeco,
          hiddenMessage
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
  }, []);

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
        // Fallback for non-secure contexts
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
    <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-[#FDFBF7]">
      <h2 className="text-xl font-mono tracking-widest text-[#111827] mb-8">
        Hi, I made this bouquet for you!
      </h2>

      <div className="relative w-full max-w-2xl aspect-square mb-12 flex items-center justify-center">
        {/* Simple Circle Background */}
        <div className="absolute inset-0 bg-yellow-50 rounded-full opacity-50 scale-75 blur-3xl" />

        {/* Bouquet Preview */}
        <div className="relative w-full h-full">
          {placedGreenery.map((green) => (
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
              <Image src={GREENERY_ASSETS[green.type]} alt="green" width={180} height={180} className={cn(selectedMode === 'mono' && "grayscale")} />
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
                transform: `translate(-50%, -50%) translate(${deco.x}px, ${deco.y}px) rotate(${deco.rotation}deg) scale(${deco.scale})`,
              }}
            >
              <Image src={DECO_ASSETS[deco.type]} alt="deco" width={80} height={80} className={cn(selectedMode === 'mono' && "grayscale")} />
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
                transform: `translate(-50%, -50%) translate(${flower.x}px, ${flower.y}px) rotate(${flower.rotation}deg) scale(${flower.scale})`,
              }}
            >
              <Image src={FLOWER_ASSETS[flower.type]} alt={flower.type} width={140} height={140} className={cn(selectedMode === 'mono' && "grayscale")} />
            </div>
          ))}
        </div>

        {/* Card Overlay at bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 bg-white border border-[#111827] p-6 shadow-lg rotate-[-2deg] z-[300]">
          <p className="font-mono text-xs text-[#111827] line-clamp-3 leading-relaxed">
            {hiddenMessage || "No message attached."}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={isGenerating}
          className="rounded-none border-[#111827] px-8 py-4 font-mono text-xs uppercase tracking-widest"
        >
          Back
        </Button>
        <Button 
          onClick={copyLink}
          disabled={isGenerating}
          className="rounded-none bg-[#111827] text-white hover:bg-gray-800 px-8 py-4 font-mono text-xs uppercase tracking-widest"
        >
          {isGenerating ? 'Saving...' : 'Copy Link'}
        </Button>
        <Button 
          onClick={handleShare}
          disabled={isGenerating}
          variant="outline"
          className="rounded-none border-[#111827] px-8 py-4 font-mono text-xs uppercase tracking-widest"
        >
          Share
        </Button>
      </div>
    </div>
  );
};
