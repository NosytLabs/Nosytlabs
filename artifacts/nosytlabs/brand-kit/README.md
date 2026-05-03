# Nosytlabs Brand Kit

Production-ready brand assets for Nosytlabs, aligned to the existing brand
defined in [`../BRAND.md`](../BRAND.md). Use this kit for social profiles,
banners, link previews, watermarks, and content backgrounds.

The brand language (palette, mark, voice, fonts) was **not redesigned** —
this kit only extends the existing system into asset formats the site
didn't previously have.

## Quick reference

| Color | Hex | OKLCH | Use |
| --- | --- | --- | --- |
| Black | `#0a0a0b` | `oklch(11% 0.005 270)` | Backgrounds, mark tile |
| Cream | `#f5f1e8` | `oklch(95% 0.013 88)` | Primary text, mark "n" |
| Gold | `#d8b87a` | `oklch(78% 0.085 80)` | Italic accents, the period, focus rings |

| Font | Where |
| --- | --- |
| Instrument Serif (italic 400) | Headlines, accents, wordmark |
| Geist (400, 500) | Body, buttons, navbar |
| Geist Mono (uppercase, 0.22–0.30em tracking) | Eyebrow labels, small caps |

## Directory structure

```
brand-kit/
├── logo/         Mark + wordmark in SVG (full color + monochrome)
├── social/       Source SVGs for every social-platform asset
├── watermark/    Subtle overlay watermark for photos / screenshots
├── photos/       Brand-aligned cosmos photography (PNG, AI-generated)
└── exports/      Pre-rasterized PNGs of every asset, ready to upload
```

## Logo & marks

| File | Use |
| --- | --- |
| `logo/wordmark.svg` | Full-color wordmark "Nosytlabs." with gold period — the canonical logotype |
| `logo/wordmark-mono-cream.svg` | Single-color cream — for use on the brand black or any dark photo |
| `logo/wordmark-mono-black.svg` | Single-color black — for invoices, light-background print, partner pages |
| `logo/lockup-horizontal.svg` | Mark + wordmark side-by-side — email signatures, footers, slide masters |
| `logo/lockup-stacked.svg` | Mark stacked above wordmark + "INDEPENDENT STUDIO" caption — about pages, posters |
| `logo/lockup-horizontal-mono-cream.svg` | Mono cream lockup — single-color version for dark backgrounds, print, partner pages |
| `logo/lockup-horizontal-mono-black.svg` | Mono black lockup — single-color version for invoices, light-bg print |
| `logo/mark-only.svg` | Pure mark (n + period), no tile, transparent — for inline use in headers, footers, email |
| `../public/favicon.svg` | The mark itself (canonical source) — already in production |

**Quality rules** (from BRAND.md §4):
- Don't restyle the "n" (no bold, no upright, no other typeface).
- Don't drop the gold dot — it's the period from the tagline.
- Don't recolor the tile to anything other than `#0a0a0b`.
- Use at any size ≥ 16px square.

## Social media assets

All social assets are source-controlled as SVG and pre-rasterized to PNG
in `exports/`. Re-export with ImageMagick from any SVG:
`magick -background none -density 200 SOURCE.svg -resize WxH exports/OUT.png`

