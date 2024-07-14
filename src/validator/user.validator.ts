import { Role } from '@prisma/client'
import { z } from 'zod'
export const createUser = z.object({
  name: z.string(),
  nif: z.string().optional(),
  phone: z.string(),
  role: z.enum([
    Role.admin,
    Role.analyst,
    Role.attendant,
    Role.doctor,
    Role.financial,
    Role.nurse,
  ]),
  email: z.string().optional(),
  username: z.string(),
  password: z.string(),
})

export type TCreateUser = z.infer<typeof createUser>

export const updateUser = z.object({
  name: z.string().optional(),
  nif: z.string().optional(),
  phone: z.string().optional(),
  role: z
    .enum([
      Role.admin,
      Role.analyst,
      Role.attendant,
      Role.doctor,
      Role.financial,
      Role.nurse,
    ])
    .optional(),
  email: z.string().optional(),
})

export type TUpdateUser = z.infer<typeof updateUser>
