---
name: Tech4Bharat 2026
description: "India's Biggest Hackathon" — a dark indigo-navy platform with one saffron-orange accent, carrying the promotional poster's ignition/warmth feeling without reproducing its gradient.
colors:
  background: "hsl(224 42% 6%)"
  surface: "hsl(224 38% 9%)"
  surface-secondary: "hsl(224 32% 13%)"
  surface-tertiary: "hsl(224 28% 17%)"
  surface-muted: "hsl(224 20% 11%)"
  border: "hsl(224 20% 20%)"
  border-light: "hsl(224 16% 26%)"
  border-muted: "hsl(224 14% 15%)"
  border-focus: "hsl(28 90% 58%)"
  text-primary: "hsl(210 20% 98%)"
  text-secondary: "hsl(216 16% 74%)"
  text-muted: "hsl(216 12% 52%)"
  text-inverse: "hsl(224 42% 8%)"
  primary: "hsl(28 88% 54%)"
  primary-hover: "hsl(28 88% 47%)"
  primary-active: "hsl(28 86% 41%)"
  primary-light: "hsl(28 90% 82%)"
  primary-muted: "hsl(28 35% 20%)"
  primary-foreground: "hsl(224 42% 8%)"
  ember: "hsl(14 82% 56%)"
  ember-hover: "hsl(14 82% 49%)"
  ember-foreground: "hsl(210 20% 98%)"
  success: "hsl(152 55% 45%)"
  success-foreground: "hsl(210 20% 98%)"
  success-light: "hsl(152 45% 16%)"
  warning: "hsl(45 93% 58%)"
  warning-foreground: "hsl(224 42% 8%)"
  warning-light: "hsl(45 70% 18%)"
  error: "hsl(356 72% 54%)"
  error-hover: "hsl(356 72% 47%)"
  error-active: "hsl(356 72% 41%)"
  error-foreground: "hsl(210 20% 98%)"
  error-light: "hsl(356 55% 18%)"
  info: "hsl(205 85% 58%)"
  info-foreground: "hsl(210 20% 98%)"
  info-light: "hsl(205 60% 18%)"
typography:
  display:
    fontFamily: "Sora, ui-sans-serif, system-ui, sans-serif"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1.25rem"
  full: "9999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  6: "1.5rem"
  8: "2rem"
  12: "3rem"
  16: "4rem"
  24: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
  button-secondary:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-secondary-hover:
    backgroundColor: "{colors.surface-tertiary}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error-foreground}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-destructive-hover:
    backgroundColor: "{colors.error-hover}"
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1rem"
  badge-default:
    backgroundColor: "{colors.surface-tertiary}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.5rem"
  badge-live:
    backgroundColor: "{colors.primary-muted}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.5rem"
  card-standard:
    backgroundColor: "{colors.surface-secondary}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
---

# Design System: Tech4Bharat 2026

## Overview

**Creative North Star: "Ignition, ascent, warmth rising out of depth"** — quoted directly from `context/ui-tokens.md`'s own Design Direction section, not a name coined for this file.

This is a dark indigo-navy platform, not a pure-black one — the navy tint is deliberate, chosen specifically to avoid reading as "generic dark-mode SaaS" while still matching the promotional poster's base tone. Against that canvas, a single saturated saffron-orange (`primary`) is the one accent that means "act here" — reserved for CTAs, key numbers, and active states — with a secondary ember-red (`ember`) reserved for "this is happening now" (live/urgent signals only, never a default color and never a badge variant of its own). The system explicitly rejects gradients as a base surface treatment: the only approved gradient anywhere in the product is a single radial ignition glow confined to the homepage hero, and even that section is not yet built. Indian national identity is carried through color temperature and typographic confidence — warmth against deep navy — not through tricolor stripes, rangoli motifs, or literal map/globe illustration; the source docs are explicit that this would read as costume rather than identity. Hierarchy throughout comes from scale, weight, and surface layering rather than decoration; functional pages (forms, tables, long-form text) are written to stay legible and calm rather than spectacular.

