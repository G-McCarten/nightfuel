import type { Product } from "./types";

/**
 * The seven items a NightFuel machine carries. Deliberately generic: no brand
 * names, no logos, no prices anywhere on the public site.
 */
export const products: Product[] = [
  {
    id: "condoms",
    name: "Condoms",
    category: "essentials",
    description: "Because the night has a way of surprising you.",
    icon: "Shield",
    isAgeRestricted: false,
  },
  {
    id: "gum",
    name: "Gum",
    category: "essentials",
    description: "Reset your breath between the bar and the dance floor.",
    icon: "Candy",
    isAgeRestricted: false,
  },
  {
    id: "hydration-packets",
    name: "Hydration Packets",
    category: "recovery",
    description: "Drop one in water and thank yourself in the morning.",
    icon: "Droplets",
    isAgeRestricted: false,
  },
  {
    id: "phone-chargers",
    name: "Phone Chargers",
    category: "tech",
    description: "1% battery shouldn't end your night.",
    icon: "BatteryCharging",
    isAgeRestricted: false,
  },
  {
    id: "disposable-camera",
    name: "Disposable Camera",
    category: "fun",
    description: "The photos nobody can delete at 3 a.m.",
    icon: "Camera",
    isAgeRestricted: false,
  },
  {
    id: "disposable-vape",
    name: "Disposable Vape",
    category: "nicotine",
    description: "Tobacco flavor only. 21+ with valid ID.",
    icon: "Cigarette",
    isAgeRestricted: true,
  },
  {
    id: "nicotine-pouches",
    name: "Nicotine Pouches",
    category: "nicotine",
    description: "One can per purchase. 21+ with valid ID.",
    icon: "Package",
    isAgeRestricted: true,
  },
];
