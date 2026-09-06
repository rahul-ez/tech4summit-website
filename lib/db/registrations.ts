import { createClient } from '@/lib/supabase/server'
import type { Registration } from '@/types/database'

/**
 * Retrieves the registration record for a given participant profile.
 */
export async function getRegistrationForProfile(profileId: string): Promise<Registration | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('profile_id', profileId)
    .maybeSingle()

  if (error) {
    console.error('Error in getRegistrationForProfile:', error.message)
    throw new Error('Failed to retrieve registration record.')
  }

  return data
}

/**
 * Creates a new registration record for an authenticated profile.
 */
export async function createRegistrationRecord(params: {
  profileId: string
  teamId?: string | null
}): Promise<Registration> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('registrations')
    .insert({
      profile_id: params.profileId,
      team_id: params.teamId || null,
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
    console.error('Error in createRegistrationRecord:', error.message)
    throw new Error('Failed to create registration record.')
  }

  return data
}
