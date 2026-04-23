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
- Hero is **video-only** — no static fallback image. Cosmic decor images are WebP only (PNG variants were deleted).

## SEO / GEO / analytics

- **GA4 ID**: `G-4FS0H823MX` — gtag installed in `index.html` head with `anonymize_ip: true`.
- **Event tracking**: `src/lib/analytics.ts` exposes `track(event, params)` wrapping `window.gtag`. Used for `subscribe_attempt/success`, `contact_attempt/success`, and `social_click`.
- **Structured data**: `Organization`, `WebSite`, and `FAQPage` JSON-LD inlined in `index.html` for AI Overviews + ChatGPT/Gemini/Perplexity context.
- **AI crawlers**: `public/robots.txt` explicitly allows GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended, Bytespider, CCBot, Applebot-Extended, Meta-ExternalAgent.
- **llms.txt**: `public/llms.txt` — markdown summary of the studio for LLM crawlers (emerging standard at llmstxt.org).
- **Sitemap**: `public/sitemap.xml` — single canonical URL with `<image:image>`. Update `lastmod` after notable content changes.
- **Fonts**: loaded as `<link>` in `<head>` (NOT CSS `@import`) to avoid render-chain blocking. Slimmed to Instrument Serif + Geist 400/500 + Geist Mono 400.

## Forms (no backend)

- **Provider**: [formsubmit.co](https://formsubmit.co) AJAX endpoint `https://formsubmit.co/ajax/hi@nosytlabs.com` — free, no signup. **Owner must click the one-time confirmation email after the first POST** before it starts forwarding.
- Both the hero subscribe form and the contact form POST JSON to that endpoint and gracefully fall back to `mailto:` if the request fails.
- Endpoint lives in `src/lib/links.ts` as `LINKS.formEndpoint`.

## Accessibility / motion

- Global `prefers-reduced-motion` rule in `src/index.css` disables animations and transitions for users who request it.
- Hero video does not autoplay when reduced motion is preferred.
- Visible focus rings (`#d8b87a`) on all interactive elements.

### Key files
- `src/App.tsx` — section composition
- `src/components/` — Hero, About, FeaturedVideo, Philosophy, Projects, Manifesto, Sound, Contact, Footer, Navbar, Logo, Reveal
- `src/lib/links.ts` — single source for all external URLs and the email address
- `public/favicon.svg`, `public/img/*.webp`, `public/sitemap.xml`, `public/robots.txt`

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
