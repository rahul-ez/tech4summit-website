# UI Registry

This file is the catalogue of reusable UI building blocks for the Tech4Bharat 2026 website. It does not define visual values — that's `ui-tokens.md`. It does not define how those values are composed — that's `ui-rules.md`. It records *what reusable components and patterns exist, what they're for, where they're used, and what status they're in*, so a coding agent reuses an existing component before building a near-duplicate, and a developer can tell at a glance whether a new component is actually justified.

---

## Registry Rules

- Reuse an existing component before creating a new one.
- Do not create visually identical components under different names.
- A new component must have a clear, statable reuse boundary — not just "it looked convenient here."
- Components must use existing design tokens (`ui-tokens.md`) — no local values.
- Components must follow `ui-rules.md`'s composition rules.
- Components must preserve the accessibility requirements defined in `ui-rules.md`.
- Do not create a component to solve a one-off layout problem unless the pattern is genuinely reused elsewhere.
- Do not register speculative participant/admin components before the corresponding product decision is confirmed in `tbd.md`.
- Do not create separate public/participant/admin versions of the same visual primitive — one `Button`, not `PublicButton` and `AdminButton`.
- When a component changes materially, update its registry entry.
- When a component is removed, mark it Removed rather than deleting its entry — history matters for future agents.

---

## Component Status

- **Planned** — conceptually justified by the context files, not yet implemented.
- **Active** — implemented and available for reuse.
- **Conditional** — only applicable if a specific `tbd.md` decision becomes confirmed.
- **Deprecated** — implemented, but should no longer be used for new work.
- **Removed** — no longer exists in the implementation.

The Phase 0/1 primitive pass (see `progress-tracker.md`) implemented every Primitive Component below except Textarea/Select/Checkbox/Radio's underlying HTML-native alternative was not pursued — Select/Checkbox/Radio use Radix for full ARIA-listbox/checkbox/radiogroup compliance instead. Composed Components, Page-Level Patterns, and Conditional Components remain Planned/Conditional — only the Primitive layer is Active as of this writing.

---

## Primitive Components

### Button
- **Status:** Active — `components/ui/button.tsx`
- **Purpose:** The single interactive-action element across the entire product.
- **Use when:** Any clickable action — navigation CTAs, form submission, destructive confirmations.
- **Do not use when:** A plain navigational link with no button semantics is more appropriate (e.g. inline text links) — those are not registered separately here because none are currently justified by a confirmed page pattern.
- **Variants:** Primary, Secondary, Ghost, Destructive (per `ui-rules.md` Buttons section).
- **States:** default, hover, active, disabled, loading, focus-visible.
- **Key token dependencies:** `primary`/`primary-hover`/`primary-active`, `surface-secondary`, `border`, `error`, `radius-md`, button typography row, `focus-ring`.
- **Accessibility requirements:** real `<button>` element, visible `:focus-visible` state, loading state does not remove accessible name, disabled state uses `aria-disabled` in addition to visual treatment.
- **Notes:** No fifth variant exists yet; do not add "link" or "tertiary" variants speculatively.

### Input
- **Status:** Active — `components/ui/input.tsx`
- **Purpose:** Single-line text entry.
- **Use when:** Any short text/number/email field in a form.
- **Do not use when:** Multi-line entry is needed (use Textarea).
- **Variants:** none beyond type (`text`, `email`, `tel`, etc. — HTML attribute, not a visual variant).
- **States:** default, focus, error, disabled.
- **Key token dependencies:** `surface`, `border`/`border-focus`, `radius-md`, `text-primary`/`text-muted` (placeholder), `error`.
- **Accessibility requirements:** always paired with a programmatically associated `<label>`; error state linked via `aria-describedby`.
- **Notes:** Registered as a primitive because forms are already a confirmed part of the product surface (registration entry point). No specific fields are assumed by this registration.

### Textarea
- **Status:** Active — `components/ui/textarea.tsx`
- **Purpose:** Multi-line text entry.
- **Use when:** Longer free-text input is needed.
- **Do not use when:** A single line suffices (use Input).
- **Variants:** none.
- **States:** same as Input.
- **Key token dependencies:** same as Input.
- **Accessibility requirements:** same as Input.
- **Notes:** Vertical resize only, per `ui-rules.md`.

