# NightFuel — Implementation Plan

> Marketing website for NightFuel, a pre-launch nightlife vending machine startup in New Jersey. Static Next.js App Router site, no database, Resend for lead email, Vercel hosting.

## Analysis

**Core entities (all static, no database)**

- `Product`: name, category, description, icon, `isAgeRestricted`. Seven items, no prices. Lives in a typed TS module.
- `Location`: venue name, address, hours/notes, `status: "coming_soon" | "live"`, lat/lng. Array is empty at launch; the Find a Machine page branches on whether any location has `status === "live"`.
- `Inquiry`: not persisted; validated server-side and emailed via Resend. Two reasons (Venue partnership / General inquiry) with conditional venue fields.
- `FaqItem`: question, answer, `audience: "venue" | "consumer"`, plus a placeholder flag so unfinished answers are visually marked.
- `SiteConfig`: social links (empty → footer icons hidden), teaser copy, brand strings. Lead inbox comes from an env var, not config.

**Route map**
`/` (split hero), `/for-venues`, `/find-a-machine`, `/products`, `/faq`, `/contact`, `/privacy`, `/terms`, `not-found`, `/api/inquiry` (POST), `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.

**Dependency chain**
Scaffold + theme → content modules → layout/nav/footer → pages → inquiry form (client) → route handler (Resend + spam) → age gate → SEO/analytics → assets → deploy. The age gate is client-only and layered on top of server-rendered pages, so it can land after pages exist without touching them.

**Static vs dynamic**
Everything is statically rendered except `/api/inquiry`. The only runtime state is the age-gate cookie and the in-flight form.

**Third-party services**
Resend (transactional email, domain verification), Vercel (hosting + Analytics), shadcn/ui, react-hook-form + zod. No CMS, no DB, no auth.

**Ambiguities / underspecified**

- Rate limiting with "no database": in-memory limits don't persist across serverless instances. Plan uses a best-effort in-memory limiter plus honeypot, and flags Upstash/Vercel WAF as the upgrade path.
- Logo is raster only; the plan uses a placeholder SVG wordmark until the owner supplies vector/high-res source.
- "Confirmation copy to submitter" means an on-page success message, not an email.
- Age-gate exclusion for Privacy/Terms is pathname-based; the gate also applies to the 404 page.
- Testing strategy unspecified → minimal smoke baseline.
- `preferredModel` values and `venueType` options are not enumerated; plan picks sensible enums.

---

## Scaffold & Tooling

- [x] Step 1: Scaffold Next.js project with Tailwind, TypeScript, tooling
  - **Task**: Create a Next.js (latest stable, App Router, TypeScript, `src/` dir) project with Tailwind CSS (latest stable, v4). Add ESLint (next config), Prettier with Tailwind plugin, and `pnpm` scripts (`dev`, `build`, `lint`, `typecheck`, `format`). Create `.env.example` with `RESEND_API_KEY`, `LEAD_INBOX_EMAIL`, `LEAD_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`. Add `.gitignore` for `.env*.local`. Write a short README describing scripts and env vars.
  - **Files**:
    - `package.json`: scripts, deps
    - `tsconfig.json`: strict, `@/*` path alias
    - `eslint.config.mjs`: Next + Prettier
    - `.prettierrc`: Tailwind plugin
    - `.env.example`: env var names with comments
    - `.gitignore`
    - `README.md`
    - `src/app/layout.tsx`: minimal root layout
    - `src/app/page.tsx`: placeholder
  - **Step Dependencies**: None
  - **User Instructions**: Install Node 20+ and pnpm. Run `pnpm install`.
  - **Done when**: `pnpm dev` serves a page at `/`; `pnpm build`, `pnpm lint`, `pnpm typecheck` pass.

- [x] Step 2: Brand theme tokens, fonts, and global styles
  - **Task**: Define the palette as CSS variables in `globals.css` (`--bg #0A0A0F`, `--blue #2F6BFF`, `--violet #7B3FE4`, `--magenta #E040FB`, `--fg #FFFFFF`, `--muted #A0A3B1`) and map them to Tailwind theme tokens (`bg-night`, `text-muted`, `text-neon-blue`, etc.). Load two fonts via `next/font/google`: a bold italic display face for headings (e.g. Space Grotesk 700 or Inter Tight with `font-style: italic`) and Inter for body. Set dark background/foreground on `<html>`, base focus-visible ring using the blue token, and a `.display` utility (italic, bold, tight tracking). Add a `prefers-reduced-motion` media block that disables custom animations.
  - **Files**:
    - `src/app/globals.css`: tokens, base styles, reduced-motion block, `@theme` block
    - `src/app/layout.tsx`: font loading, `className` with font vars, `lang="en"`
    - `src/lib/fonts.ts`: font exports
  - **Step Dependencies**: 1
  - **User Instructions**: None
  - **Done when**: `/` renders a white heading in italic display font on `#0A0A0F`; `pnpm build` passes.

- [x] Step 3: Install shadcn/ui and base components
  - **Task**: Run `shadcn` init (latest stable, New York style, CSS variables on) and add `button`, `input`, `textarea`, `label`, `select`, `radio-group`, `card`, `dialog`, `accordion`, `sonner` (toast). Adjust `components.json` and the generated CSS variables so primary = electric blue, accent = violet, destructive stays red, background = night. Ensure dialog focus trap works in dark theme.
  - **Files**:
    - `components.json`
    - `src/lib/utils.ts`: `cn`
    - `src/components/ui/*.tsx` (generated; one logical group)
    - `src/app/globals.css`: shadcn variable overrides mapped to brand tokens
  - **Step Dependencies**: 2
  - **User Instructions**: None
  - **Done when**: A temporary render of `<Button>` and `<Dialog>` on `/` shows brand colors; `pnpm build` passes.

## Content Model (static data)

- [x] Step 4: Typed content modules — products, locations, FAQ, site config
  - **Task**: Create `src/content/` with typed modules. `types.ts` defines `Product`, `Location`, `FaqItem`, `SiteConfig`. `products.ts` exports the seven products (disposable vape – tobacco flavor only; nicotine pouches – 1 can; disposable camera; condoms; gum; hydration packets; phone chargers) with generic names, one-line descriptions, `category`, `icon` (a lucide icon name string), and `isAgeRestricted: true` for vape and pouches. `locations.ts` exports `[]` typed as `Location[]`, with a commented example entry. `faq.ts` exports ~8 drafted questions (4 venue, 4 consumer) with `answer` and `isPlaceholder: true` and placeholder text like "[Owner to provide]". `site.ts` exports `siteConfig` with `name`, `tagline: "Fuel Your Night."`, `social: { instagram: "", tiktok: "" }`, `teaser: { headline, body }`, `nav` links array, `legalName`. Add `src/lib/content.ts` helpers: `getLiveLocations()`, `hasLiveLocation()`, `getProductsByRestriction()`, `getFaqByAudience()`.
  - **Files**:
    - `src/content/types.ts`
    - `src/content/products.ts`
    - `src/content/locations.ts`
    - `src/content/faq.ts`
    - `src/content/site.ts`
    - `src/lib/content.ts`
  - **Step Dependencies**: 1
  - **User Instructions**: None
  - **Done when**: `pnpm typecheck` passes; `hasLiveLocation()` returns `false`.

## Layout & Shared Components

- [x] Step 5: Placeholder logo assets and Logo component
  - **Task**: Create placeholder SVGs until the owner supplies the real logo: `public/brand/badge.svg` (full badge: wordmark "NIGHTFUEL" in italic bold with a lightning-bolt mark, neon gradient), `public/brand/mark.svg` (bolt only), `public/brand/wordmark.svg`. Build `<Logo variant="badge" | "mark" | "wordmark" />` using `next/image` with correct alt text. Add a `BRAND_ASSETS.md` in `public/brand/` explaining which files to replace and required formats.
  - **Files**:
    - `public/brand/badge.svg`
    - `public/brand/mark.svg`
    - `public/brand/wordmark.svg`
    - `public/brand/BRAND_ASSETS.md`
    - `src/components/brand/logo.tsx`
  - **Step Dependencies**: 2
  - **User Instructions**: When available, drop vector/high-res transparent logo files over the three SVGs (same filenames; PNG allowed if `logo.tsx` extension is updated).
  - **Done when**: All three variants render on `/` without layout shift; `pnpm build` passes.

- [x] Step 6: Root layout, header with mobile nav, footer
  - **Task**: Build `SiteHeader` (sticky, wordmark left, nav links from `siteConfig.nav`, "Get a Machine" CTA button, hamburger → shadcn `Sheet` on mobile, active-link styling, `aria-current`). Build `SiteFooter` (badge logo, nav links, Privacy/Terms links, © {year} legal name, Instagram/TikTok icon slots rendered only when the config value is non-empty). Add `Container` and `Section` layout primitives and a skip-to-content link. Wire into `layout.tsx` with `<main id="main">`. Add `Toaster`.
  - **Files**:
    - `src/app/layout.tsx`
    - `src/components/layout/site-header.tsx`
    - `src/components/layout/mobile-nav.tsx`
    - `src/components/layout/site-footer.tsx`
    - `src/components/layout/container.tsx`
    - `src/components/layout/section.tsx`
    - `src/components/layout/skip-link.tsx`
    - `src/components/ui/sheet.tsx` (add via shadcn)
  - **Step Dependencies**: 3, 4, 5
  - **User Instructions**: None
  - **Done when**: Header/footer render on every route; mobile menu opens and closes via keyboard; footer shows no social icons with empty config and shows them when a URL is set locally.

## Pages

- [x] Step 7: Home page with split hero
  - **Task**: Build `/` with a split hero: two equal panels on desktop (stacked on mobile). Left: "Find a Machine" (consumer voice, playful) → `/find-a-machine`. Right: "Get a Machine for Your Venue" (businesslike) → `/for-venues`. Badge logo and tagline above. Below: three short "how it works" cards, a compact product teaser strip (non-restricted products only, linking to `/products`), and a closing CTA band. Copy drafted per tone guide in a `content/copy/home.ts` module for easy owner edits.
  - **Files**:
    - `src/app/page.tsx`
    - `src/components/home/split-hero.tsx`
    - `src/components/home/how-it-works.tsx`
    - `src/components/home/product-teaser.tsx`
    - `src/components/shared/cta-band.tsx`
    - `src/content/copy/home.ts`
  - **Step Dependencies**: 6
  - **User Instructions**: None
  - **Done when**: `/` renders both hero CTAs linking to the correct routes; passes mobile layout check at 375px; `pnpm build` passes.

- [x] Step 8: For Venues pitch page
  - **Task**: Build `/for-venues`: hero headline, value props (extra revenue, zero staff effort, we handle stocking/maintenance), two partnership model cards side-by-side — Revenue Share (no cost, % of sales) and Fee-Based (flat placement fee, venue keeps 100%) — with a "Not sure? We'll help you pick" line, a "what we need from you" spec list (footprint, power outlet, 21+ venue), and a CTA anchor to `#inquiry` where the form will mount (Step 14). Render a placeholder `<div id="inquiry">` for now. Copy in `content/copy/for-venues.ts`.
  - **Files**:
    - `src/app/for-venues/page.tsx`
    - `src/components/venues/partnership-models.tsx`
    - `src/components/venues/value-props.tsx`
    - `src/content/copy/for-venues.ts`
  - **Step Dependencies**: 6
  - **User Instructions**: None
  - **Done when**: `/for-venues` renders both model cards and the CTA scrolls to `#inquiry`.

- [x] Step 9: Products page
  - **Task**: Build `/products`: intro line, grid of `ProductCard` (lucide icon, name, one-line description) for non-restricted items, then a visually separated "21+ Products" section with a heading, thin divider, magenta accent, and a one-line notice that nicotine products are sold only to adults 21+ with ID. No brand names, logos, or prices anywhere.
  - **Files**:
    - `src/app/products/page.tsx`
    - `src/components/products/product-card.tsx`
    - `src/components/products/product-grid.tsx`
    - `src/components/products/icon-map.tsx`: maps icon name string → lucide component
  - **Step Dependencies**: 6
  - **User Instructions**: None
  - **Done when**: `/products` shows 5 general cards and 2 cards under "21+ Products"; no third-party names appear.

- [x] Step 10: Find a Machine page with teaser / live switch
  - **Task**: Build `/find-a-machine`. If `hasLiveLocation()` is false, render `ComingSoonTeaser` using `siteConfig.teaser` ("Coming soon to New Jersey", short punchy body, link to `/for-venues` "Want one at your spot?"). If true, render `LocationList` (cards with venue name, address, hours/notes, status badge; `live` first, then `coming_soon`) and a `MapPlaceholder` component reserved for the future map (renders nothing unless `NEXT_PUBLIC_MAP_ENABLED` is set). Verify both branches by temporarily adding a live location locally, then revert.
  - **Files**:
    - `src/app/find-a-machine/page.tsx`
    - `src/components/locations/coming-soon-teaser.tsx`
    - `src/components/locations/location-list.tsx`
    - `src/components/locations/location-card.tsx`
    - `src/components/locations/map-placeholder.tsx`
  - **Step Dependencies**: 6
  - **User Instructions**: None
  - **Done when**: With empty locations, teaser renders; adding a `live` location locally flips to the list; `pnpm build` passes.

- [x] Step 11: FAQ page
  - **Task**: Build `/faq` with two labeled groups ("For Venues" / "For Nightlife-Goers") rendered as shadcn `Accordion`. Items with `isPlaceholder: true` show a small muted "Answer coming soon" chip and the placeholder text. Add `FAQPage` JSON-LD only for non-placeholder items (empty at launch, wired for later).
  - **Files**:
    - `src/app/faq/page.tsx`
    - `src/components/faq/faq-group.tsx`
    - `src/components/faq/faq-json-ld.tsx`
  - **Step Dependencies**: 6
  - **User Instructions**: Later: replace placeholder answers in `src/content/faq.ts` and set `isPlaceholder: false`.
  - **Done when**: `/faq` renders both groups; accordions are keyboard-operable; placeholder chips visible.

## Inquiry Form & Email

- [x] Step 12: Inquiry validation schema and client form component
  - **Task**: Install `react-hook-form`, `zod`, `@hookform/resolvers` (latest stable). Create `src/lib/inquiry-schema.ts`: discriminated union on `reason` (`"venue" | "general"`). Common: `name` (2–80), `email`, `phone` (optional, loose), `message` (10–2000), `website` honeypot (must be empty). Venue-only: `venueName`, `venueType` (enum: bar, nightclub, lounge, restaurant-bar, other), `city`, `role` (owner, manager, other), `preferredModel` (`revenue_share | fee | not_sure`). Build `InquiryForm` (client component) with `defaultReason` prop, shadcn fields, conditional venue fieldset, honeypot input visually hidden with `tabIndex={-1}` and `autoComplete="off"`, inline error messages linked via `aria-describedby`, submit disabled while pending, success state replacing the form ("Got it — we'll be in touch within 2 business days"), and error state with retry. POST to `/api/inquiry` (created next step; form shows error until then). Add `form.tsx` from shadcn if not present.
  - **Files**:
    - `src/lib/inquiry-schema.ts`
    - `src/components/inquiry/inquiry-form.tsx`
    - `src/components/inquiry/venue-fields.tsx`
    - `src/components/inquiry/form-success.tsx`
    - `src/components/ui/form.tsx`
    - `package.json`
  - **Step Dependencies**: 3
  - **User Instructions**: None
  - **Done when**: Form renders with validation errors on empty submit; switching reason toggles venue fields; `pnpm typecheck` passes.

- [x] Step 13: `/api/inquiry` route handler with Resend, honeypot, rate limit
  - **Task**: Install `resend` (latest stable). Create `src/app/api/inquiry/route.ts` (POST, `runtime = "nodejs"`): parse JSON, validate with the shared schema, return 200 silently if honeypot filled (do not send), rate-limit by IP (`x-forwarded-for`) using an in-memory sliding window in `src/lib/rate-limit.ts` (5 requests / 10 min) returning 429, then send via Resend from `LEAD_FROM_EMAIL` to `LEAD_INBOX_EMAIL` with subject `[NightFuel] Venue partnership – {venueName}` or `[NightFuel] General inquiry – {name}`, `replyTo` = submitter email, plain-text + simple HTML body built in `src/lib/email/inquiry-email.ts`. Return `{ ok: true }` or `{ ok: false, error }` with 400/429/500. Never log message bodies in production. Add `src/lib/env.ts` validating required env vars with zod at import time.
  - **Files**:
    - `src/app/api/inquiry/route.ts`
    - `src/lib/rate-limit.ts`
    - `src/lib/email/inquiry-email.ts`
    - `src/lib/env.ts`
    - `package.json`
  - **Step Dependencies**: 12
  - **User Instructions**: Create a Resend account, generate an API key, and add `RESEND_API_KEY`, `LEAD_INBOX_EMAIL`, `LEAD_FROM_EMAIL` to `.env.local`. Until the domain is verified, use `onboarding@resend.dev` as `LEAD_FROM_EMAIL` and your own address as the inbox for testing.
  - **Done when**: Submitting a valid form locally delivers an email; honeypot-filled request returns 200 without sending; 6th rapid request returns 429.

- [x] Step 14: Mount form on For Venues and build Contact page
  - **Task**: Replace the `#inquiry` placeholder on `/for-venues` with `<InquiryForm defaultReason="venue" />` and a short heading. Build `/contact` with a brief intro, `<InquiryForm defaultReason="general" />`, and a note that venue inquiries can switch the reason dropdown.
  - **Files**:
    - `src/app/for-venues/page.tsx`
    - `src/app/contact/page.tsx`
    - `src/content/copy/contact.ts`
  - **Step Dependencies**: 8, 13
  - **User Instructions**: None
  - **Done when**: Both pages submit successfully end-to-end with correct default reason.

## Legal Pages

- [x] Step 15: Privacy Policy and Terms placeholder pages
  - **Task**: Create `/privacy` and `/terms` rendered from MDX (install `@next/mdx` latest stable) in `src/content/legal/`. Privacy covers: age-gate cookie (name, 30-day duration, purpose), Vercel Analytics (cookieless, aggregate), inquiry-form data (sent by email, not stored by the site), contact for requests. Terms covers: 21+ requirement, informational site, no warranty, governing law New Jersey. Both begin with a visible banner "Draft — pending legal review" and a `lastUpdated` date. Add a `LegalLayout` with readable measure and typographic styles.
  - **Files**:
    - `next.config.mjs`: MDX config
    - `mdx-components.tsx`
    - `src/content/legal/privacy.mdx`
    - `src/content/legal/terms.mdx`
    - `src/app/privacy/page.tsx`
    - `src/app/terms/page.tsx`
    - `src/components/legal/legal-layout.tsx`
  - **Step Dependencies**: 6
  - **User Instructions**: Send both MDX files to legal for review before launch; remove the draft banner after approval.
  - **Done when**: Both routes render with draft banner; footer links resolve; `pnpm build` passes.

## Compliance: Age Gate

- [x] Step 16: Full-site 21+ age gate overlay
  - **Task**: Build `AgeGate` client component mounted in `layout.tsx`. Uses `usePathname()`; renders nothing on `/privacy` and `/terms`. On mount, reads cookie `nf_age_ok`; if absent, opens a non-dismissable shadcn `Dialog` (no close button, `onEscapeKeyDown`/`onPointerDownOutside` prevented) with badge logo, "You must be 21+ to enter", buttons "I'm 21 or older" (primary) and "I'm under 21". Accept sets cookie for 30 days (`SameSite=Lax`, `Secure` in prod) and closes. Decline swaps dialog content to a polite exit message ("Come back when you're 21. Stay safe tonight.") with links to `/privacy` and `/terms` only; no third-party redirect. Focus is trapped and initial focus lands on the primary button. Prevent flash by rendering the overlay hidden until cookie check resolves (`useEffect` + `mounted` state); pages remain server-rendered beneath.
  - **Files**:
    - `src/components/age-gate/age-gate.tsx`
    - `src/components/age-gate/age-gate-content.tsx`
    - `src/lib/cookies.ts`
    - `src/app/layout.tsx`
  - **Step Dependencies**: 6, 15
  - **User Instructions**: None
  - **Done when**: Gate appears on `/`, not on `/privacy`; accepting persists across reload; declining shows exit message; Tab cycles only within the dialog; `curl /` still returns full page HTML.

## Error Pages & Motion

- [x] Step 17: Custom 404 and error boundary
  - **Task**: Build `not-found.tsx` in brand style: big italic "404", copy "This machine's out of stock.", buttons to `/` and `/find-a-machine`. Add `error.tsx` (client) with a reset button and `global-error.tsx` minimal fallback.
  - **Files**:
    - `src/app/not-found.tsx`
    - `src/app/error.tsx`
    - `src/app/global-error.tsx`
  - **Step Dependencies**: 6
  - **User Instructions**: None
  - **Done when**: `/does-not-exist` renders branded 404 with header/footer.

- [x] Step 18: Neon glow effects with reduced-motion support
  - **Task**: Add reusable motion utilities: `.neon-text` (text-shadow glow in blue/violet), `.neon-border` (gradient border + subtle pulse animation), gradient CTA button variant, hero background glow blobs. All keyframe animations wrapped in `@media (prefers-reduced-motion: no-preference)`; static styles remain otherwise. Apply to home hero, split hero panels, CTA band, 404, and age gate.
  - **Files**:
    - `src/app/globals.css`
    - `src/components/shared/glow-bg.tsx`
    - `src/components/home/split-hero.tsx`
    - `src/components/shared/cta-band.tsx`
    - `src/components/ui/button.tsx`: `neon` variant
  - **Step Dependencies**: 7, 16, 17
  - **User Instructions**: None
  - **Done when**: Glow animates normally; with OS reduced-motion enabled, no animation runs; contrast still passes AA.

## SEO & Analytics

- [x] Step 19: Metadata, OG image, sitemap, robots, JSON-LD
  - **Task**: Add `src/lib/seo.ts` with a `buildMetadata({ title, description, path })` helper using `NEXT_PUBLIC_SITE_URL` for canonical + OG/Twitter. Export `metadata` from every page with unique titles/descriptions. Add `opengraph-image.tsx` (ImageResponse, 1200×630, dark bg, wordmark, tagline). Add `sitemap.ts` (all public routes) and `robots.ts` (allow all, disallow `/api/`). Add `src/components/seo/local-business-json-ld.tsx` rendering `Organization` at launch and switching to `LocalBusiness` entries (with address/geo) for each `live` location; mount in `layout.tsx`.
  - **Files**:
    - `src/lib/seo.ts`
    - `src/app/opengraph-image.tsx`
    - `src/app/sitemap.ts`
    - `src/app/robots.ts`
    - `src/components/seo/local-business-json-ld.tsx`
    - `src/app/layout.tsx`
    - `src/app/*/page.tsx` (metadata exports; ≤4 edits per iteration — split across two iterations if needed)
  - **Step Dependencies**: 7–11, 14, 15, 17
  - **User Instructions**: Set `NEXT_PUBLIC_SITE_URL` in `.env.local` (use `http://localhost:3000` for now).
  - **Done when**: `/sitemap.xml`, `/robots.txt`, `/opengraph-image` respond; view-source shows unique `<title>` per page and one JSON-LD script.

