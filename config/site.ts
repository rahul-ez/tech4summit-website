/**
 * Static configuration for Tech4Bharat 2026.
 * Contains ONLY confirmed facts from context/tbd.md and project-overview.md.
 * Do NOT hardcode unconfirmed or speculative details here.
 */

export interface PrizeItem {
  place: number
  label: string
  amount: number
  formatted: string
}

export interface SiteConfig {
  name: string
  theme: string
  positioning: string
  associatedSummit: string
  dates: {
    registrationOpens: string
    registrationCloses: string | null
    eventStart: string
    eventEnd: string
    formattedEventDates: string
  }
  location: {
    city: string
    exactVenue: string | null
  }
  format: string
  platformPartner: string
  hostInstitution: string
  prizes: {
    totalPool: number
    formattedTotalPool: string
    tiers: PrizeItem[]
  }
}

export const siteConfig: SiteConfig = {
  name: 'Tech4Bharat 2026',
  theme: 'Scalable Innovations for Next-Gen India',
  positioning: "India's Biggest Hackathon",
  associatedSummit: 'Global Accelerator Vision Summit (GAVS) 2026',
  dates: {
    registrationOpens: '2026-09-07T00:00:00Z',
    registrationCloses: null, // Pending organizer confirmation
    eventStart: '2026-12-25T00:00:00Z',
    eventEnd: '2026-12-27T23:59:59Z',
    formattedEventDates: '25–27 December 2026',
  },
  location: {
    city: 'Bengaluru, India',
    exactVenue: null, // Pending organizer confirmation
  },
  format: 'Online preliminaries + on-site grand finale',
  platformPartner: 'HackCulture',
  hostInstitution: 'RV College of Engineering',
  prizes: {
    totalPool: 600000,
    formattedTotalPool: '₹6,00,000',
    tiers: [
      { place: 1, label: '1st Prize', amount: 300000, formatted: '₹3,00,000' },
      { place: 2, label: '2nd Prize', amount: 200000, formatted: '₹2,00,000' },
      { place: 3, label: '3rd Prize', amount: 100000, formatted: '₹1,00,000' },
    ],
  },
}
