import {
  PREFERRED_MODEL_LABELS,
  ROLE_LABELS,
  VENUE_TYPE_LABELS,
  type Inquiry,
} from "@/lib/inquiry-schema";

export type InquiryEmail = {
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Everything the lead email shows, in display order. */
function rowsFor(inquiry: Inquiry): [string, string][] {
  const rows: [string, string][] = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone || "—"],
  ];

  if (inquiry.reason === "venue") {
    rows.push(
      ["Venue", inquiry.venueName],
      ["Venue type", VENUE_TYPE_LABELS[inquiry.venueType]],
      ["City", inquiry.city],
      ["Role", ROLE_LABELS[inquiry.role]],
      ["Preferred model", PREFERRED_MODEL_LABELS[inquiry.preferredModel]],
    );
  }

  return rows;
}

export function buildInquiryEmail(inquiry: Inquiry): InquiryEmail {
  const subject =
    inquiry.reason === "venue"
      ? `[NightFuel] Venue partnership – ${inquiry.venueName}`
      : `[NightFuel] General inquiry – ${inquiry.name}`;

  const rows = rowsFor(inquiry);

  const text = [
    subject,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    inquiry.message,
    "",
    `Reply directly to this email to reach ${inquiry.name}.`,
  ].join("\n");

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
  <h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(subject)}</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
      )
      .join("\n    ")}
  </table>
  <p style="margin:0 0 6px;color:#666">Message</p>
  <p style="margin:0 0 20px;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>
  <p style="margin:0;color:#666;font-size:13px">Reply directly to this email to reach ${escapeHtml(inquiry.name)}.</p>
</div>`;

  return { subject, text, html };
}
