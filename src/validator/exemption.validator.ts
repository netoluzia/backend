import { z } from 'zod'
export const createExemption = z.object({
  code: z.string(),
  description: z.string(),
})

export type TCreateExemption = z.infer<typeof createExemption>

export const updateExemption = z.object({
  code: z.string().optional(),
  description: z.string().optional(),
})

export type TUpdateExemption = z.infer<typeof updateExemption>
