import { Container } from "@/components/layout/container";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { contactCopy } from "@/content/copy/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Questions about a machine, a venue partnership, or something that went wrong — reach a real person.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl space-y-4">
        <h1 className="display text-4xl sm:text-6xl">{contactCopy.title}</h1>
        <p className="text-lg text-muted">{contactCopy.body}</p>
        <p className="text-sm text-muted">{contactCopy.note}</p>
      </div>

      <div className="mt-10 max-w-2xl">
        <InquiryForm defaultReason="general" />
      </div>
    </Container>
  );
}
