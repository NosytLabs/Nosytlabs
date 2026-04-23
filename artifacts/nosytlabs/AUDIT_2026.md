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
