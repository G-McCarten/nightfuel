import type { Product } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  className,
  ...props
}: { products: Product[] } & React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
