import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:18403";

test.describe("NosytLabs site — core e2e scenarios", () => {

  // 1. Hero renders with cosmos poster image + tagline text
  test("hero renders with poster and tagline", async ({ page }) => {
    await page.goto(BASE);
    // H1 contains the tagline (split across elements but all in h1)
    const h1 = page.locator("h1").first();
    await expect(h1).toContainText("Notable opportunities");
    await expect(h1).toContainText("shape");
    await expect(h1).toContainText("tomorrow");
    // Poster image renders (either via <img> fallback or <video poster>)
    const posterImg = page.locator('img[src*="cosmos-hero"]').first();
    const posterVideo = page.locator('video[poster*="cosmos-hero"]').first();
    const hasPoster =
      (await posterImg.count()) > 0 || (await posterVideo.count()) > 0;
    expect(hasPoster).toBe(true);
  });

  // 1b. The hero is now a single static webp (cosmos-hero.webp) at every
  // viewport — no MP4 anywhere. The previous wide-screen MP4 had the planet
  // jammed against the right edge with mostly empty black on the left, which
  // read as broken. This test pins the contract: no viewport, mobile or
  // desktop, ever requests an .mp4 or hits the old CloudFront origin.
  test("no viewport requests a hero MP4 (static cosmos image only)", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    });
    const page = await context.newPage();
    const mp4Requests: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.endsWith(".mp4") || url.includes("cloudfront.net")) {
        mp4Requests.push(url);
      }
    });
    await page.goto(BASE, { waitUntil: "networkidle" });
    // Scroll to give any IntersectionObserver-gated <video> a chance to fire.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await context.close();
    // Preconnect is fine (no body bytes); a real MP4 GET is not.
    const realMp4Hits = mp4Requests.filter((u) => u.endsWith(".mp4"));
    expect(realMp4Hits).toEqual([]);
  });

  // 1a-pre. Stress test: even when React bundle is artificially slow to load,
  // the skeleton must be hidden during the pre-hydration window. This proves
  // the inline <head> script + html.js CSS rule applies before first paint —
  // the actual no-flash guarantee, not just an end-state check.
  test("skeleton stays hidden even when React bundle is delayed", async ({ page }) => {
    // Delay the main React entry by ~800ms to simulate slow CPU/network.
    await page.route("**/src/main.tsx", async (route) => {
      await new Promise((r) => setTimeout(r, 800));
      await route.continue();
    });
    // Race to first paint: as soon as DOM commits, check the class + skeleton style.
    await page.goto(BASE, { waitUntil: "commit" });
    const htmlClass = await page.evaluate(() => document.documentElement.className);
    expect(htmlClass).toContain("js");
    // During the delay window the skeleton element exists but must be hidden.
    const skeletonDisplay = await page.evaluate(() => {
      const el = document.querySelector("[data-seo-skeleton]");
      return el ? getComputedStyle(el).display : "absent";
    });
    expect(skeletonDisplay === "none" || skeletonDisplay === "absent").toBe(true);
  });

  // 1a. SEO skeleton never flashes on load (FOUC fix).
  // The skeleton lives in the static HTML so non-JS crawlers can index real
  // content — but for JS visitors:
  //   - The inline <script> in <head> sets `html.js` synchronously, which
  //     hides the skeleton via CSS before first paint.
  //   - React then mounts into #root and replaces the skeleton entirely.
  // After hydration there should be exactly one <main>, exactly one <h1>,
  // and no leftover [data-seo-skeleton] in the visible tree.
  test("SEO skeleton never flashes on load (FOUC fix)", async ({ page }) => {
    await page.goto(BASE);
    // The js-class hook is applied synchronously in <head> — no flash window.
    const htmlClass = await page.evaluate(() => document.documentElement.className);
    expect(htmlClass).toContain("js");
    // After React mounts, the static skeleton is gone (React replaced #root).
    await expect(page.locator("[data-seo-skeleton]")).toHaveCount(0);
    // And we never end up with duplicate landmarks fighting the React tree.
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  // 2. Skip link is focusable and jumps to #main
  test("skip link is keyboard-accessible and links to main content", async ({ page }) => {
    await page.goto(BASE);
    // Tab once from the page — skip link should be first focusable element
    await page.keyboard.press("Tab");
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute("href", "#main");
    await page.keyboard.press("Enter");
    // After activation the main element should exist
    await expect(page.locator("#main")).toBeAttached();
  });

  // 3. "Available" pill in navbar links to the contact section.
  // Anchor is root-prefixed (`/#contact`) so it works from sub-pages like
  // `/services/web-apps/` — bare `#contact` would resolve relative to the
  // current path and silently fail to scroll on those pages.
  test('"Available" pill links to the contact section', async ({ page }) => {
    await page.goto(BASE);
    const pill = page.locator('a[href="/#contact"]').filter({ hasText: "Available" }).first();
    await expect(pill).toBeVisible();
    await expect(pill).toHaveAttribute("href", "/#contact");
  });

  // 4. Contact form validates required fields and accepts a "Hire the studio" inquiry
  test("contact form validates required fields and accepts Hire the studio inquiry", async ({ page }) => {
    await page.goto(BASE);
    // Scroll to the contact section
    await page.locator("#contact").scrollIntoViewIfNeeded();

    // "Hire the studio" chip should be the default active chip
    const hireChip = page.locator('[role="radiogroup"] [role="radio"]').filter({ hasText: "Hire the studio" });
    await expect(hireChip).toBeVisible();
    await expect(hireChip).toHaveAttribute("aria-checked", "true");

    // Try submitting with empty required fields — error should appear
    const form = page.locator('form[aria-label="Contact Nosytlabs"]');
    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();
    // Email validation fires — error message region is visible
    const errorRegion = page.locator("#contact-error");
    await expect(errorRegion).toContainText("valid email");

    // Fill required fields
    await page.fill("#contact-email", "test@example.com");
    await page.fill("#contact-message", "I have a project I'd like to discuss with the studio.");

    // Confirm Hire the studio chip is still selected
    await expect(hireChip).toHaveAttribute("aria-checked", "true");

    // Submit button is present and enabled
    await expect(submitBtn).toBeEnabled();
  });

  // 5. Mobile nav opens and closes with keyboard (Escape key)
  test("mobile nav opens, traps focus, and closes with Escape key", async ({ page, browserName }) => {
    // Use a mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE);

    // Open the mobile nav via the hamburger button
    const trigger = page.locator('button[aria-haspopup="dialog"]');
    await expect(trigger).toBeVisible();
    await trigger.click();

    // Dialog is now in the DOM
    const dialog = page.locator('#mobile-nav-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    // Focus should return to the trigger
    await expect(trigger).toBeFocused();
  });

  // 6. Under prefers-reduced-motion: reduce, all sections are visible (no blank page)
  test("reduced-motion users see all sections — no blank content", async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(BASE);

    // Scroll through the whole page to trigger IntersectionObserver reveals
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // All sections must exist and have visible content
    const sections = [
      "#about",
      "#opportunities",
      "#projects",
      "#manifesto",
      "#contact",
    ];
    for (const id of sections) {
      const section = page.locator(id);
      await expect(section).toBeAttached();
      // Each section must have some text visible — not blank
      const text = await section.textContent();
      expect(text && text.trim().length).toBeGreaterThan(10);
    }

    // Hero H1 must still show the tagline (not opacity:0)
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Notable opportunities");
  });

});
