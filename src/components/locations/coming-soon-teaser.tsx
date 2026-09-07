import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

/** Shown while no machine is live. Replaced by the list on the first placement. */
export function ComingSoonTeaser() {
  const { headline, body } = siteConfig.teaser;

  return (
    <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-28">
      <p className="text-sm font-semibold tracking-widest text-neon-violet uppercase">
        Find a Machine
      </p>
      <h1 className="display max-w-3xl text-4xl sm:text-6xl">{headline}</h1>
      <p className="max-w-lg text-lg text-balance text-muted">{body}</p>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/for-venues">Want one at your spot?</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/products">See what&apos;s inside</Link>
        </Button>
      </div>
    </Container>
  );
}
