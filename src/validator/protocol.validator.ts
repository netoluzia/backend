import { z } from 'zod'
export const createProtocol = z.object({
  name: z.string(),
  value: z.number(),
})

export type TCreateProtocol = z.infer<typeof createProtocol>

export const updateProtocol = z.object({
  name: z.string().optional(),
  value: z.number().optional(),
})

export type TUpdateProtocol = z.infer<typeof updateProtocol>
