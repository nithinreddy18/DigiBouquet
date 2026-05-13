import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { FlowerType, PlacedFlower, ThemeMode } from '@/types';

type ArrangementStyle = 'market_fresh' | 'wild_meadow' | 'focal_romance' | 'vertical_burst' | 'lush_cloud';

interface CanvasState {
  selectedMode: ThemeMode;
  placedFlowers: PlacedFlower[];
  placedGreenery: PlacedFlower[];
  placedDeco: PlacedFlower[];
  baseLayer: string;
  topLayer: string;
  hiddenMessage: string;
  recipient: string;
  sender: string;
  arrangementStyle: ArrangementStyle;
  
  // Actions
  setSelectedMode: (mode: ThemeMode) => void;
  addFlower: (type: FlowerType) => void;
  updateFlowerPosition: (id: string, x: number, y: number) => void;
  removeFlower: (id: string) => void;
  removeFlowerByType: (type: FlowerType) => void;
  setBaseLayer: (layer: string) => void;
  setTopLayer: (layer: string) => void;
  setMessage: (message: string) => void;
  setRecipient: (name: string) => void;
  setSender: (name: string) => void;
  autoArrange: () => void;
  resetCanvas: () => void;
}

const STYLES: ArrangementStyle[] = ['market_fresh', 'wild_meadow', 'focal_romance', 'vertical_burst', 'lush_cloud'];

