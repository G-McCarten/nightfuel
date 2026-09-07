"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "./nav-link";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="display text-2xl">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {siteConfig.nav.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onNavigate={close}
              className="rounded-md px-2 py-3 text-lg font-medium hover:bg-surface"
              activeClassName="bg-surface"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <Button asChild className="w-full" onClick={close}>
            <Link href="/for-venues">Get a Machine</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
