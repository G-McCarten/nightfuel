import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ComingSoonTeaser } from "@/components/locations/coming-soon-teaser";
import { LocationList } from "@/components/locations/location-list";
import { CtaBand } from "@/components/shared/cta-band";
import { hasLiveLocation } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Find a Machine",
  description:
    "NightFuel machines are coming to New Jersey nightlife. See where to find one — or tell us where the next one should go.",
  path: "/find-a-machine",
});

export default function FindAMachinePage() {
  // No machines placed yet → teaser. The first `live` entry in locations.ts
  // flips this page to the list without any other change.
  if (!hasLiveLocation()) {
    return (
      <>
        <ComingSoonTeaser />
        <CtaBand
          title="Know the perfect spot?"
          body="If your bar, club, or lounge should have one, tell us. We're placing the first machines now."
          primary={{ label: "Get a Machine", href: "/for-venues" }}
          secondary={{ label: "Ask a question", href: "/contact" }}
        />
      </>
    );
  }

  return (
    <>
      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl space-y-5">
          <h1 className="display text-4xl sm:text-6xl">Find a Machine</h1>
          <p className="text-lg text-muted">
            Here&apos;s where you&apos;ll find us tonight.
          </p>
        </div>
      </Container>

      <Section className="border-t border-hairline pt-10 sm:pt-12">
        <LocationList />
      </Section>

      <CtaBand
        title="Not near you yet?"
        body="Tell us which spot should be next — or put one in your own venue."
        primary={{ label: "Get a Machine", href: "/for-venues" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
    </>
  );
}
