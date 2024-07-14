import { z } from 'zod'
export const credentialShema = z.object({
  username: z.string(),
  password: z.string(),
})

export type TLogin = z.infer<typeof credentialShema>
