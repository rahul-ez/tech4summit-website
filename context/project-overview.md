# Project Overview

## About the Project
Tech4Bharat 2026 is a national hackathon associated with the Global Accelerator Vision Summit (GAVS) 2026, positioned as India's biggest hackathon. It is centered on the theme "Scalable Innovations for Next-Gen India" and is intended to encourage participants to build practical, scalable technology solutions for real-world Indian challenges. The hackathon runs as online preliminary rounds followed by an on-site grand finale in Bengaluru, India, from 25–27 December 2026.

This project is the website for Tech4Bharat 2026 specifically — not a website for GAVS as a whole. It maintains a visual and conceptual connection to GAVS while remaining scoped to the hackathon.

The website is the primary digital experience for Tech4Bharat participants and visitors: a place to learn about the hackathon, understand its theme and requirements, and — depending on finalized organizer requirements — register, form/manage a team, and submit a project.

---

## The Problem It Solves
Participants and visitors currently have no single, authoritative place to learn about Tech4Bharat 2026, understand its theme and structure, and register. The website centralizes hackathon discovery, information, and (where confirmed) participation logistics, replacing ad-hoc promotional material (e.g. the poster) with a maintained digital source of truth. It does not solve any problem beyond this centralized digital experience — do not invent additional problem framing.

---

## Pages
```
/            Hackathon landing page — overview, theme, key dates, prize pool, CTA
/about       About Tech4Bharat — what it is, relationship to GAVS 2026
/challenges  Challenges/problem statements — CONDITIONAL, content not yet confirmed
/timeline    Hackathon timeline (registration, prelims, grand finale)
/prizes      Prize information (1st/2nd/3rd, total pool)
/rules       Rules and eligibility — CONDITIONAL, content not yet confirmed
/faq         Frequently asked questions
/register    Registration — CONDITIONAL, workflow not yet confirmed
/dashboard   Participant dashboard — CONDITIONAL, only if a participant portal is required
/team        Team management — CONDITIONAL, only if required and if team rules are confirmed
/submission  Project submission — CONDITIONAL, only if required and format is confirmed
/admin       Organizer/admin management — CONDITIONAL, only if required
```

---

## Navigation
**Public navigation** (always present): Home, About, Challenges, Timeline, Prizes, Rules, FAQ, Register. This should be usable and coherent even while `/challenges`, `/rules`, and `/register` contain placeholder or partial content, since their underlying requirements are not yet confirmed.

**Participant/admin navigation** is a separate, conditional layer that only exists if the corresponding pages are built: a participant-facing nav (Dashboard, Team, Submission, Announcements) reachable after registration/login, and a separate admin nav (`/admin`) gated from public and participant access. Do not merge these with public navigation.

---

## Core User Flow
Discover the hackathon → understand the theme and (once confirmed) the challenges → review timeline, prizes, and rules → register → (conditional) form or join a team → participate in the online preliminary round → (conditional) submit a project → receive announcements/results → attend the on-site grand finale if shortlisted.

Every step from "register" onward depends on organizer confirmation of the underlying workflow (registration system, team rules, submission format, judging process). Do not implement or hardcode assumptions about these steps beyond what is confirmed in this document.

---

## Data Architecture
Conceptual entities the website may need, described at a conceptual level only (no schema):

- **User/Account** — a person interacting with the site (participant, organizer/admin, and possibly mentor/judge)
- **Participant** — a registered hackathon participant, linked to a User
- **College/Institution** — participant's affiliated institution (field exists conceptually; whether it's required or how it's validated is unconfirmed)
- **Team** — CONDITIONAL entity; exists only if team-based participation is confirmed. Size/composition rules are unconfirmed.
- **Team Member** — CONDITIONAL, links Participants to a Team
- **Challenge/Problem Statement** — CONDITIONAL; content and structure not yet confirmed
- **Registration** — a participant's or team's registration record; exact required fields depend on unconfirmed eligibility/registration workflow
- **Submission** — CONDITIONAL; format and requirements not yet confirmed
- **Announcement** — organizer-to-participant communication
- **Hackathon Configuration** — a config entity holding values that are confirmed-but-changeable (dates, prizes) and values that are currently unconfirmed placeholders (deadlines, venue, tracks), so the site can be updated without code changes as organizers finalize details

Confirmed event information (theme, dates, location, format, prizes, platform partner, host institution) can be treated as relatively stable configuration data. Anything under "Important Uncertainties" below must be modeled as configurable/nullable, not assumed or hardcoded.

---

## Features In Scope
- Public hackathon landing page with theme, positioning, dates, format, and prize pool
- About page describing Tech4Bharat and its relationship to GAVS 2026
- Timeline page reflecting confirmed dates (registration opens 7 Sept 2026; event 25–27 Dec 2026)
- Prizes page (₹3,00,000 / ₹2,00,000 / ₹1,00,000; ₹6,00,000 total pool)
- FAQ page
- Challenges/problem-statements page — structure only, content pending confirmation
- Rules and eligibility page — structure only, content pending confirmation
- Registration entry point — structure only, workflow pending confirmation
- Team formation/management — conditional, pending confirmation of team rules
- Participant dashboard — conditional, pending confirmation that a portal is required
- Project submission — conditional, pending confirmation of format
- Announcements — conditional, supports participant communication once other flows exist
- Organizer/admin management — conditional, pending confirmation that a custom admin system (vs. HackCulture's existing system) is required

---

## Features Out of Scope
- Inventing hackathon rules or eligibility criteria
- Inventing problem statements or challenge tracks
- Inventing judging criteria
- Hard-coding an unconfirmed venue (the promotional poster references "Palace Grounds, Bengaluru," but this is not confirmed for implementation)
- Assuming team-size limits or team composition rules
- Assuming accommodation/travel benefits or logistics
- Building GAVS-wide functionality unrelated to the Tech4Bharat hackathon specifically
- Treating any other/unrelated Tech4Bharat-named websites as this hackathon's platform
- Duplicating HackCulture's registration/team-management functionality before the integration model (custom system vs. HackCulture's existing system) is confirmed
- Unapproved payment or ticketing functionality

---

## Target User
- **Hackathon participants** — primarily student developers and innovators, individually or as part of student teams; assume general web/mobile familiarity, not specialized technical skill for using the site itself
- **Mentors/judges** — conditional user group, relevant only if a mentor/judge portal is required
- **Hackathon organizers/admins** — manage event content, registrations, and (if built) submissions and announcements
- **Visitors** — general public or prospective participants seeking information about the event without necessarily registering

---

## Success Criteria
- A visitor can understand what Tech4Bharat 2026 is, and how it relates to GAVS 2026, within one visit to the site
- Confirmed event information (theme, dates, location, format, prizes) is easy to find and unambiguous
- Unconfirmed information (rules, eligibility, challenges, deadlines, venue) is presented as configurable/pending, never as settled fact
- A participant can complete registration (once the workflow is confirmed) without confusion
- The public website is fully responsive across desktop and mobile
- Participant/admin workflows are clearly separated from public content, both in navigation and in access control
- The website maintains consistent Tech4Bharat branding, visually connected to but distinct from GAVS-wide branding
- The system can evolve incrementally as organizers finalize remaining requirements, without requiring a rebuild of already-shipped pages
