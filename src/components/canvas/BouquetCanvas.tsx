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
      className="relative w-full aspect-square max-w-[600px] mx-auto overflow-hidden bg-transparent select-none touch-none"
      style={{ touchAction: 'none' }}
    >
      {/* Greenery Layer (Some behind flowers) */}
      {placedGreenery.map((green) => (
        <motion.div
          key={green.id}
          initial={{ x: green.x, y: green.y, rotate: green.rotation, scale: 0 }}
          animate={{ x: green.x, y: green.y, rotate: green.rotation, scale: green.scale }}
          className="absolute"
          style={{ 
            zIndex: green.zIndex,
            left: '50%',
            top: '50%',
            marginLeft: -80,
            marginTop: -80,
          }}
        >
          <Image
            src={GREENERY_ASSETS[green.type] || GREENERY_ASSETS['greenery-1']}
            alt="greenery"
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

      {/* Decorative Layer (Baby's Breath) */}
      {placedDeco.map((deco) => (
        <motion.div
          key={deco.id}
          initial={{ x: deco.x, y: deco.y, rotate: deco.rotation, scale: 0 }}
          animate={{ x: deco.x, y: deco.y, rotate: deco.rotation, scale: deco.scale }}
          className="absolute"
          style={{ 
            zIndex: deco.zIndex,
            left: '50%',
            top: '50%',
            marginLeft: -40,
            marginTop: -40,
          }}
        >
          <Image
            src={DECO_ASSETS[deco.type] || DECO_ASSETS['deco-white']}
            alt="deco"
            width={80}
            height={80}
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
          initial={{ x: flower.x, y: flower.y, rotate: flower.rotation, scale: 0 }}
          animate={{ x: flower.x, y: flower.y, rotate: flower.rotation, scale: flower.scale }}
          className="absolute z-30 cursor-grab active:cursor-grabbing"
          style={{ 
            zIndex: flower.zIndex,
            left: '50%',
            top: '50%',
            marginLeft: -64, 
            marginTop: -64,
          }}
        >
          <Image
            src={FLOWER_ASSETS[flower.type as FlowerType]}
            alt={flower.type}
            width={128}
            height={128}
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
