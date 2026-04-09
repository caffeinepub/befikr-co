# Design Brief: Befikr Co. — Gen Z Anime Neon Money Mindset

**Tone & Direction:** Professional Gen Z anime-inspired cyberpunk aesthetic. Black base with vibrant neon accents (lime, electric pink, cyan, orange). Bold Space Grotesk typography, spacious layouts with 100vh hero, energetic glowing animations with glitch effects. Premium wealth taglines ("Get the bag", "Stack it", "Level up"). Every element has intentional glow and geometric precision.

**Differentiation:** Befikr channels anime energy meets money mindset — vibrant, energetic, unapologetically bold. Glowing shadows, glitch text effects, neon color blocking, and spacious breathing room create a premium Gen Z streetwear experience that stands apart.

## Palette

| Token | OKLCH | Hex | Purpose |
|-------|-------|-----|---------|
| `background` | 0.05 0 0 | #000000 | Pure black base, anime backdrop |
| `foreground` | 0.98 0.01 275 | #FEFFFE | Off-white, crisp text |
| `primary` | 0.82 0.22 110 | #CCFF00 | Neon lime, energetic CTAs |
| `secondary` | 0.62 0.26 349 | #FF006B | Electric pink, alt actions |
| `accent` | 0.65 0.22 210 | #00D9FF | Cyan, highlights & badges |
| `muted` | 0.15 0.01 0 | #1A1A1A | Deep charcoal, subtle UI |
| `destructive` | 0.55 0.26 20 | #FF5733 | Warning state, anime-style red |
| `border` | 0.12 0.01 0 | #0D0D0D | Minimal borders, dark theme |

## Typography

| Role | Font | Size | Weight | Line-Height | Usage |
|------|------|------|--------|-------------|-------|
| Display | Bricolage Grotesque | 2.5–4rem | 700 | 1.1 | Hero, headlines, money taglines |
| Body | DM Sans | 1rem | 400–500 | 1.6 | Body text, descriptions |
| Label | DM Sans | 0.875rem | 600 | 1.5 | Badges, labels, meta |

## Structural Zones

| Zone | Treatment | Rationale |
|------|-----------|-----------|
| Hero | 100vh, black bg, lime gradient text, glitch animation, centered Bricolage headline + tagline | Dramatic, full-height anime entry with glowing effect |
| Navbar | Sticky, black with minimal cyan/lime border-b, glowing navbar text on hover | Anchors navigation, neon accent guides eye |
| Product Grid | 3–4 cols desktop, 2 tablet, 1 mobile. Cards: dark (L=0.08) bg, lime border-t accent, hover glow-lime shadow | Clean grid with neon accents, breathing room |
| CTA Buttons | Lime bg (primary), black text, rounded-md, glow-lime shadow, hover: pulse-glow animation | Energetic, impossible-to-miss action buttons |
| Footer | Black bg (L=0.05), off-white text, cyan accent dividers, glowing social icons | Grounds page, neon accents reinforce brand |

## Component Patterns

- **Buttons**: Lime bg with primary text, rounded-md, box-shadow glow-lime on default. Hover: pulse-glow animation + scale 1.05x. Transition: transition-glow 0.4s.
- **Product Cards**: Dark card bg, lime border-t (2px), image full-bleed, pink price badge, lime accent borders. Hover: glow-lime shadow, scale 1.02x.
- **Badge/Pills**: Pink bg with black text for category, lime for "new", cyan for highlights. Glow effect on hover.
- **Inputs**: Input bg (L=0.1), lime ring on focus. Text: off-white. Placeholder: muted-foreground.
- **Hover States**: Scale 1.02–1.05x + shadow glow (lime/cyan/pink per context). Transition: 0.3s cubic-bezier.

## Motion & Animation

- **Hero Glitch**: Text animates with 2–3px offset shifts on page load (glitch animation 0.4s).
- **Pulse-Glow**: Buttons pulse with lime glow on hover (2s infinite), energetic but smooth.
- **Bounce-Neon**: Subtle 8px bounce on interactive elements (1s infinite), anime-style energy.
- **Glow Shadows**: All interactive elements cast colored shadows (lime/pink/cyan) on hover. Smooth 0.4s transition.
- **Fade-in & Slide-up**: Cards enter with fade + 12px slide-up (0.6s staggered per section).
- **Scroll Behavior**: Smooth scrolling, no parallax distraction. Animations trigger on scroll entry.

## Accessibility & Contrast

- Lime on black: WCAG AAA (L diff 0.77, C diff 0.21).
- Pink on black: WCAG AAA (L diff 0.57, C diff 0.25).
- Cyan on black: WCAG AAA (L diff 0.6, C diff 0.21).
- Off-white on black: WCAG AAA (L diff 0.93).
- All buttons maintain min 44px touch target with adequate padding.

## Signature Detail

**Glow is the UI language.** Every interactive element radiates neon energy via glowing shadows, glitch micro-interactions, and smooth animations. The anime-inspired aesthetic meets premium Gen Z money mindset — bold, energetic, unapologetically stylish.