- [x] Step 20: Vercel Analytics
  - **Task**: Install `@vercel/analytics` (latest stable) and mount `<Analytics />` in `layout.tsx`. Confirm in the Privacy MDX that analytics is cookieless. No cookie banner.
  - **Files**:
    - `src/app/layout.tsx`
    - `package.json`
    - `src/content/legal/privacy.mdx`
  - **Step Dependencies**: 15
  - **User Instructions**: Enable Analytics in the Vercel project dashboard after first deploy.
  - **Done when**: `pnpm build` passes; `/_vercel/insights/script.js` is requested in production.

## Assets

- [x] Step 21: Favicon set and production logo swap
  - **Task**: From `public/brand/mark.svg`, generate `src/app/icon.svg`, `src/app/apple-icon.png` (180×180), and `public/favicon.ico` (16/32) via a script `scripts/generate-icons.mjs` using `sharp`. Add `manifest.ts` with name, theme color `#0A0A0F`, icons. Re-run the script once real assets arrive.
  - **Files**:
    - `scripts/generate-icons.mjs`
    - `src/app/icon.svg`
    - `src/app/apple-icon.png`
    - `public/favicon.ico`
    - `src/app/manifest.ts`
    - `package.json`: `icons` script, `sharp` devDep
  - **Step Dependencies**: 5
  - **User Instructions**: Provide vector (SVG/AI/PDF) or ≥2000px transparent PNG logo per `BRAND_ASSETS.md`; then run `pnpm icons` and commit the outputs.
  - **Done when**: Browser tab shows favicon; `/manifest.webmanifest` valid.

