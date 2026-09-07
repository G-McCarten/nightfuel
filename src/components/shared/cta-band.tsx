import Link from "next/link";
import { Container } from "@/components/layout/container";
import { GlowBg } from "@/components/shared/glow-bg";
import { Button } from "@/components/ui/button";

type CtaLink = { label: string; href: string };

/** Closing band reused at the bottom of the marketing pages. */
export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-hairline bg-surface">
      <GlowBg className="opacity-60" />
      <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-16">
        <div className="space-y-2">
          <h2 className="display neon-text text-3xl sm:text-4xl">{title}</h2>
          <p className="max-w-lg text-muted">{body}</p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Button asChild size="lg" variant="neon">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary && (
            <Button asChild size="lg" variant="outline">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
