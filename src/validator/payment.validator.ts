import { z } from 'zod'
export const createPayment = z.object({
  name: z.string(),
  code: z.string(),
})

export type TCreatePayment = z.infer<typeof createPayment>

export const updatePayment = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
})

export type TUpdatePayment = z.infer<typeof updatePayment>
