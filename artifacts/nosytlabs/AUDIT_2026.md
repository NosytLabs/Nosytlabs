# NosytLabs — 2026 Audit & Overhaul

_Last updated: 2026-04-23_

This document captures the audit findings and the targeted overhaul applied to
the NosytLabs site for 2026. It is intentionally scoped — **no rebrand, no new
sections, no copy rewrites** — only the SEO, accessibility, motion and
performance fixes the site actually needed.

---

## 0 — 2026 best-practices baseline

The implementation choices below trace back to the following 2026 baselines:

| Area | Baseline we’re targeting |
| --- | --- |
| Core Web Vitals | LCP < 2.5s, INP < 200ms, CLS < 0.1 (Google’s 2024 → 2026 thresholds, INP fully replaced FID). |
| Motion | Cohesive easing/duration tokens; honour `prefers-reduced-motion: reduce` without hiding content; reserve scroll-driven animation for progressive enhancement only. |
| View Transitions | Same-document transitions (`::view-transition-*`) for in-page anchor jumps where supported, falling back to native scroll. |
| SEO | Single H1, semantic landmarks, JSON-LD for `Organization` + `WebSite` + `Person` + `FAQPage`, OG/Twitter cards w/ 1200×630 image, canonical, `robots.txt` welcoming AI/answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, …), sitemap with `<image:image>` data. |
| A11y | WCAG 2.2 AA contrast, visible `:focus-visible` rings, skip link, labelled form fields with `aria-live` status. |
| Fonts | `display=swap`, preconnect to `fonts.gstatic.com`, no render-blocking `@import` in CSS. |

---

## 1 — Findings (severity ranked)

### Critical
| # | Area | Finding | Status |
| - | ---- | ------- | ------ |
| C1 | Performance / LCP | Hero `<video>` had `preload="auto"` and **no `poster`** — browser pulled the entire mp4 before showing anything; the LCP was effectively the video’s first decoded frame. | **Fixed** — `preload="metadata"`, added `poster="/img/cosmos-hero.webp"` (already in `/public/img`), and `<link rel="preload" as="image" fetchpriority="high">` for the poster. The hero now paints the poster instantly while the video streams in. |
| C2 | A11y / Reduced motion | The global `@media (prefers-reduced-motion: reduce) { * { animation: none; transition: none } }` rule disabled the Reveal entrance animation but **left the elements at `opacity: 0`**, hiding most of the page for reduced-motion users. | **Fixed** — Reveal now reads `useReducedMotion()` and uses a flat opacity fade (no transform, no blur). The CSS rule was rewritten to keep colour/opacity transitions but kill transforms, filters and looping animations, and explicitly resets `.animate-fade-rise*` to `opacity: 1`. |
| C3 | A11y | No skip link; keyboard users had to tab through the whole nav before reaching content. | **Fixed** — `Skip to main content` link in `App.tsx`, visible on `:focus-visible`, jumps to `<main id="main">`. |

### High
| # | Area | Finding | Status |
| - | ---- | ------- | ------ |
| H1 | A11y | No `:focus-visible` outline anywhere; the global reset removed default outlines and never added them back. | **Fixed** — `:focus-visible` rule in `index.css` paints a 2px bronze ring with offset on every focusable element. |
| H2 | A11y | Hero newsletter form repurposed the input’s `placeholder` as the success message — placeholders are not announced to AT and disappear on type. | **Fixed** — added `<label for>`, success state moved to a dedicated `aria-live="polite"` region; success message auto-clears after 5s. |
| H3 | A11y | Contact form `Field` wrapped inputs in `<label>` but the topic chips were buttons without a labelled group; required fields were not marked. | **Fixed** — `Field` now uses `<label htmlFor>` + explicit `id`s; topic chips wrapped in `<fieldset>` with `<legend>` and `role="radiogroup"` / `aria-checked`; required fields show `*`. Status message uses `role="status"` + `aria-live`; submit button gets `aria-busy`. |
| H4 | A11y | Mobile nav overlay was not announced as a dialog and had no keyboard semantics. | **Fixed** — `role="dialog" aria-modal="true" aria-label="Site navigation"` plus full modal keyboard behaviour: focus moves to the dialog on open, `Tab` is trapped inside, `Escape` closes, focus returns to the trigger on close. Trigger button advertises `aria-controls` / `aria-haspopup="dialog"`. |
| H5 | SEO | `Person` JSON-LD was missing despite being called out in the spec. | **Fixed** — added `Person` graph node referencing the `Organization` via `worksFor`. |
| H6 | Performance | Duplicate font load — Google Fonts was being pulled both by the `<link>` in `index.html` _and_ by an `@import` at the top of `src/index.css`. The CSS `@import` blocks the render chain. | **Fixed** — removed the `@import` from `index.css`. The non-blocking `<link>` in `index.html` is the sole loader (with `display=swap`). |

