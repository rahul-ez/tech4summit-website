# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Hackathon participants** — the primary audience: student developers and innovators, individually or as part of student teams, registering for and competing in Tech4Bharat 2026. Assume general web/mobile familiarity, not specialized technical skill for using the site itself.
- **Visitors** — general public or prospective participants seeking information about the event without necessarily registering.
- **Hackathon organizers/admins** — manage event content, registrations, and (conditionally, if built) submissions and announcements.

A mentor/judge user group is explicitly out of scope for now — it's conditional per `context/tbd.md` and not yet confirmed as a portal the site will build. Don't design or document it as a settled audience until that decision is made.

## Product Purpose

The website for Tech4Bharat 2026 — a national hackathon associated with the Global Accelerator Vision Summit (GAVS) 2026 — is the primary digital experience for participants and visitors. It centralizes hackathon discovery and information (theme, dates, format, prizes) and, depending on finalized organizer requirements, registration, team management, and project submission. It exists to replace ad-hoc promotional material (the event poster) with a maintained digital source of truth. Success means a visitor understands what the hackathon is and how it relates to GAVS 2026 within one visit, confirmed facts are unambiguous, and unconfirmed facts are presented as pending rather than invented.

## Positioning

Positioned as "India's Biggest Hackathon," under the theme "Scalable Innovations for Next-Gen India" — encouraging participants to build practical, scalable technology solutions for real-world Indian challenges. It runs as online preliminary rounds followed by an on-site grand finale, distinguishing it from a purely online or purely local event. This is the Tech4Bharat 2026 hackathon's own site specifically — not a GAVS-wide site — while remaining visually and conceptually connected to GAVS.

## Operating Context

- Registration opens 7 September 2026; the main event runs 25–27 December 2026 in Bengaluru, India.
- Format: online preliminaries, on-site grand finale.
- Platform partner: HackCulture (name confirmed; whether it's branding-only or the system of record for registration/teams/submissions is unconfirmed — see `context/tbd.md`).
- Host institution shown in promotional material: RV College of Engineering.
- Total prize pool ₹6,00,000 across three tiers (₹3,00,000 / ₹2,00,000 / ₹1,00,000).
- The project already carries an extensive, actively maintained `context/` documentation set (`project-overview.md`, `tbd.md`, `architecture.md`, `ui-tokens.md`, `ui-rules.md`, `ui-registry.md`, `code-standards.md`, `library-docs.md`, `build-plan.md`, `progress-tracker.md`, `decisions.md`) that is the team's established source of truth for scope, architecture, and design. Any future work on this codebase should read those files before making changes — they're a durable operating fact of this project, not just prior session output.

## Capabilities and Constraints

**Confirmed and buildable now:** the public informational site (home, about, timeline, prizes, rules structure, FAQ) and a registration entry point, per `context/build-plan.md`'s phased approach.

**Explicitly unconfirmed — do not invent, do not hardcode as settled fact** (tracked in `context/tbd.md`, which is the authoritative record and should be updated first if any of these is ever resolved):
- Registration closing date, eligibility criteria, and the exact registration workflow (account-first vs. public-form-first)
- Team structure (solo/team/both), team size, composition, and formation process
- Challenge/problem statement content and tracks
- Judging criteria and preliminary-round structure
- Submission requirements, format, and deadline
- The exact grand-finale venue (promotional material says "Palace Grounds, Bengaluru"; only city-level location is confirmed for implementation)
- Participant communication method (email vs. in-app vs. other)
- HackCulture's exact role (branding-only vs. system of record vs. hybrid) — flagged in `tbd.md` as the single highest-impact open decision
- Whether a custom admin system is built at all, vs. relying on HackCulture's tooling or manual Supabase-dashboard editing
- Authentication method (email/password vs. OTP vs. both)

**Technical stack** (already established in the codebase, see `context/architecture.md`): Next.js (App Router), TypeScript strict, Tailwind CSS, shadcn/ui, Supabase (DB/auth/storage), Vercel, GitHub.

**Visual design system:** already fully specified and locked in `context/ui-tokens.md`, `context/ui-rules.md`, and `context/ui-registry.md` (dark indigo-navy canvas, saffron-orange primary accent, ember-red secondary accent, Sora/Inter/JetBrains Mono type system). This is treated as settled, not a decision for future design work to reopen — new UI work documents against it (`/impeccable document`) rather than replacing it. The dark-mode-only choice is itself flagged in `tbd.md` as still awaiting explicit stakeholder sign-off, but the token values themselves are the working system.

**Accessibility:** no specific standard (e.g. a WCAG conformance level) or institutional mandate has been confirmed. `context/code-standards.md`'s general accessibility practices (semantic HTML, keyboard operability, focus visibility, color-independent state) apply as the working baseline.

## Brand Commitments

- Name: Tech4Bharat 2026.
- Positioning line: "India's Biggest Hackathon."
- Theme: "Scalable Innovations for Next-Gen India."
- Associated summit: Global Accelerator Vision Summit (GAVS) 2026 — connected but distinct; this site is not a GAVS-wide site.
- Platform partner name: HackCulture (role beyond the name is unconfirmed).
- Host institution named in promotional material: RV College of Engineering.

## Evidence on Hand

`poster.jpeg` (repo root) is the only real brand asset that exists — the event's promotional poster. It's a visual/brand reference, not a literal UI specification (per `ui-tokens.md`'s own explicit note). No other logo files, real testimonials, case studies, press mentions, or photos exist. Future work must not fabricate any of these.

## Product Principles

1. Build and ship what's confirmed; represent what isn't as pending, never as invented fact — this is the project's own standing rule across every context file, not just a design preference.
2. The public informational site must work correctly and completely with zero backend and zero unresolved decisions before any conditional feature (team, submission, admin) is attempted.
3. Confirmed event facts live in one configuration source, never duplicated as hardcoded strings across pages or components.
4. Participant/admin functionality is never duplicated ahead of HackCulture's integration role being confirmed.
5. The site must read as a serious, premium event platform — not a reproduction of the promotional poster's spectacle, and not a generic dark-mode SaaS template.
