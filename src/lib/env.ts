import { z } from "zod";

/**
 * Server-only environment. Validated on first use rather than at import time:
 * Next collects page data for every route during `next build`, which imports
 * the inquiry route module, and a throw there would make the site unbuildable
 * on any machine without Resend credentials. Validating on the first request
 * still fails fast, and fails with a message that names what's missing.
 */
const serverEnvSchema = z.object({
  RESEND_API_KEY: z
    .string()
    .min(1, "missing — create a key at https://resend.com/api-keys"),
  LEAD_INBOX_EMAIL: z.email("must be a valid email address"),
  // Accepts a bare address or a "Name <address>" sender.
  LEAD_FROM_EMAIL: z
    .string()
    .min(3)
    .refine((value) => value.includes("@"), "must contain an email address"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")} ${issue.message}`)
      .join("; ");
    throw new Error(
      `Invalid server environment: ${details}. Copy .env.example to .env.local and fill it in.`,
    );
  }

  cached = parsed.data;
  return cached;
}
