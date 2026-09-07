import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Every public route. `/api/inquiry` is excluded by robots.ts. */
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/for-venues", priority: 0.9 },
  { path: "/find-a-machine", priority: 0.8 },
  { path: "/products", priority: 0.8 },
  { path: "/faq", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
