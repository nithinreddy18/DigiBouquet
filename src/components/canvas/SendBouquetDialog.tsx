'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCanvasStore } from '@/store/useCanvasStore';
import { toast } from 'sonner';
import { createBouquetAction } from '@/actions/createBouquet';
import { useRouter } from 'next/navigation';

export const SendBouquetDialog = () => {
  const { hiddenMessage, setMessage, placedFlowers, placedGreenery, placedDeco, selectedMode, baseLayer, topLayer } = useCanvasStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleSend = async () => {
    if (placedFlowers.length === 0) {
      toast.error("Add some flowers to your bouquet first!");
      return;
    }

    setIsSubmitting(true);
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
        const url = `${window.location.origin}/${result.slug}`;
        setShareUrl(url);
        toast.success('Bouquet created successfully!');
      } else {
        toast.error('Failed to create bouquet. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <button 
          className="min-h-[44px] flex items-center justify-center px-10 py-4 bg-[#111827] text-white rounded-full font-medium transition-all duration-200 ease-in-out hover:bg-gray-800 active:scale-95 shadow-md tracking-wide"
        >
          SEND BOUQUET
        </button>
      } />
      <DialogContent className="sm:max-w-[525px] bg-white border-none shadow-2xl z-[100]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light tracking-widest uppercase text-center mb-4">
            {shareUrl ? "Bouquet Created!" : "Add a hidden message"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {shareUrl ? (
            <div className="p-4 bg-zinc-50 rounded-lg text-sm break-all font-mono text-center">
              {shareUrl}
            </div>
          ) : (
            <Textarea
              placeholder="Type your secret message here..."
              className="min-h-[200px] border-none bg-zinc-50 focus-visible:ring-1 focus-visible:ring-zinc-200 resize-none text-lg font-light leading-relaxed p-6"
              value={hiddenMessage}
              onChange={(e) => setMessage(e.target.value)}
            />
          )}
        </div>
        <DialogFooter className="sm:justify-center">
            {shareUrl ? (
              <>
                <Button onClick={() => {
                  if (shareUrl) {
                    navigator.clipboard.writeText(shareUrl);
                    toast.success('Link copied to clipboard');
                  }
                }} className="mr-2 w-full sm:w-auto rounded-full px-8 py-4 uppercase tracking-widest font-light transition-all duration-500">
                  Copy Link
                </Button>
                <Button onClick={() => window.open(shareUrl, '_blank')} className="w-full sm:w-auto rounded-full px-12 py-6 uppercase tracking-widest font-light transition-all duration-500">
                  View Bouquet
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleSend} 
                disabled={isSubmitting}
                className="w-full sm:w-auto rounded-full px-12 py-6 uppercase tracking-widest font-light transition-all duration-500"
              >
                {isSubmitting ? 'Generating...' : 'Confirm & Generate Link'}
              </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
