import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FaqGroup } from "@/components/faq/faq-group";
import { FaqJsonLd } from "@/components/faq/faq-json-ld";
import { CtaBand } from "@/components/shared/cta-band";
import { getFaqByAudience } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers for venue owners and for anyone who runs into a NightFuel machine on a night out.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />

      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl space-y-5">
          <h1 className="display text-4xl sm:text-6xl">
            Frequently asked questions
          </h1>
          <p className="text-lg text-muted">
            Two sets of answers: one for venue owners, one for everyone out on a
            Saturday.
          </p>
        </div>
      </Container>

      <Section className="space-y-14 border-t border-hairline">
        <FaqGroup
          title="For Venues"
          headingId="faq-venues"
          items={getFaqByAudience("venue")}
        />
        <FaqGroup
          title="For Nightlife-Goers"
          headingId="faq-consumers"
          items={getFaqByAudience("consumer")}
        />
      </Section>

      <CtaBand
        title="Question not answered?"
        body="Send it over. A real person reads these."
        primary={{ label: "Ask a question", href: "/contact" }}
        secondary={{ label: "Get a Machine", href: "/for-venues" }}
      />
    </>
  );
}
