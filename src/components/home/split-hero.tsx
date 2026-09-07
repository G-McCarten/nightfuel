import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { GlowBg } from "@/components/shared/glow-bg";
import { homeCopy } from "@/content/copy/home";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The site's fork in the road: nightlife-goers left, venue owners right. Two
 * equal panels on desktop, stacked on mobile.
 */
export function SplitHero() {
  const { kicker, consumer, venue } = homeCopy.hero;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate">
      <GlowBg />

      <Container className="flex flex-col items-center gap-5 py-14 text-center sm:py-20">
        <Logo variant="badge" priority className="h-40 w-auto sm:h-56" />
        <h1
          id="hero-heading"
          className="display neon-text text-4xl sm:text-6xl"
        >
          {siteConfig.tagline}
        </h1>
        <p className="text-sm tracking-wide text-muted uppercase">{kicker}</p>
      </Container>

      <div className="grid border-y border-hairline md:grid-cols-2">
        <HeroPanel {...consumer} accent="blue" />
        <HeroPanel
          {...venue}
          accent="violet"
          className="border-t border-hairline md:border-t-0 md:border-l"
        />
      </div>
    </section>
  );
}

function HeroPanel({
  title,
  body,
  cta,
  href,
  accent,
  className,
}: {
  title: string;
  body: string;
  cta: string;
  href: string;
  accent: "blue" | "violet";
  className?: string;
}) {
  return (
    <Link
      href={href}
      style={
        {
          "--nf-panel-accent":
            accent === "blue" ? "var(--blue)" : "var(--violet)",
        } as React.CSSProperties
      }
      className={cn(
        "group nf-panel relative isolate flex flex-col justify-between gap-8 overflow-hidden p-8 transition-colors hover:bg-surface sm:p-12",
        className,
      )}
    >
      <div className="space-y-4">
        <h2
          className={cn(
            "display text-3xl sm:text-4xl",
            accent === "blue" ? "text-neon-blue" : "text-neon-violet",
          )}
        >
          {title}
        </h2>
        <p className="max-w-sm text-lg text-muted">{body}</p>
      </div>

      <span className="inline-flex items-center gap-2 text-sm font-semibold text-fg">
        {cta}
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
