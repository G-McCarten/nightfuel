/** Copy for the venue pitch page. Businesslike voice — this audience is at work. */
export const forVenuesCopy = {
  hero: {
    title: "A revenue line that runs itself",
    body: "NightFuel puts a compact vending machine in your venue stocked with the things your guests already leave to go find. You get a cut. We handle everything else.",
  },

  valueProps: {
    title: "Why venues say yes",
    items: [
      {
        icon: "TrendingUp",
        title: "Revenue with no inventory risk",
        body: "You don't buy the stock, hold the stock, or eat the loss on what doesn't sell. We do.",
      },
      {
        icon: "Clock",
        title: "Zero staff effort",
        body: "Nobody behind your bar has to ring anything up, restock anything, or answer questions about it.",
      },
      {
        icon: "Wrench",
        title: "We stock and maintain it",
        body: "Scheduled restocks around your hours, remote monitoring, and we come out when something jams.",
      },
    ],
  },

  models: {
    title: "Two ways to work together",
    footnote:
      "Not sure which fits? We'll help you pick — it's a five-minute conversation.",
    items: [
      {
        name: "Revenue Share",
        tagline: "No cost to you",
        description:
          "We place and own the machine. You take an agreed percentage of every sale.",
        points: [
          "No upfront cost, no monthly fee",
          "Percentage of sales paid on a set schedule",
          "Best if you'd rather not carry any risk",
        ],
      },
      {
        name: "Fee-Based",
        tagline: "You keep 100% of sales",
        description:
          "You pay a flat placement fee and every dollar the machine takes in stays with you.",
        points: [
          "Flat, predictable placement fee",
          "All sales revenue is yours",
          "Best for high-traffic venues that want the upside",
        ],
      },
    ],
  },

  requirements: {
    title: "What we need from you",
    items: [
      {
        icon: "Ruler",
        title: "A small footprint",
        body: "Roughly the floor space of a standard ice machine, against a wall guests already walk past.",
      },
      {
        icon: "Plug",
        title: "A standard power outlet",
        body: "One dedicated 110V outlet within reach of the machine. That's the whole install.",
      },
      {
        icon: "IdCard",
        title: "A 21+ venue",
        body: "Some of what we carry is age-restricted, so the machine only goes in rooms that already card at the door.",
      },
    ],
  },

  inquiry: {
    title: "Start the conversation",
    body: "Tell us about your venue. We'll get back to you within two business days.",
  },

  cta: {
    title: "Still deciding?",
    body: "Ask us anything — hours, cut, install, what's in the machine. No pitch deck, no pressure.",
    primary: { label: "Ask a question", href: "/contact" },
    secondary: { label: "Read the FAQ", href: "/faq" },
  },
} as const;
