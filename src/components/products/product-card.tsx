import type { Product } from "@/content/types";
import { FALLBACK_PRODUCT_ICON, PRODUCT_ICONS } from "./icon-map";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const Icon = PRODUCT_ICONS[product.icon] ?? FALLBACK_PRODUCT_ICON;

  return (
    <li className="rounded-xl border border-hairline bg-surface p-6">
      <Icon
        aria-hidden
        className={cn(
          "size-6",
          product.isAgeRestricted ? "text-neon-magenta" : "text-neon-blue",
        )}
      />
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-muted">{product.description}</p>
    </li>
  );
}
