/**
 * Content model for the NightFuel marketing site.
 *
 * Everything here is static: the site has no database. The owner edits these
 * modules in-repo and redeploys.
 */

export type ProductCategory =
  "essentials" | "recovery" | "tech" | "fun" | "nicotine";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  /** One line, consumer voice. No brand names, no prices. */
  description: string;
  /** Name of a lucide-react icon, resolved by the product icon map. */
  icon: string;
  /** 21+ only. Drives the separated "21+ Products" section. */
  isAgeRestricted: boolean;
};

export type LocationStatus = "coming_soon" | "live";

export type Location = {
  id: string;
  /** Venue the machine lives in, e.g. "The Alibi". */
  venueName: string;
  address: string;
  city: string;
  state: string;
  /** Free text: opening hours, or a note like "In the back hallway". */
  hours: string;
  status: LocationStatus;
  lat: number;
  lng: number;
};

export type FaqAudience = "venue" | "consumer";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  audience: FaqAudience;
  /** True while `answer` is still owner-supplied placeholder text. */
  isPlaceholder: boolean;
};

export type NavLink = {
  href: string;
  label: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  /** Empty string = not launched yet; the footer hides that icon. */
  social: {
    instagram: string;
    tiktok: string;
  };
  /** Shown on /find-a-machine while no location is live. */
  teaser: {
    headline: string;
    body: string;
  };
  nav: NavLink[];
  legalNav: NavLink[];
  /** Registered entity name, used in the copyright line. */
  legalName: string;
};