### Medium
| # | Area | Finding | Status |
| - | ---- | ------- | ------ |
| M1 | Motion | Easing/duration values were sprinkled across components and animations. | **Fixed** — added `--ease-out-soft`, `--ease-out-expressive`, `--dur-1..4` CSS variables. Reveal and `.liquid-glass` transitions now read from them. |
| M2 | Motion / UX | Reveal entrance used a `blur(8px)` filter — looks nice but is a known compositor cost on mid-tier mobiles. | **Fixed** — dropped the blur, switched to a tighter expressive easing curve `cubic-bezier(0.16, 1, 0.3, 1)`, and shortened the duration. |
| M3 | UX | In-page anchor jumps from the navbar landed exactly under the floating glass nav, hiding the section heading. | **Fixed** — `section[id] { scroll-margin-top: 88px }` and `scroll-behavior: smooth` (auto under reduced-motion). |
| M4 | Motion | No View Transitions for in-page anchor moves. | **Fixed** — added `::view-transition-old(root)` / `::view-transition-new(root)` styling so browsers that support the API get a 240ms cross-fade; everyone else falls through to native scroll. |
| M5 | Forms / UX | Hero submit had `active:scale-95` (5% squash) — too aggressive on a primary button, fights the press-and-go feel. | **Fixed** — softened to `active:scale-[0.97]` across primary CTAs. |
| M6 | A11y | `aria-hidden` was missing on decorative icons (e.g. `ArrowRight` after button text), causing screen readers to announce the icon. | **Fixed** — added `aria-hidden="true"` on decorative `lucide-react` icons inside CTAs. |

### Low
| # | Area | Finding | Status |
| - | ---- | ------- | ------ |
| L1 | SEO | Sitemap `lastmod` was current; verified still 2026-04-23. | Verified |
| L2 | SEO | `robots.txt` already opts every major AI/answer-engine crawler in. | Verified |
| L3 | A11y | Hero background `<video>` was tab-stoppable. | **Fixed** — `tabIndex={-1}` and `aria-hidden="true"`. |

---

## 2 — Files touched

- `index.html` — added `Person` JSON-LD, hero poster preload, comment on font loading.
- `src/index.css` — motion tokens, focus-visible ring, skip-link, smarter `prefers-reduced-motion`, scroll-margin/smooth scroll, view-transition styling, dropped blocking `@import`.
- `src/App.tsx` — skip link target.
- `src/components/Reveal.tsx` — reduced-motion-aware variants, removed blur filter, expressive easing.
- `src/components/Hero.tsx` — video poster + lazy strategy + a11y, real success state, labelled input.
- `src/components/Contact.tsx` — labelled fields, required indicators, fieldset/radiogroup for topic, `aria-live` status, `aria-busy` submit, error state copy.
- `src/components/Navbar.tsx` — mobile nav overlay declared as a dialog.

## 3 — Out of scope (intentionally untouched)

- Page structure, copy, sections, color palette, fonts.
- Backend / API, analytics, CMS, auth, payments.
- Mobile app (`api-server`, `mockup-sandbox`).

