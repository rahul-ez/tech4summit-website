# Tech4Bharat 2026 — Design System

Source: official GAVS/Tech4Bharat poster (poster.jpeg). This document is the single source of truth for visual style — do not introduce new colors, fonts, or effects without updating this file first.

## Brand context
- Hosted by RV College of Engineering (RVCE)
- An initiative of Karnataka Arya Vysya Mahasabha (KAVMS)
- Associated with Global Accelerator Vision Summit (GAVS) 2026
- Platform Partner: HackCulture

## Color palette

### Gradient (reserved for high-impact sections only — see Layout Principle)
Diagonal gradient, top-left to bottom-right:
- `#0A1440` (navy) → `#5A2450` (magenta, ~40%) → `#8A2A3E` (deep red, ~65%) → `#FF7A3D` (orange, 100%)
- CSS: `linear-gradient(160deg, #0A1440 0%, #5A2450 40%, #8A2A3E 65%, #FF7A3D 100%)`

### Flat / site-wide colors
| Token | Hex | Use |
|---|---|---|
| Navy (base) | `#0A1440` | Default page background |
| Deep navy | `#050B1E` | Footer, high-contrast sections |
| Gold (primary accent) | `#E8B84B` | CTAs, stat numbers, labels, card borders |
| Bright gold | `#F2D77E` | Large headline text on gradient |
| Red (secondary accent) | `#E8384F` | Badges, tags, hover states, highlight cards |
| Orange (tertiary accent) | `#FF7A3D` | Glow accents, the "4" in Tech4Bharat |
| White | `#FFFFFF` | Primary text on dark backgrounds |
| Muted slate | `#A9B4CC` | Secondary/supporting text |

### Usage rules
- Gradient is reserved for: **Hero**, **Prizes**, and the **closing CTA/footer band**. Do not use it behind long-form text (Rules, FAQ) — readability first.
- Everywhere else: flat navy `#0A1440` background with gold/red as accent colors only.
- Text on colored fills always uses the darkest shade from that same color family (e.g. dark navy text on a gold button), never plain black.

## Typography
| Role | Font | Notes |
|---|---|---|
| Display headlines (hero titles, major section titles) | Anton or Bebas Neue | Uppercase, letter-spacing 1–2px |
| Sub-headlines (page titles, the "Tech4Bharat" wordmark) | Poppins ExtraBold / Montserrat Black | |
| Body text | Inter | Regular (400) / Medium (500) only |
| Eyebrow labels ("PRIZE MONEY", "REGISTRATIONS OPEN") | Same as body | Uppercase, letter-spacing 2–3px, 10–11px size |

Load all fonts via Google Fonts.

## Signature elements
- **Thin gold hairline border** (0.5–1px, `#E8B84B`) around cards — this is the primary recurring motif site-wide (a deliberate, simpler substitute for the poster's globe illustration, which is hero-only and not reused elsewhere).
- Card backgrounds: translucent dark navy/maroon (~40–50% opacity) when placed over the gradient; solid navy when placed over flat sections.
- Corner radius: 6–8px on cards, 4–6px on buttons.
- **Brand quirk:** the "4" in "Tech4Bharat" is always rendered in orange/gold (`#FF7A3D` or `#E8B84B`) wherever the wordmark appears — logo, nav, footer, page titles.

## Components
- **Primary button:** gold fill, dark navy text
- **Secondary button:** transparent, gold or slate border
- **Stat / prize cards:** gold-bordered, navy or translucent background, gold number + white/slate label
- **Section eyebrow:** gold, uppercase, letter-spaced

## Layout principle
The page should "bookend" — dramatic gradient moments at the start (Hero) and at key beats (Prizes, closing CTA), with a calm, readable flat-navy workhorse background carrying everything in between (About, Timeline, Rules, FAQ, Partners). Gold-bordered cards are the connective visual thread throughout.
