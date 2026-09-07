import { HowItWorks } from "@/components/home/how-it-works";
import { ProductTeaser } from "@/components/home/product-teaser";
import { SplitHero } from "@/components/home/split-hero";
import { CtaBand } from "@/components/shared/cta-band";
import { homeCopy } from "@/content/copy/home";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fuel Your Night.",
  description:
    "NightFuel puts nightlife vending machines in New Jersey bars, clubs, and lounges — chargers, gum, hydration, and more, right where the night happens.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <SplitHero />
      <HowItWorks />
      <ProductTeaser />
      <CtaBand {...homeCopy.cta} />
    </>
  );
}
