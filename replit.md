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
- **Domain**: nosytlabs.com (configure via Replit Publishing → Domains)
- **Source**: `artifacts/nosytlabs/src/`
- **Static assets**: `artifacts/nosytlabs/public/` → copied to `dist/public/` at build
- **Build output**: `artifacts/nosytlabs/dist/public/` (~640 KB total)
- **Email**: All forms (hero subscribe, contact) open the user's mail client via `mailto:hi@nosytlabs.com`. No backend.

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
