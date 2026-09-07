# Brand assets

Everything on the site is derived from a single source file:

**`logo-source.png`** (in this folder) — 1254x1254, the full circular
NightFuel lockup. It lives outside `public/` on purpose: it is the regeneration
source, not a site asset, so it is never deployed or served.

Replace that one file, run `pnpm icons`, and every asset below is regenerated.

## Generated assets

Do not edit these by hand; they are overwritten on every run.

| Generated file              | What it is                                    |
| --------------------------- | --------------------------------------------- |
| `public/brand/badge.png`    | Full circular lockup — home hero, age gate    |
| `public/brand/wordmark.png` | The "NightFuel" band — site header, footer    |
| `public/brand/mark.png`     | The bag-and-bolt icon — favicon and app tiles |
| `src/app/icon.png`          | Browser tab icon, 96x96                       |
| `src/app/apple-icon.png`    | 180x180 iOS home-screen tile, on `#0A0A0F`    |
| `public/favicon.ico`        | 16 + 32 legacy favicon, transparent           |
| `public/icon-192.png`       | Android install icon, on `#0A0A0F`            |
| `public/icon-512.png`       | Manifest / splash icon, on `#0A0A0F`          |

```bash
pnpm icons
pnpm build
```

## Two things the script does, and why

**It keys the black background out.** The source art is opaque neon on black,
but the site's background is `#0A0A0F` — dropped in as-is it shows a black
patch. Because the artwork is glow on black, luminance doubles as an alpha
channel: the neon stays solid, the black field falls away, and the glow keeps
its soft falloff instead of being clipped by a hard colour key.

**The icon set comes from the mark, not the badge.** The circular badge is
unreadable below about 100px — at 32px it is a purple smudge. The bag-and-bolt
inside it stays legible down to 16px, so that is what becomes the favicon.

## If the logo is redrawn

The crop rectangles in `scripts/generate-icons.mjs` (`CROPS`) are measured
against the current artwork in source pixels. New artwork with a different
layout needs those numbers re-measured. Everything else follows automatically.

## What would improve on this

The current source is raster-only and has no alpha channel. Better, in order:

1. **Vector** — `.svg`, `.ai`, `.eps`, or vector `.pdf`, text converted to
   outlines. Only vector stays truly crisp at every size.
2. **Transparent PNG** — same artwork with a real alpha channel, so the
   background doesn't have to be inferred from luminance.
3. **Separate lockups** — a standalone horizontal wordmark and a standalone
   icon, drawn for those sizes rather than cropped out of the badge.

Any of these can be dropped in without touching the site code; only
`generate-icons.mjs` would change.