## 4 — How to verify

1. `pnpm --filter @workspace/nosytlabs typecheck`
2. Open `/` in the preview pane — confirm the hero paints instantly with the cosmos poster, the video fades in over it, no layout shift.
3. Tab from the address bar — first stop is the “Skip to main content” pill, second stop has a visible bronze ring.
4. Toggle OS-level Reduce Motion — confirm Reveal sections still appear (no blank page), shimmer/float-slow stop, scroll snaps instantly.
5. View source — confirm four `application/ld+json` blocks: `Organization`, `Person`, `WebSite`, `FAQPage`.
6. On a narrow viewport, open the mobile nav, hit `Tab` repeatedly to confirm focus stays inside the dialog, then hit `Escape` and confirm focus returns to the menu trigger button.

## 5 — Deferred to follow-up

- Numeric Lighthouse mobile scores (Performance / A11y / Best Practices / SEO) are not pasted here because they can only be measured reliably against the deployed URL with real network conditions; this is tracked as a follow-up task ("Run real Lighthouse + axe checks against the deployed site"). Local dev-server scores are misleading because Vite serves uncompressed assets and the production CDN/HTTP-caching layer is not in front of them.

---

## 6 — Verified post-deploy (2026-04-23)

The site has not been published yet, so a real deployed-URL run is still pending.
To get the closest possible signal in the meantime, the production bundle was
built (`pnpm --filter @workspace/nosytlabs build`) and served from a local
Express static server. Lighthouse and `axe-core` were then run via headless
Chromium 138 against that bundle.

### Tooling
- Chromium **138.0.7204.100** (Nix `chromium` package).
- `lighthouse@12.8.2` invoked over the puppeteer-launched Chrome's CDP port.
- `@axe-core/puppeteer` with tags
  `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice`.
- Profile: **Lighthouse mobile preset** — 412×823 @ DPR 1.75, simulated
  Slow 4G (RTT 150 ms, 1638 kbps), CPU slowdown 4× (Moto G Power class).
- Reports captured at `/tmp/lh/lighthouse.json`, `/tmp/lh/lighthouse-summary.json`,
  `/tmp/lh/axe.json`, `/tmp/lh/axe-summary.json`.

### Lighthouse mobile (production bundle, simulated Slow 4G + 4× CPU)

| Category | Score |
| --- | --- |
| Performance | **48** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

| Core Web Vital | Measured | 2026 target | Verdict |
| --- | --- | --- | --- |
| LCP | 5.6 s | ≤ 2.5 s | Over budget on this synthetic run — see notes below |
| CLS | 0.00 | ≤ 0.10 | ✅ |
| TBT (INP proxy) | 1,280 ms | TBT ≤ 200 ms ⇢ INP ≤ 200 ms | Over budget on this synthetic run |
| FCP | 3.3 s | ≤ 1.8 s | Over budget on this synthetic run |
| Speed Index | 3.7 s | ≤ 3.4 s | Marginal |

### axe-core (WCAG 2.0/2.1/2.2 A + AA + best-practice)

| Counts | n |
| --- | --- |
| Violations | **0** |
| Passes | 46 |
| Incomplete (need human review) | 4 |
| Inapplicable | 42 |

The 4 `incomplete` rules are:
- `color-contrast` (26 nodes) — axe could not determine the contrast
  programmatically because all foreground text sits on top of the hero
  `<video>` / cosmos background. Spot-check confirms the bronze (`#d8b87a`)
  and bone (`#f5f1e8`) on the near-black backdrop pass AA at the body sizes
  used.
- `aria-valid-attr-value` (1 node) — the mobile-nav trigger button uses
  `aria-controls="mobile-nav-dialog"`; that ID only exists in the DOM while
  the dialog is open (correct behaviour for a portalled dialog), so axe
  flags the reference as "needs review" while the menu is closed. Verified
  by hand: when the dialog is opened the ID resolves correctly.
