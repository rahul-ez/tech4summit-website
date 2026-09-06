import { z } from 'zod'

export const prizeTierSchema = z.object({
  place: z.number().int().positive(),
  label: z.string().min(1),
  amount: z.number().positive(),
  formatted: z.string().min(1),
})

export const updateConfigSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.unknown().nullable(),
})

export type PrizeTier = z.infer<typeof prizeTierSchema>
export type UpdateConfigInput = z.infer<typeof updateConfigSchema>
