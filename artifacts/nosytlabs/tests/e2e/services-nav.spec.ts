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

  test("each /services/ page serves real HTML with unique title + H1", async ({ request }) => {
    const pages = [
      { path: "/services/index.html", title: "Hire Nosytlabs", h1: "Small, sharp work" },
      { path: "/services/web-apps/index.html", title: "Web app", h1: "web work" },
      { path: "/services/ai-agents/index.html", title: "AI agent", h1: "AI agent" },
      { path: "/services/mcp-servers/index.html", title: "MCP server", h1: "MCP server" },
      { path: "/services/custom-tools/index.html", title: "Custom developer", h1: "Custom" },
    ];
    for (const p of pages) {
      const res = await request.get(`${BASE}${p.path}`);
      expect(res.status(), `GET ${p.path}`).toBe(200);
      const body = await res.text();
      expect(body, `title in ${p.path}`).toContain(p.title);
      expect(body, `h1 in ${p.path}`).toContain(p.h1);
      expect(body, `canonical in ${p.path}`).toContain('rel="canonical"');
      expect(body, `Service JSON-LD in ${p.path}`).toContain('"@type": "Service"');
      expect(body, `Breadcrumb in ${p.path}`).toContain("BreadcrumbList");
    }
  });
});