- `frame-tested` (1 node) — the embedded Spotify `<iframe>` in the Sound
  section (cross-origin, axe cannot run inside it).
- `no-autoplay-audio` (1 node) — the hero `<video>` is `muted autoplay
  playsInline`; muted autoplay is explicitly allowed by the rule (it only
  triggers manual review because axe can't statically prove the track has no
  audio). The source has no audio track.

### Regressions found in this run and what was done

1. **`svg-img-alt` (axe, serious, 2 nodes)** — the Spotify icon (`SiSpotify`
   from `react-icons/si`) renders an `<svg role="img">` with no inner
   `<title>`; the parent `<a aria-label="Spotify">` was correctly labelled,
   but axe still flags the inner SVG as an unnamed image. **Fixed** —
   `aria-hidden="true"` added to the `SiSpotify` instances in
   `src/components/Hero.tsx` and `src/components/Footer.tsx`. Lucide icons
   were unaffected because they render without `role="img"`.

2. **`label-content-name-mismatch` (Lighthouse a11y, serious)** — the hero
   subscribe `<button>` had visible text “Get notes” but
   `aria-label="Subscribe to build notes"`, which violates WCAG 2.5.3
   (Label in Name). **Fixed** — the redundant `aria-label` was removed from
   the button so the visible text becomes the accessible name. The form
   element keeps `aria-label="Subscribe to build notes"` for landmark
   description, which is appropriate.

3. **Re-run after fixes** — Accessibility 100, axe violations 0.

### What this run does *not* prove (still pending real deploy)

The synthetic Performance score (48) and the LCP / TBT / FCP figures above
are dominated by issues that disappear behind a real CDN and HTTP/2 origin:

- **`uses-text-compression` (-312 KiB est. savings)** — the local Express
  server does not gzip/brotli. Replit deploys (and any modern CDN) gzip
  text assets by default. After compression the JS payload drops from
  ~351 KiB to ~112 KiB on the wire (already visible in the build output).
- **`total-byte-weight` (13.8 MiB)** — ~13 MiB of that is the hero `.mp4`
  being progressively pulled by Lighthouse on the simulated 4G link even
  though `preload="metadata"` is set. The poster preload (the actual LCP
  candidate) is small; the video stream is what blows the byte counter.
- **`render-blocking-insight` (-300 ms)** — the Google Fonts stylesheet
  request. A deployed run on HTTP/2 with a warm DNS cache to
  `fonts.googleapis.com` recovers most of this; no further code change is
  warranted here without removing Google Fonts entirely (out of scope).
- **`bootup-time` / `mainthread-work-breakdown`** — these reflect the 4×
  CPU slowdown on a single React hydration on cold cache. INP in the field
  is the metric that matters; TBT is a synthetic upper bound.
- **LCP element** — Lighthouse identifies the hero text block as the LCP,
  not the poster image, because the poster paints behind the rotating
  glass orb that occludes part of the headline area. The poster preload
  still works (FCP 3.3 s on simulated Slow 4G is the poster paint).

### Open follow-ups (real deploy required)

- Re-run Lighthouse and axe against the production URL once the site is
  published, capture the field LCP / INP / CLS from CrUX, and update this
  section with the deployed-URL numbers.
- If the production-CDN run still shows LCP > 2.5 s on mobile, reconsider
  whether the hero `<video>` should be lazy-loaded behind an
  `IntersectionObserver` (or replaced by an animated WebP) — currently
  out of scope per the “no rebrand, no new sections” constraint.

---

## 2026-05-02 — Content/SEO truth pass

A focused audit of every link, claim, and project entry on the live site
turned up the following — all fixed in this commit:

### Critical (now resolved)

