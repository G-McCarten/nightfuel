/**
 * Derives every brand asset the site uses from one source file:
 * assets/logo-source.png.
 *
 *   assets/logo-source.png
 *     ├── public/brand/badge.png     full circular lockup
 *     ├── public/brand/wordmark.png  the "NightFuel" band, for the header
 *     ├── public/brand/mark.png      the bag-and-bolt icon, for small sizes
 *     ├── src/app/icon.png           browser tab icon
 *     ├── src/app/apple-icon.png     180x180 iOS tile
 *     ├── public/favicon.ico         16 + 32
 *     ├── public/icon-192.png        Android install
 *     └── public/icon-512.png        manifest / splash
 *
 * Run `pnpm icons` and commit the outputs. They're build artefacts, but they're
 * checked in so the deploy doesn't need sharp.
 *
 * NOTE: the crop rectangles below are measured against the current artwork. If
 * the logo is redrawn, re-measure them — everything else follows automatically.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");
// Kept outside public/ so the 1.1 MB original is never deployed.
const SOURCE = path.join(ROOT, "assets", "logo-source.png");

/** Matches --bg in globals.css. Platform tiles are never transparent. */
const NIGHT = "#0A0A0F";

/** Regions of logo-source.png, in source pixels. See NOTE above. */
const CROPS = {
  wordmark: { left: 84, top: 612, width: 1112, height: 295 },
  mark: { left: 583, top: 898, width: 90, height: 92 },
};

const out = (...segments) => path.join(ROOT, ...segments);

/**
 * The source art is opaque neon-on-black, but the site's background is #0A0A0F
 * — dropping it in as-is would show a black patch. Since the artwork is glow on
 * black, luminance doubles as an alpha channel: bright neon stays solid, the
 * black field falls away, and the glow keeps its soft falloff instead of being
 * clipped by a hard colour key.
 */
async function keyBackground(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const luma =
      0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
    pixels[i + 3] = Math.min(255, Math.round(luma * 3));
  }

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png(PNG)
    .toBuffer();
}

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/**
 * PNG is lossless, so the only cost of the slow settings is generation time —
 * and they take the badge from 1.4 MB to ~320 KB at identical quality.
 */
const PNG = { compressionLevel: 9, effort: 10 };

/** Square, transparent, letterboxed to fit. */
const square = (input, size) =>
  sharp(input)
    .resize(size, size, { fit: "contain", background: TRANSPARENT })
    .png(PNG)
    .toBuffer();

/** Square, centred on a night tile, inset so it isn't flush to the edges. */
async function tile(input, size) {
  const inner = await square(input, Math.round(size * 0.68));

  return sharp({
    create: { width: size, height: size, channels: 4, background: NIGHT },
  })
    .composite([{ input: inner, gravity: "centre" }])
    .png(PNG)
    .toBuffer();
}

async function main() {
  const keyed = await keyBackground(SOURCE);

  // 1. Lockups. Trim the transparent margin so callers control the size with
  //    CSS height alone and get no invisible padding.
  //    (sharp orders trim before extract within one pipeline, so cropping and
  //    trimming have to happen in separate passes.)
  const crop = async (rect) =>
    sharp(await sharp(keyed).extract(rect).png().toBuffer())
      .trim({ threshold: 8 })
      .png(PNG)
      .toBuffer();

  const badge = await sharp(keyed).trim({ threshold: 8 }).png(PNG).toBuffer();
  const wordmark = await crop(CROPS.wordmark);
  const mark = await crop(CROPS.mark);

  await writeFile(out("public", "brand", "badge.png"), badge);
  await writeFile(out("public", "brand", "wordmark.png"), wordmark);
  await writeFile(out("public", "brand", "mark.png"), mark);

  // 2. Tab icon. The full badge is unreadable below ~100px, so the icon set is
  //    built from the mark, which stays legible at 16px.
  await writeFile(out("src", "app", "icon.png"), await square(mark, 96));

  // 3. Apple touch icon. iOS composites transparency onto white, which would
  //    leave the mark floating in a white box.
  await writeFile(out("src", "app", "apple-icon.png"), await tile(mark, 180));

  // 4. Legacy favicon. Browsers request /favicon.ico regardless of <link> tags.
  await writeFile(
    out("public", "favicon.ico"),
    await pngToIco([await square(mark, 16), await square(mark, 32)]),
  );

  // 5. Manifest icons, for Android install prompts and the splash screen.
  await writeFile(out("public", "icon-192.png"), await tile(mark, 192));
  await writeFile(out("public", "icon-512.png"), await tile(mark, 512));

  // 6. Hand the Logo component the exact dimensions of what we just wrote.
  //    Trimming means these shift whenever the artwork does, and next/image
  //    needs them to reserve the right box — so they're generated, not typed.
  const entries = [];
  for (const [name, buffer] of [
    ["badge", badge],
    ["wordmark", wordmark],
    ["mark", mark],
  ]) {
    const { width, height } = await sharp(buffer).metadata();
    entries.push({ name, width, height });
    console.log(`  ${name.padEnd(9)} ${width}x${height}`);
  }

  await writeFile(
    out("src", "components", "brand", "logo-assets.ts"),
    [
      "// Generated by scripts/generate-icons.mjs — do not edit by hand.",
      "// Run `pnpm icons` to regenerate.",
      "",
      "export const LOGO_ASSETS = {",
      ...entries.map(
        ({ name, width, height }) =>
          `  ${name}: { src: "/brand/${name}.png", width: ${width}, height: ${height} },`,
      ),
      "} as const;",
      "",
    ].join("\n"),
  );

  console.log("Brand assets generated from", path.relative(ROOT, SOURCE));
}

await main();
