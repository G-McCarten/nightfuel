/**
 * Best-effort in-memory sliding window.
 *
 * This is per serverless instance, so it does not survive a cold start and does
 * not coordinate across instances — it raises the cost of casual abuse, nothing
 * more. The honeypot is the primary spam defence at launch; a durable limiter
 * (Vercel WAF or Upstash) is the upgrade path once there's traffic to justify
 * it. See the README launch checklist.
 */

const buckets = new Map<string, number[]>();

/** Stops the map growing without bound on a long-lived instance. */
const MAX_TRACKED_KEYS = 5_000;

export type RateLimitOptions = {
  limit: number;
  windowMs: number;
  /** Injectable for tests. */
  now?: number;
};

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs, now = Date.now() }: RateLimitOptions,
): RateLimitResult {
  const cutoff = now - windowMs;
  const recent = (buckets.get(key) ?? []).filter(
    (timestamp) => timestamp > cutoff,
  );

  if (recent.length >= limit) {
    const oldest = recent[0];
    buckets.set(key, recent);
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((oldest + windowMs - now) / 1000),
      ),
    };
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > MAX_TRACKED_KEYS) pruneEmptyBuckets(cutoff);

  return {
    ok: true,
    remaining: limit - recent.length,
    retryAfterSeconds: 0,
  };
}

function pruneEmptyBuckets(cutoff: number) {
  for (const [key, timestamps] of buckets) {
    if (timestamps.every((timestamp) => timestamp <= cutoff))
      buckets.delete(key);
  }
}

/** Test helper. */
export function resetRateLimit() {
  buckets.clear();
}
