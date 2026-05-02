# Workspace

pnpm workspace monorepo. The active product is **Nosytlabs** — a static single-page landing site.

## Artifacts

- `artifacts/nosytlabs/` — **production site** (React + Vite, static SPA). This is what gets published.
- `artifacts/api-server/` — Express API scaffold, not used by the site (kept for future use).
- `artifacts/mockup-sandbox/` — design exploration sandbox, not deployed.

Only `nosytlabs` is built and served by the static deployment.

## Nosytlabs site

- **Framework**: React 19 + Vite 7 + Tailwind v4
- **Hosting**: Replit Static (no server, no database)
- **Domain**: nosytlabs.com — live, TLS via Spaceship DNS, Spacemail handles hi@nosytlabs.com
- **Source**: `artifacts/nosytlabs/src/`
- **Static assets**: `artifacts/nosytlabs/public/` → copied to `dist/public/` at build
- **Build output**: `artifacts/nosytlabs/dist/public/` (~640 KB total)

## Brand & content rules (DO NOT change without asking)

- "Nosyt" appears in the navbar (short brand).
- "Nosytlabs" is the studio name in body copy and headlines.
- "Nosyt LLC" is reserved for the footer copyright (legal entity only).
- Hero shows the cinematic MP4 by default; users with `prefers-reduced-motion`, Save-Data, or `effectiveType` slower than 4G see the WebP poster (`/img/cosmos-hero.webp`) instead — they never pull the 13 MB video. Cosmic decor images are WebP only (PNG variants were deleted; PNG icons in `/public/` are the brand mark, not photography).
- Tagline "Notable opportunities shape your tomorrow." appears in **visible page copy exactly twice** — Hero H1 and the closing Manifesto line. Do not echo it in any other visible component (Footer, Sound, Contact, etc.). Brand-metadata uses are separate and required: it must remain in `og:image:alt`, JSON-LD `slogan`, `sitemap.xml` `image:title`, and the `llms.txt` intro + cite list. Code reviewers should check src/components/ — not metadata files — when enforcing the "twice only" rule.
- Every project surfaced on the site (Projects.tsx, llms.txt, JSON-LD) must be a verified-live repo at github.com/NosytLabs. `curl -sI` before adding.
- **Voice rules (per `BRAND.md`)**: no triads of negatives ("No funding, no investors, no growth team" reads as bragging-by-omission); a single factual "no investors" is fine; banned jargon includes "ship for builders", "build in public", "roadmap theater". When a section starts to define the studio by what it *isn't*, rewrite around what it *is*.

## SEO / GEO / analytics

- **GA4 ID**: `G-4FS0H823MX` — gtag installed in `index.html` head with `anonymize_ip: true`.
- **Event tracking**: `src/lib/analytics.ts` exposes `track(event, params)` wrapping `window.gtag`. Used for `subscribe_attempt/success`, `contact_attempt/success`, and `social_click`.
- **Structured data**: `Organization`, `WebSite`, and `FAQPage` JSON-LD inlined in `index.html` for AI Overviews + ChatGPT/Gemini/Perplexity context.
- **AI crawlers**: `public/robots.txt` explicitly allows GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended, Bytespider, CCBot, Applebot-Extended, Meta-ExternalAgent.
- **llms.txt**: `public/llms.txt` — markdown summary of the studio for LLM crawlers (emerging standard at llmstxt.org). Source of truth for project list; **must mirror `Projects.tsx`** — every URL listed here has to resolve to a real repo (verify with `curl -sI` before adding).
- **Sitemap**: `public/sitemap.xml` — single canonical URL with `<image:image>`. Update `lastmod` after notable content changes.
- **SoftwareSourceCode JSON-LD**: per-project schema in `index.html` `<head>`, one node per real repo. When projects change in `Projects.tsx`, mirror the change here too.
- **Project deep-links**: each row in `Projects.tsx` carries `id="project-<slug>"` so external citations can link to a specific project row, not just `#projects`.
- **Fonts**: loaded as `<link>` in `<head>` (NOT CSS `@import`) to avoid render-chain blocking. Slimmed to Instrument Serif + Geist 400/500 + Geist Mono 400.

## Forms (no backend)

- **Provider**: [formsubmit.co](https://formsubmit.co) AJAX endpoint `https://formsubmit.co/ajax/hi@nosytlabs.com` — free, no signup. **Activated May 2026** by the owner clicking the confirmation email; submissions now forward to hi@nosytlabs.com.
- Both the hero subscribe form and the contact form POST JSON to that endpoint. On failure, both forms render a single neutral fallback message (via `friendlyFormError` / `friendlyContactError`) plus a clickable `mailto:hi@nosytlabs.com` link — third-party error mechanics (activation, captcha, rate-limit) are NEVER surfaced to visitors. The May 2026 conversion incident (208 visitors / 0 subscribers) was caused by the activation never being clicked AND the raw "needs Activation" string being shown verbatim.
- **Both forms set `_captcha: "false"`** and rely on the visually-hidden `_honey` honeypot for spam defense. Setting `_captcha: "true"` causes formsubmit to redirect the visitor to a third-party challenge page after submit — never acceptable for this site. Honeypot + email-format validation + low-volume target audience is the agreed defense stack.
- Endpoint lives in `src/lib/links.ts` as `LINKS.formEndpoint`.

## Accessibility / motion

- Global `prefers-reduced-motion` rule in `src/index.css` disables animations and transitions for users who request it.
- Hero video does not autoplay when reduced motion is preferred.
- Visible focus rings (`#d8b87a`) on all interactive elements.

### Key files
- `src/App.tsx` — section composition
- `src/components/` — Hero, About, FeaturedVideo, Philosophy, Projects, Manifesto, Sound, Contact, Footer, Navbar, Logo, Reveal
- `src/lib/links.ts` — single source for all external URLs and the email address
- `public/favicon.svg` + `public/icon-{192,512}.png` + `public/apple-touch-icon.png` (180px) — full icon set, all generated from the same italic-serif `n.` mark via ImageMagick
- `public/site.webmanifest` — PWA install manifest, linked from `index.html`
- `public/img/*.webp`, `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, `public/opengraph.jpg` (1280×720, hand-designed)
- `BRAND.md` (at artifact root) — single-page brand kit: names, voice rules (incl. the "no triads of negatives" rule), tagline, mark usage, color tokens, type, motion, accounts, and the formsubmit ops note

### Commands
- `pnpm --filter @workspace/nosytlabs run dev` — local dev
- `pnpm --filter @workspace/nosytlabs run build` — production build
- `pnpm run typecheck` — full typecheck

### Deploy config
Lives in `artifacts/nosytlabs/.replit-artifact/artifact.toml`:
- `serve = "static"`
- `publicDir = "artifacts/nosytlabs/dist/public"`
- SPA rewrite `/* → /index.html`

## Stack

- Node.js 24, pnpm, TypeScript 5.9, Tailwind v4, Framer Motion, Wouter (unused on this site), Lucide icons, react-icons.
