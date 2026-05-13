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

export type AssetType = 
  | FlowerType 
  | 'greenery-1' 
  | 'greenery-2' 
  | 'greenery-3' 
  | 'deco-white';

export interface PlacedFlower {
  id: string;
  type: AssetType;
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
