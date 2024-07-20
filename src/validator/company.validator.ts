import { z } from 'zod'
export const createCompany = z.object({
  name: z.string(),
  nif: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  bank: z.string().optional(),
  iban: z.string().optional(),
  account_number: z.string().optional(),
})

export type TCreateCompany = z.infer<typeof createCompany>

export const updateCompany = z.object({
  name: z.string(),
  nif: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  bank: z.string().optional(),
  iban: z.string().optional(),
  account_number: z.string().optional(),
})

export type TUpdateCompany = z.infer<typeof updateCompany>
