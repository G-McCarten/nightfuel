import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-night/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo
            variant="wordmark"
            alt=""
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-6 text-sm font-medium md:flex"
        >
          {siteConfig.nav.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/for-venues">Get a Machine</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
