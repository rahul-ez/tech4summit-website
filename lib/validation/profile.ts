import { z } from 'zod'

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters long').max(100).optional(),
  phone: z.string().regex(/^[0-9+-\s()]{8,20}$/, 'Please enter a valid phone number').optional().or(z.literal('')),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