| Platform | Spec | Source | Export |
| --- | --- | --- | --- |
| Profile avatar (GitHub, X, LinkedIn, Bluesky, etc.) | 1024×1024, also 32 / 192 / 512 | `social/avatar-1024.svg` | `exports/avatar-{32,192,512,1024}.png` |
| X / Twitter header | 1500×500 | `social/x-header-1500x500.svg` | `exports/x-header.png` |
| LinkedIn banner | 1584×396 | `social/linkedin-banner-1584x396.svg` | `exports/linkedin-banner.png` |
| Open Graph / link preview | 1200×630 | `social/og-image-1200x630.svg` | `exports/og-image.png` |
| Instagram square post | 1080×1080 | `social/instagram-post-1080.svg` | `exports/instagram-post.png` |
| Instagram / TikTok story | 1080×1920 | `social/instagram-story-1080x1920.svg` | `exports/instagram-story.png` |
| GitHub repo social preview | 1280×640 | `social/github-social-1280x640.svg` | `exports/github-social.png` |
| Repo README header banner | 1280×320 | `social/repo-readme-header-1280x320.svg` | `exports/repo-readme-header.png` |
| Email signature (light bg) | 600×120 | `social/email-signature.svg` | `exports/email-signature.png` |
| App icon (light variant) | 1024×1024 | `social/app-icon-light-1024.svg` | `exports/app-icon-light-1024.png` |
| Color palette reference | 1200×800 | `social/color-palette-1200x800.svg` | `exports/color-palette.png` |
| Type specimen reference | 1200×900 | `social/type-specimen-1200x900.svg` | `exports/type-specimen.png` |
| Business card front (3.5×2") | 1050×600 @ 300dpi | `social/business-card-front-1050x600.svg` | `exports/business-card-front.png` |
| Business card back (3.5×2") | 1050×600 @ 300dpi | `social/business-card-back-1050x600.svg` | `exports/business-card-back.png` |
| Desktop wallpaper / Zoom bg | 1920×1080 | `social/desktop-wallpaper-1920x1080.svg` | `exports/desktop-wallpaper.png` |

**WebP exports**: every PNG in `exports/` and `photos/` ships with a matching `.webp` at q=88. Photos compress 90%+ (1.4 MB → 128 KB). Use WebP for web upload, PNG for platforms that require it.

**The favicon = the social avatar.** `public/favicon.svg`, `public/icon-192.png`,
`public/icon-512.png`, and `public/apple-touch-icon.png` all rasterize from the
**same** mark used in `social/avatar-1024.svg`. Re-run this to refresh them
together if the mark ever changes:

```bash
magick -background none -density 600 brand-kit/social/avatar-1024.svg -resize 192x192 public/icon-192.png
magick -background none -density 600 brand-kit/social/avatar-1024.svg -resize 512x512 public/icon-512.png
magick -background none -density 600 brand-kit/social/avatar-1024.svg -resize 180x180 public/apple-touch-icon.png
```

**Safe zones**:
- Avatar: keep critical content inside an inscribed circle (LinkedIn / X crop avatars).
- LinkedIn banner: avoid the bottom-left ~280×280 area where the avatar overlaps on profile pages.
- Instagram story: keep CTAs inside the middle 1080×1620 (top 270 + bottom 270 are reserved for UI).

## Watermark

`watermark/watermark-corner.svg` — small mark + "nosytlabs." wordmark at
92% opacity, rendered for use as a corner overlay on photos, screenshots,
or shared images. Recommended placement: bottom-right, 32px inset.

## Brand photography

Four AI-generated, brand-aligned cosmos photos in `photos/`. They follow
the Hero `/img/cosmos-hero.webp` aesthetic — near-black backgrounds with
warm cream and subtle gold highlights, no faces, no stock-photo cliches.

| File | Aspect | Use |
| --- | --- | --- |
| `photos/cosmos-banner.png` | 16:9 | Slide masters, email headers, blog post hero |
| `photos/cosmic-tile.png` | 1:1 | Square social posts, podcast thumbnails |
| `photos/figure-cosmos.png` | 16:9 | Hero variants for talks / posts about scope and craft |
| `photos/cosmos-vertical.png` | 9:16 | Story / Reels / TikTok backgrounds |

## Voice cheat-sheet (for captions and bios)

From BRAND.md §2 — apply to every social post:
- Plain, honest, substantial. Use "we" and "the studio". Never "I", never team-size.
- Don't lead with what you *aren't* (banned: "no funding, no investors, no growth team" stacks).
- No music / Spotify / YouTube references — the studio ships software.
- The tagline `Notable opportunities shape your tomorrow.` is treated like a logo. Don't paraphrase it.

## Bio templates

**X (160 chars)**:
> Independent US studio. AI agents, MCP servers, small fast web apps. Open source by default. Available for new work. nosytlabs.com

**GitHub org tagline**:
> Independent US studio building AI agents, MCP servers, and small fast web apps. Open source by default.

**LinkedIn About (one paragraph)**:
> Nosytlabs is a US-based independent studio building AI agents, Model Context Protocol (MCP) servers, and small, fast web apps for founders, teams, and fellow builders. Fixed scope, 2–6 week turnaround, code transferred to your GitHub org on completion. Open source by default. Available for new work at nosytlabs.com.

## Re-exporting

```bash
# Single asset
magick -background none -density 200 social/x-header-1500x500.svg -resize 1500x500 exports/x-header.png

# Avatar set
for sz in 32 192 512 1024; do
  magick -background none -density 600 social/avatar-1024.svg -resize ${sz}x${sz} exports/avatar-${sz}.png
done
```

## Versioning

This kit is versioned alongside the site source. When BRAND.md changes,
update the affected SVGs and re-run the export commands above.
