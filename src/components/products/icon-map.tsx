import {
  BatteryChargingIcon,
  CameraIcon,
  CandyIcon,
  CigaretteIcon,
  DropletsIcon,
  PackageIcon,
  ShieldIcon,
  ShoppingBagIcon,
  type LucideIcon,
} from "lucide-react";

/**
 * Products store an icon *name*, so the content modules stay plain data with no
 * React imports. This is the only place that resolves a name to a component.
 *
 * Index this record directly at the call site (`PRODUCT_ICONS[name] ??
 * FALLBACK_PRODUCT_ICON`) rather than wrapping it in a helper — the React
 * Compiler lint can follow a constant lookup, but treats a function that
 * returns a component as creating one during render.
 */
export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  BatteryCharging: BatteryChargingIcon,
  Camera: CameraIcon,
  Candy: CandyIcon,
  Cigarette: CigaretteIcon,
  Droplets: DropletsIcon,
  Package: PackageIcon,
  Shield: ShieldIcon,
};

/** Used when a content entry names an icon that isn't mapped. */
export const FALLBACK_PRODUCT_ICON = ShoppingBagIcon;
