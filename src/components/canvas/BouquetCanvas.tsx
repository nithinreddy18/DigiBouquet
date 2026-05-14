'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCanvasStore } from '@/store/useCanvasStore';
import { FlowerType } from '@/types';
import { FLOWER_ASSETS, GREENERY_ASSETS, DECO_ASSETS } from '@/lib/assets';
import { cn } from '@/lib/utils';

export const BouquetCanvas = ({ readOnly = false }: { readOnly?: boolean }) => {
  const { 
    placedFlowers, 
    placedGreenery,
    placedDeco,
    selectedMode, 
    updateFlowerPosition 
  } = useCanvasStore();
  
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full bg-transparent select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      {/* Greenery Layer */}
      {placedGreenery.map((green) => (
        <motion.div
          key={green.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: green.scale,
            x: green.x,
            y: green.y,
            rotate: green.rotation 
          }}
          className="absolute"
          style={{ 
            zIndex: green.zIndex,
            left: '50%',
            top: '50%',
            marginLeft: -100,
            marginTop: -100,
          }}
        >
          <Image
            src={GREENERY_ASSETS[green.type] || GREENERY_ASSETS['greenery-1']}
            alt=""
            width={200}
            height={200}
            className={cn(
              "object-contain pointer-events-none",
              selectedMode === 'mono' && "grayscale contrast-[1.2]"
            )}
            draggable={false}
          />
        </motion.div>
      ))}

      {/* Decorative Layer */}
      {placedDeco.map((deco) => (
        <motion.div
          key={deco.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: deco.scale,
            x: deco.x,
            y: deco.y,
            rotate: deco.rotation 
          }}
          className="absolute"
          style={{ 
            zIndex: deco.zIndex,
            left: '50%',
            top: '50%',
            marginLeft: -50,
            marginTop: -50,
          }}
        >
          <Image
            src={DECO_ASSETS[deco.type] || DECO_ASSETS['deco-white']}
            alt=""
            width={100}
            height={100}
            className={cn(
              "object-contain pointer-events-none",
              selectedMode === 'mono' && "grayscale contrast-[1.2]"
            )}
            draggable={false}
          />
        </motion.div>
      ))}

      {/* Flowers Layer */}
      {placedFlowers.map((flower) => (
        <motion.div
          key={flower.id}
          drag={!readOnly}
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={canvasRef}
          onDragEnd={(_, info) => {
            if (!readOnly) {
              updateFlowerPosition(flower.id, flower.x + info.offset.x, flower.y + info.offset.y);
            }
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: flower.scale,
            x: flower.x,
            y: flower.y,
            rotate: flower.rotation 
          }}
          className="absolute z-30 cursor-grab active:cursor-grabbing"
          style={{ 
            zIndex: flower.zIndex,
            left: '50%',
            top: '50%',
            marginLeft: -80,
            marginTop: -80,
          }}
        >
          <Image
            src={FLOWER_ASSETS[flower.type as FlowerType]}
            alt={flower.type}
            width={160}
            height={160}
            className={cn(
              "object-contain pointer-events-none",
              selectedMode === 'mono' && "grayscale contrast-[1.2]"
            )}
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
};
