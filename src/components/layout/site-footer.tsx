import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/brand/logo";
import { InstagramIcon, TikTokIcon } from "@/components/brand/social-icons";
import { Container } from "./container";

/** Only rendered for platforms whose URL is filled in; blank = not launched. */
const SOCIALS = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = SOCIALS.map((social) => ({
    ...social,
    href: siteConfig.social[social.key],
  })).filter((social) => social.href.length > 0);

  return (
    <footer className="mt-auto border-t border-hairline">
      <Container className="flex flex-col gap-10 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-block"
              aria-label={`${siteConfig.name} — home`}
            >
              <Logo variant="wordmark" alt="" className="h-7 w-auto" />
            </Link>
            <p className="display text-sm text-muted">{siteConfig.tagline}</p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:flex sm:flex-col sm:items-end"
          >
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 text-xs">
              {siteConfig.legalNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {links.length > 0 && (
              <ul className="flex items-center gap-3">
                {links.map(({ key, label, Icon, href }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${siteConfig.name} on ${label}`}
                      className="inline-flex text-muted transition-colors hover:text-fg"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
