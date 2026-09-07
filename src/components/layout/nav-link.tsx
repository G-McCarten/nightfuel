"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * A nav link that knows whether it's the current page. `aria-current="page"`
 * carries that to screen readers; the styling carries it to everyone else.
 */
export function NavLink({
  href,
  children,
  className,
  activeClassName,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "transition-colors hover:text-fg",
        isActive ? "text-fg" : "text-muted",
        className,
        isActive && activeClassName,
      )}
    >
      {children}
    </Link>
  );
}
