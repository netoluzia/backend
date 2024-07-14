import { z } from 'zod'
export const createCustomer = z.object({
  name: z.string(),
  nif: z.string(),
  address: z.string(),
  phone: z.string(),
  source: z.string(),
  email: z.string().optional(),
  insuranceId: z.string().optional(),
  protocolId: z.string().optional(),
})

export type TCreateCustomer = z.infer<typeof createCustomer>

export const updateCustomer = z.object({
  name: z.string().optional(),
  nif: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  email: z.string().optional(),
  insuranceId: z.string().optional(),
  protocolId: z.string().optional(),
})

export type TUpdateCustomer = z.infer<typeof updateCustomer>
