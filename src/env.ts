import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().optional().default('3333'),
  DEV: z.string().optional().default('false'),
})

export type Env = z.infer<typeof envSchema>
