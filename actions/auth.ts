'use server'

import { createClient } from '@/lib/supabase/server'
import {
  signUpSchema,
  signInSchema,
  otpRequestSchema,
  otpVerifySchema,
  type SignUpInput,
  type SignInInput,
  type OtpRequestInput,
  type OtpVerifyInput,
} from '@/lib/validation/auth'

export type ActionResult<T = unknown> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string }

/**
 * Signs up a new participant with email and password.
 */
export async function signUpWithPassword(
  rawInput: SignUpInput
): Promise<ActionResult<{ userId: string }>> {
  const parsed = signUpSchema.safeParse(rawInput)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid registration details.',
    }
  }

  try {
    const supabase = await createClient()
    const { email, password, fullName, phone } = parsed.data

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone || null,
          role: 'participant',
        },
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: 'Sign up could not be completed.' }
    }

    return {
      success: true,
      data: { userId: data.user.id },
      message: 'Account created successfully.',
    }
  } catch (err) {
    console.error('Sign up error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred during sign up.',
    }
  }
}

/**
 * Signs in an existing user with email and password.
 */
export async function signInWithPassword(
  rawInput: SignInInput
): Promise<ActionResult<{ userId: string }>> {
  const parsed = signInSchema.safeParse(rawInput)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid login details.',
    }
  }

  try {
    const supabase = await createClient()
    const { email, password } = parsed.data

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: 'Invalid credentials.' }
    }

    return {
      success: true,
      data: { userId: data.user.id },
      message: 'Signed in successfully.',
    }
  } catch (err) {
    console.error('Sign in error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred during sign in.',
    }
  }
}

/**
 * Requests a one-time OTP email for passwordless login.
 */
export async function signInWithOtp(
  rawInput: OtpRequestInput
): Promise<ActionResult> {
  const parsed = otpRequestSchema.safeParse(rawInput)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid email address.',
    }
  }

  try {
    const supabase = await createClient()
    const { email } = parsed.data

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: 'Verification code sent to your email.',
    }
  } catch (err) {
    console.error('OTP request error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred sending verification code.',
    }
  }
}

/**
 * Verifies an OTP code and establishes a session.
 */
export async function verifyOtp(
  rawInput: OtpVerifyInput
): Promise<ActionResult<{ userId: string }>> {
  const parsed = otpVerifySchema.safeParse(rawInput)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid verification details.',
    }
  }

  try {
    const supabase = await createClient()
    const { email, token } = parsed.data

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: 'Could not verify code.' }
    }

    return {
      success: true,
      data: { userId: data.user.id },
      message: 'Verified successfully.',
    }
  } catch (err) {
    console.error('OTP verify error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred during verification.',
    }
  }
}

/**
 * Signs out the currently authenticated user.
 */
export async function signOutUser(): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: 'Signed out successfully.',
    }
  } catch (err) {
    console.error('Sign out error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred during sign out.',
    }
  }
}
