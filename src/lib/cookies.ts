/**
 * Tiny client-side cookie helpers. The age gate is the only cookie this site
 * sets, and it holds a single confirmation flag — no identifier, nothing to
 * correlate. Documented in the privacy policy.
 */

export const AGE_COOKIE_NAME = "nf_age_ok";
export const AGE_COOKIE_VALUE = "1";
export const AGE_COOKIE_MAX_AGE_DAYS = 30;

export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const prefix = `${name}=`;
  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix));

  return match ? decodeURIComponent(match.slice(prefix.length)) : null;
}

export function writeCookie(
  name: string,
  value: string,
  { maxAgeDays }: { maxAgeDays: number },
) {
  if (typeof document === "undefined") return;

  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "path=/",
    `max-age=${maxAgeDays * 24 * 60 * 60}`,
    "SameSite=Lax",
  ];

  // Only meaningful over TLS, and setting it on http would drop the cookie in dev.
  if (window.location.protocol === "https:") parts.push("Secure");

  document.cookie = parts.join("; ");
}
