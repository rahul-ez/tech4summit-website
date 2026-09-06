import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters long').max(100),
  phone: z.string().regex(/^[0-9+-\s()]{8,20}$/, 'Please enter a valid phone number').optional().or(z.literal('')),
})

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const otpRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const otpVerifySchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  token: z.string().min(6, 'Verification code must be 6 digits').max(6, 'Verification code must be 6 digits'),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type OtpRequestInput = z.infer<typeof otpRequestSchema>
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>
