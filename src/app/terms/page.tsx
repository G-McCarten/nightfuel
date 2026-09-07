import { LegalLayout } from "@/components/legal/legal-layout";
import Terms, { lastUpdated } from "@/content/legal/terms.mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms for using the NightFuel website, including the 21+ requirement and New Jersey governing law.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" lastUpdated={lastUpdated}>
      <Terms />
    </LegalLayout>
  );
}
