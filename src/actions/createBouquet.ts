'use server';

import { db } from '@/db';
import { bouquets } from '@/db/schema';
import crypto from 'crypto';
import { PlacedFlower } from '@/types';

export async function createBouquetAction(payload: {
  themeMode: string;
  baseLayer: string;
  topLayer: string;
  flowers: PlacedFlower[];
  greenery: PlacedFlower[];
  deco: PlacedFlower[];
  hiddenMessage: string | null;
}) {
  try {
    const slug = crypto.randomUUID();
    console.log('Generating bouquet with slug:', slug);
    
    await db.insert(bouquets).values({
      slug,
      themeMode: payload.themeMode,
      baseLayer: payload.baseLayer,
      topLayer: payload.topLayer,
      flowers: payload.flowers,
      greenery: payload.greenery,
      deco: payload.deco,
      hiddenMessage: payload.hiddenMessage,
    });

    return { success: true, slug };
  } catch (error) {
    console.error('Error creating bouquet:', error);
    return { success: false, error: 'Failed to create bouquet' };
  }
}
