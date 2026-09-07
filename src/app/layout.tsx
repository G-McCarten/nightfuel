import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AgeGate } from "@/components/age-gate/age-gate";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  // Resolves the relative OG/Twitter image emitted by opengraph-image.tsx.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s`,
  },
  description:
    "Nightlife vending machines for New Jersey bars, clubs, and lounges.",
  applicationName: siteConfig.name,
};

export const viewport: Viewport = {
  // Tints the browser chrome on mobile to match the night background.
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Dark-only site: `dark` is fixed so shadcn's `dark:` variants apply.
      className={cn("dark h-full font-sans antialiased", fontVariables)}
    >
      <body className="flex min-h-full flex-col bg-night text-fg">
        <SkipLink />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <AgeGate />
        <Toaster />
        <LocalBusinessJsonLd />
        {/* Cookieless and aggregate-only — see the privacy policy. */}
        <Analytics />
      </body>
    </html>
  );
}
