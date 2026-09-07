"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Message and digest only — never anything the visitor typed.
    console.error("[nightfuel] render error:", error.message, error.digest);
  }, [error]);

  return (
    <Container className="flex flex-col items-center gap-6 py-24 text-center sm:py-32">
      <p className="display text-6xl text-neon-magenta sm:text-8xl">Jammed</p>
      <h1 className="display text-3xl sm:text-5xl">
        Something went wrong on our end.
      </h1>
      <p className="max-w-md text-balance text-muted">
        Give it another go. If it keeps happening, let us know and we&apos;ll
        take a look.
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact">Tell us about it</Link>
        </Button>
      </div>
    </Container>
  );
}
