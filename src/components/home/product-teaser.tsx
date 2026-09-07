import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import {
  FALLBACK_PRODUCT_ICON,
  PRODUCT_ICONS,
} from "@/components/products/icon-map";
import { homeCopy } from "@/content/copy/home";
import { getProductsByRestriction } from "@/lib/content";

/**
 * Compact strip of the general-audience products only — the 21+ items are
 * introduced on /products, behind their own heading and notice.
 */
export function ProductTeaser() {
  const { general } = getProductsByRestriction();
  const { title, body, cta } = homeCopy.products;

  return (
    <Section className="border-t border-hairline py-14 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="display text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-2 text-muted">{body}</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neon-blue hover:underline"
        >
          {cta}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {general.map((product) => {
          const Icon = PRODUCT_ICONS[product.icon] ?? FALLBACK_PRODUCT_ICON;
          return (
            <li
              key={product.id}
              className="flex items-center gap-3 rounded-lg border border-hairline bg-surface px-4 py-3"
            >
              <Icon className="size-5 shrink-0 text-neon-blue" aria-hidden />
              <span className="text-sm font-medium">{product.name}</span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
