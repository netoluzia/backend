import { z } from 'zod'
export const createPartner = z.object({
  name: z.string(),
  nif: z.string(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  email: z.string().nullable(),
})

export type TCreatePartner = z.infer<typeof createPartner>

export const updatePartner = z.object({
  name: z.string().optional(),
  nif: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
})

export type TUpdatePartner = z.infer<typeof updatePartner>