The specified system also names two things it deliberately is **not**: it should not read as "a hackathon poster turned into a website," and it should not read as "a purple AI SaaS template." Restraint and warmth carry the identity, not ornamentation.

**Key Characteristics:**
- One dark canvas (`background`/`surface*`), one accent that prompts action (`primary`), one accent that signals urgency (`ember`) — never both at full saturation in the same region.
- Flat, layered surfaces and hairline 1px borders instead of shadows or gradients as the default hierarchy mechanism.
- A geometric display face (Sora) for headings and stat numbers, a workhorse body face (Inter) for everything else, and a monospace face (JetBrains Mono) reserved for IDs/timestamps.
- Dark-mode-only, with no light-mode variant defined anywhere in the token system — see **Known Discrepancies** below for this decision's actual approval status.

## Colors

Restrained by design: one saturated brand hue (saffron), one urgency hue (ember), four separate semantic hues, and a navy-tinted neutral scale doing most of the work through layering depth rather than color variety.

### Primary
- **Saffron / Primary** (`hsl(28 88% 54%)`): the single accent that means "act here" — primary CTA buttons, active nav item, key stat/prize numbers, active and completed timeline milestones. Only one of `primary`/`ember` may dominate a given screen region.
- **Primary Hover** (`hsl(28 88% 47%)`) / **Primary Active** (`hsl(28 86% 41%)`): step-down states, same hue, decreasing lightness.
- **Primary Light** (`hsl(28 90% 82%)`) and **Primary Muted** (`hsl(28 35% 20%)`): lighter/darker-desaturated companions — `primary-muted` currently backs the Badge "Live/Event" variant and the Table selected-row treatment specified in `ui-rules.md` (not yet built).
- **Primary Foreground** (`hsl(224 42% 8%)`): the dark navy text color used on top of saffron fills.

### Secondary
- **Ember** (`hsl(14 82% 56%)`): the one "this is happening now" hue — reserved for live/urgent signals (a countdown, a live badge) used directly, not as a Badge variant of its own. Never a default UI color; never present without a genuine live/urgent meaning.
- **Ember Hover** (`hsl(14 82% 49%)`) and **Ember Foreground** (`hsl(210 20% 98%)`) round out its state.

