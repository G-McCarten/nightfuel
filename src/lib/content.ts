import { faq } from "@/content/faq";
import { locations } from "@/content/locations";
import { products } from "@/content/products";
import type { FaqAudience, FaqItem, Location, Product } from "@/content/types";

/** Machines that are actually in the wild, live ones first. */
export function getLiveLocations(): Location[] {
  return locations.filter((location) => location.status === "live");
}

/** Drives the teaser-vs-list branch on /find-a-machine. */
export function hasLiveLocation(): boolean {
  return getLiveLocations().length > 0;
}

/** Live placements first, then the ones we've announced but not shipped. */
export function getSortedLocations(): Location[] {
  const rank: Record<Location["status"], number> = { live: 0, coming_soon: 1 };
  return [...locations].sort((a, b) => rank[a.status] - rank[b.status]);
}

/**
 * Splits the catalogue for the products page, which shows general items first
 * and 21+ items in their own separated section.
 */
export function getProductsByRestriction(): {
  general: Product[];
  restricted: Product[];
} {
  return {
    general: products.filter((product) => !product.isAgeRestricted),
    restricted: products.filter((product) => product.isAgeRestricted),
  };
}

export function getFaqByAudience(audience: FaqAudience): FaqItem[] {
  return faq.filter((item) => item.audience === audience);
}

/** Only answered questions belong in FAQPage structured data. */
export function getAnsweredFaq(): FaqItem[] {
  return faq.filter((item) => !item.isPlaceholder);
}