export const useCanvasStore = create<CanvasState>((set) => ({
  selectedMode: 'color',
  placedFlowers: [],
  placedGreenery: [],
  placedDeco: [],
  baseLayer: 'bush-1',
  topLayer: 'bush-1-top',
  hiddenMessage: '',
  recipient: 'Beloved,',
  sender: 'Secret Admirer',
  arrangementStyle: 'market_fresh',

  setSelectedMode: (mode) => set({ selectedMode: mode }),

  addFlower: (type) => set((state) => {
    const newFlower: PlacedFlower = {
      id: uuidv4(),
      type,
      x: 0,
      y: 0,
      zIndex: state.placedFlowers.length + 20,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    };
    return { placedFlowers: [...state.placedFlowers, newFlower] };
  }),

  updateFlowerPosition: (id, x, y) => set((state) => ({
    placedFlowers: state.placedFlowers.map((f) => 
      f.id === id ? { ...f, x, y } : f
    ),
  })),

  removeFlower: (id) => set((state) => ({
    placedFlowers: state.placedFlowers.filter((f) => f.id !== id),
  })),

  removeFlowerByType: (type) => set((state) => {
    const flowers = [...state.placedFlowers];
    const index = [...flowers].reverse().findIndex(f => f.type === type);
    if (index !== -1) {
      const realIndex = flowers.length - 1 - index;
      flowers.splice(realIndex, 1);
    }
    return { placedFlowers: flowers };
  }),

  setBaseLayer: (layer) => set({ 
    baseLayer: layer,
    topLayer: `${layer}-top`
  }),

  setTopLayer: (layer) => set({ topLayer: layer }),

  setMessage: (message) => set({ hiddenMessage: message }),
  setRecipient: (name) => set({ recipient: name }),
  setSender: (name) => set({ sender: name }),

  autoArrange: () => set((state) => {
    const total = state.placedFlowers.length;
    if (total === 0) return state;

    const currentIndex = STYLES.indexOf(state.arrangementStyle);
    const nextStyle = STYLES[(currentIndex + 1) % STYLES.length];

    const focalTypes = ['Peony', 'Sunflower', 'Dahlia', 'Lily'];
    const sortedFlowers = [...state.placedFlowers].sort((a, b) => {
      const aIsFocal = focalTypes.includes(a.type) ? 1 : 0;
      const bIsFocal = focalTypes.includes(b.type) ? 1 : 0;
      return bIsFocal - aIsFocal;
    });

    const arrangedFlowers: PlacedFlower[] = [];
    const arrangedGreenery: PlacedFlower[] = [];
    const arrangedDeco: PlacedFlower[] = [];

    switch (nextStyle) {
      case 'market_fresh': {
        sortedFlowers.forEach((flower, i) => {
          const angle = (i / total) * Math.PI * 2;
          const radius = i === 0 ? 0 : 70 + (i * 15);
          arrangedFlowers.push({
            ...flower,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            rotation: Math.random() * 360,
            scale: 1.0,
            zIndex: 50 + i
          });
        });
        for (let j = 0; j < 8; j++) {
          const angle = (j / 8) * Math.PI * 2;
          arrangedGreenery.push({
            id: uuidv4(), type: 'greenery-1',
            x: Math.cos(angle) * 160, y: Math.sin(angle) * 160,
            rotation: Math.random() * 360, scale: 1.2, zIndex: 15
          });
        }
        break;
      }
      case 'wild_meadow': {
        sortedFlowers.forEach((flower, i) => {
          arrangedFlowers.push({
            ...flower,
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            rotation: Math.random() * 360,
            scale: 0.8 + Math.random() * 0.4,
            zIndex: 50 + i
          });
        });
        for (let j = 0; j < 12; j++) {
          arrangedGreenery.push({
            id: uuidv4(), type: `greenery-${(j % 3) + 1}` as 'greenery-1' | 'greenery-2' | 'greenery-3',
            x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400,
            rotation: Math.random() * 360, scale: 0.8, zIndex: j < 6 ? 15 : 45
          });
        }
        break;
      }
      case 'focal_romance': {
        sortedFlowers.forEach((flower, i) => {
          if (i === 0) {
            arrangedFlowers.push({ ...flower, x: 0, y: 0, scale: 1.4, zIndex: 60 });
          } else {
            const angle = ((i-1) / (total-1)) * Math.PI * 2;
            arrangedFlowers.push({
              ...flower,
              x: Math.cos(angle) * 130,
              y: Math.sin(angle) * 130,
              scale: 0.9, zIndex: 50 + i
            });
          }
        });
        for (let j = 0; j < 6; j++) {
          const angle = (j / 6) * Math.PI * 2;
          arrangedGreenery.push({
            id: uuidv4(), type: 'greenery-2',
            x: Math.cos(angle) * 100, y: Math.sin(angle) * 100,
            rotation: Math.random() * 360, scale: 1.5, zIndex: 15
          });
        }
        break;
      }
      case 'vertical_burst': {
        sortedFlowers.forEach((flower, i) => {
          const angle = (i / total) * Math.PI - Math.PI;
          const radius = 100 + (i * 10);
          arrangedFlowers.push({
            ...flower,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius + 50,
            scale: 1.0, zIndex: 50 + i
          });
        });
        for (let j = 0; j < 5; j++) {
          arrangedGreenery.push({
            id: uuidv4(), type: 'greenery-3',
            x: (j - 2) * 80, y: -180,
            rotation: (j - 2) * 15, scale: 1.8, zIndex: 10
          });
        }
        break;
      }
      case 'lush_cloud': {
        sortedFlowers.forEach((flower, i) => {
          const radius = Math.random() * 150;
          const angle = Math.random() * Math.PI * 2;
          arrangedFlowers.push({
            ...flower, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius,
            scale: 1.0, zIndex: 50 + i
          });
        });
        for (let j = 0; j < 20; j++) {
          arrangedDeco.push({
            id: uuidv4(), type: 'deco-white',
            x: (Math.random() - 0.5) * 350, y: (Math.random() - 0.5) * 350,
            rotation: Math.random() * 360, scale: 0.4 + Math.random() * 0.3, zIndex: 55
          });
        }
        break;
      }
    }

    return { 
      placedFlowers: arrangedFlowers,
      placedGreenery: arrangedGreenery,
      placedDeco: arrangedDeco,
      arrangementStyle: nextStyle
    };
  }),

  resetCanvas: () => set({ 
    placedFlowers: [], 
    placedGreenery: [], 
    placedDeco: [],
    hiddenMessage: '',
    recipient: 'Beloved,',
    sender: 'Secret Admirer',
    arrangementStyle: 'market_fresh'
  }),
}));