### Neutral
- **Background** (`hsl(224 42% 6%)`): the root page fill, always.
- **Surface** (`hsl(224 38% 9%)`): first layer above background — page sections, nav bar.
- **Surface Secondary** (`hsl(224 32% 13%)`): cards and panels sitting on `surface`.
- **Surface Tertiary** (`hsl(224 28% 17%)`): nested elements inside cards, and the hover fill for Secondary/Ghost buttons and Select items.
- **Surface Muted** (`hsl(224 20% 11%)`): disabled areas, skeleton loaders, placeholder blocks.
- **Border** (`hsl(224 20% 20%)`) / **Border Light** (`hsl(224 16% 26%)`) / **Border Muted** (`hsl(224 14% 15%)`): default, emphasis (hover/selected), and low-contrast dividers respectively.
- **Border Focus** (`hsl(28 90% 58%)`): the one color every keyboard-focus state uses.
- **Text Primary** (`hsl(210 20% 98%)`) / **Text Secondary** (`hsl(216 16% 74%)`) / **Text Muted** (`hsl(216 12% 52%)`) / **Text Inverse** (`hsl(224 42% 8%)`): a four-step reading hierarchy. `text-inverse` is declared for text over `primary`/`ember`/light fills — as of this writing no shipped primitive actually consumes it (Button's Primary variant uses the separate but numerically identical `primary-foreground` token instead).

### Semantic
Four hues kept strictly separate from `primary`/`ember` so a status can never be mistaken for a brand accent: **Success** (`hsl(152 55% 45%)`), **Warning** (`hsl(45 93% 58%)`), **Error** (`hsl(356 72% 54%)`), **Info** (`hsl(205 85% 58%)`) — each paired with a `-light` background variant (16–18% lightness) for status cards/banners and a `-foreground` for text on the solid fill. `warning` is the specific token for any "pending organizer confirmation" state; it must never stand in for `error`, and `error` must never be represented by `ember`.

### Named Rules
**The One Accent Rule.** `primary` and `ember` are never both used as dominant, full-saturation colors in the same region of a screen — using both recreates the poster's gradient collision this system deliberately rejects.
**The Semantic Separation Rule.** `success`/`warning`/`error`/`info` are never borrowed for brand emphasis, and `primary`/`ember` are never repurposed to mean a status.

## Typography

**Display Font:** Sora (with `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Inter (with `ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** JetBrains Mono (with `ui-monospace, SFMono-Regular, monospace`)

**Character:** A geometric, structurally weighted display face paired with a plain, highly legible workhorse body face — display type carries ambition and scale (headlines, stat/prize numbers), body type carries density and calm readability everywhere else. Hierarchy comes from weight, color, and spacing more than from size jumps; only the homepage hero is allowed to be genuinely large and expressive.

### Hierarchy
- **Hero display heading** (600, 3.5rem → 4.5rem mobile/desktop, 1.05 line-height, -0.02em tracking, `text-primary`): the one place the type scale is allowed to be large — homepage only.
- **Page heading (h1)** (600, 2.25rem, 1.15 line-height, `text-primary`): the page's single top-level heading, non-homepage.
- **Section heading (h2)** (600, 1.5rem, 1.2 line-height, `text-primary`).
- **Subsection heading (h3)** (600, 1.125rem, 1.3 line-height, `text-primary`).
- **Body** (400, 1rem, 1.65 line-height, `text-primary`): the reading baseline.
- **Secondary text** (400, 0.9375rem, 1.55 line-height, `text-secondary`).
- **Labels** (600, 0.75rem, 0.08em tracking, uppercase, `text-muted`): eyebrow/section labels.
- **Navigation** (500, 0.875rem, `text-secondary`, `primary` when active).
- **Buttons** (600, 0.9375rem, `primary-foreground` on Primary / `text-primary` on other variants).
- **Timestamps** (400, 0.8125rem, `font-mono`, `text-muted`): deliberately quiet, never at heading size.
- **Stat / prize numbers** (700, 2rem card / 2.75rem hero, `font-display`, `primary`): the one legitimate pairing of heavy display weight with the accent color, reserved for numbers representing scale or achievement.
- **Table headers** (600, 0.75rem, 0.06em tracking, uppercase, `text-muted`).
- **Form labels** (500, 0.875rem, `text-primary`) / **Form help text** (400, 0.8125rem, `text-muted`) / **Error text** (500, 0.8125rem, `error`).

### Named Rules
**The One Heavy Pairing Rule.** Heavy display weight (700) paired with the accent color is reserved exclusively for stat/prize numbers — no other element combines that weight and that color.

## Layout

Every route renders inside a root wrapper filled with `background`; full-bleed sections (hero, prizes band, closing CTA — none built yet) fill edge-to-edge, everything else sits inside a centered container capped at `content-max-width` (72rem) or, for the hero/bookend bands specifically, `hero-max-width` (90rem). Two content-column widths are specified for internal alignment: `content-column-narrow` (42rem, long-form reading/forms) and `content-column-wide` (60rem, timeline/prize-grid/table content) — neither is consumed by any shipped page yet, since no page-level composition exists in this pass.

Horizontal page padding and section spacing scale responsively (`space-4`→`space-8` padding, `space-12`→`space-16`–`24` between sections) across four breakpoints: mobile (<640px), tablet (640–1024px), desktop (1024–1440px), large desktop (>1440px). Card grids are specified as 1/2/3 columns across those same steps with a constant `grid-gap` (`space-6`). None of this responsive behavior has a shipped page to verify against yet — only the Primitive Component layer (Button, Input, Card, etc.) exists so far, and primitives themselves are documented as not changing structurally across breakpoints.

The `space-*` scale (`space-1` = 0.25rem through `space-24` = 6rem, see frontmatter) is specified in `ui-tokens.md` as a named scale, but does not exist as CSS custom properties anywhere in the codebase — every value in it is numerically identical to Tailwind's own default spacing scale (`p-4` already equals 1rem, `p-6` already equals 1.5rem, etc.), so the shipped implementation consumes Tailwind's built-in utilities directly rather than materializing a parallel set of named tokens. This is a recorded implementation decision (`context/decisions.md` DEC-001), not an omission.

## Elevation & Depth

Flat by default. Cards and static surfaces carry no shadow at all — depth comes entirely from the layered surface scale (`background` → `surface` → `surface-secondary` → `surface-tertiary`) and hairline borders, not from box-shadow. Exactly one shadow value exists in the system, and it is reserved for things that are literally floating above the page.

### Shadow Vocabulary
- **Elevation** (`box-shadow: 0 8px 24px hsl(224 60% 2% / 0.45)`): the only shadow in the system — modals, dropdowns, and popovers exclusively. Shipped on Dialog and Select's popover content; specified for Sheet (Drawer) as well.
- **Glow Primary** (`box-shadow: 0 0 32px hsl(28 88% 54% / 0.35)`): reserved for active/live states — currently shipped on the Card "Featured" variant's border only (the 1st-place prize card, once a Prize Card composed component exists); specified for the active Timeline milestone and "live" badges, neither built yet.
- **Glow Ember** (`box-shadow: 0 0 24px hsl(14 82% 56% / 0.30)`): same active/live role as Glow Primary, for ember-toned contexts; not yet consumed by any shipped component.
- **Focus Ring** (`box-shadow: 0 0 0 3px hsl(28 90% 58% / 0.45)`): a distinct token from the two glows above, applied via the shared `.focus-ring` utility class on every interactive primitive's `:focus-visible` state.

### Named Rules
**The Floating-Only Shadow Rule.** Dark UIs communicate elevation through layered surface tokens, not shadow; `shadow-elevation` is reserved for things that are literally floating above the page — never a static card, never a page section.
**The Glow-Means-Live Rule.** `glow-primary`/`glow-ember` are reserved for active, live, or focused states only; using either as decoration on an element at rest is a misuse of the token.

## Shapes

A five-step radius scale, used consistently by role rather than by component: `radius-sm` (0.25rem) is not currently consumed by any shipped primitive; `radius-md` (0.5rem) is the shell radius for every form control (Input, Textarea, Select, Checkbox corner) and every Button; `radius-lg` (0.75rem) is the shell radius for Card, Dialog, and Select's popover content; `radius-xl` (1.25rem) is declared but not yet consumed by any shipped primitive; `radius-full` (9999px) is used for Badge and the Checkbox/Radio circular controls. Borders are uniformly 1px (`border`/`border-light`/`border-muted`, chosen by emphasis) with no heavier border weight anywhere in the system.

## Components

### Buttons
- **Shape:** `radius-md` (0.5rem), padding `0.75rem 1.5rem` (`space-3` vertical / `space-6` horizontal).
- **Primary:** `primary` background, `primary-foreground` text. Hover → `primary-hover`; active → `primary-active`.
- **Secondary:** `surface-secondary` background, `text-primary` text, 1px `border`. Hover → background `surface-tertiary`; active → border `border-light`.
- **Ghost:** transparent background, `text-secondary` text. Hover → background `surface-secondary`, text → `text-primary`; active → background `surface-tertiary`.
- **Destructive:** `error` background, `error-foreground` text. Hover → `error-hover`; active → `error-active`. Reserved for genuinely destructive actions, never a routine "cancel."
- **Disabled:** 40% opacity, `cursor-not-allowed`, hover suppressed, `aria-disabled` set alongside the native `disabled` attribute.
- **Focus:** the shared `.focus-ring` treatment (`border-focus` + the Focus Ring shadow) on every variant.
- **Loading:** label replaced entirely by the Spinner (`primary-foreground` on Primary, inherited `currentColor` on other variants via the icon's default stroke), button holds its resting width — the label stays in the DOM at `opacity-0` (not `visibility:hidden`/`display:none`) so its layout footprint is preserved and its accessible name is not removed, while the spinner is centered over it via an absolutely positioned overlay. `aria-busy="true"` is set on the button for the duration.

### Chips
Not part of the specified system — no chip/tag component exists in `ui-tokens.md`/`ui-registry.md`, and none is built.

### Cards / Containers
Five specified variants, all shipped:
- **Standard:** `surface-secondary` background, 1px `border`, `radius-lg`, `space-6` (1.5rem) padding, no hover, no accent.
- **Interactive:** identical to Standard, plus a border-color shift to `border-light` on hover — no shadow, no scale/transform.
- **Featured:** `surface-secondary` background, `primary` border, `radius-lg`, `space-6` padding, plus the Glow Primary shadow on the border — reserved specifically for the 1st-place prize card, not a general "emphasis" toggle.
- **Informational:** identical to Standard but with `space-4` (1rem) compact padding.
- **Status:** a semantic `-light` background paired with the matching semantic base-color border (`space-4` padding) — e.g. `warning`-bordered/`warning-light`-filled for a pending state. The border is deliberately full-saturation while the fill is muted; this is the specified contrast, not two mismatched tokens.

### Inputs / Fields
- **Input / Textarea:** `surface` background, 1px `border`, `radius-md`, `space-3` vertical / `space-4` horizontal padding, `text-primary` value text, `text-muted` placeholder. Textarea adds vertical-only resize.
- **Select:** the identical shell, plus a `text-muted` chevron icon; its popover content uses `surface-secondary` + `border` + the Elevation shadow, matching the Dialog/Modal treatment for floating surfaces.
- **Checkbox / Radio:** `surface` fill + `border` when unchecked; `primary` fill with the check/dot rendered in `primary-foreground` when checked.
- **Focus:** border shifts to `border-focus`, plus the Focus Ring shadow — identical pattern across every field type.
- **Error:** border switches to `error` (driven by `aria-invalid` in the shipped components); the paired helper-text color switch is a Form Field responsibility, and no Form Field composed component exists yet.
- **Disabled:** `surface-muted` background, `text-muted` value text, no focus state available (enforced by the native `disabled` attribute rather than a CSS override).

### Badges
Six specified variants, all shipped: **Default** (`surface-tertiary`/`text-secondary`), **Success** (`success-light`/`success`), **Warning** (`warning-light`/`warning`), **Error** (`error-light`/`error`), **Informational** (`info-light`/`info`), **Live/Event** (`primary-muted`/`primary`). `radius-full`, `space-2` (0.5rem) horizontal padding, uppercase label typography. A badge is never the sole means of conveying status in the specified system — it must be paired with adjacent text or an icon at the call site; the primitive itself does not enforce this.

### Dialog (Modal)
Centered, page-blocking overlay: `surface-secondary` background, `radius-lg`, the Elevation shadow, and the `overlay` scrim behind it. Full dialog ARIA pattern, focus trap, `Escape`-to-close, and focus return are supplied by Radix. Built ahead of any concrete consuming flow, at explicit request — see `context/ui-registry.md`'s note on this component.

### Drawer (Sheet)
Slide-in overlay panel from a screen edge, for the eventual Mobile Navigation Drawer: `surface` background (not `surface-secondary`), the `overlay` scrim, focus trap / `Escape` / focus-return via Radix. The specified system only names a side-emerging drawer; the shipped `Sheet` component's `top`/`bottom` slide directions are unused capability, not a contradiction.

### Separator
A single 1px `border-muted` line, horizontal or vertical, decorative (`aria-hidden`) by default.

## Do's and Don'ts

Pulled directly from `context/ui-rules.md`'s Do Nots and Invariants — not reinterpreted.

### Do:
- **Do** trace every color used in a component to a token defined above — no raw hex/rgb anywhere in component code.
- **Do** give every interactive element a visible `:focus-visible` state using the shared `.focus-ring` treatment.
- **Do** pair every badge/status indicator with an icon and/or text label — color alone never communicates state.
- **Do** keep public-route and any future participant/admin-route components importing from the same `components/ui` primitives — one component library, never a forked one.
- **Do** use the Featured Card treatment (border + Glow Primary) exclusively for the 1st-place prize card once Prize Card exists — not as a general emphasis toggle.

### Don't:
- **Don't** use arbitrary Tailwind colors (e.g. `bg-orange-500`) or introduce a gradient outside the single approved hero ignition glow (not yet built).
- **Don't** use `glow-primary`/`glow-ember`/`shadow-elevation` as decoration — glow means active/live/focused, and elevation means literally floating (modal/dropdown/popover), never a static card or section.
- **Don't** use `warning` to represent an actual error, or `ember` to mean "error."
- **Don't** let `primary` and `ember` both appear as dominant, full-saturation colors in the same screen region.
- **Don't** use tricolor stripes, rangoli patterns, or literal map/globe illustration as UI chrome to express Indian identity — warmth and typographic confidence carry that, per the source docs.
- **Don't** use continuous/looping animation or bounce/elastic easing anywhere in the product.
- **Don't** set `outline: none` on any interactive element without the `.focus-ring` box-shadow replacement.

## Known Discrepancies

These are gaps between what `context/ui-tokens.md`/`ui-rules.md`/`ui-registry.md` specify and what is actually shipped in `components/ui/`. Per instruction, they're recorded here rather than resolved in either direction. (Button's loading-state mismatch, previously listed here, was fixed after this file was first written — see the Buttons entry in Components above; it's no longer a discrepancy.)

1. **Font tokens resolve differently in code than in the locked file.** `ui-tokens.md`'s `:root` block specifies `--font-display: 'Sora', ui-sans-serif, system-ui, sans-serif;` as a literal string (and the equivalent for `--font-body`/`--font-mono`). The shipped `app/globals.css` instead resolves these through `var(--font-sora)` / `var(--font-inter)` / `var(--font-jetbrains-mono)` — CSS variables generated by `next/font/google` in `app/layout.tsx` — ahead of the same fallback stack. This is a deliberate, already-documented deviation (`context/decisions.md` DEC-001, for real font self-hosting rather than relying on a system-installed font), but it is a literal value mismatch if the two files are diffed directly.
2. **The `space-*` token scale doesn't exist as CSS.** `ui-tokens.md`'s Spacing table names `space-1` through `space-24` as if they were tokens in the same family as the color/radius scale, but no `--space-*` custom property is defined anywhere — in `ui-tokens.md`'s own "Complete Token Definition" code block or in the shipped `globals.css`. The values are consumed only because they happen to numerically match Tailwind's built-in default spacing scale (documented as `context/decisions.md` DEC-001).
3. **The prescribed Tailwind integration mechanism isn't what's built.** `ui-tokens.md`'s "How to Use" section shows a `tailwind.config.ts` file with a `theme.extend` block as the way tokens become Tailwind utilities. The project has no `tailwind.config.ts` at all — it uses Tailwind v4's CSS-first `@theme inline` block inside `app/globals.css` instead (`context/decisions.md` DEC-001). The resulting utility classes (`bg-primary`, `text-text-primary`, etc.) are the same; the file that produces them is not.
4. **Dark-mode-only ships as settled; the source docs say it isn't.** The shipped product has no light-mode variant and no theme toggle at all. But `context/tbd.md` explicitly lists dark-mode-only under "Design Decisions" with **Status: requires approval — not yet a confirmed decision**, flagging specifically that data-entry-heavy admin/dashboard screens are sometimes preferred in light mode by stakeholders. This file describes the single palette as the working system because that's what's built and specified in `ui-tokens.md`'s token values — not because the underlying product decision has actually been signed off.
