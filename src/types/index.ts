export type FlowerType = 
  | 'Rose' 
  | 'Ranunculus' 
  | 'Peony' 
  | 'Sunflower' 
  | 'Zinnia' 
  | 'Carnation' 
  | 'Anemone' 
  | 'Dahlia' 
  | 'Orchid' 
  | 'Lily' 
  | 'Daisy' 
  | 'Tulip';

export interface PlacedFlower {
  id: string;
  type: FlowerType;
  x: number;
  y: number;
  zIndex: number;
  rotation: number;
  scale: number;
}

export type ThemeMode = 'color' | 'mono';

export interface Bouquet {
  id: string;
  slug: string;
  themeMode: ThemeMode;
  baseLayer: string;
  topLayer: string;
  flowers: PlacedFlower[];
  hiddenMessage: string | null;
  createdAt: Date;
}
