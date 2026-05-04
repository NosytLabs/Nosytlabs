# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: services-nav.spec.ts >> Services nav + footer + sitemap >> matcher hits canonical /services/* but not /services-foo lookalikes
- Location: tests/e2e/services-nav.spec.ts:66:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "Web app"
Received string:    "<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, viewport-fit=cover\" />
    <meta name=\"theme-color\" content=\"#0a0a0b\" />
    <meta name=\"color-scheme\" content=\"dark\" />·
    <title>Nosytlabs — AI agents, MCP servers &amp; developer tools</title>
    <meta name=\"description\" content=\"Nosyt LLC — a one-person independent studio building open-source AI agents, MCP (Model Context Protocol) servers, and small tools for developers.\" />
    <meta name=\"keywords\" content=\"Nosyt, Nosytlabs, NosytLabs, Nosyt LLC, AI agents, MCP servers, Model Context Protocol, OpenClaw, OpenClaw Droid, Termux, prompt engineering, indie studio, open source, developer tools, Presearch search skill, Tidefall\" />
    <meta name=\"author\" content=\"Nosyt LLC\" />
    <meta name=\"robots\" content=\"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1\" />
    <meta name=\"referrer\" content=\"strict-origin-when-cross-origin\" />·
    <!-- Geo / publisher signals (helps local + AI Overviews context) -->
    <meta name=\"geo.region\" content=\"US\" />
    <meta name=\"geo.placename\" content=\"United States\" />·
    <!-- Permissions-Policy: opt out of FLoC/Topics behavioral cohorts. -->
    <meta http-equiv=\"Permissions-Policy\" content=\"interest-cohort=(), browsing-topics=()\" />·
    <!--
      Content-Security-Policy (meta variant). Server-level headers (CSP +
      Strict-Transport-Security + frame-ancestors) are added by the static
      hosting layer — this meta tag is a defence-in-depth fallback for
      script/style/connect surfaces. We allow:
        - inline scripts/styles (GA4 inline gtag bootstrap, framer-motion
          style attrs, React inline style props)
        - googletagmanager + google-analytics for GA4
        - fonts.googleapis.com + fonts.gstatic.com for Instrument Serif / Geist
        - the CloudFront origin that hosts the hero MP4
        - formsubmit.co for the AJAX form submissions
        - open.spotify.com for the artist embed iframe
      `frame-ancestors` is intentionally omitted — meta CSP can't enforce it
      per spec, that directive must come from a real HTTP header.
    -->
    <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' https: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.google.com https://formsubmit.co; frame-src https://open.spotify.com; object-src 'none'; base-uri 'self'; form-action 'self' https://formsubmit.co\" />·
    <!-- Canonical + Open Graph + Twitter -->
    <link rel=\"canonical\" href=\"https://nosytlabs.com/\" />
    <meta property=\"og:type\" content=\"website\" />
    <meta property=\"og:site_name\" content=\"Nosytlabs\" />
    <meta property=\"og:title\" content=\"Nosytlabs — Independent studio for AI agents &amp; developer tools\" />
    <meta property=\"og:description\" content=\"Open-source AI agents, MCP servers, and small developer tools from a one-person studio. On GitHub since 2025.\" />
    <meta property=\"og:url\" content=\"https://nosytlabs.com/\" />
    <meta property=\"og:image\" content=\"https://nosytlabs.com/opengraph.jpg\" />
    <meta property=\"og:image:width\" content=\"1280\" />
    <meta property=\"og:image:height\" content=\"720\" />
    <meta property=\"og:image:type\" content=\"image/jpeg\" />
    <meta property=\"og:image:alt\" content=\"Nosytlabs — Notable opportunities shape your tomorrow.\" />
    <meta property=\"og:locale\" content=\"en_US\" />
    <meta name=\"twitter:card\" content=\"summary_large_image\" />
    <meta name=\"twitter:site\" content=\"@NosytLabs\" />
    <meta name=\"twitter:creator\" content=\"@NosytLabs\" />
    <meta name=\"twitter:title\" content=\"Nosytlabs — Independent studio for AI agents &amp; developer tools\" />
    <meta name=\"twitter:description\" content=\"Open-source AI agents, MCP servers, and small developer tools from a one-person studio.\" />
    <meta name=\"twitter:image\" content=\"https://nosytlabs.com/opengraph.jpg\" />
    <meta name=\"twitter:image:alt\" content=\"Nosytlabs — Notable opportunities shape your tomorrow.\" />·
    <!-- Icons + PWA manifest -->
    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\" />
    <link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"/icon-192.png\" />
    <link rel=\"icon\" type=\"image/png\" sizes=\"512x512\" href=\"/icon-512.png\" />
    <link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\" />
    <link rel=\"mask-icon\" href=\"/favicon.svg\" color=\"#d8b87a\" />
    <link rel=\"manifest\" href=\"/site.webmanifest\" />
    <link rel=\"sitemap\" type=\"application/xml\" href=\"/sitemap.xml\" />·
    <!-- Preconnect to critical origins (font + video CDN) -->
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />
    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />
    <link rel=\"preconnect\" href=\"https://d8j0ntlcm91z4.cloudfront.net\" crossorigin />·
    <!-- Preload the hero poster (also doubles as LCP candidate before video plays) -->
    <link rel=\"preload\" as=\"image\" href=\"/img/cosmos-hero.webp\" fetchpriority=\"high\" />·
    <!-- Fonts loaded as <link> (not @import) so they don't block render-chain CSS.
         font-display=swap is set in the Google Fonts URL so text never blocks paint. -->
    <link rel=\"preload\" as=\"style\" href=\"https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&family=Geist+Mono:wght@400&display=swap\" />
    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&family=Geist+Mono:wght@400&display=swap\" media=\"print\" onload=\"this.media='all'\" />
    <noscript><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&family=Geist+Mono:wght@400&display=swap\" /></noscript>·
    <!--
      FOUC guard: synchronously add `js` class to <html> before first paint so
      the CSS rule below hides the static SEO skeleton for JS visitors. Crawlers
      without JS keep seeing the skeleton and index its real H1 + content.
    -->
    <script>document.documentElement.classList.add('js');</script>
    <style>
      html.js [data-seo-skeleton] { display: none !important; }
      html:not(.js) body { background: #0a0a0b; color: #f5f1e8; margin: 0; }
    </style>·
    <!--
      SEO skeleton styles. Scoped to the [data-seo-skeleton] attribute so they
      only style the static fallback and never leak into the React app.
      Inline so the skeleton renders correctly even before the bundled CSS
      arrives (the skeleton is the LCP candidate for crawlers that don't run JS).
    -->
    <style>
      [data-seo-skeleton] { background: #0a0a0b; color: #f5f1e8; font-family: 'Geist', system-ui, sans-serif; line-height: 1.6; max-width: 64rem; margin: 0 auto; padding: 2rem 1.5rem; min-height: 100vh; }
      [data-seo-skeleton] header { display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center; justify-content: space-between; margin-bottom: 4rem; }
      [data-seo-skeleton] header > a:first-child { font-weight: 600; font-size: 1rem; color: #f5f1e8; text-decoration: none; }
      [data-seo-skeleton] nav { display: flex; flex-wrap: wrap; gap: 1.25rem; font-size: 0.9rem; }
      [data-seo-skeleton] nav a { color: rgba(245,241,232,0.8); text-decoration: none; }
      [data-seo-skeleton] .eyebrow { font-family: 'Geist Mono', ui-monospace, monospace; font-size: 0.68rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.65; margin: 0 0 1rem; }
      [data-seo-skeleton] h1 { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: clamp(2.5rem, 7vw, 5.5rem); line-height: 1.0; letter-spacing: -0.025em; margin: 0 0 1.5rem; }
      [data-seo-skeleton] h2 { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: clamp(1.75rem, 3.5vw, 2.5rem); margin: 3rem 0 0.75rem; line-height: 1.1; }
      [data-seo-skeleton] p { max-width: 62ch; margin: 0 0 1rem; opacity: 0.88; }
      [data-seo-skeleton] a { color: #d8b87a; text-underline-offset: 4px; }
      [data-seo-skeleton] ul { padding-left: 1.25rem; }
      [data-seo-skeleton] li { margin: 0.5rem 0; }
      [data-seo-skeleton] footer { margin-top: 5rem; padding-top: 1.5rem; border-top: 1px solid rgba(245,241,232,0.1); font-size: 0.75rem; opacity: 0.55; }
      [data-seo-skeleton] footer a { color: rgba(245,241,232,0.7); margin: 0 0.4rem; }
    </style>·
    <!-- Structured data: Organization -->·
    <!-- Structured data: Person (founder identity behind the studio) -->·
    <!-- Structured data: WebSite -->·
    <!-- Note: FAQPage JSON-LD is included below in the @graph block. Each Q&A
         is also surfaced in visible page content (FAQ component) so it stays
         eligible for Google rich results. Studio facts for LLM/AI-search
         context additionally live in /llms.txt. -->·
    <!-- Structured data: SoftwareSourceCode per featured project. Each entry
         mirrors a verified live repo at github.com/NosytLabs (404s removed).
         The block between the BEGIN/END markers below is regenerated by
         `scripts/sync-github-data.mjs` so dateModified / programmingLanguage
         stay accurate without manual edits. Keep markers verbatim. -->
    <!-- BEGIN:github-projects-schema -->
    <!-- last-synced: 2026-05-04T20:39:03.320Z -->
    <script type=\"application/ld+json\">
    {
          \"@context\": \"https://schema.org\",
          \"@graph\": [
                {
                      \"@type\": \"SoftwareSourceCode\",
                      \"name\": \"OpenClaw Droid\",
                      \"description\": \"Optimized OpenClaw AI Gateway for Android via Termux. Agentic workflows on a phone.\",
                      \"codeRepository\": \"https://github.com/NosytLabs/openclaw-droid\",
                      \"programmingLanguage\": \"Shell\",
                      \"author\": {
                            \"@id\": \"https://nosytlabs.com/#org\"
                      },
                      \"dateModified\": \"2026-05-04T08:23:43Z\"
                },
                {
                      \"@type\": \"SoftwareSourceCode\",
                      \"name\": \"OpenClaw Free MCP Servers\",
                      \"description\": \"Free Image Generation and Text-to-Speech MCP servers for OpenClaw. No API keys required.\",
                      \"codeRepository\": \"https://github.com/NosytLabs/openclaw-free-mcp-servers\",
                      \"programmingLanguage\": \"Python\",
                      \"author\": {
                            \"@id\": \"https://nosytlabs.com/#org\"
                      },
                      \"dateModified\": \"2026-05-04T14:57:47Z\"
                },
                {
                      \"@type\": \"SoftwareSourceCode\",
                      \"name\": \"Presearch Search Skill\",
                      \"description\": \"Clean SKILL.md for the Presearch Search API — privacy-first, decentralized search for AI agents.\",
                      \"codeRepository\": \"https://github.com/NosytLabs/presearch-search-skill\",
                      \"programmingLanguage\": \"Python\",
                      \"author\": {
                            \"@id\": \"https://nosytlabs.com/#org\"
                      },
                      \"dateModified\": \"2026-02-20T09:46:10Z\"
                },
                {
                      \"@type\": \"SoftwareSourceCode\",
                      \"name\": \"Employee.md\",
                      \"description\": \"Open specification for hiring AI employees in an internet-native economy: roles, capabilities, evaluations, and contracts.\",
                      \"codeRepository\": \"https://github.com/NosytLabs/employee-md\",
                      \"programmingLanguage\": \"Python\",
                      \"author\": {
                            \"@id\": \"https://nosytlabs.com/#org\"
                      },
                      \"dateModified\": \"2026-05-04T08:28:32Z\"
                }
          ]
    }
    </script>
    <!-- END:github-projects-schema -->·
    <!-- Google Analytics 4 -->
    <script async src=\"https://www.googletagmanager.com/gtag/js?id=G-4FS0H823MX\"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-4FS0H823MX', { anonymize_ip: true });
    </script>···
  <!-- Structured Data: Organization + WebSite + Person + FAQ -->
  <script type=\"application/ld+json\">
  {
    \"@context\": \"https://schema.org\",
    \"@graph\": [
      {
        \"@type\": \"Organization\",
        \"@id\": \"https://nosytlabs.com/#organization\",
        \"name\": \"NosytLabs\",
        \"legalName\": \"NOSYT LLC\",
        \"url\": \"https://nosytlabs.com\",
        \"logo\": {
          \"@type\": \"ImageObject\",
          \"url\": \"https://nosytlabs.com/icon-512.png\",
          \"width\": 512,
          \"height\": 512
        },
        \"description\": \"Independent US-based studio building open-source AI agents, MCP servers, and developer tools.\",
        \"foundingLocation\": {
          \"@type\": \"Place\",
          \"addressRegion\": \"NM\",
          \"addressCountry\": \"US\",
          \"name\": \"New Mexico, USA\"
        },
        \"areaServed\": \"Worldwide\",
        \"knowsAbout\": [\"AI agents\", \"MCP servers\", \"Model Context Protocol\", \"browser automation\", \"web development\", \"open source\"],
        \"sameAs\": [
          \"https://github.com/NosytLabs\",
          \"https://www.linkedin.com/company/nosytlabs\"
        ]
      },
      {
        \"@type\": \"WebSite\",
        \"@id\": \"https://nosytlabs.com/#website\",
        \"url\": \"https://nosytlabs.com\",
        \"name\": \"NosytLabs\",
        \"description\": \"Independent US studio building AI agents, MCP servers, and developer tools.\",
        \"publisher\": { \"@id\": \"https://nosytlabs.com/#organization\" },
        \"inLanguage\": \"en-US\",
        \"potentialAction\": {
          \"@type\": \"SearchAction\",
          \"target\": { \"@type\": \"EntryPoint\", \"urlTemplate\": \"https://github.com/NosytLabs?q={search_term_string}\" },
          \"query-input\": \"required name=search_term_string\"
        }
      },
      {
        \"@type\": \"FAQPage\",
        \"mainEntity\": [
          {
            \"@type\": \"Question\",
            \"name\": \"What does NosytLabs build?\",
            \"acceptedAnswer\": {
              \"@type\": \"Answer\",
              \"text\": \"NosytLabs builds open-source AI agents, MCP (Model Context Protocol) servers, and small fast web tools for developers. Projects include openclaw-free-mcp-servers for free image generation and TTS, employee.md for AI employment specifications, and OpenClaw Droid for mobile AI.\"
            }
          },
          {
            \"@type\": \"Question\",
            \"name\": \"What is MCP (Model Context Protocol)?\",
            \"acceptedAnswer\": {
              \"@type\": \"Answer\",
              \"text\": \"MCP (Model Context Protocol) is an open standard for connecting AI agents to external tools and data sources. NosytLabs builds free MCP servers that work without API keys.\"
            }
          },
          {
            \"@type\": \"Question\",
            \"name\": \"Where is NosytLabs based?\",
            \"acceptedAnswer\": {
              \"@type\": \"Answer\",
              \"text\": \"NosytLabs (NOSYT LLC) is based in New Mexico, USA. We work remotely with clients worldwide.\"
            }
          }
        ]
      }
    ]
  }
  </script>
  <script type=\"module\" crossorigin src=\"/assets/index-DIdMAD_E.js\"></script>
  <link rel=\"modulepreload\" crossorigin href=\"/assets/rolldown-runtime-BYbx6iT9.js\">
  <link rel=\"modulepreload\" crossorigin href=\"/assets/vendor-icons-DPIGTmLa.js\">
  <link rel=\"modulepreload\" crossorigin href=\"/assets/vendor-motion-0G0DbK72.js\">
  <link rel=\"modulepreload\" crossorigin href=\"/assets/vendor-react-BihAMSg_.js\">
  <link rel=\"stylesheet\" crossorigin href=\"/assets/index-Uq1tRgHD.css\">
