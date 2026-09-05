# TBD — Tech4Bharat

This file is the project's source of truth for unresolved decisions. It sits alongside `project-overview.md`, `architecture.md`, and `ui-tokens.md`. Coding agents must check this file before making an assumption that isn't already settled in one of those three files — if something here is marked "Not Confirmed" or "Pending," it must not be hardcoded, invented, or silently resolved in code.

---

## Confirmed

| Item | Decision / Fact | Source |
|---|---|---|
| Hackathon name | Tech4Bharat 2026 | project-overview.md |
| Theme | Scalable Innovations for Next-Gen India | project-overview.md |
| Positioning | India's Biggest Hackathon | project-overview.md |
| Associated summit | Global Accelerator Vision Summit (GAVS) 2026 | project-overview.md |
| Registration opens | 7 September 2026 | project-overview.md |
| Event dates | 25–27 December 2026 | project-overview.md |
| Location (city-level) | Bengaluru, India | project-overview.md |
| Format | Online preliminaries + on-site grand finale | project-overview.md |
| Platform partner (name only) | HackCulture | project-overview.md |
| Host institution shown in promo material | RV College of Engineering | project-overview.md |
| Prizes | ₹3,00,000 / ₹2,00,000 / ₹1,00,000 | project-overview.md |
| Total prize pool | ₹6,00,000 | project-overview.md |
| Tech stack | Next.js (App Router), TypeScript strict, Tailwind, shadcn/ui, Supabase (DB/auth/storage), Vercel, GitHub | architecture.md |
| Architectural layering | UI → components → server logic (`actions/`, `lib/`) → database; UI never touches the database directly | architecture.md |
| Design system foundation | Dark indigo-navy canvas, saffron-orange primary accent, ember-red secondary accent, hero-only gradient | ui-tokens.md |

---

## Not Confirmed

| Item | Current Status | Why It Matters |
|---|---|---|
| Registration closing date | Not confirmed | Needed for timeline UI, `hackathon_config`, and any countdown/urgency messaging |
| Eligibility criteria | Not confirmed | Gates who can register; affects registration form fields and validation |
| Team size (min/max) | Not confirmed | Determines whether `teams`/`team_members` tables and limits are built at all |
| Team composition rules | Not confirmed | E.g. cross-college teams allowed? Mixed skill requirements? Affects team UI |
| Team formation process | Not confirmed | Invite code vs. organizer-assigned vs. open matching — affects `/team` UX and `actions/team.ts` |
| Problem statements | Not confirmed | `/challenges` page currently has structure only, no real content |
| Challenge tracks | Not confirmed | Affects whether `challenges.track` is even a meaningful field |
| Judging criteria | Not confirmed | Needed for any judge-facing UI and for participant-facing transparency content |
| Preliminary-round details | Not confirmed beyond "online" | Format, duration, and structure of prelims are unknown |
| Submission requirements | Not confirmed | Repo link? Deck? Video? Live demo? Directly affects `submissions` schema and Storage bucket design |
| Submission deadline | Not confirmed | Needed for timeline UI and any submission-lock logic |
| Exact grand-finale venue | Not confirmed for implementation | Promotional material references "Palace Grounds, Bengaluru," but architecture.md explicitly treats this as unconfirmed — see Cross-File Issues |
| Travel/accommodation arrangements | Not mentioned in any context file | If finalists need logistics info, this is an entirely unaddressed content area |
| Certificates | Not mentioned in any context file | Common hackathon deliverable, currently absent from scope entirely — not even flagged as conditional |
| Additional prizes (beyond top 3) | Not confirmed | Poster/context only confirms 1st/2nd/3rd; anything else (track prizes, special mentions) is unconfirmed |
| Participant communications method | Not confirmed | Email (Resend)? In-app announcements only? SMS/WhatsApp? Affects Email/Notifications decision below |
| HackCulture's exact role | Not confirmed | Branding partner only, vs. system of record for registration/teams/submissions — the single highest-impact open question |

---

## Decisions Required

### Product
**Question:** Should the website launch as an informational-only site first, with registration/participant/admin features added later, or should everything be built together?
**Status:** Pending product decision
**Options:** (a) Phased — informational pages + basic registration entry first; (b) build the full conditional feature set (dashboard, team, submission, admin) before launch
**Recommendation:** Phase 1 = informational pages + registration entry point only. Registration opens 7 September 2026 — a near-term date — while most operational requirements (team, submission, admin) remain unconfirmed. architecture.md and site-structure.md are already designed to support this without restructuring later.
**Impact:** Determines what ships before the registration-open date and what the agent should prioritize first.

