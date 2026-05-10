# Nosytlabs — Brand Kit

> One-page reference for using the Nosytlabs brand consistently. Living
> document — anything that ships on nosytlabs.com or in a Nosyt repo
> README should match this.

---

## 1. Names

| Where | Use |
| --- | --- |
| Navbar / app icon | **Nosyt** |
| Body copy, headlines, social bios | **Nosytlabs** |
| GitHub org URL | **NosytLabs** (legacy capitalization, do not change) |
| Legal / footer copyright only | **Nosytlabs** |

The studio is an independent US studio, founded **2025**. There is no
registered legal entity called "Nosyt LLC" — never use that name.

## 2. Voice

- **Plain, honest, substantial.** Independent studio. Engineered work.
- **Never reveal team size.** Do not say "one person", "one desk",
  "one inbox", "one bet", "small team", or any variant. The studio
  presents as a substantial independent studio at all times. Use "we"
  and "the studio", not "I".
- **Don't lead with the negatives.** Stacked triads ("No funding, no
  investor deck, no growth team") read as bragging-by-omission and are
  banned. If a paragraph starts to define the studio by what it *isn't*,
  rewrite it around what it *is*.
- **Drop corporate jargon.** No "roadmap theater," no "ship for builders"
  stacks of three. Say the thing.
- **GitHub-first.** Every project lives in the open. Link to it.
- **No music, no Spotify, no YouTube references.** The studio ships
  software. Side-channel media is not part of the brand surface.
- **Tagline appears exactly twice in visible page copy** — Hero H1 and
  the closing Manifesto line. It belongs in metadata fields too
  (Schema.org `slogan`, `og:image:alt`, sitemap, llms.txt) and that's
  fine — those are brand identity, not body copy.

## 3. Tagline

> **Notable opportunities shape your tomorrow.**

Wordmark-adjacent — treat it like a logo. Don't paraphrase it, don't
truncate it, don't put it inside a marketing sentence.

## 4. Logo / Mark

Two formats, kept in sync:

- **Component**: `artifacts/nosytlabs/src/components/Logo.tsx`
- **Static**: `artifacts/nosytlabs/public/favicon.svg`

The mark is an italic serif lowercase **n** with a gold period — a
miniature of the tagline's punctuation, in the same italic Instrument
Serif treatment used across the site.

If you change one, change both. Anything else (SVG export, social
avatar, slide deck) should rasterize from the same source.

### Do

- Keep the cream `n` on the near-black tile.
- Keep the gold dot.
- Use at any size ≥ 16px square.

### Don't

- Don't restyle the `n` (no bold, no upright, no other typeface).
- Don't drop the dot — it's the period from the tagline.
- Don't recolor the tile to anything other than `#0a0a0b`.

## 5. Color

| Token | Hex | Use |
| --- | --- | --- |
| **Black** | `#0a0a0b` | Page background, mark tile |
| **Cream** | `#f5f1e8` | Primary text, mark `n` |
| **Gold** | `#d8b87a` | Italic accents, the period in the mark, focus rings |
| Cream/85 | `rgba(245,241,232,0.85)` | Body copy at full strength |
| Cream/65 | `rgba(245,241,232,0.65)` | Eyebrow labels, captions |
| Cream/45 | `rgba(245,241,232,0.45)` | Footer / fine print |

Gradients are reserved for the hero shimmer (gentle 12s ease-in-out
loop) and the radial glows behind major sections. No other section
uses gradient fills.

## 6. Typography

| Family | Where | Notes |
| --- | --- | --- |
| **Instrument Serif** | Headlines, accents, italic emphasis | Loaded via Google Fonts with italic. The `text-italic-serif` utility class. |
| **Geist** | Body copy, buttons, navbar | 400 + 500 weights. |
| **Geist Mono** | Eyebrow labels, fine-print, monospace tags | Always uppercase, tracked at `0.22em–0.30em`. |

Display sizes: H1 hero clamp to ~10rem on desktop, ~3.25rem on mobile.
Section H2s sit between `4xl` and `7xl`. Body copy stays at 16–18px.

## 7. Motion

- Entrance: `Reveal` component (Framer Motion) with `duration: 0.7`,
  `ease: [0.16, 1, 0.3, 1]`, fires once when in view.
- Hero shimmer on the word "tomorrow": **12s ease-in-out infinite**
  (slowed from the original 7s linear so it reads as a highlight, not
  a marquee).
- All hover scales: `1.03–1.04`. No `1.05+`.
- All press scales: `0.97`.
- Every animated element has a `prefers-reduced-motion: reduce`
  override that flat-out disables transforms, looping animations, and
  scroll-driven motion.

## 8. Imagery

- Hero serves the same static `/img/cosmos-hero.webp` (76 KB) at every
  viewport — person silhouette centered against a cosmic ocean. The
  earlier wide-screen MP4 cropped to a planet on the right edge with
  empty black on the left, which read as broken; dropped entirely.
- Decorative imagery uses the cosmos/desk WebPs in `/img/`.
- No stock photography. No AI faces. No founder photo (yet).
- Open Graph image: `/opengraph.jpg` (1280×720, hand-designed, set in
  `<head>` and in `sitemap.xml`).

## 9. Accounts (verified live)

| Channel | URL |
| --- | --- |
| GitHub | https://github.com/NosytLabs |
| X (Twitter) | https://x.com/NosytLabs |
| Email | hi@nosytlabs.com |
| Subscribe form | https://formsubmit.co/ajax/hi@nosytlabs.com (must stay activated — see ops note below) |

## 10. Ops note — subscribe form

The Hero subscribe form posts to **formsubmit.co**. The endpoint
requires a one-time activation: when the first submission arrives,
formsubmit emails `hi@nosytlabs.com` with subject "Activate Form" and
a link. Until that link is clicked, **every submission silently fails
with "This form needs Activation."** This was the cause of the May 2026
"208 visitors / 0 subscribers" incident.

If subscribers stop arriving, check that the formsubmit activation is
still live (resend by submitting your own email through the live form,
then check inbox + spam for `noreply@formsubmit.co`).

Long-term: replace formsubmit with a proper email backend (Resend,
Buttondown, or a Replit-hosted endpoint with a real subscribers DB).
