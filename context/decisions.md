# Decisions

This file is a running log of meaningful **implementation** decisions made while building Tech4Bharat 2026 — the kind of choice where multiple valid approaches existed and someone had to pick one. It does not duplicate `architecture.md`, `ui-tokens.md`, `ui-rules.md`, or `code-standards.md`, and it does not replace `tbd.md`. Those files remain authoritative for requirements, architecture, design, and unresolved product decisions.

**Log an entry here for things like:** a significant architectural change made mid-implementation, a meaningful third-party dependency choice (see `library-docs.md`'s own documentation rule for the dependency itself — log here if the *decision* was non-obvious), a choice that affects multiple parts of the codebase, or a call made to resolve an ambiguity that came up during coding.

**Do not log here:** routine coding choices with only one reasonable approach, anything already decided in another context file, or a new product/requirements decision — those belong in `tbd.md` (once confirmed) or the file that owns that kind of decision.

If a decision resolves an item in `tbd.md`, update `tbd.md` as part of the same change. If a decision changes something `architecture.md` describes, update `architecture.md` as part of the same change. This file records that the decision happened; it doesn't substitute for updating the file that owns it.

## Format

```
## DEC-XXX — [Decision title]
**Status:** Accepted | Superseded | Reverted
**Date:** YYYY-MM-DD
**Owner:** [person/agent]

**Decision:**
What was decided.

**Reason:**
Why this approach was chosen over the alternatives.

**Impact:**
What parts of the project are affected.
```

---

## Log

### DEC-001 — Tailwind v4 CSS-first theming, next/font wiring, and shadcn integration strategy
**Status:** Accepted
**Date:** 2026-09-06
**Owner:** Implementation agent (Phase 0 — Foundation)

**Decision:**
Four related calls made while writing `app/globals.css`/`app/layout.tsx` and running `shadcn init`/`shadcn add`:

1. **Tailwind v4 is CSS-first.** `ui-tokens.md`'s `tailwind.config.ts` excerpt was adapted into an `@theme inline` block in `app/globals.css` instead — no `tailwind.config.ts` file exists in this project. Every `--color-*`/`--radius-*`/`--font-*` theme key references the runtime `:root` variable (e.g. `--color-primary: hsl(var(--primary))`) rather than duplicating its value, and `ui-tokens.md`'s `space-*` scale was **not** given named Tailwind utilities — its values (4px/8px/12px/16px/24px/32px/48px/64px/96px) are exact matches for Tailwind's default numeric spacing scale (`p-1`/`p-2`/`p-3`/`p-4`/`p-6`/`p-8`/`p-12`/`p-16`/`p-24`), so the built-in utilities already are the token scale.
2. **Font variables are indirected, not literal.** `ui-tokens.md`'s `:root` block defines `--font-display`/`--font-body`/`--font-mono` as literal font-name fallback stacks (e.g. `'Sora', ui-sans-serif, ...`). Since Sora/Inter/JetBrains Mono are actually loaded via `next/font/google` in `app/layout.tsx` (for self-hosting/optimization, per the task), those three next/font instances were given their own variable names (`--font-sora`/`--font-inter`/`--font-jetbrains-mono`) applied to `<html>`, and `globals.css`'s `--font-display`/`--font-body`/`--font-mono` reference those via `var()` ahead of the same fallback stack, e.g. `--font-display: var(--font-sora), ui-sans-serif, system-ui, sans-serif;`. This was necessary — letting next/font define `--font-display` directly would collide with `:root`'s same-named declaration at equal CSS specificity, with the winner dependent on injection order rather than anything explicit.
3. **shadcn's own theme slots are aliased onto our tokens, not replaced.** `npx shadcn@latest init` (CLI v4.21, Next.js 16 / Tailwind v4) required picking a `--base` (chose `radix`, for its mature accessible-primitive behavior — focus trap, ARIA listbox/dialog patterns — over the newer `base`/`aria` options) and a `--preset` (chose `nova`, which only sets a default icon library — Lucide — and default font pairing, both of which are fully overridden by this project's own tokens/fonts). The CLI's generated components (`Select`, `Checkbox`, `Dialog`, `Card`, etc.) internally reference shadcn's conventional `--card`/`--popover`/`--secondary`/`--muted`/`--accent`/`--destructive`/`--input`/`--ring` slots, which `ui-tokens.md` has no equivalent names for. Rather than leave those unthemed (shadcn's own oklch defaults) or rewrite every internal Radix wiring path by hand, a second `@theme inline` block aliases each shadcn slot onto the nearest `ui-tokens.md` token (e.g. `--color-accent: hsl(var(--surface-tertiary))`, `--color-destructive: hsl(var(--error))`) — see `app/globals.css`. No new visual value was introduced; every alias resolves to an existing token. Primitive files were still restyled directly with the project's own token utility classes (`bg-surface-secondary`, `text-text-primary`, etc.) per `build-plan.md` Phase 1's "customize each immediately with token classes" instruction — the aliases exist as a safety net for internal Radix state classes (`aria-invalid:border-destructive`-style rules), not as the primary styling mechanism.
4. **`shadcn init`'s scaffolded light/dark theme was discarded, not merged.** The CLI's first run overwrote `globals.css`/`layout.tsx` with its own oklch light-mode `:root` block, a `.dark` class override, and a stray Geist font import (all appended after/around the hand-authored tokens, clobbering several of them in place — e.g. `--background`, `--primary`, `--border` were redefined mid-file with oklch values). This was fully reverted: the project ships **only** the single dark-navy palette from `ui-tokens.md`, with no `.dark` class, no `@custom-variant dark`, and no light-mode fallback, per `ui-tokens.md`/`ui-rules.md`'s explicit dark-mode-only design and `build-plan.md` Phase 0 Task 8. `tw-animate-css` and the `shadcn/tailwind.css` package import were kept — they supply the `data-open`/`data-closed`/`data-checked` custom variants and animation keyframes several Nova-preset Radix components (Select, Dialog, Sheet) use for open/close transitions, and are inert until a component's className actually references them.

**Reason:**
Each of these is a real fork in a legitimate direction with no single "obvious" answer, and future agents running `shadcn add <component>` again will hit the same CLI prompts/merge behavior — recording the reasoning here (rather than rediscovering it, or re-merging shadcn's scaffolded defaults back in) keeps the token system as the single source of truth per `ui-tokens.md` Invariant 11.

**Impact:**
`app/globals.css`, `app/layout.tsx`, `components.json`, and every file under `components/ui/`. Any future `shadcn add` for a new primitive should be expected to re-scaffold unthemed oklch tokens for slots it needs (`--chart-*`, `--sidebar-*`, etc.) — only add an alias for a slot an actually-used component references, following the same pattern as #3 above, rather than re-importing shadcn's full default palette.

---

### DEC-002 — Added `--error-hover`/`--error-active` tokens
**Status:** Accepted
**Date:** 2026-09-06
**Owner:** Implementation agent (Phase 1 — Button primitive)

**Decision:**
`ui-tokens.md` didn't define hover/active values for `error`, but `ui-rules.md`'s Buttons section requires a Destructive-variant hover/active treatment ("darken by one step (same relationship as `primary`→`primary-hover`)"). Rather than hardcode a one-off darkened value inside `components/ui/button.tsx`, `--error-hover: 356 72% 47%` and `--error-active: 356 72% 41%` were added to `ui-tokens.md`'s and `globals.css`'s token definitions, using the exact same lightness-delta pattern already established for `primary`/`primary-hover`/`primary-active` (-7%, -6%) and `ember`/`ember-hover` (-7%). `ui-tokens.md`'s Buttons row was updated to reference the new token names instead of the prose "darken 8%" description.

**Reason:**
`ui-tokens.md` Invariant 11 requires adding a needed value to the token system first rather than hardcoding it locally; extending an already-established formula (rather than picking a new arbitrary darkening amount) keeps the semantic-color family internally consistent with how `primary`/`ember` already scale.

**Impact:**
`context/ui-tokens.md`, `app/globals.css`, `components/ui/button.tsx` (Destructive variant).
