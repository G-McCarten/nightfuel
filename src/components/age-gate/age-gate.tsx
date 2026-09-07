"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AGE_COOKIE_MAX_AGE_DAYS,
  AGE_COOKIE_NAME,
  AGE_COOKIE_VALUE,
  readCookie,
  writeCookie,
} from "@/lib/cookies";
import { AgeGateAsk, AgeGateDeclined } from "./age-gate-content";

/**
 * Full-site 21+ overlay.
 *
 * Client-only and layered on top of the server-rendered page, so `curl /` still
 * returns the complete HTML and the site stays indexable. The legal pages are
 * exempt: someone must be able to read the privacy policy and the terms without
 * first making a claim about their age.
 */
const EXEMPT_PATHS = ["/privacy", "/terms"];

/** Sentinel for "we haven't read the cookie yet" — see the store below. */
const UNKNOWN = "unknown";
const ABSENT = "absent";

/**
 * The cookie is external state, so it's read through useSyncExternalStore
 * rather than a setState-in-effect. The server snapshot is UNKNOWN, which
 * renders nothing — that's what stops the overlay flashing at someone who
 * already confirmed. React swaps in the real value right after hydration.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function notify() {
  for (const listener of listeners) listener();
}

function getSnapshot() {
  return readCookie(AGE_COOKIE_NAME) ?? ABSENT;
}

function getServerSnapshot() {
  return UNKNOWN;
}

export function AgeGate() {
  const pathname = usePathname();
  const isExempt = EXEMPT_PATHS.includes(pathname);

  const ageCookie = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [declined, setDeclined] = useState(false);

  const accept = useCallback(() => {
    writeCookie(AGE_COOKIE_NAME, AGE_COOKIE_VALUE, {
      maxAgeDays: AGE_COOKIE_MAX_AGE_DAYS,
    });
    notify();
  }, []);

  if (isExempt || ageCookie === UNKNOWN) return null;

  return (
    <Dialog open={ageCookie !== AGE_COOKIE_VALUE}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-night/95 supports-backdrop-filter:backdrop-blur-sm"
        className="neon-border sm:max-w-md"
        // Non-dismissable: no escape, no click-away, no close button.
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        {declined ? (
          <AgeGateDeclined />
        ) : (
          <AgeGateAsk onAccept={accept} onDecline={() => setDeclined(true)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
