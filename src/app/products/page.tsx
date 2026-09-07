import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProductGrid } from "@/components/products/product-grid";
import { CtaBand } from "@/components/shared/cta-band";
import { getProductsByRestriction } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "What's Inside",
  description:
    "Chargers, hydration packets, gum, condoms, and a disposable camera — plus a separate 21+ section. No brands, no prices, no decisions.",
  path: "/products",
});

export default function ProductsPage() {
  const { general, restricted } = getProductsByRestriction();

  return (
    <>
      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl space-y-5">
          <h1 className="display text-4xl sm:text-6xl">What&apos;s inside</h1>
          <p className="text-lg text-muted">
            No brands, no menus, no decisions. Just the handful of things a
            night out actually runs out of.
          </p>
        </div>
      </Container>

      <Section className="border-t border-hairline pt-10 sm:pt-12">
        <h2 className="sr-only">Products</h2>
        <ProductGrid products={general} />
      </Section>

      <Section className="pt-0">
        {/* 21+ items are separated deliberately: their own heading, their own
            accent, and a notice that carries the age requirement. */}
        <div className="border-t border-neon-magenta/40 pt-10">
          <h2 className="display text-2xl text-neon-magenta sm:text-3xl">
            21+ Products
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Nicotine products are sold only to adults 21 or older, with valid
            ID.
          </p>
          <ProductGrid products={restricted} className="mt-8" />
        </div>
      </Section>

      <CtaBand
        title="Want these in your venue?"
        body="We handle the stocking, the compliance, and the machine. You pick the wall."
        primary={{ label: "Get a Machine", href: "/for-venues" }}
        secondary={{ label: "Find a Machine", href: "/find-a-machine" }}
      />
    </>
  );
}
