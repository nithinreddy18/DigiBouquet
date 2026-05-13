import { FlowerType } from "@/types";

export const FLOWER_ASSETS: Record<FlowerType, string> = {
  Rose: "/assets/rose.webp",
  Ranunculus: "/assets/ranunculus.webp",
  Peony: "/assets/peony.webp",
  Sunflower: "/assets/sunflower.webp",
  Zinnia: "/assets/zinnia.webp",
  Carnation: "/assets/carnation.webp",
  Anemone: "/assets/anemone.webp",
  Dahlia: "/assets/dahlia.webp",
  Orchid: "/assets/orchid.webp",
  Lily: "/assets/lily.webp",
  Daisy: "/assets/daisy.webp",
  Tulip: "/assets/tulip.webp",
};

export const GREENERY_ASSETS: Record<string, string> = {
  "greenery-1": "/assets/greenery_1.webp",
  "greenery-2": "/assets/greenery_2.webp",
  "greenery-3": "/assets/greenery_3.webp",
};

export const DECO_ASSETS: Record<string, string> = {
  "deco-white": "/assets/deco_white.svg",
};

export const BUSH_ASSETS: Record<string, { base: string; top: string }> = {
  "bush-1": {
    base: "/assets/bush-1.webp",
    top: "/assets/bush-1-top.webp",
  },
  "bush-2": {
    base: "/assets/bush-2.webp",
    top: "/assets/bush-2-top.webp",
  },
};