## Quality: Tests, Accessibility, Performance

- [ ] Step 22: Minimal test baseline
  - **Task**: Install `vitest` (latest stable). Unit tests: `inquiry-schema.test.ts` (valid venue payload passes, general payload passes, honeypot filled fails, missing venue fields fail), `rate-limit.test.ts` (6th call blocked, window resets), `content.test.ts` (products have unique ids, exactly 2 restricted, FAQ audiences valid). Add `pnpm test` script and run in CI-friendly mode.
  - **Files**:
    - `vitest.config.ts`
    - `src/lib/__tests__/inquiry-schema.test.ts`
    - `src/lib/__tests__/rate-limit.test.ts`
    - `src/lib/__tests__/content.test.ts`
    - `package.json`
  - **Step Dependencies**: 4, 12, 13
  - **User Instructions**: None
  - **Done when**: `pnpm test` passes with all suites green.

- [ ] Step 23: Accessibility and performance pass
  - **Task**: Install `eslint-plugin-jsx-a11y` and fix findings. Audit: all images have alt, heading order per page, form labels/`aria-describedby`, focus-visible on all interactive elements, age gate and mobile nav keyboard-complete, contrast of muted text `#A0A3B1` on `#0A0A0F` (passes AA) and magenta usage limited to large text/decor. Convert any raster images to `next/image` with sizes; add `loading="lazy"` below fold; verify fonts use `display: swap`. Run Lighthouse mobile on `/`, `/for-venues`, `/products` and fix until ≥90 in all categories.
  - **Files**:
    - `eslint.config.mjs`
    - Up to 8 component/page files with fixes
  - **Step Dependencies**: 18, 19, 21
  - **User Instructions**: None
  - **Done when**: `pnpm lint` passes with a11y rules; Lighthouse mobile ≥90 Performance/Accessibility/Best Practices/SEO on the three pages (record scores in README).

