import type { FaqItem } from "./types";

/**
 * Questions are drafted; answers are not. Replace each `answer` with real copy
 * and flip `isPlaceholder` to false — the FAQ page marks placeholders with an
 * "Answer coming soon" chip and keeps them out of the FAQPage JSON-LD.
 */
const PLACEHOLDER = "[Owner to provide]";

export const faq: FaqItem[] = [
  // ---- For venues -------------------------------------------------------
  {
    id: "venue-cost",
    question: "What does it cost my venue?",
    answer: PLACEHOLDER,
    audience: "venue",
    isPlaceholder: true,
  },
  {
    id: "venue-space",
    question: "How much space and power does a machine need?",
    answer: PLACEHOLDER,
    audience: "venue",
    isPlaceholder: true,
  },
  {
    id: "venue-restocking",
    question: "Who restocks and maintains the machine?",
    answer: PLACEHOLDER,
    audience: "venue",
    isPlaceholder: true,
  },
  {
    id: "venue-compliance",
    question: "How do you keep the 21+ products compliant?",
    answer: PLACEHOLDER,
    audience: "venue",
    isPlaceholder: true,
  },

  // ---- For nightlife-goers ---------------------------------------------
  {
    id: "consumer-payment",
    question: "How do I pay — is it card only?",
    answer: PLACEHOLDER,
    audience: "consumer",
    isPlaceholder: true,
  },
  {
    id: "consumer-age-check",
    question: "How does the machine check my age for 21+ items?",
    answer: PLACEHOLDER,
    audience: "consumer",
    isPlaceholder: true,
  },
  {
    id: "consumer-stuck",
    question: "My item got stuck, or I was charged twice. Now what?",
    answer: PLACEHOLDER,
    audience: "consumer",
    isPlaceholder: true,
  },
  {
    id: "consumer-where",
    question: "Where can I find a NightFuel machine?",
    answer: PLACEHOLDER,
    audience: "consumer",
    isPlaceholder: true,
  },
];
