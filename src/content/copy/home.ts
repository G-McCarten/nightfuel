/**
 * Home page copy. Kept out of the components so the owner can edit voice
 * without touching JSX.
 */
export const homeCopy = {
  hero: {
    kicker: "Nightlife vending machines. New Jersey.",
    consumer: {
      title: "Find a Machine",
      body: "Dead phone, no gum, and the night's just getting good. We put the fix on the wall.",
      cta: "See where we are",
      href: "/find-a-machine",
    },
    venue: {
      title: "Get a Machine for Your Venue",
      body: "A new revenue line that takes no staff time, no floor plan changes, and no upfront cost.",
      cta: "See partnership options",
      href: "/for-venues",
    },
  },

  howItWorks: {
    title: "How it works",
    steps: [
      {
        title: "Spot the bolt",
        body: "By the restrooms, the coat check, or the smoking patio. You'll know it when you see it.",
      },
      {
        title: "Tap and go",
        body: "Card or phone. No app, no account, no digging for cash.",
      },
      {
        title: "Back to your night",
        body: "The whole thing takes about thirty seconds.",
      },
    ],
  },

  products: {
    title: "What's inside",
    body: "The stuff you only remember you need at midnight.",
    cta: "See everything",
  },

  cta: {
    title: "Want one at your spot?",
    body: "Tell us about your venue and we'll come look at the space. No pitch deck, no pressure.",
    primary: { label: "Get a Machine", href: "/for-venues" },
    secondary: { label: "Ask a question", href: "/contact" },
  },
} as const;
