import { z } from 'zod'

export const CreateUserInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is invalid'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>
