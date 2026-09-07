import Link from "next/link";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CtaBand } from "@/components/shared/cta-band";
import { Button } from "@/components/ui/button";
import { PartnershipModels } from "@/components/venues/partnership-models";
import { ValueProps } from "@/components/venues/value-props";
import { forVenuesCopy } from "@/content/copy/for-venues";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "For Venues",
  description:
    "Add a revenue line that takes no staff time. Revenue share or flat fee — we stock, monitor, and maintain the machine.",
  path: "/for-venues",
});

export default function ForVenuesPage() {
  const { hero, valueProps, models, requirements, inquiry, cta } =
    forVenuesCopy;

  return (
    <>
      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl space-y-5">
          <h1 className="display text-4xl sm:text-6xl">{hero.title}</h1>
          <p className="text-lg text-muted">{hero.body}</p>
          <Button asChild size="lg">
            <Link href="#inquiry">Get a Machine</Link>
          </Button>
        </div>
      </Container>

      <Section className="border-t border-hairline">
        <h2 className="display mb-10 text-3xl sm:text-4xl">
          {valueProps.title}
        </h2>
        <ValueProps items={valueProps.items} />
      </Section>

      <Section className="border-t border-hairline">
        <h2 className="display mb-10 text-3xl sm:text-4xl">{models.title}</h2>
        <PartnershipModels />
      </Section>

      <Section className="border-t border-hairline">
        <h2 className="display mb-10 text-3xl sm:text-4xl">
          {requirements.title}
        </h2>
        <ValueProps items={requirements.items} accent="violet" />
      </Section>

      <Section id="inquiry" className="scroll-mt-20 border-t border-hairline">
        <div className="max-w-2xl space-y-3">
          <h2 className="display text-3xl sm:text-4xl">{inquiry.title}</h2>
          <p className="text-muted">{inquiry.body}</p>
        </div>
        <div className="mt-8 max-w-2xl">
          <InquiryForm defaultReason="venue" />
        </div>
      </Section>

      <CtaBand {...cta} />
    </>
  );
}
