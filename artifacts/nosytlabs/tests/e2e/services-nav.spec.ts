import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:18403";

test.describe("Services nav + footer + sitemap", () => {
  test("desktop navbar exposes a Services link to the hub", async ({ page }) => {
    await page.goto(BASE);
    const link = page
      .locator("nav a")
      .filter({ hasText: /^Services$/ })
      .first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/services/");
  });

  test("footer lists all 4 service pages + the hub", async ({ page }) => {
    await page.goto(BASE);
    const footer = page.locator("footer").first();
    await expect(footer.locator('a[href="/services/"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/services/web-apps/"]')).toBeVisible();
    await expect(footer.locator('a[href="/services/ai-agents/"]')).toBeVisible();
    await expect(footer.locator('a[href="/services/mcp-servers/"]')).toBeVisible();
    await expect(footer.locator('a[href="/services/custom-tools/"]')).toBeVisible();
  });

  test("sitemap.xml lists 7 URLs including all service pages", async ({ request }) => {
    const res = await request.get(`${BASE}/sitemap.xml`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    const urls = body.match(/<url>/g) ?? [];
    expect(urls.length).toBe(7);
    expect(body).toContain("https://nosytlabs.com/services/");
    expect(body).toContain("https://nosytlabs.com/services/web-apps/");
    expect(body).toContain("https://nosytlabs.com/services/ai-agents/");
    expect(body).toContain("https://nosytlabs.com/services/mcp-servers/");
    expect(body).toContain("https://nosytlabs.com/services/custom-tools/");
  });

  // The CANONICAL URL for each service page is the trailing-slash form
  // (`/services/web-apps/`, not `/services/web-apps/index.html`). Those are
  // the URLs we publish in the sitemap, the navbar, the footer, and every
  // JSON-LD `url` field. If those URLs ever serve the SPA homepage instead of
  // the static service page, every crawler that follows our sitemap gets the
  // wrong content — see vite.config.ts `staticServicePages()` plugin.
  test("each canonical /services/ URL serves the real static page", async ({ request }) => {
    const pages = [
      { path: "/services/", title: "Hire Nosytlabs", h1: "Small, sharp work" },
      { path: "/services/web-apps/", title: "Web app", h1: "Small, sharp" },
      { path: "/services/ai-agents/", title: "AI agent", h1: "AI agent" },
      { path: "/services/mcp-servers/", title: "MCP server", h1: "MCP server" },
      { path: "/services/custom-tools/", title: "Custom developer", h1: "Custom" },
    ];
    for (const p of pages) {
      const res = await request.get(`${BASE}${p.path}`);
      expect(res.status(), `GET ${p.path}`).toBe(200);
      const body = await res.text();
      // Sanity-check that we are NOT being handed the SPA homepage by mistake.
      expect(body, `${p.path} must not be SPA homepage`).not.toContain(
        "Notable opportunities shape your tomorrow.",
      );
      expect(body, `title in ${p.path}`).toContain(p.title);
      expect(body, `h1 in ${p.path}`).toContain(p.h1);
      expect(body, `canonical in ${p.path}`).toContain('rel="canonical"');
      expect(body, `Service JSON-LD in ${p.path}`).toContain('"@type": "Service"');
      expect(body, `Breadcrumb in ${p.path}`).toContain("BreadcrumbList");
    }
  });

  // Matcher-precision regression: `/services/web-apps` (no trailing slash)
  // must still resolve to the static page, AND a path that merely starts
  // with the literal "services" — like `/services-foo/` — must NOT match
  // the plugin and must fall through to the SPA fallback. Catches the
  // class of bugs where a naive `startsWith("/services")` check would
  // hijack unrelated routes.
  test("matcher hits canonical /services/* but not /services-foo lookalikes", async ({ request }) => {
    const noSlash = await request.get(`${BASE}/services/web-apps`, { maxRedirects: 0 });
    expect([200, 301, 308]).toContain(noSlash.status());
    if (noSlash.status() === 200) {
      const body = await noSlash.text();
      expect(body).toContain("Web app");
      expect(body).not.toContain("Notable opportunities shape your tomorrow.");
    }
    // A path that is NOT under /services/ must NOT be intercepted.
    const lookalike = await request.get(`${BASE}/services-foo/`);
    expect(lookalike.status()).toBe(200);
    const body = await lookalike.text();
    // Falls through to the SPA fallback → homepage tagline appears.
    expect(body).toContain("Notable opportunities shape your tomorrow.");
  });

  // Browser navigation flow: clicking the navbar Services link must land on
  // the real static services hub page, not a routed React view.
  test("clicking navbar Services link lands on the static services hub", async ({ page }) => {
    await page.goto(BASE);
    const link = page
      .locator("nav a")
      .filter({ hasText: /^Services$/ })
      .first();
    await link.click();
    await page.waitForURL(/\/services\/?$/);
    // The static page has its own H1 — it is NOT the homepage tagline.
    const h1 = page.locator("h1").first();
    await expect(h1).toContainText("Small, sharp work");
    await expect(h1).not.toContainText("Notable opportunities");
    // And it carries the page-scoped Service breadcrumb in JSON-LD form.
    const html = await page.content();
    expect(html).toContain("BreadcrumbList");
  });
});
