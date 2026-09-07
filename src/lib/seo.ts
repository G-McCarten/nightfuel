import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/**
 * Canonical origin for canonical tags, OG URLs, and the sitemap.
 *
 * `NEXT_PUBLIC_SITE_URL` is the setting to use — but forgetting it on a deploy
 * would silently ship a sitemap full of localhost URLs, so Vercel's own domain
 * is the fallback. `VERCEL_PROJECT_PRODUCTION_URL` is the stable production
 * domain; `VERCEL_URL` is the per-deployment preview host and only stands in
 * for it on previews.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export function absoluteUrl(path = "/"): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * The social card, named explicitly on every page. See src/app/og/route.tsx for
 * why it isn't the app/opengraph-image.tsx file convention.
 */
const SOCIAL_IMAGE = {
  url: absoluteUrl("/og"),
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
};

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  /** Page title without the site name — the helper appends it. */
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    path === "/"
      ? `${siteConfig.name} — ${title}`
      : `${title} · ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
