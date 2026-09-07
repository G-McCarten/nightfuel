import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";
import { buildInquiryEmail } from "@/lib/email/inquiry-email";
import { inquirySchema } from "@/lib/inquiry-schema";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  // Honeypot first: the schema would reject a filled `website` as invalid, but
  // a bot should get a clean 200 and no signal that it was caught.
  const honeypot = (body as { website?: unknown } | null)?.website;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return Response.json({ ok: true });
  }

  const limit = rateLimit(clientIp(request), RATE_LIMIT);
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many messages. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const inquiry = parsed.data;
  const email = buildInquiryEmail(inquiry);

  try {
    const env = getServerEnv();
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: env.LEAD_FROM_EMAIL,
      to: env.LEAD_INBOX_EMAIL,
      replyTo: inquiry.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (error) throw new Error(error.message);
  } catch (error) {
    // Never log the message body — only why the send failed.
    console.error(
      "[inquiry] send failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return Response.json(
      { ok: false, error: "We couldn't send that just now." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