## Deployment

- [ ] Step 24: Deploy to Vercel and configure production env
  - **Task**: Add `vercel.json` only if needed (none expected). Ensure `env.ts` fails fast with a clear message when vars are missing. Document the launch checklist in `README.md` (domain, inbox, Resend DNS, FAQ answers, logo, legal review, social links, first venue teaser).
  - **Files**:
    - `README.md`
    - `src/lib/env.ts`
  - **Step Dependencies**: All prior
  - **User Instructions**:
    1. Push repo to GitHub; import into Vercel.
    2. Set env vars in Vercel: `RESEND_API_KEY`, `LEAD_INBOX_EMAIL`, `LEAD_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
    3. Purchase domain; add to Vercel.
    4. Create lead inbox on that domain; add Resend domain, set SPF/DKIM DNS records, verify; update `LEAD_FROM_EMAIL` to that domain.
    5. Enable Vercel Analytics.
    6. Consider a Vercel WAF rate-limit rule on `/api/inquiry` as the durable spam layer.
  - **Done when**: Production URL serves all routes, age gate works, a test inquiry arrives in the lead inbox, `/sitemap.xml` uses the production domain.

- [ ] Step 25 (recommended): Post-deploy verification and "first location live" runbook
  - **Task**: Add `docs/GO-LIVE-LOCATION.md` explaining how to add the first location to `locations.ts`, flip `status` to `live`, update `siteConfig.teaser`, and confirm JSON-LD switches to `LocalBusiness`. Add a `pnpm verify` script hitting production routes for 200s.
  - **Files**:
    - `docs/GO-LIVE-LOCATION.md`
    - `scripts/verify-prod.mjs`
    - `package.json`
  - **Step Dependencies**: 24
  - **User Instructions**: Run `pnpm verify` after each deploy.
  - **Done when**: Script reports 200 for all public routes and 405 for `GET /api/inquiry`.

---

## Summary

A fully static Next.js App Router site with one Node route handler for Resend email. Content lives in typed TS/MDX modules the owner edits in-repo. Pages are server-rendered and indexable; the age gate and inquiry form are the only client-side state. Work proceeds scaffold → theme/shadcn → content → layout → pages → form/email → age gate → polish (motion, SEO, analytics, assets, a11y/perf, tests) → deploy, with each step independently buildable.

## Assumptions

- Next.js latest stable (15.x) with Tailwind v4 and shadcn/ui latest; pnpm as package manager.
- Fonts: a Google display face styled italic bold as a stand-in for the wordmark's letterforms; swap if the owner specifies a brand font.
- Rate limiting is best-effort in-memory (per serverless instance); honeypot is the primary spam defense at launch, Vercel WAF/Upstash recommended later.
- Enums chosen: `venueType` (bar, nightclub, lounge, restaurant-bar, other), `role` (owner, manager, other), `preferredModel` (revenue_share, fee, not_sure).
- Age-gate cookie name `nf_age_ok`, 30 days, applies to 404 and all pages except `/privacy` and `/terms`.
- "Confirmation copy to submitter" = on-page success message only.
- FAQ ships 8 drafted questions; legal pages ship as MDX drafts with a visible review banner.
- Minimal Vitest baseline since no testing strategy was specified; no E2E at launch.
- Map is a reserved component behind a flag, not implemented.

## Open Questions

- Which display font should heading type use to best echo the wordmark? Any brand font files available?
- Exact `venueType` and `role` option lists, and whether phone should be required for venue inquiries.
- Should the "21+ Products" section show the vape and pouches at all on the public site pending legal/ad-platform review, or hide them behind a toggle?
- Response-time promise in the form success message ("within 2 business days" assumed).
- Desired domain and whether the lead inbox will be `hello@` / `partners@` (affects `LEAD_FROM_EMAIL`).
- Is a durable rate limiter (Upstash Redis or Vercel WAF) acceptable at launch, or keep purely in-memory + honeypot?
- Launch target date, to prioritize the checklist.
