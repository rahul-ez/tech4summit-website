import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'
import type { Profile, UserRole } from '@/types/database'

/**
 * Retrieves the currently authenticated Supabase user from server session cookies.
 * Returns null if the user is unauthenticated or the session is invalid.
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch {
    return null
  }
}

/**
 * Retrieves the profile record corresponding to the authenticated user.
 */
export async function getAuthenticatedProfile(): Promise<Profile | null> {
  const user = await getAuthenticatedUser()
  if (!user) return null

  try {
    const supabase = await createClient()
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !profile) {
      return null
    }

    return profile
  } catch {
    return null
  }
}

/**
 * Checks whether the authenticated user has a specific role.
 */
export async function hasRole(requiredRole: UserRole): Promise<boolean> {
  const profile = await getAuthenticatedProfile()
  if (!profile) return false
  return profile.role === requiredRole
}

/**
 * Helper to check if the current user is an admin.
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole('admin')
}
