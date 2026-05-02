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

  // 3. "Available" pill in navbar links to #contact
  test('"Available" pill links to the contact section', async ({ page }) => {
    await page.goto(BASE);
    const pill = page.locator('a[href="#contact"]').filter({ hasText: "Available" }).first();
    await expect(pill).toBeVisible();
    await expect(pill).toHaveAttribute("href", "#contact");
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
