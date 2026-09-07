import { Inter, Inter_Tight } from "next/font/google";

/**
 * Body copy. Neutral grotesque, wide language coverage.
 */
export const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Headings. Inter Tight ships true italics (not a synthesised oblique), which
 * is what the NightFuel wordmark's slanted letterforms need. Swap this out if
 * the owner supplies a brand typeface.
 */
export const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
});

export const fontVariables = `${fontBody.variable} ${fontDisplay.variable}`;