</head>
  <body>
    <!--
      The React app mounts into #root and replaces the entire static skeleton
      below on first render. The skeleton exists because:
        1. Static crawlers (Bing, DuckDuckBot, squirrelscan, AI training crawlers
           that don't execute JS) get a real H1, <main> landmark, descriptive
           copy, internal links, and a footer — instead of an empty <div>.
        2. Real human visitors briefly see meaningful content during the
           ~50–150 ms before the React bundle hydrates, instead of a black flash.
        3. Lighthouse / CrUX measure LCP against this skeleton's H1 instead of
           against a delayed JS render.
      All skeleton styles are scoped via [data-seo-skeleton] so nothing leaks
      into the React app once it takes over.
    -->
    <div id=\"root\">
      <main id=\"main\" data-seo-skeleton>
        <header>
          <a href=\"/\" aria-label=\"Nosytlabs — home\">Nosytlabs</a>
          <nav aria-label=\"Site sections\">
            <a href=\"#about\">Studio</a>
            <a href=\"#projects\">Projects</a>
            <a href=\"#manifesto\">Manifesto</a>
            <a href=\"#sound\">Music</a>
            <a href=\"#contact\">Contact</a>
          </nav>
        </header>
        <section>
          <p class=\"eyebrow\">Nosytlabs · Independent Studio · Est. 2025</p>
          <h1>Notable opportunities shape your tomorrow.</h1>
          <p>Nosyt LLC is a one-person independent studio (founded 2025) building open-source AI agents, MCP (Model Context Protocol) servers, and small tools for developers. Most projects live in the open at <a href=\"https://github.com/NosytLabs\">github.com/NosytLabs</a>.</p>
        </section>
        <section id=\"about\">
          <h2>The studio</h2>
          <p>Nosytlabs was registered as Nosyt LLC in early 2025. One person, one desk, no investors. The output spans AI agents, MCP servers, a browser game in progress, and the occasional experiment. Music gets released under the same name when a track is ready.</p>
        </section>
        <section id=\"projects\">
          <h2>Selected projects</h2>
          <ul>
            <li><strong>OpenClaw Droid</strong> — optimized OpenClaw AI Gateway for Android via Termux. <a href=\"https://github.com/NosytLabs/openclaw-droid\">github.com/NosytLabs/openclaw-droid</a></li>
            <li><strong>Free MCP Servers</strong> — image generation and text-to-speech MCP servers, no API keys required. <a href=\"https://github.com/NosytLabs/openclaw-free-mcp-servers\">github.com/NosytLabs/openclaw-free-mcp-servers</a></li>
            <li><strong>Presearch Search Skill</strong> — privacy-first, decentralized search for AI agents. <a href=\"https://github.com/NosytLabs/presearch-search-skill\">github.com/NosytLabs/presearch-search-skill</a></li>
            <li><strong>Tidefall</strong> — in-development browser game built with Phaser. <a href=\"https://github.com/NosytLabs/tidefall-phaser\">github.com/NosytLabs/tidefall-phaser</a></li>
          </ul>
        </section>
        <section id=\"contact\">
          <h2>Get in touch</h2>
          <p>Working on something in agents, MCP, or developer tooling? Open an issue on a repo, or email <a href=\"mailto:hi@nosytlabs.com\">hi@nosytlabs.com</a> — a real person replies.</p>
        </section>
        <footer>
          <p>© 2025 Nosyt LLC · <a href=\"/privacy.html\">Privacy</a> · <a href=\"/sitemap.xml\">Sitemap</a> · <a href=\"/llms.txt\">llms.txt</a> · <a href=\"https://github.com/NosytLabs\">GitHub</a></p>
        </footer>
      </main>
    </div>
  </body>
</html>
"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:18403";
  4  | 
  5  | test.describe("Services nav + footer + sitemap", () => {
  6  |   test("desktop navbar exposes a Services link to the hub", async ({ page }) => {
  7  |     await page.goto(BASE);
  8  |     const link = page
  9  |       .locator("nav a")
  10 |       .filter({ hasText: /^Services$/ })
  11 |       .first();
  12 |     await expect(link).toBeVisible();
  13 |     await expect(link).toHaveAttribute("href", "/services/");
  14 |   });
  15 | 
  16 |   test("footer lists all 4 service pages + the hub", async ({ page }) => {
  17 |     await page.goto(BASE);
  18 |     const footer = page.locator("footer").first();
  19 |     await expect(footer.locator('a[href="/services/"]').first()).toBeVisible();
  20 |     await expect(footer.locator('a[href="/services/web-apps/"]')).toBeVisible();
  21 |     await expect(footer.locator('a[href="/services/ai-agents/"]')).toBeVisible();
  22 |     await expect(footer.locator('a[href="/services/mcp-servers/"]')).toBeVisible();
  23 |     await expect(footer.locator('a[href="/services/custom-tools/"]')).toBeVisible();
  24 |   });
  25 | 
  26 |   test("sitemap.xml lists 8 URLs including all service pages", async ({ request }) => {
  27 |     const res = await request.get(`${BASE}/sitemap.xml`);
  28 |     expect(res.status()).toBe(200);
  29 |     const body = await res.text();
  30 |     const urls = body.match(/<url>/g) ?? [];
  31 |     // 8 entries: home, /services/, 4 service detail pages, /privacy.html, /llms.txt
  32 |     expect(urls.length).toBe(8);
  33 |     expect(body).toContain("https://nosytlabs.com/services");
  34 |     expect(body).toContain("https://nosytlabs.com/services/web-apps");
  35 |     expect(body).toContain("https://nosytlabs.com/services/ai-agents");
  36 |     expect(body).toContain("https://nosytlabs.com/services/mcp-servers");
  37 |     expect(body).toContain("https://nosytlabs.com/services/custom-tools");
  38 |     expect(body).toContain("https://nosytlabs.com/llms.txt");
  39 |   });
  40 | 
  41 |   // Regression: canonical trailing-slash URLs must not fall through to SPA.
  42 |   test("each canonical /services/ URL serves the real static page", async ({ request }) => {
  43 |     const pages = [
  44 |       { path: "/services/", title: "Hire Nosytlabs", h1: "Small, sharp work" },
  45 |       { path: "/services/web-apps/", title: "Web app", h1: "Small, sharp" },
  46 |       { path: "/services/ai-agents/", title: "AI agent", h1: "AI agent" },
  47 |       { path: "/services/mcp-servers/", title: "MCP server", h1: "MCP server" },
  48 |       { path: "/services/custom-tools/", title: "Custom developer", h1: "Custom" },
  49 |     ];
  50 |     for (const p of pages) {
  51 |       const res = await request.get(`${BASE}${p.path}`);
  52 |       expect(res.status(), `GET ${p.path}`).toBe(200);
  53 |       const body = await res.text();
  54 |       expect(body, `${p.path} must not be SPA homepage`).not.toContain(
  55 |         "Notable opportunities shape your tomorrow.",
  56 |       );
  57 |       expect(body, `title in ${p.path}`).toContain(p.title);
  58 |       expect(body, `h1 in ${p.path}`).toContain(p.h1);
  59 |       expect(body, `canonical in ${p.path}`).toContain('rel="canonical"');
  60 |       expect(body, `Service JSON-LD in ${p.path}`).toContain('"@type": "Service"');
  61 |       expect(body, `Breadcrumb in ${p.path}`).toContain("BreadcrumbList");
  62 |     }
  63 |   });
  64 | 
  65 |   // Matcher precision: /services/<slug> resolves; /services-foo/ does not.
  66 |   test("matcher hits canonical /services/* but not /services-foo lookalikes", async ({ request }) => {
  67 |     const noSlash = await request.get(`${BASE}/services/web-apps`, { maxRedirects: 0 });
  68 |     expect([200, 301, 308]).toContain(noSlash.status());
  69 |     if (noSlash.status() === 200) {
  70 |       const body = await noSlash.text();
> 71 |       expect(body).toContain("Web app");
     |                    ^ Error: expect(received).toContain(expected) // indexOf
  72 |       expect(body).not.toContain("Notable opportunities shape your tomorrow.");
  73 |     }
  74 |     const lookalike = await request.get(`${BASE}/services-foo/`);
  75 |     expect(lookalike.status()).toBe(200);
  76 |     const body = await lookalike.text();
  77 |     expect(body).toContain("Notable opportunities shape your tomorrow.");
  78 |   });
  79 | 
  80 |   test("clicking navbar Services link lands on the static services hub", async ({ page }) => {
  81 |     await page.goto(BASE);
  82 |     const link = page
  83 |       .locator("nav a")
  84 |       .filter({ hasText: /^Services$/ })
  85 |       .first();
  86 |     await link.click();
  87 |     await page.waitForURL(/\/services\/?$/);
  88 |     const h1 = page.locator("h1").first();
  89 |     await expect(h1).toContainText("Small, sharp work");
  90 |     await expect(h1).not.toContainText("Notable opportunities");
  91 |     const html = await page.content();
  92 |     expect(html).toContain("BreadcrumbList");
  93 |   });
  94 | });
  95 | 
```