'use server'

import { getAuthenticatedUser } from '@/lib/auth/session'
import {
  registrationSubmissionSchema,
  type RegistrationSubmissionInput,
} from '@/lib/validation/registration'
import {
  getRegistrationForProfile,
  createRegistrationRecord,
} from '@/lib/db/registrations'
import type { Registration } from '@/types/database'
import type { ActionResult } from './auth'

/**
 * Orchestrates participant registration:
 * 1. Validates input schema via lib/validation
 * 2. Authenticates user session via lib/auth
 * 3. Checks for existing registration to prevent duplicates
 * 4. Persists registration via lib/db
 */
export async function submitRegistration(
  rawInput: RegistrationSubmissionInput = {}
): Promise<ActionResult<Registration>> {
  // 1. Authoritative server-side validation
  const parsed = registrationSubmissionSchema.safeParse(rawInput)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid registration request.',
    }
  }

  // 2. Authentication check
  const user = await getAuthenticatedUser()
  if (!user) {
    return {
      success: false,
      error: 'You must be signed in to complete registration.',
    }
  }

  try {
    // 3. Idempotency / duplicate check
    const existing = await getRegistrationForProfile(user.id)
    if (existing) {
      return {
        success: true,
        data: existing,
        message: 'You are already registered for Tech4Bharat 2026.',
      }
    }

    // 4. Persistence
    const registration = await createRegistrationRecord({
      profileId: user.id,
      teamId: parsed.data.teamId,
    })

    return {
      success: true,
      data: registration,
      message: 'Registration submitted successfully.',
    }
  } catch (err) {
    console.error('Registration action error:', err)
    return {
      success: false,
      error: 'Failed to process registration. Please try again later.',
    }
  }
}
