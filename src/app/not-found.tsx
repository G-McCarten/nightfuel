import Link from "next/link";
import { Container } from "@/components/layout/container";
import { GlowBg } from "@/components/shared/glow-bg";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "That page doesn't exist.",
  path: "/404",
});

export default function NotFound() {
  return (
    <Container className="relative isolate flex flex-col items-center gap-6 py-24 text-center sm:py-32">
      <GlowBg />
      <p className="display text-7xl text-neon-violet sm:text-9xl">404</p>
      <h1 className="display text-3xl sm:text-5xl">
        This machine&apos;s out of stock.
      </h1>
      <p className="max-w-md text-balance text-muted">
        That page doesn&apos;t exist — or it did once and we pulled it. Try one
        of these instead.
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" variant="neon">
          <Link href="/">Back to the start</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/find-a-machine">Find a Machine</Link>
        </Button>
      </div>
    </Container>
  );
}
