import { createClient } from '@/lib/supabase/server'
import type { Announcement, AnnouncementAudience } from '@/types/database'

/**
 * Retrieves published announcements sorted by most recent first.
 */
export async function getPublishedAnnouncements(
  audience: AnnouncementAudience = 'all'
): Promise<Announcement[]> {
  try {
    const supabase = await createClient()

    let query = supabase
      .from('announcements')
      .select('*')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })

    if (audience !== 'all') {
      query = query.in('audience', ['all', audience])
    }

    const { data, error } = await query

    if (error) {
      console.warn('Could not fetch announcements from DB:', error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.warn('Database error in getPublishedAnnouncements:', error)
    return []
  }
}
