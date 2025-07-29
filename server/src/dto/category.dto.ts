import { z } from 'zod'

export const CreateCategoryInputSchema = z.object({
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen-separated"),
  parentId: z.number().int().optional().nullable(), // optional parent category
})

export type CreateCategoryInput = z.infer<typeof CreateCategoryInputSchema>
