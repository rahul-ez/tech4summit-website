'use server'

import { getAuthenticatedUser } from '@/lib/auth/session'
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from '@/lib/validation/profile'
import { updateProfile } from '@/lib/db/profiles'
import type { Profile } from '@/types/database'
import type { ActionResult } from './auth'

/**
 * Updates the profile of the currently authenticated user.
 */
export async function updateCurrentUserProfile(
  rawInput: UpdateProfileInput
): Promise<ActionResult<Profile>> {
  const parsed = updateProfileSchema.safeParse(rawInput)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid profile information.',
    }
  }

  const user = await getAuthenticatedUser()
  if (!user) {
    return {
      success: false,
      error: 'You must be signed in to update your profile.',
    }
  }

  try {
    const updated = await updateProfile(user.id, {
      full_name: parsed.data.fullName,
      phone: parsed.data.phone,
    })

    return {
      success: true,
      data: updated,
      message: 'Profile updated successfully.',
    }
  } catch (err) {
    console.error('Update profile error:', err)
    return {
      success: false,
      error: 'Failed to update profile. Please try again later.',
    }
  }
}
