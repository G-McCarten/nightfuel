import { TriangleAlertIcon } from "lucide-react";
import { Container } from "@/components/layout/container";

/**
 * Shared chrome for /privacy and /terms: title, review banner, last-updated
 * date, and a readable measure for the MDX body.
 */
export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  /** ISO date string exported by the MDX document. */
  lastUpdated: string;
  children: React.ReactNode;
}) {
  const formatted = new Date(`${lastUpdated}T00:00:00Z`).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  );

  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <h1 className="display text-4xl sm:text-5xl">{title}</h1>

        {/* Remove this banner once counsel has signed off. */}
        <div
          role="note"
          className="mt-6 flex items-start gap-3 rounded-lg border border-neon-magenta/40 p-4 text-sm text-neon-magenta"
        >
          <TriangleAlertIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
          <p>
            <strong className="font-semibold">
              Draft — pending legal review.
            </strong>{" "}
            This page has not been reviewed by an attorney and should not be
            relied on yet.
          </p>
        </div>

        <p className="mt-4 text-sm text-muted">
          Last updated <time dateTime={lastUpdated}>{formatted}</time>
        </p>

        <div className="legal-prose mt-10">{children}</div>
      </div>
    </Container>
  );
}
