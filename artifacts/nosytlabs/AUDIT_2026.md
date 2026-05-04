# NosytLabs — Active Audit Reference

> Compact reference for the current state of the site. Detailed
> session-by-session decision logs were archived on 2026-05-02 — the
> commit history (`git log -- artifacts/nosytlabs`) is the source of
> truth for past changes. This file documents what is live and the
> rules a reviewer should enforce.

## Current state (verified 2026-05-04 — full sweep)

- **Build**: 1.7s with rolldown (Vite 8). Gzipped: app 13.52 KB · react vendor 55.26 KB · framer-motion 39.66 KB · icons 4.17 KB · CSS 9.16 KB · runtime 0.47 KB. Total ~122 KB gzip.
- **Tests**: 15/15 e2e passing in ~37s (6 services-nav + 9 site).
- **Console**: silent in dev (only HMR connect/disconnect lines) and production.
- **Type check**: clean.
- **Security**: Dependabot alert #2 (esbuild ≤0.24.2, GHSA-67mh-4wv8-2f99, medium) resolved 2026-05-04 by adding `@esbuild-kit/core-utils: npm:tsx@^4.21.0` to `pnpm-workspace.yaml#overrides` — the existing `esm-loader` override missed the transitive `core-utils > esbuild@0.18.20` chain via `@workspace/db > drizzle-kit`. After `pnpm install` the lockfile only retains esbuild@0.25.12 and 0.27.3 (both > 0.25.0 patched).
- **Brand kit**: LinkedIn banner mark added; business-card back corrected to brand gold `#d8b87a`. PNG + WebP exports regenerated.
- **Logo/favicon**: `Logo.tsx` and `public/favicon.svg` in lockstep. Dot at (49,47) r=3.4 within 64×64 viewBox. PWA + Apple touch icons match `social/avatar-1024.svg`.
- **Pages audited**: home (1280, 1440, 390), services hub, web-apps, ai-agents, mcp-servers, custom-tools, privacy — all render clean, no overflow, cut-off text, or broken images.
- **Links verified**: all internal anchors correct; all 5 service pages live (200); external links centralized in `src/lib/links.ts`; sitemap.xml has 8 URLs.
- **Image assets**: `opengraph.jpg` at 1280×720 matches `<head>` meta. Cosmos hero/mirror WebPs at 76 KB / 36 KB.

## ⚠️ Deploy chain disconnect (PRODUCTION blocker)

**The live site at nosytlabs.com is NOT being updated by `git push origin main`.** Verified 2026-05-04:

- DNS: `nosytlabs.com` and `www.nosytlabs.com` both resolve to `34.111.179.208` — a Google Cloud HTTP(S) Load Balancer IP, **not** Vercel.
- Response headers: `via: 1.1 google`, no `x-vercel-id`, no Vercel `server` header. Etag `"1777781342581083"` is a Google Cloud Storage object generation number (= microsecond Unix timestamp = 2026-05-03 04:09:02 UTC).
- Live HTML/sitemap drift: live `<title>` is the older "Hire an independent US studio…" copy; live `sitemap.xml` has 7 URLs with trailing slashes; local has 8 URLs (added `/llms.txt`) without trailing slashes. Live bundle hash `index-BzUx6l1s.js` ≠ local `index-DIdMAD_E.js`.
- `vercel.json` is committed and well-formed but the repo has no Vercel project linked, no Vercel CLI in deps, no GitHub Action triggering deploys, and no `gsutil` / GCS upload script. Pushes hit GitHub but never reach the GCS bucket fronting the load balancer.

**Until the user fixes the deploy hookup, every cleanup commit (including this one) lives only on GitHub.** Two paths forward:

1. **Reconnect Vercel** — create a Vercel project pointed at the `NosytLabs/Nosytlabs` repo, set project root to `artifacts/nosytlabs`, then change DNS (`A` for apex, `CNAME` for www) to point at Vercel (`cname.vercel-dns.com`).
2. **Add a GCS sync step** — install `@google-cloud/storage`, write a `scripts/deploy-gcs.mjs` that uploads `artifacts/nosytlabs/dist/public/**` to the bucket behind `34.111.179.208`, and either run it manually post-build or add a GitHub Action with `GCP_SA_KEY`. Requires GCP service-account key — needs user to provide.

The user owns the GCP project and the DNS records, so this cannot be auto-resolved from inside the repl.

## What ships

- Single-page React app at `/` with sections: Hero, About, Opportunities, Manifesto, Projects, FeaturedVideo, Philosophy, Contact.
- Five static HTML service pages under `/services/`: hub + web-apps, ai-agents, mcp-servers, custom-tools. Generated at build by the `staticServicePages` plugin in `vite.config.ts`, served by Vercel via the explicit rewrites in `vercel.json`.
- Static deploy target: Vercel (`vercel.json`) with `dist/public/` as output, trailing-slash routing, immutable cache on `/assets` + `/img`, security headers (HSTS, Permissions-Policy FLoC opt-out, no-sniff, Referrer-Policy).
- Toolchain: Vite 8 (rolldown bundler, oxc transformer), React 19.1, Tailwind v4, framer-motion 12, lucide-react 1.x. Brand icons (GitHub, X) live in `src/components/icons/Brand.tsx` since lucide 1.x removed trademarked logos.

