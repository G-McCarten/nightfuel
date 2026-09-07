"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** The question. */
export function AgeGateAsk({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <>
      <DialogHeader className="items-center text-center">
        <Logo variant="badge" alt="" className="h-24 w-auto" />
        <DialogTitle className="display neon-text mt-4 text-3xl">
          You must be 21+ to enter
        </DialogTitle>
        <DialogDescription className="text-base">
          NightFuel machines carry age-restricted products. Please confirm your
          age.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-2 flex flex-col gap-2">
        <Button size="lg" variant="neon" autoFocus onClick={onAccept}>
          I&apos;m 21 or older
        </Button>
        <Button size="lg" variant="ghost" onClick={onDecline}>
          I&apos;m under 21
        </Button>
      </div>
    </>
  );
}

/** Shown after declining. There is no way back — that's the point of a gate. */
export function AgeGateDeclined() {
  return (
    <>
      <DialogHeader className="items-center text-center">
        <Logo variant="mark" alt="" className="h-10 w-auto" />
        <DialogTitle className="display mt-4 text-3xl">
          Come back when you&apos;re 21.
        </DialogTitle>
        <DialogDescription className="text-base">
          Stay safe tonight.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-2 flex justify-center gap-5 text-sm text-muted">
        <Link href="/privacy" className="transition-colors hover:text-fg">
          Privacy
        </Link>
        <Link href="/terms" className="transition-colors hover:text-fg">
          Terms
        </Link>
      </div>
    </>
  );
}
