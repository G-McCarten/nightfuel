import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

const size = { width: 1200, height: 630 };

// Prerendered at build time, so the font fetch below happens once.
export const dynamic = "force-static";

/**
 * The shared social card (1200x630).
 *
 * This is a plain route rather than app/opengraph-image.tsx: the metadata file
 * convention only attaches an image to its own route segment, and it blanks
 * `openGraph.images` everywhere else — so with the convention every page but
 * the home page shared with no card. Serving it from a normal URL lets
 * buildMetadata point every page at the same image.
 *
 * Satori has no access to the site's webfonts, and its built-in fallback ships
 * a single light weight — which makes the wordmark look wrong. So the display
 * face is fetched here. The route is statically generated, so the fetch runs at
 * build time, not per request; if it fails the card still renders in the
 * fallback face rather than failing the build.
 */
async function loadInter(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`,
      {
        // Google picks a format from the User-Agent. A modern browser string
        // gets woff2, which Satori cannot read; an unrecognised agent gets
        // plain TrueType, which it can.
        headers: { "User-Agent": "NightFuel-OG-Builder" },
      },
    ).then((response) => response.text());

    const url = css.match(/src:\s*url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;

    return await fetch(url).then((response) => response.arrayBuffer());
  } catch {
    return null;
  }
}

export async function GET() {
  const [bold, regular] = await Promise.all([loadInter(800), loadInter(400)]);

  const fonts = [
    bold && {
      name: "Inter",
      data: bold,
      weight: 800 as const,
      style: "normal" as const,
    },
    regular && {
      name: "Inter",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
  ].filter((font) => font !== null);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0A0A0F",
        color: "#FFFFFF",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          height: 14,
          background: "linear-gradient(90deg,#2F6BFF,#7B3FE4,#E040FB)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 108,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          NIGHTFUEL
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 400,
            color: "#A0A3B1",
            lineHeight: 1,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          padding: "0 80px 64px",
          fontSize: 26,
          fontWeight: 400,
          color: "#A0A3B1",
          letterSpacing: 2,
        }}
      >
        NIGHTLIFE VENDING MACHINES · NEW JERSEY
      </div>
    </div>,
    { ...size, ...(fonts.length > 0 ? { fonts } : {}) },
  );
}