### Select
- **Status:** Active — `components/ui/select.tsx` (Radix `Select`, native `<select>` semantics aren't achievable with a styled listbox)
- **Purpose:** Single choice from a defined set of options.
- **Use when:** A form field needs a constrained set of choices.
- **Do not use when:** More than a handful of mutually exclusive short options exist (consider Radio instead) or multiple selections are needed (not yet a registered primitive — not currently justified).
- **Variants:** none.
- **States:** same as Input, plus open/closed.
- **Key token dependencies:** same shell as Input, `text-muted` chevron.
- **Accessibility requirements:** native `<select>` semantics preferred where possible; if a custom listbox is used, full keyboard and ARIA listbox pattern is required.
- **Notes:** No confirmed field currently requires this, but it's a standard form primitive and reasonably anticipated by any registration form.

### Checkbox
- **Status:** Active — `components/ui/checkbox.tsx` (Radix `Checkbox`)
- **Purpose:** Binary/multi-select toggle within a form.
- **Use when:** A yes/no or multi-select-from-a-list input is needed.
- **Variants:** none.
- **States:** unchecked, checked, disabled, focus.
- **Key token dependencies:** `surface`/`border` (unchecked), `primary`/`primary-foreground` (checked).
- **Accessibility requirements:** native `<input type="checkbox">` or a fully ARIA-compliant custom equivalent; always has an associated label.

### Radio
- **Status:** Active — `components/ui/radio-group.tsx` (Radix `RadioGroup`)
- **Purpose:** Single choice among a small visible set of options.
- **Use when:** A short, mutually exclusive option set should be fully visible rather than hidden in a Select.
- **Variants:** none.
- **States:** same as Checkbox.
- **Key token dependencies:** same as Checkbox.
- **Accessibility requirements:** grouped under a `<fieldset>`/`<legend>` or equivalent ARIA radiogroup pattern.

### Badge
- **Status:** Active — `components/ui/badge.tsx`
- **Purpose:** Small inline status/label indicator.
- **Use when:** Communicating a discrete state (pending, live, draft, success, error) inline with other content.
- **Do not use when:** The message needs more than a couple of words or an action — use Status/Notification Banner instead.
- **Variants:** Default, Success, Warning, Error, Informational, Live/Event (per `ui-rules.md` Badges section — the semantic mapping there is authoritative and must not be reinterpreted per-use).
- **States:** static (badges don't have interactive states).
- **Key token dependencies:** `surface-tertiary`, `success`/`warning`/`error`/`info` + their `-light` variants, `primary`/`primary-muted`.
- **Accessibility requirements:** never the sole means of conveying status — always paired with adjacent text or an icon per `ui-rules.md`.
- **Notes:** This is the component most at risk of semantic drift — see `ui-rules.md`'s explicit warning-vs-error distinction before adding any new usage.

### Card
- **Status:** Active — `components/ui/card.tsx`
- **Purpose:** The base surface container for grouped content.
- **Use when:** Any bounded content block — prize display, FAQ container, empty states, informational groupings.
- **Variants:** Standard, Interactive, Featured, Informational, Status (per `ui-rules.md` Cards table).
- **States:** default, hover (Interactive variant only).
- **Key token dependencies:** `surface-secondary`, `border`/`border-light`, `radius-lg`, `space-4`/`space-6`, `glow-primary` (Featured only).
- **Accessibility requirements:** if interactive, must be a real `<button>`/`<a>` or have full keyboard/ARIA support — a `<div>` with an onClick is not acceptable.
- **Notes:** Featured variant's glow is reserved specifically for the 1st-place prize card per `ui-rules.md` — not a general-purpose "emphasis" toggle.

### Drawer
- **Status:** Active — `components/ui/sheet.tsx` (shadcn/Radix "Sheet"; this is the Drawer primitive registered here)
- **Purpose:** Slide-in overlay panel from a screen edge.
- **Use when:** Mobile navigation menu.
- **Do not use when:** A centered, page-blocking confirmation is needed — use Dialog/Modal instead.
- **Variants:** none beyond direction (currently only used from the side, per Mobile Navigation Drawer below).
- **States:** open, closed, transitioning.
- **Key token dependencies:** `surface`, `overlay`.
- **Accessibility requirements:** focus trapped while open, closes on `Escape`, focus returns to the trigger on close.

### Spinner / Loading Indicator
- **Status:** Active — `components/ui/spinner.tsx`, consumed by Button's `loading` prop
- **Purpose:** Communicates an in-progress async action.
- **Use when:** Button loading state, form submission in progress.
- **Do not use when:** A full-page loading treatment is implied — none is currently justified by any confirmed flow.
- **Variants:** none (a single static, non-decorative spin).
- **States:** visible/hidden.
- **Key token dependencies:** `primary-foreground` (on Primary buttons) or `text-muted` (standalone).
- **Accessibility requirements:** `aria-live="polite"` announcement of the loading/complete transition where it affects form state.

### Separator
- **Status:** Active — `components/ui/separator.tsx`
- **Purpose:** A visual divider between grouped content.
- **Use when:** FAQ item dividers, table row borders, nav/content section boundaries.
- **Key token dependencies:** `border-muted` (primary use), `border` (higher-emphasis contexts).
- **Accessibility requirements:** decorative only — `aria-hidden="true"` unless it carries actual semantic meaning (rare).
- **Notes:** This is a lightweight style primitive, not a complex component — registered because it's reused across several composed components (FAQ, Table) rather than being redefined per-use.

### Dialog / Modal
- **Status:** Active — `components/ui/dialog.tsx`
- **Purpose:** A centered, page-blocking overlay for a focused task or confirmation.
- **Use when:** A future flow requires interrupting the user for a decision (e.g. a destructive confirmation once a delete-capable feature exists).
- **Do not use when:** The task doesn't need to block the rest of the page — prefer inline states or a Banner.
- **Key token dependencies:** `shadow-elevation`, `overlay`, `surface-secondary`, `radius-lg`.
- **Accessibility requirements:** full dialog ARIA pattern (`role="dialog"`, `aria-modal`, focus trap, `Escape` to close, focus return on close).
- **Notes:** Implemented in the Phase 0/1 primitive pass at explicit request rather than waiting for a concrete consuming flow; no page currently renders it. The next agent adding a real usage should not need to touch this file beyond this status line.

### Focus Treatment
- **Status:** Active — `.focus-ring` utility class in `app/globals.css`
- **Purpose:** Not a rendered component — the shared focus-visibility style (`border-focus` + `focus-ring`) applied uniformly across every interactive primitive above.
- **Notes:** Documented here so it isn't reinvented per-component. Implemented as a shared utility class/style, not a React component.

---

## Composed Components

### Site Header
- **Status:** Planned
- **Purpose:** The persistent public navigation bar.
- **Use when:** Every public page.
- **Composition:** wordmark + Button (nav CTA) + nav links, collapsing to a drawer trigger on mobile.
- **Variants:** none — one Site Header for the whole public site.
- **States:** default, scrolled (if sticky-shadow behavior is added later — not currently specified), mobile-collapsed.
- **Responsive behavior:** full horizontal nav ≥1024px; collapses to a drawer trigger below that, per `ui-rules.md` Navigation section.
- **Accessibility requirements:** `<nav>` landmark, `aria-current="page"` on the active item.
- **Token/rule dependencies:** `header-height`, `surface`, `border`, nav typography, `primary` (active item/CTA).
- **Relevant routes:** all public routes (`/`, `/about`, `/challenges`, `/timeline`, `/prizes`, `/rules`, `/faq`, `/register`).

### Mobile Navigation Drawer
- **Status:** Planned
- **Purpose:** Mobile-collapsed nav menu.
- **Composition:** Drawer primitive + stacked nav links + Button (CTA).
- **Responsive behavior:** only rendered below the 1024px breakpoint.
- **Accessibility requirements:** see Drawer primitive.
- **Token/rule dependencies:** `overlay`, `surface`, `space-4`.
- **Relevant routes:** all public routes.

### Page Header
- **Status:** Planned
- **Purpose:** The standard non-hero page introduction (eyebrow + heading + supporting text).
- **Use when:** Every page except the homepage.
- **Do not use when:** The homepage — that uses Hero instead.
- **Composition:** eyebrow label + page heading + supporting paragraph, left-aligned.
- **Variants:** none — deliberately one consistent pattern across all pages.
- **Responsive behavior:** no structural change; width caps to `content-column-narrow` at all sizes.
- **Accessibility requirements:** the heading here is the page's single `<h1>`.
- **Token/rule dependencies:** label typography, page-heading typography, `text-secondary`, `space-8` to first content section.
- **Relevant routes:** `/about`, `/challenges`, `/timeline`, `/prizes`, `/rules`, `/faq`, `/register`.

### Hero
- **Status:** Planned
- **Purpose:** The homepage's single high-impact introduction.
- **Use when:** Homepage only.
- **Do not use when:** Any other page — see `ui-rules.md`'s hard limit on hero composition leaking elsewhere.
- **Composition:** eyebrow + hero heading + supporting text + primary/secondary CTA (Buttons), over the ignition-glow + circuit-texture background.
- **Responsive behavior:** headline steps down at smaller breakpoints, CTAs stack full-width on mobile, per `ui-rules.md`.
- **Accessibility requirements:** contains the site's single `<h1>` on the homepage; entrance animation respects `prefers-reduced-motion`.
- **Token/rule dependencies:** `hero-max-width`, hero typography, `glow-primary`/`glow-ember`, circuit texture, `overlay` (if imagery is ever added).
- **Relevant routes:** `/` only.

### FAQ Item / FAQ Accordion
- **Status:** Planned
- **Purpose:** A single expandable question/answer row, composed into a full FAQ list.
- **Composition:** clickable question row + chevron + expandable answer region.
- **States:** collapsed, expanded, hover, focus.
- **Responsive behavior:** no structural change across breakpoints.
- **Accessibility requirements:** `aria-expanded` on the trigger, answer region associated via `aria-controls`.
- **Token/rule dependencies:** `border-muted` divider, question/answer typography, `surface-secondary` (expanded/hover), `focus-ring`.
- **Relevant routes:** `/faq`.

### Timeline
- **Status:** Planned
- **Purpose:** Displays the confirmed hackathon milestones in sequence.
- **Composition:** repeated milestone nodes (dot + label + optional date) connected by a line.
- **Variants:** vertical (mobile), horizontal (desktop) — same component, responsive layout, not two components.
- **States per milestone:** upcoming, active, completed, pending-date (uses a `warning` badge for unconfirmed dates — never a fabricated date).
- **Responsive behavior:** vertical layout on mobile/tablet, horizontal on desktop given the current small (three) milestone count, per `ui-rules.md`.
- **Accessibility requirements:** milestone state communicated via icon + text, not color alone.
- **Token/rule dependencies:** `primary`, `primary-muted`, `border-muted`, `glow-primary`, `warning`.
- **Relevant routes:** `/timeline`, and a condensed version inside the Hero stat strip if that pattern is used (see Page-Level Patterns).

### Prize Card
- **Status:** Planned
- **Purpose:** Displays a single prize tier.
- **Composition:** Card (Featured variant for 1st place, Standard for 2nd/3rd) + rank label + stat-number amount.
- **Variants:** First-place (Featured), Standard (2nd/3rd place and any future confirmed tier).
- **Responsive behavior:** stacks to 1 column on mobile, up to 3 in a row on desktop, per the standard grid rules.
- **Accessibility requirements:** rank communicated in text, not position/color alone.
- **Token/rule dependencies:** Card tokens, stat-number typography, `primary` (1st place only), `glow-primary` (1st place only).
- **Relevant routes:** `/prizes`, and the Prizes bookend section on `/`.

### Prize Display
- **Status:** Planned
- **Purpose:** The full prize section — total pool statement plus the set of Prize Cards.
- **Composition:** total-pool stat number + grid of Prize Cards.
- **Token/rule dependencies:** see Prize Card; total pool uses the largest stat-number treatment.
- **Relevant routes:** `/prizes` (full), `/` (bookend section, per `site-structure.md`).
- **Notes:** Only the three confirmed prize tiers and the confirmed total are ever rendered — see Page-Level Patterns below.

### Empty State
- **Status:** Planned
- **Purpose:** Communicates "no data exists yet" for a genuinely empty (not pending, not unpublished) content area.
- **Composition:** centered icon + `text-muted` message inside a `surface-muted` card.
- **Variants:** the four distinct patterns defined in `ui-rules.md` (no data / unpublished-to-admin / pending confirmation / participant-has-no-records) are **not** the same component — see Pending Confirmation State below and the Conditional Components section for the participant-specific variant.
- **Token/rule dependencies:** `surface-muted`, `border-muted`, `text-muted`.
- **Relevant routes:** any route with organizer-populated content (e.g. `/challenges`, `/faq` before content exists).

### Pending Confirmation State
- **Status:** Planned
- **Purpose:** Communicates "this information isn't finalized yet" without looking broken — the standard treatment for any `tbd.md` Not Confirmed item.
- **Composition:** dashed `border-muted` Card + `warning` Badge + short heading + one sentence of neutral context.
- **Do not use when:** Content is genuinely empty with no pending decision behind it — use Empty State instead.
- **Token/rule dependencies:** `warning`/`warning-light`, `surface-muted`, `border-muted`.
- **Relevant routes:** `/challenges`, `/rules` (for unconfirmed detail sections), `/timeline` (for unconfirmed milestone dates), any route surfacing a `tbd.md` item.

### Form Field
- **Status:** Planned
- **Purpose:** The reusable label + input/textarea/select + helper/error-text unit.
- **Composition:** Form label + one of (Input/Textarea/Select/Checkbox/Radio) + helper or error text.
- **States:** default, focus, error, disabled.
- **Token/rule dependencies:** form-label typography, form-help-text typography, `error`.
- **Relevant routes:** `/register` and any future form-bearing page.
- **Notes:** This component defines the visual shell only. It does not define or imply which fields exist on any given form — that remains a product decision.

### Form Section
- **Status:** Planned
- **Purpose:** Groups related Form Fields with consistent spacing inside a form Card.
- **Composition:** Card (form container) + stacked Form Fields + submit Button.
- **Token/rule dependencies:** `content-column-narrow`, `space-4`/`space-6`.
- **Relevant routes:** `/register`.

### Status / Notification Banner
- **Status:** Planned
- **Purpose:** An inline, non-blocking message communicating success, error, warning, or informational state at a section/page level (distinct from a Badge, which is inline with other content).
- **Use when:** Form submission success/failure, page-level notices.
- **Composition:** icon + short message on a semantic `-light` background.
- **Token/rule dependencies:** `success`/`warning`/`error`/`info` + their `-light` variants.
- **Accessibility requirements:** `role="alert"` (error) or `aria-live="polite"` (success/info) as appropriate.
- **Relevant routes:** `/register` (confirmed use — the Forms success state in `ui-rules.md`); other routes only once a concrete need exists.

### Table
- **Status:** Planned
- **Purpose:** Structured tabular data display for future participant/admin interfaces.
- **Composition:** header row + data rows, responsive collapse per `ui-rules.md` (stacked cards ≤5 columns, horizontal scroll for dense data).
- **Token/rule dependencies:** `surface-secondary` (header), `border-muted` (row dividers), `primary-muted` (selected row).
- **Accessibility requirements:** semantic `<table>`/`<thead>`/`<tbody>`, scoped headers.
- **Relevant routes:** none currently confirmed — this is registered because `architecture.md` and `ui-rules.md` both anticipate it for the conditional participant/admin surfaces; see Conditional Components.

### Table Empty State
- **Status:** Planned
- **Purpose:** The Empty State pattern specifically inside a Table context (e.g. "No registrations yet").
- **Composition:** Empty State rendered inside the table body region instead of rows.
- **Relevant routes:** same as Table — conditional on those surfaces being built.

---

## Page-Level Patterns

Patterns describe reusable *composition*, not confirmed content. Product-specific content (actual copy, actual dates, actual fields) is never defined by this file.

### Public Information Page
**Reusable composition:** Page Header → main content sections (using Cards, grids, or narrow-column prose as appropriate) → no mandatory closing treatment beyond the site's Footer (not yet a separately registered component — currently just contains standard nav-adjacent content, no distinct interactive pattern beyond links).
**Product-specific:** which sections exist and what they say is defined by `site-structure.md`/`project-overview.md`, not here.
**Applies to:** `/about`, `/challenges`, `/rules`, `/faq`.

### Public Registration Page
**Reusable composition:** Page Header → Form Section (Card containing Form Fields + submit Button) → Status/Notification Banner on submit.
**Product-specific — explicitly NOT defined here:** which fields the form contains, whether account creation happens before or after, and what happens post-submission. These remain unresolved per `tbd.md`'s Registration decision entry. This registry documents only the visual shell described above.
**Applies to:** `/register`.

### Pending Information Section
**Reusable composition:** the Pending Confirmation State component, placed wherever a page would otherwise show organizer-supplied content that doesn't exist yet.
**Product-specific:** the specific sentence of context shown is written per-instance but must stay factual and neutral (e.g. "Challenge tracks will be published once confirmed"), never inventing example content.
**Applies to:** any page surfacing a `tbd.md` Not Confirmed item.

### Timeline Section
**Reusable composition:** section using Page Header (on `/timeline`) or a lighter inline heading (in the `/` bookend context) followed by the Timeline component.
**Product-specific:** only the two confirmed milestones (registration opens, event dates) currently have real dates; any additional milestone node renders via the Timeline's pending-date state, not an invented date.
**Applies to:** `/timeline`, `/` (as a bookend section if the site's structure calls for it — see `site-structure.md`).

### Prize Section
**Reusable composition:** Prize Display component as defined above.
**Product-specific:** exactly three confirmed prize tiers plus the confirmed total. No additional prize category (track prizes, special mentions) is rendered unless and until confirmed in `tbd.md` — at which point it uses the existing Standard Prize Card variant, not a new component.
**Applies to:** `/prizes`, `/` (bookend section).

---

## Conditional Components

These are structurally anticipated by `architecture.md` but depend on decisions that are Not Confirmed in `tbd.md`. They are not designed or implemented here — only tracked so they aren't silently duplicated or prematurely built.

| Component | Why it's conditional | Decision it depends on | Current status | What must be confirmed first |
|---|---|---|---|---|
| Team components (team creation/invite/member list) | Team-based participation itself is unconfirmed | "Team Structure" decision in `tbd.md` | Conditional | Whether teams exist at all, and size/composition rules |
| Participant dashboard components (status overview, nav) | Dashboard is explicitly conditional in `project-overview.md` | "Participant Experience" decision in `tbd.md` | Conditional | Whether a dashboard is required at all |
| Submission components (upload form, status display) | Submission format/ownership is unconfirmed | "Submission" decision in `tbd.md` | Conditional | Submission format and team-vs-individual ownership |
| Upload component (file/link submission input) | Depends entirely on confirmed submission format | "Submission" decision in `tbd.md` | Conditional | What's actually being submitted (repo link vs. file vs. video, etc.) |
| Admin data-management components (registration/challenge/announcement management views) | Admin system's existence depends on the HackCulture integration model | "Admin" and "HackCulture Integration" decisions in `tbd.md` | Conditional | Whether a custom admin system is built at all, vs. relying on HackCulture's tooling |
| Authentication-specific UI (OTP entry, password fields) | Auth method is unconfirmed | "Authentication" decision in `tbd.md` | Conditional | Email/password vs. OTP vs. both |
| Participant status panels (registration status, team status) | Depends on both registration ownership and team-model decisions | "Registration" and "Team Structure" decisions in `tbd.md` | Conditional | Both underlying decisions |

None of these should be implemented, designed in detail, or given placeholder content before the corresponding `tbd.md` item moves to Confirmed.

---

## Component Naming Rules

Names describe **what the component represents and its reusable responsibility** — never its page-specific location.

**Good:** `PageHeader`, `PrizeCard`, `Timeline`, `PendingState`, `FormField`, `StatusBanner`
**Avoid:** `HomeOrangeCard`, `AboutSection2`, `RegisterBox`, `SpecialPrizeThing`, `PublicButton`/`AdminButton` (see Registry Rules — one `Button`, not per-area variants)

A page-specific name is acceptable only when the component is genuinely not intended for reuse anywhere else (e.g. `Hero` is intentionally homepage-only, but is still named for what it *is*, not where it lives — not `HomePageTopSection`).

---

## Composition Rules

- Pages compose Page-Level Patterns.
- Page-Level Patterns compose Composed Components.
- Composed Components compose Primitive Components.
- Primitives consume design tokens directly.
- No layer bypasses the one below it — a page must not reach past a Composed Component to hardcode Primitive-level styling.
- Page-specific styling never creates a parallel design system — if a page needs something the tokens/rules don't support, that's a `ui-tokens.md`/`ui-rules.md` change, not a local override.
- Reuse happens at the lowest appropriate abstraction level — don't build a new Composed Component when a Primitive plus existing layout rules already solves the problem.
- Avoid excessive abstraction: two components that happen to look similar are not automatically the same component. `Card` (Status variant) and `Pending Confirmation State` look related but represent different concepts (a general status surface vs. a specific "awaiting organizer confirmation" message) and are registered separately for that reason.
- Visual consistency does not require forcing unrelated use cases into one component — a shared look achieved through shared tokens is sufficient; it does not require a shared component.

---

## Accessibility Registry

Component-level implications of `ui-rules.md`'s accessibility rules (see that file for the full requirements):

- **Keyboard interaction:** every Primitive above (Button, Input, Select, Checkbox, Radio, Drawer, Dialog) must be fully operable via keyboard alone; Composed Components inherit this by construction if they're built from these primitives rather than custom markup.
- **Focus-visible:** every interactive Primitive uses the shared Focus Treatment — no component defines its own focus style.
- **Semantic HTML:** Composed Components must use real landmark/structural elements (`<nav>` for Site Header, `<table>` for Table, `<form>` for Form Section) rather than generic `<div>` trees.
- **Labels:** every Form Field pairs its input with a real `<label>` — enforced at the Form Field level, not left to each page.
- **ARIA use:** limited to where native semantics fall short (`aria-expanded` on FAQ Item, `aria-current` on Site Header's active link, dialog/drawer patterns) — not applied by default to every component.
- **Status communication:** Badge, Status/Notification Banner, and Timeline milestone states all pair color with icon and/or text — this is a hard requirement on those three components specifically, since they're the components most likely to be color-only if built carelessly.
- **Reduced motion:** Hero's entrance animation, FAQ Item's expand transition, and Mobile Navigation Drawer's open/close transition must all respect `prefers-reduced-motion`.
- **Minimum interactive target:** Mobile Navigation Drawer items and any touch-oriented control use at least a 44px tap target on mobile, per `ui-rules.md`.

---

## Responsive Registry

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Site Header | Drawer trigger | Drawer trigger | Full horizontal nav |
| Mobile Navigation Drawer | Full-height panel | Full-height panel | Not rendered |
| Hero | Smallest heading step, stacked CTAs | Mid heading step | Full heading step, side-by-side CTAs |
| Page Header | No structural change | No structural change | No structural change |
| Prize Card / Prize Display | 1-column grid | 2-column grid | Up to 3-column grid |
| Timeline | Vertical | Vertical | Horizontal (current 3-milestone count) |
| Form Field / Form Section | Full-width, single column | Single column | Single column, capped width |
| Table | Stacked cards or horizontal scroll (per column count) | Same rule | Full table |
| FAQ Item | No structural change | No structural change | No structural change |

Components not listed here (Button, Input, Badge, Card, Separator, Spinner, Dialog) do not change structurally across breakpoints — sizing follows the standard responsive spacing/typography scale from `ui-tokens.md`, but no layout logic differs.

---

## Token Dependencies

Every component's token dependencies fall into these categories — the actual values live in `ui-tokens.md`, not here:

- **Color** — surface, border, text, brand accent, and semantic tokens.
- **Typography** — font family, size, weight, and color pairing per element type.
- **Spacing** — the `space-*` scale for padding, gaps, and margins.
- **Radius** — the `radius-*` scale for corner treatment.
- **Border** — width and color tokens for dividers and outlines.
- **Effects** — glow, shadow, and overlay tokens, used only where `ui-rules.md` explicitly authorizes them for that component.
- **Responsive tokens** — breakpoint-driven behavior, referenced from `ui-tokens.md`'s Responsive Tokens and `ui-rules.md`'s Responsive Behavior section.

A component's registry entry lists *which* categories it depends on; it never restates the actual values.

---

## Component Decision Checklist

Before creating a new reusable component, ask:

1. Does an existing component already solve this?
2. Is the new pattern genuinely reused, or is this a one-off?
3. Can an existing component support it through an existing variant/state instead?
4. Does creating it introduce a duplicate abstraction (see Composition Rules)?
5. Is the component allowed by `tbd.md` — or does it silently assume a decision that's still Not Confirmed?
6. Does it follow `ui-rules.md`'s composition rules?
7. Does it use existing tokens only, with no new values?
8. Does it need to be added to this registry?

---

## Registry Maintenance

**When implementing a new reusable component:**
1. Check this registry first.
2. Reuse an existing component if it fits.
3. If a new component is genuinely required, implement it according to `ui-tokens.md` and `ui-rules.md`.
4. Add it to this registry with its purpose, states, variants, dependencies, and accessibility requirements.

**When changing an existing component:** update its registry entry if its behavior, variants, states, or responsibility materially changes.

**When removing a component:** update its status to Removed rather than deleting the entry.

**When a `tbd.md` decision becomes confirmed:** update `tbd.md` first, then update any other affected context file, and only then move the relevant Conditional Component entries here to Planned/Active as appropriate. Never resolve a TBD item by simply building or registering a component for it.

---

## Current Registry

| Component | Category | Status | Reusable responsibility | Routes/Areas |
|---|---|---|---|---|
| Button | Primitive | Active | Single interactive-action element | All routes |
| Input | Primitive | Active | Single-line text entry | `/register` |
| Textarea | Primitive | Active | Multi-line text entry | `/register` (if needed) |
| Select | Primitive | Active | Constrained-choice entry | `/register` (if needed) |
| Checkbox | Primitive | Active | Binary/multi-select entry | `/register` (if needed) |
| Radio | Primitive | Active | Single-choice entry | `/register` (if needed) |
| Badge | Primitive | Active | Inline status/label indicator | All routes |
| Card | Primitive | Active | Base bounded-content surface | All routes |
| Drawer | Primitive | Active | Slide-in overlay panel | Mobile nav |
| Spinner / Loading Indicator | Primitive | Active | In-progress async state | Buttons, forms |
| Separator | Primitive | Active | Visual divider | FAQ, Table |
| Dialog / Modal | Primitive | Active | Centered blocking overlay | None confirmed yet |
| Focus Treatment | Primitive (style) | Active | Shared focus-visibility style | All interactive elements |
| Site Header | Composed | Planned | Persistent public navigation | All public routes |
| Mobile Navigation Drawer | Composed | Planned | Mobile-collapsed nav | All public routes |
| Page Header | Composed | Planned | Standard non-hero page intro | All non-home routes |
| Hero | Composed | Planned | Homepage's single high-impact intro | `/` only |
| FAQ Item / FAQ Accordion | Composed | Planned | Expandable Q&A row | `/faq` |
| Timeline | Composed | Planned | Confirmed-milestone sequence display | `/timeline`, `/` |
| Prize Card | Composed | Planned | Single prize tier display | `/prizes`, `/` |
| Prize Display | Composed | Planned | Full prize section | `/prizes`, `/` |
| Empty State | Composed | Planned | "Genuinely no data" state | Content-bearing routes |
| Pending Confirmation State | Composed | Planned | "Awaiting organizer confirmation" state | Any route with `tbd.md` content |
| Form Field | Composed | Planned | Label + input + helper/error unit | `/register` |
| Form Section | Composed | Planned | Grouped Form Fields + submit | `/register` |
| Status / Notification Banner | Composed | Planned | Inline success/error/warning/info message | `/register` |
| Table | Composed | Planned | Structured tabular data display | Conditional (participant/admin) |
| Table Empty State | Composed | Planned | Empty Table body state | Conditional (participant/admin) |
| Public Information Page | Page Pattern | Planned | Header → content composition | `/about`, `/challenges`, `/rules`, `/faq` |
| Public Registration Page | Page Pattern | Planned | Header → form composition (shell only) | `/register` |
| Pending Information Section | Page Pattern | Planned | Reusable placement of Pending Confirmation State | Any route with `tbd.md` content |
| Timeline Section | Page Pattern | Planned | Reusable placement of Timeline | `/timeline`, `/` |
| Prize Section | Page Pattern | Planned | Reusable placement of Prize Display | `/prizes`, `/` |
| Team components | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Participant dashboard components | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Submission components | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Upload component | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Admin data-management components | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Authentication-specific UI | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Participant status panels | Conditional | Conditional | — (see Conditional Components) | Conditional |