## SEO surface (do not regress)

- **Sitemap**: 7 URLs in `public/sitemap.xml` — home + 5 service pages + privacy.
- **robots.txt**: explicit Allow for 15+ AI/answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, CCBot, Applebot-Extended, Meta-ExternalAgent, etc).
- **llms.txt**: full studio brief, project list, services with deep-links, page index.
- **Schema graph (index.html)**: Organization + Person + WebSite + ProfessionalService (with OfferCatalog of all 4 services + Country areaServed) + 4× SoftwareSourceCode (regenerated by `scripts/sync-github-data.mjs`, kept in BEGIN/END markers).
- **Per service page**: Service + BreadcrumbList + ItemList JSON-LD; canonical, OG, Twitter, sibling cross-links to all 3 other services + hub.
- **Geo signals**: `geo.region=US`, `geo.placename=United States`, `areaServed: Country US`, `availableLanguage: English`.

## Brand surface (see BRAND.md for the full kit)

- Tagline `Notable opportunities shape your tomorrow.` appears in **visible body content exactly twice** — Hero H1 and Manifesto closing line. Metadata uses (slogan, og:image:alt, sitemap image:title, llms.txt) are required and don't count.
- Navbar uses **Nosyt** (short brand). Body and headlines use **Nosytlabs**. Footer copyright is the only place that may use the legal-entity styling.
- Banned phrases: any "no funding / no investors / no growth team" stacked triad; "ship for builders"; "build in public"; "roadmap theater"; any disclosure of team size ("one person", "one desk", "one inbox", "one bet", "small team").

## Files that should never go missing

- `BRAND.md` — voice, naming, tagline, mark rules. Read before any copy edit.
- `index.html` — meta + JSON-LD graph. Reviewers should diff this on every PR.
- `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt` — crawler surface.
- `public/services/{index,web-apps,ai-agents,mcp-servers,custom-tools}/index.html` — static service pages (NOT React-rendered; the SPA must not match `/services/*` paths).
- `vercel.json` — deploy/routing config; keep the negative-lookahead rewrite intact.
- `vite.config.ts` — env-required by design (PORT + BASE_PATH must be set).
- `tests/e2e/services-nav.spec.ts` — guards services routing + nav + sitemap.
- `tests/e2e/site.spec.ts` — guards core UX, hero behaviour, mobile nav, contact form.

## How to verify after any change

```bash
PORT=5000 BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/nosytlabs run build
pnpm --filter @workspace/nosytlabs run typecheck
pnpm --filter @workspace/nosytlabs run test:e2e
```

All three must pass. If you touched `index.html`, validate the JSON-LD with Google's Rich Results Test before committing.

### GitHub project data sync (manual)

Run on demand to refresh the SoftwareSourceCode JSON-LD block in
`artifacts/nosytlabs/index.html` (and the snapshot at
`artifacts/nosytlabs/src/lib/github-data.json`) with current stars,
language, and `pushed_at` from the live repos:

```sh
pnpm --filter @workspace/nosytlabs run sync:github
```

Optionally export `GITHUB_TOKEN=<your PAT>` first to lift the
unauthenticated rate cap (60 req/h → 5000 req/h). With only 4 repos
configured the unauthenticated cap is fine for one-off runs.

The script short-circuits when the live repo metadata
(stars / forks / language / pushed_at / archived for the configured repos) is
identical to the existing snapshot — in that case neither file is
rewritten, so re-running produces zero diff. A new `fetchedAt` (and the
matching `<!-- last-synced: <ISO timestamp> -->` comment injected
immediately after the `BEGIN:github-projects-schema` marker in
`index.html`) is only stamped when at least one repo's metadata actually
moved. The `last-synced` comment therefore records **the last time
committed data actually changed**, not the last run. The comment always
matches `github-data.json#fetchedAt`. If a single repo fetch fails
transiently, the script reuses that repo's last-known-good entry from
the existing snapshot rather than shipping degraded JSON-LD
("programmingLanguage": "Unknown", missing dateModified).

> The earlier scheduled GitHub Actions workflow
> (`.github/workflows/sync-github-data.yml`) was removed on 2026-05-04
> because Replit's GitHub OAuth integration only requests `repo` scope,
> not `workflow` scope, so the workflow file could not be pushed from
> the project. To restore the daily cron, either re-add the workflow
> file directly via the GitHub web UI, or re-authorize the Replit
> GitHub connection with the `workflow` scope.

## Past audit phases

Decision logs for these phases were removed on 2026-05-02 to keep this file usable. See `git log` for full context.

- **2026-04-23** — Baseline 2026 best-practices audit + post-deploy verification.
- **2026-05-02** — Content/SEO truth pass (verified all surfaced GitHub repos live, removed 404s).
- **2026-05-02** — Visionary overhaul (Hero/About/Opportunities copy refresh, BRAND.md voice rules codified).
- **2026-05-02** — Services routing fix + production verification of `/services/<slug>/`.
- **2026-05-02** — Vercel deploy config, dependency prune (8 unused deps removed), dead-code prune.
