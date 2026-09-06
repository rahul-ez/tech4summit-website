import { z } from 'zod'

export const registrationSubmissionSchema = z.object({
  teamId: z.string().uuid().optional().nullable(),
})

export type RegistrationSubmissionInput = z.infer<typeof registrationSubmissionSchema>