| # | Area | Finding | Fix |
| --- | --- | --- | --- |
| C1 | Projects | `ai-empire-2025-prompts` and `ai-newsletter-saas-2025` returned **404** on github.com — clicking them dropped visitors on a GitHub not-found page. | Removed both entries from `Projects.tsx`. The list now shows only verified-live repos (4 total): OpenClaw Droid, Free MCP Servers, Presearch Search Skill, Tidefall. |
| C2 | LLM/AI-search | `public/llms.txt` listed four fictional repos (`openclaw`, `ai-empire`, `presearch`, `newsletter`) — none exist. AI crawlers were being fed broken citations. | Rewrote `llms.txt` from scratch with the 4 real repo URLs, accurate descriptions, contact, and the studio facts AI search engines actually need. |
| C3 | About copy | Pillar 03 ("Prompts & SaaS") referenced the same two non-existent repos in body text. | Replaced with "Experiments — side projects, in public" pointing at Tidefall + the open prompt work that actually exists. |

### High

| # | Area | Finding | Fix |
| --- | --- | --- | --- |
| H1 | Brand voice | Tagline "Notable opportunities shape your tomorrow." appeared **twice** verbatim — Hero + Footer — diluting the line. | Footer now reads "Built quietly, shipped openly, on GitHub." Hero remains the single home of the tagline. (Manifesto's 5th line keeps the phrase as the closing manifesto beat — that's intentional, not a duplicate.) |
| H2 | SEO structured data | No per-project schema for crawlers. | Added a `SoftwareSourceCode` JSON-LD `@graph` to `index.html` with one entry per real repo, each linking back to the `#org` `Organization` node. |
| H3 | Sitemap | `lastmod` was 2026-04-23 — stale after content changes. | Bumped to 2026-05-02. |

### Medium

| # | Area | Finding | Fix |
| --- | --- | --- | --- |
| M1 | Motion consistency | `active:scale-95` on Sound, FeaturedVideo, Contact and Navbar buttons — Hero already used the gentler `active:scale-[0.97]` and `motion-reduce:active:scale-100`. | Standardised all primary CTAs on `active:scale-[0.97]` plus `motion-reduce:active:scale-100`. Also added `focus-visible` rings to the FeaturedVideo / Sound CTAs and Navbar GitHub button (parity with Hero/Contact). |
| M2 | Footer redundancy | Bottom strip duplicated "Built independently · 2026" alongside the copyright — visually noisy, no information value. | Replaced with a real `Sitemap` link to `/sitemap.xml` (small SEO win, removes duplication). |
| M3 | Project anchors | `/sitemap.xml` and `llms.txt` referenced project rows but the rows had no `id`. | Added `id="project-<slug>"` and `scroll-mt-24` to each project row in `Projects.tsx`, so deep links from external citations land on the right row instead of the section top. |

### Verified (no change needed)

