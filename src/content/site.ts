import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "NightFuel",
  tagline: "Fuel Your Night.",

  // Leave a value empty until the account exists — the footer hides any icon
  // whose URL is blank.
  social: {
    instagram: "",
    tiktok: "",
  },

  teaser: {
    headline: "Coming soon to New Jersey",
    body: "The first machines are being placed right now. Check back soon — or tell us where you want one.",
  },

  nav: [
    { href: "/find-a-machine", label: "Find a Machine" },
    { href: "/products", label: "Products" },
    { href: "/for-venues", label: "For Venues" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],

  legalNav: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],

  // TODO(owner): replace with the registered entity name once the LLC is filed.
  legalName: "NightFuel",
};
