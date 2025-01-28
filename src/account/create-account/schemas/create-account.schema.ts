import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>
