import { z } from "zod";

/**
 * One source of truth for the inquiry form and the /api/inquiry route handler.
 *
 * Two schemas, deliberately:
 *  - `inquirySchema` is the wire contract — a discriminated union on `reason`,
 *    so a general inquiry cannot carry half-filled venue fields.
 *  - `inquiryFormSchema` is what react-hook-form validates against. RHF needs a
 *    flat, stable set of field names (the venue inputs stay registered while
 *    they're hidden), so venue fields are always present and only *required*
 *    when the reason is "venue". Their rules are not duplicated: the refinement
 *    re-runs the same venue object schema.
 */

export const INQUIRY_REASONS = ["venue", "general"] as const;
export const VENUE_TYPES = [
  "bar",
  "nightclub",
  "lounge",
  "restaurant-bar",
  "other",
] as const;
export const ROLES = ["owner", "manager", "other"] as const;
export const PREFERRED_MODELS = ["revenue_share", "fee", "not_sure"] as const;

export type InquiryReason = (typeof INQUIRY_REASONS)[number];
export type VenueType = (typeof VENUE_TYPES)[number];
export type Role = (typeof ROLES)[number];
export type PreferredModel = (typeof PREFERRED_MODELS)[number];

export const REASON_LABELS: Record<InquiryReason, string> = {
  venue: "Venue partnership",
  general: "General inquiry",
};

export const VENUE_TYPE_LABELS: Record<VenueType, string> = {
  bar: "Bar",
  nightclub: "Nightclub",
  lounge: "Lounge",
  "restaurant-bar": "Restaurant with a bar",
  other: "Something else",
};

export const ROLE_LABELS: Record<Role, string> = {
  owner: "Owner",
  manager: "Manager",
  other: "Something else",
};

export const PREFERRED_MODEL_LABELS: Record<PreferredModel, string> = {
  revenue_share: "Revenue share — no cost to me",
  fee: "Fee-based — I keep 100% of sales",
  not_sure: "Not sure yet — help me pick",
};

const baseFields = {
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep this under 80 characters."),
  email: z
    .email("Please enter a valid email address.")
    .max(254, "That email address is too long."),
  phone: z
    .string()
    .trim()
    .max(40, "Please keep this under 40 characters.")
    .regex(/^$|^[0-9+().\-\s]{7,}$/, "Use digits, spaces, and + ( ) - . only."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(2000, "Please keep this under 2000 characters."),
  /**
   * Honeypot. Hidden from real users, so any value at all means a bot filled
   * it in. The route handler drops those silently rather than erroring.
   */
  website: z.string().max(0),
};

const venueFields = {
  venueName: z
    .string()
    .trim()
    .min(2, "What's the venue called?")
    .max(120, "Please keep this under 120 characters."),
  venueType: z.enum(VENUE_TYPES, { error: "Pick the closest match." }),
  city: z
    .string()
    .trim()
    .min(2, "Which city or town?")
    .max(80, "Please keep this under 80 characters."),
  role: z.enum(ROLES, { error: "Pick the closest match." }),
  preferredModel: z.enum(PREFERRED_MODELS, {
    error: "Pick one — 'not sure' is a fine answer.",
  }),
};

const venueObject = z.object(venueFields);

/** What the API accepts and what an email is built from. */
export const inquirySchema = z.discriminatedUnion("reason", [
  z.object({ reason: z.literal("general"), ...baseFields }),
  z.object({ reason: z.literal("venue"), ...baseFields, ...venueFields }),
]);

export type Inquiry = z.infer<typeof inquirySchema>;

/** What react-hook-form validates while the user types. */
export const inquiryFormSchema = z
  .object({
    reason: z.enum(INQUIRY_REASONS),
    ...baseFields,
    venueName: z.string().trim().max(120),
    venueType: z.string(),
    city: z.string().trim().max(80),
    role: z.string(),
    preferredModel: z.string(),
  })
  .superRefine((values, ctx) => {
    if (values.reason !== "venue") return;

    const result = venueObject.safeParse(values);
    if (result.success) return;

    for (const issue of result.error.issues) {
      ctx.addIssue({
        code: "custom",
        path: issue.path,
        message: issue.message,
      });
    }
  });

export type InquiryFormValues = z.input<typeof inquiryFormSchema>;

export function emptyInquiryForm(reason: InquiryReason): InquiryFormValues {
  return {
    reason,
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
    venueName: "",
    venueType: "",
    city: "",
    role: "",
    preferredModel: "",
  };
}

/**
 * Narrows validated form values to the wire shape, dropping venue fields from
 * a general inquiry so they never reach the API or the lead email.
 */
export function toInquiryPayload(values: InquiryFormValues): Inquiry {
  const common = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    message: values.message,
    website: values.website,
  };

  if (values.reason === "venue") {
    return {
      reason: "venue",
      ...common,
      venueName: values.venueName,
      venueType: values.venueType as VenueType,
      city: values.city,
      role: values.role as Role,
      preferredModel: values.preferredModel as PreferredModel,
    };
  }

  return { reason: "general", ...common };
}
