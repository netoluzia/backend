import { z } from 'zod'
export const createInsurance = z.object({
  name: z.string(),
  nif: z.string(),
  address: z.string(),
  phone: z.string().optional(),
})

export type TCreateInsurance = z.infer<typeof createInsurance>

export const updateInsurance = z.object({
  name: z.string().optional(),
  nif: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
})

export type TUpdateInsurance = z.infer<typeof updateInsurance>
