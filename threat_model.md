# Threat Model

## Project Overview

This workspace is a pnpm monorepo, but the only production-deployed artifact is `artifacts/nosytlabs`, a React 19 + Vite static single-page marketing site served via Replit Static. The Express API scaffold in `artifacts/api-server` and the UI exploration app in `artifacts/mockup-sandbox` are not part of the current production request path. In production, traffic is served over platform-managed TLS, `NODE_ENV` is assumed to be `production`, and the static site has no database, server-side session handling, or authenticated user flows.

## Assets

- **Site integrity and visitor trust** — the rendered marketing content, outbound links, and embedded media must not be alterable by attacker-controlled input or navigation tricks.
- **Brand-controlled contact channel** — the published email address and prefilled mailto flows should not expose hidden secrets or allow attacker-controlled destinations.
- **Build and deployment configuration** — artifact selection and static hosting settings determine what code is reachable in production; mis-scoping this boundary would cause future scans to over-report non-production issues.
- **Public metadata and media references** — Open Graph metadata, sitemap, fonts, and fixed third-party media URLs are public by design, but should not expose secrets or become script execution paths.

## Trust Boundaries

- **Browser to static asset boundary** — visitors load HTML, JS, CSS, images, fonts, and embedded media from the published site. All browser input and navigation context are untrusted.
- **Site to third-party content boundary** — the page references third-party resources such as Google Fonts, Spotify embeds, external social links, and a fixed CloudFront-hosted video. These external origins are outside the application's trust domain.
- **Production to non-production workspace boundary** — `artifacts/mockup-sandbox`, `artifacts/api-server`, and backend-adjacent libraries under `lib/` exist in the repo but are not production-reachable for the current deployment unless future artifact wiring changes.

## Scan Anchors

- **Production entry points:** `artifacts/nosytlabs/index.html`, `artifacts/nosytlabs/src/main.tsx`, `artifacts/nosytlabs/src/App.tsx`, `artifacts/nosytlabs/.replit-artifact/artifact.toml`
- **Highest-risk code areas:** `artifacts/nosytlabs/src/lib/links.ts`, components that set `window.location.href`, external embeds in `src/components/Sound.tsx`, and any future code introducing `dangerouslySetInnerHTML`, `fetch`, auth, or form submission to a backend
- **Public vs authenticated vs admin surfaces:** current production site is fully public; there are no authenticated or admin surfaces in production
- **Dev-only / non-production areas:** `artifacts/mockup-sandbox/**`, `artifacts/api-server/**`, `lib/db/**`, `lib/api-zod/**`, and `lib/api-client-react/**` should usually be ignored unless deployment wiring or imports make them production-reachable

## Threat Categories

### Tampering

The main tampering risk for this project is attacker-controlled content reaching navigation targets, raw HTML sinks, or third-party embed URLs in the browser. Because the deployed site is static, all user-controlled values must remain data only and must not be able to alter rendered markup, iframe sources, script sources, or outbound destinations. Any future interactive feature that accepts user input MUST keep URLs hard-coded or strictly validated, and any future raw HTML rendering MUST sanitize untrusted content before insertion.

### Information Disclosure

This project does not currently process private user data server-side, but it still must avoid disclosing secrets, unpublished endpoints, or sensitive tokens in built frontend assets. The production bundle, HTML metadata, and public configuration MUST contain only intentionally public information. If a backend, analytics tool, or auth provider is added later, API keys, bearer tokens, and internal URLs MUST never be embedded into client-shipped code unless they are explicitly public and intended for browser exposure.

### Elevation of Privilege

There are no live privilege boundaries in the current production deployment because the site has no authentication, admin panel, or backend API. The relevant guarantee is architectural: non-production code paths such as `artifacts/api-server` and backend libraries MUST not become production-reachable accidentally through artifact configuration, imports, proxying, or deployment changes. If the site later gains API or admin functionality, server-side authorization and production reachability must be re-modeled immediately.
