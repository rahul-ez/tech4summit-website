import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types/database'

/**
 * Retrieves a profile by its ID (which matches auth.users.id).
 */
export async function getProfileById(profileId: string): Promise<Profile | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .maybeSingle()

  if (error) {
    console.error('Error in getProfileById:', error.message)
    throw new Error('Failed to retrieve user profile.')
  }

  return data
}

/**
 * Updates a profile record with safe, validated fields.
 */
export async function updateProfile(
  profileId: string,
  updates: { full_name?: string | null; phone?: string | null }
): Promise<Profile> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', profileId)
    .select()
    .single()

  if (error) {
    console.error('Error in updateProfile:', error.message)
    throw new Error('Failed to update user profile.')
  }

  return data
}