### Registration
**Question:** Does registering require creating an account first, or is the form public and account creation happens afterward (or not at all)?
**Status:** Pending organizer confirmation — depends on eligibility and team-model decisions, both unresolved
**Options:** (a) public form → account created on submit; (b) account-first, then complete registration
**Recommendation:** None — insufficient information to justify either option.
**Impact:** Determines auth-flow ordering and which fields `registrations` actually requires at launch.

### Team Structure
**Question:** Is participation solo-only, team-based, or does the organizer support both?
**Status:** Not confirmed
**Options:** solo only / team only / both
**Recommendation:** None — do not assume. This is explicitly called out as unconfirmed in project-overview.md.
**Impact:** Determines whether `teams`/`team_members` and the `/team` route are built in this phase at all.

### Participant Experience
**Question:** Is a participant dashboard required, or is registration confirmation + announcements (e.g. via email) sufficient?
**Status:** Pending organizer confirmation — marked conditional in project-overview.md
**Options:** (a) no dashboard, all communication via email/public announcements page; (b) full dashboard with team/submission status
**Recommendation:** None strongly justified yet, though the `(participant)` route group in architecture.md is designed to be added later without disruption if the answer is "yes."
**Impact:** Determines whether dashboard/team/submission routes are built in this phase.

### Submission
**Question:** What format do submissions take, and are they owned by an individual or a team?
**Status:** Not confirmed
**Options:** Genuinely open — repo link, deck, video, live demo, or some combination; ownership model likewise open
**Recommendation:** None.
**Impact:** Directly shapes the `submissions` schema (architecture.md currently leaves both `team_id` and `profile_id` nullable specifically because this isn't resolved) and whether/how the `submissions` Storage bucket is structured.

### Admin
**Question:** Does Tech4Bharat need a custom `/admin` panel, or will organizers manage the event through HackCulture's existing tooling, or directly via the Supabase dashboard?
**Status:** Pending organizer confirmation — tied directly to the HackCulture Integration decision below
**Options:** (a) build custom `/admin`; (b) rely on HackCulture's admin tooling; (c) manage directly via Supabase dashboard for a single event
**Recommendation:** Do not build `/admin` functionality until HackCulture's role is confirmed. Building it prematurely risks duplicating HackCulture functionality, which architecture.md explicitly forbids (Invariant 6).
**Impact:** Meaningful build effort; wrong guess here is expensive to unwind.

### Authentication
**Question:** What sign-in method should participants use?
**Status:** Pending decision — architecture.md deliberately left this generic
**Options:** Supabase email/password, Supabase OTP (email or phone), or both
**Recommendation:** OTP lowers signup friction for a broad student audience and is common for Indian hackathon platforms — a reasonable default given the target-user description in project-overview.md, but this is a recommendation, not a confirmed requirement.
**Impact:** Affects registration UX and the `middleware.ts` auth flow.

### HackCulture Integration
**Question:** Is HackCulture only a branding/platform partner, or does Tech4Bharat run registration, team, and/or submission functionality through HackCulture's system?
**Status:** Pending organizer confirmation — explicitly called out as unconfirmed in both project-overview.md and architecture.md
**Options:** (a) branding-only, Tech4Bharat builds its own system; (b) HackCulture is the system of record and this website is a front-end/wrapper; (c) a hybrid split
**Recommendation:** None — architecture.md explicitly prohibits inventing this.
**Impact:** This is likely the single highest-impact open decision in the project. It determines whether registration, team, submission, and admin get built as original functionality at all, or as integration points against an external system.

### Content Management
**Question:** How will organizers actually update `hackathon_config` values (and later, challenges/rules content) — direct database access, a lightweight internal tool, or a full CMS?
**Status:** Pending decision — architecture.md defines the config table's shape but not how it gets edited
**Options:** (a) manual edits via the Supabase dashboard; (b) a simple internal admin form; (c) a full CMS
**Recommendation:** Manual Supabase dashboard edits for launch — consistent with architecture.md's "avoid unnecessary complexity" principle and the short runway before registration opens.
**Impact:** Determines whether any content-editing UI needs to be built before launch.

### Analytics
**Question:** Is analytics (PostHog) actually needed for this project?
**Status:** Not confirmed — architecture.md marks it explicitly conditional
**Options:** enable now / skip until a concrete need arises
**Recommendation:** Skip for launch. Architecture.md states every dependency must have a clear purpose; no concrete analytics need has been identified yet.
**Impact:** Low — can be added later without schema or architecture changes.

### Email / Notifications
**Question:** Is transactional email (registration confirmation, announcements) required, and should it go through Resend?
**Status:** Not confirmed — architecture.md marks Resend explicitly conditional
**Options:** (a) no email, communication via the website only; (b) Resend for confirmations and/or announcements
**Recommendation:** If public registration launches, a registration-confirmation email is a reasonable minimum expectation for participants — but this is a UX recommendation, not a confirmed requirement, and should be validated with the organizer.
**Impact:** Affects whether `actions/register.ts` needs an email step at launch.

### Deployment
**Question:** What is the actual target launch date and minimum viable scope, given registration opens 7 September 2026?
**Status:** Not confirmed — no target ship date exists in any context file
**Options:** N/A — this needs to be set, not chosen from a list
**Recommendation:** Confirm a minimum-viable launch scope (informational pages + basic registration entry) as the immediate priority, given how close the registration-open date is.
**Impact:** Defines what "done" means for the first deployment.

---

## Design Decisions

### Dark-mode-only
ui-tokens.md commits the entire product — public pages, forms, and any future dashboard/admin UI — to a single dark-mode visual system, with no light-mode variant defined. This was a designer-level decision made while generating the token system, not an organizer-confirmed requirement. **Status: requires approval**, not yet a confirmed decision, particularly given that data-entry-heavy admin/dashboard screens are sometimes preferred in light mode by stakeholders. Should be explicitly signed off before significant UI is built against it.

### Color semantics
As currently defined in ui-tokens.md: `primary` (saffron) = primary action/CTA; `ember` = live/urgent/secondary emphasis; `warning` = pending/awaiting-confirmation content (the correct token for `[CONFIGURABLE]` placeholders); `success`/`error`/`info` remain fully separate from the brand accents. This mapping is settled as the working system for implementation, subject to the dark-mode-only approval above.

### Poster vs. website
Recorded per ui-tokens.md: the promotional poster is treated as a visual/brand reference, not a literal UI specification. The website deliberately does not reproduce the poster's full gradient, globe illustration, or condensed poster typography as page-wide UI.

### Gradient usage
Recorded per ui-tokens.md: the hero section's radial "ignition glow" is the only approved gradient treatment anywhere in the product. No other section, card, or component may introduce a gradient.

### Indian identity
Recorded per ui-tokens.md: national/Indian identity is expressed through color temperature (saffron/ember warmth against deep navy) and typographic confidence, not through decorative tricolor stripes, rangoli patterns, or literal map/globe motifs in UI chrome.

---

## Architecture Decisions

| Item | Status |
|---|---|
| `hackathon_config` (key-value/jsonb table pattern) | **Recommended implementation** — the pattern itself is a settled architectural choice in architecture.md; the actual values it will eventually hold (deadlines, venue, team size, etc.) remain **pending organizer confirmation** |
| `content-config.md` vs. `hackathon_config` | **Pending product/technical decision** — these were created in separate sessions for overlapping purposes (a human-readable confirmed/unconfirmed reference vs. a runtime DB config table) and have not been reconciled. See Cross-File Issues. |
| HackCulture integration | **Pending organizer confirmation** — architecture.md explicitly declines to invent an API or assume a system-of-record |
| Registration ownership (individual vs. team-linked) | **Pending product decision** — `registrations.team_id` is nullable specifically to avoid assuming a team model exists |
| Team model | **Pending product decision** — `teams`/`team_members` are explicitly marked CONDITIONAL in architecture.md, not assumed to exist |
| Submission ownership (team vs. individual) | **Pending product decision** — architecture.md leaves both `team_id` and `profile_id` nullable on `submissions` for this reason |
| Authentication method | **Pending decision** — architecture.md deliberately left this generic pending a real answer |
| Participant dashboard | **Pending organizer confirmation** — conditional per project-overview.md; architecture supports adding it later without restructuring |
| Admin system | **Pending organizer confirmation** — depends entirely on the HackCulture integration decision |
| Resend | **Conditional / not yet confirmed as required** |
| PostHog | **Conditional / not yet confirmed as required** |
| Supabase Storage | **Conditional** — architecture.md is explicit that no bucket should be created until the submission feature itself is confirmed |

---

## Resolved Decisions
- Tech stack: Next.js (App Router), TypeScript strict, Tailwind CSS, shadcn/ui, Supabase, Vercel, GitHub.
- Core architectural layering rule: UI components never access the database directly; all mutations go through `actions/` → `lib/db/`.
- Public informational site structure and page order (see site-structure.md), including the gradient "bookend" placement (hero, prizes, closing CTA).
- Token system mechanism: CSS custom properties mapped into Tailwind via the shadcn HSL-variable convention.
- The confirmed hackathon facts listed in the Confirmed table above.

---

## Decision History

| Date | Decision | Previous State | New State | Impact |
|---|---|---|---|---|
| — | — | — | — | No historical changes yet. This table will be populated as pending decisions are resolved. |

---

## Agent Rules

1. Never invent a TBD requirement.
2. Never treat a recommendation as a confirmed requirement.
3. Check this file before implementing anything affected by an unresolved decision.
4. Prefer configurable or conditional implementations when requirements are unknown.
5. When an organizer decision becomes confirmed, update this file.
6. Update affected context files when a decision changes architecture, UI, scope, or build order.
7. Never silently resolve a product-level uncertainty through code.
8. Do not duplicate HackCulture functionality until its role is confirmed.
9. Do not hard-code unconfirmed hackathon information.
10. Preserve decision history when important decisions change.

---

## Important Cross-File Issues

**Issue:** `content-config.md` (produced in an earlier session, outside this file trio) and `hackathon_config` (defined in architecture.md) serve overlapping purposes — tracking confirmed vs. unconfirmed event data — but in different formats and with no stated relationship between them.
**Files involved:** `content-config.md`, `architecture.md`
**Current interpretation:** `content-config.md` functions as a human-readable planning reference; `hackathon_config` is the runtime database representation of largely the same distinction.
**What needs confirmation:** Whether `content-config.md` should be retired in favor of this file plus `hackathon_config`, merged into this file, or intentionally kept as a separate non-technical reference doc.

**Issue:** The promotional poster displays "Palace Grounds, Bengaluru" as the finale venue, but only city-level location ("Bengaluru, India") is treated as confirmed for implementation.
**Files involved:** architecture.md, project-overview.md
**Current interpretation:** The venue name from the poster is treated as promotional material, not a confirmed build input, per architecture.md's explicit instruction not to hard-code it.
**What needs confirmation:** Organizer sign-off on the exact venue before it is entered anywhere, including as a seed value in `hackathon_config`.

**Issue:** ui-tokens.md's dark-mode-only decision was made independently while generating the design system and is not reflected as a product-level decision anywhere in project-overview.md.
**Files involved:** ui-tokens.md, project-overview.md
**Current interpretation:** Dark-mode-only is currently the assumed visual mode for the entire product, including any future admin/dashboard screens.
**What needs confirmation:** Whether stakeholders are comfortable with an exclusively dark UI across data-entry-heavy admin/participant screens, not just the public marketing pages.

**Issue:** architecture.md deliberately leaves the authentication method generic ("email/password and/or OTP"), but the registration flow described in site-structure.md and the form patterns implied by ui-tokens.md assume a single, specific flow will eventually exist.
**Files involved:** architecture.md, site-structure.md
**Current interpretation:** Registration/login UI is being planned abstractly enough to accommodate either method for now.
**What needs confirmation:** Final auth method choice, so the registration/login UI can move from generic to specific.

**Issue:** architecture.md's folder structure includes an `(admin)` route group as a structural placeholder, which could be read as license to begin admin implementation, even though the HackCulture integration decision — which determines whether a custom admin system should exist at all — is unresolved.
**Files involved:** architecture.md, project-overview.md
**Current interpretation:** The `(admin)` folder exists only as a structural placeholder in the architecture document, not as an instruction to build admin functionality now.
**What needs confirmation:** HackCulture's exact role, before any admin implementation work begins.
