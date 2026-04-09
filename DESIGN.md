# Design Brief: Befikr Co. — Premium Luxury Streetwear

**Tone & Direction:** Brutalist minimalism. Silence as luxury. Pure monochrome (black, off-white, charcoal) with zero accent color. Typography-led hierarchy, generous breathing room, no decoration.

**Differentiation:** Every streetwear brand reaches for accent colors. Befikr Co. rejects them entirely. Form, typography, and space alone convey premium quality and confidence. This looks *more* expensive, not cheaper.

## Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `background` | 0.98 0 0 | 0.12 0 0 | Page background, breathing room |
| `foreground` | 0.15 0 0 | 0.96 0 0 | Body text, primary content |
| `primary` | 0.15 0 0 | 0.96 0 0 | Buttons, CTAs, active states |
| `secondary` | 0.4 0 0 | 0.35 0 0 | Secondary actions, disabled states |
| `muted` | 0.88 0 0 | 0.25 0 0 | Subtle backgrounds, borders, accents |
| `card` | 0.99 0 0 | 0.15 0 0 | Product cards, lifted surfaces |
| `border` | 0.92 0 0 | 0.22 0 0 | Borders, dividers, structural lines |

## Typography

| Role | Font | Size | Weight | Line-Height | Usage |
|------|------|------|--------|-------------|-------|
| Display | Fraunces serif | 2.5–3.5rem | 700 | 1.2 | Hero headlines, page titles, editorial |
| Body | DM Sans | 1rem | 400–500 | 1.6–1.8 | All body text, descriptions |
| Label | DM Sans | 0.875rem | 600 | 1.5 | Form labels, meta, small caps |

## Structural Zones

| Zone | Treatment | Rationale |
|------|-----------|-----------|
| Header/Nav | Sticky, charcoal (L=0.15) with off-white text; minimal border-b | Anchors navigation, maintains hierarchy |
| Hero | Full-width, off-white background, centered Fraunces headline, subtle shadow base | Dramatic entry point, typography focus |
| Product Grid | 3–4 cols on desktop, 2 on tablet, 1 mobile. Cards: white bg, no shadow until hover | Clean, breathable product display |
| Footer | Dark charcoal (L=0.12), off-white text, minimal typography | Grounds page, closes visual narrative |

## Component Patterns

- **Buttons**: Black (`bg-primary`) with off-white text. On hover: scale 1.02x, `shadow-subtle`. No rounded corners (radius: 0.25rem = minimal).
- **Product Cards**: Off-white bg, charcoal border (1px), image full-bleed, price in label weight, no badges.
- **Inputs**: Light grey bg (L=0.95), charcoal border, no shadow focus. Focus ring: black.
- **Hover States**: Scale 1.02x + `shadow-subtle` on cards. Text opacity 0.8 on secondary actions.

## Motion & Animation

- **Fade-in**: 0.6s ease-out on page load and scroll-triggered elements (delay staggered per section).
- **Slide-up**: 12px + fade-in for product cards on scroll entry.
- **Hover transitions**: All 0.3s cubic-bezier(0.4, 0, 0.2, 1). No bounce or elastic effects.
- **Scroll behavior**: Smooth, no parallax distraction.

## Constraints & Anti-Patterns

- **No accent color** — all interactive states use black or grey.
- **No color badges** — category labels use typography weight only.
- **No gradient overlays** — pure solid backgrounds.
- **No badge borders** — minimal UI noise.
- **Fixed typography weights** — 400 (body), 500 (meta), 600 (label), 700 (display). No 300 or 800.

## Signature Detail

**Silence.** The absence of color is the brand signal. Every action is clear via form, weight, and proximity — not via color coding. This is the luxury of restraint. Competitors use five colors. Befikr uses two.