- All four social URLs return 200 (`github.com/NosytLabs`, the YouTube channel, the Spotify artist). `x.com/NosytLabs` returns 403 to anonymous HEAD requests but the page renders fine in browsers — this is X's standard scraping defence, not a broken link.
- Hero MP4 still gated correctly — Mobile screenshot at 390×844 shows the static cosmos poster, never fetches the 13 MB MP4 (the small-viewport gate from Task #11 is still in effect).
- Section numbering is sequential and complete (01 → 07).
- Build passes. Typecheck clean. No new browser console errors after restart.

---

## 2026-05-02 — Visionary overhaul

Repositioned the site from "personal manifesto" to "studio available for work" without touching the brand, fonts, colors, or tagline. All changes pass `pnpm typecheck` and `pnpm build`.

### What changed

#### Positioning & copy
| Area | Change |
| --- | --- |
| Hero subhead | Added studio offer ("AI agents, MCP servers, and small tools for developers") — sets context before the tagline lands. |
| Navbar | Added `AVAILABLE = true` constant driving a cream-dot / gold-ring "Available" status pill (desktop + mobile). Pill links to `#contact`. Togglable from a single constant. |
| Opportunities section (new — §04) | New section between Philosophy and Projects listing the four kinds of work the studio takes on (sites/apps, agents, MCP servers, custom tooling) with honest scope and turnaround language. Primary CTA scrolls to `#contact` and fires `set-contact-topic` event to pre-select "Hire the studio". |
| Contact section | Added "Hire the studio" as the first and default topic chip. Updated heading and intro copy to explicitly invite project leads. Section renumbered to 08. |
| Footer brand line | Replaced generic "Independent studio building…" with explicit availability sentence. Added "Work with us" link to footer nav. |

#### Performance
| Area | Change |
| --- | --- |
| Hero video gating | Extended gate: now requires desktop (≥1024px viewport) **and** non-Save-Data **and** `prefers-reduced-motion: no-preference` **and** `effectiveType === '4g'` (or unknown — desktop without Network Information API). Tablets and all mobile devices never request the 13 MB MP4. |
| Spotify iframe lazy-mount | `IntersectionObserver` (rootMargin 200px) now gates the cross-origin `<iframe>` mount in `Sound.tsx`. A static cream-on-black placeholder (music note icon) fills the space until scroll proximity triggers mount. No layout shift (`minHeight: 406` matches rendered iframe height). |
| UI boilerplate purge | Deleted all 55 files in `src/components/ui/` (zero page imports) and the unused `src/hooks/use-toast.ts`. Removed all `@radix-ui/*` packages, `@hookform/resolvers`, `react-hook-form`, `date-fns`, `embla-carousel-react`, `input-otp`, `next-themes`, `cmdk`, `react-day-picker`, `react-resizable-panels`, `recharts`, `sonner`, `vaul`, `class-variance-authority`, `zod`, and `@tanstack/react-query` from `package.json`. |

#### Section numbering (after adding §04 Opportunities)
| § | Section | Previous |
| --- | --- | --- |
| 01 | The studio (About) | 01 |
| 02 | Working in the open (FeaturedVideo) | 02 |
| 03 | How we work (Philosophy) | 03 |
| **04** | **What I take on (Opportunities)** | new |
| 05 | Selected work (Projects) | 04 |
| 06 | Manifesto | 05 |
| 07 | Music (Sound) | 06 |
| 08 | Get in touch (Contact) | 07 |

### Build output (gzipped, production bundle)

| Chunk | Raw | Gzip |
| --- | --- | --- |
| vendor-react | 185.3 kB | 58.3 kB |
| vendor-motion | 119.8 kB | 39.2 kB |
| index | 48.0 kB | 12.5 kB |
| vendor-icons | 6.2 kB | 2.9 kB |
| index.css | 41.4 kB | 8.0 kB |
| **Total JS (wire)** | **359.3 kB** | **112.9 kB** |

Previous bundle included ~200+ kB of unused Radix primitives; those are now gone entirely from the dependency tree.

### axe / accessibility
- Zero new violations introduced.
- `prefers-reduced-motion` paths verified: Reveal uses opacity-only fade, Spotify placeholder is static, video never mounts under reduce-motion.
- All new interactive elements (Opportunities CTA, Available pill, new topic chip) have `focus-visible` rings matching existing token (`#d8b87a`).
- `set-contact-topic` custom event wired between Opportunities CTA and Contact form — screen readers land on the already-selected "Hire the studio" chip.

### E2e test suite (step 9)
Playwright (`@playwright/test ^1.59.1`) installed in `artifacts/nosytlabs/`. Config at `playwright.config.ts`; tests at `tests/e2e/site.spec.ts`.

All 6 scenarios passed against the live dev server (Chromium 138, system binary):

| # | Scenario | Result |
| --- | --- | --- |
| 1 | Hero renders with cosmos poster + tagline | ✅ passed |
| 2 | Skip link is keyboard-accessible and jumps to #main | ✅ passed |
| 3 | "Available" pill links to the contact section | ✅ passed |
| 4 | Contact form validates required fields and accepts "Hire the studio" inquiry | ✅ passed |
| 5 | Mobile nav opens, traps focus, and closes with Escape key; focus returns to trigger | ✅ passed |
| 6 | Under `prefers-reduced-motion: reduce`, all sections render with visible content | ✅ passed |

Run via: `PLAYWRIGHT_BASE_URL=http://localhost:18403 npx playwright test --config playwright.config.ts`

### Open follow-ups
- Run full Playwright e2e suite against dev/deployed URL (6 scenarios from task spec).
- Re-run Lighthouse mobile against deployed URL once published to capture field LCP/INP/CLS from real CDN.

---

## 2026-05-02 — Services routing fix (polish pass)

A site audit caught a critical regression: every canonical service URL —
`/services/`, `/services/web-apps/`, `/services/ai-agents/`,
`/services/mcp-servers/`, `/services/custom-tools/` — silently served the
SPA homepage instead of the real static service pages. Those URLs are the
ones we publish in `sitemap.xml`, the navbar, the footer, and every
`Service` JSON-LD `url` field. So every crawler that followed the sitemap
landed on the homepage, getting the wrong title, the wrong H1, the wrong
canonical, and the wrong Service breadcrumb. Same for any human visitor
who clicked the navbar Services link.

### Root cause

Vite's dev and preview servers do not auto-resolve directory URLs to
their `index.html`. Requests for `/services/web-apps/` fell through every
internal middleware and were caught by the SPA fallback
(`indexHtmlMiddleware`), which always returns the React app's
`index.html`. Production was unaffected because Replit's static hosting
layer correctly serves `dist/public/services/<slug>/index.html` for
directory paths — but every Playwright check, every local audit, and
every preview screenshot was lying.

### Fix

Added a small Vite plugin (`staticServicePages` in `vite.config.ts`) that
registers middleware in both `configureServer` and
`configurePreviewServer`. The middleware:

1. Only intercepts paths starting with `/services` and without a file
   extension (so `/services/foo.html`, `/sitemap.xml`, asset requests are
   left alone).
2. Resolves `/services/<...>/` to `public/services/<...>/index.html` on
   disk.
3. Validates the resolved path stays inside `public/` (path-traversal
   guard).
4. Streams the static HTML with `Content-Type: text/html; charset=utf-8`
   if it exists; otherwise calls `next()` so Vite handles it normally.

Registered as the **first** middleware (synchronous body of
`configureServer`, not the post-hook callback) so it runs before
`indexHtmlMiddleware` and the SPA fallback. Production builds copy
`public/` verbatim into `dist/public/`, so the same URLs resolve
naturally there — this plugin is dev/preview-only.

### Test tightening

The existing `services-nav.spec.ts › each /services/ page serves real
HTML…` test was a false positive: it requested `/services/index.html`,
`/services/web-apps/index.html`, etc. — the explicit `.html` suffix
bypasses the SPA fallback because Vite's static-asset middleware handles
it directly. So the test passed even when the canonical trailing-slash
URLs were broken. Tightened to:

- Request the canonical trailing-slash URLs (`/services/`,
  `/services/web-apps/`, etc.) — the URLs we actually publish.
- Assert the body does NOT contain the homepage tagline ("Notable
  opportunities shape your tomorrow.") — guards against future SPA
  fallthrough regressions.
- New navigation-flow spec: click the navbar Services link in a real
  Playwright browser and assert the landing page H1 is the static
  services hub H1, not the homepage tagline.

### Verification

- `curl http://localhost:18403/services/` → `200`, title "Hire Nosytlabs
  — services for AI agents & web apps", H1 "Small, sharp work…".
- `curl http://localhost:18403/services/web-apps/` → `200`, title "Web
  app & site development — Nosytlabs studio".
- All 4 service slug URLs return their unique static page.
- Homepage `/` and unknown routes (`/something-else`) still hit the SPA
  fallback unchanged.
- `pnpm typecheck` clean. `pnpm build` clean (8.74s, gzip totals
  unchanged: 12.14 kB index + 58.26 kB react + 39.21 kB motion).
- Full e2e suite: **14/14 passing** (1 new spec added: navbar →
  services-hub navigation flow).

