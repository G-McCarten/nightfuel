import { LegalLayout } from "@/components/legal/legal-layout";
import Privacy, { lastUpdated } from "@/content/legal/privacy.mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "What the NightFuel website collects: one age-confirmation cookie, cookieless analytics, and inquiry-form messages sent to us by email.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated={lastUpdated}>
      <Privacy />
    </LegalLayout>
  );
}
