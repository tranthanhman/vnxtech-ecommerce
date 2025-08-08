import { z } from 'zod'

export const CreateCategoryInputSchema = z.object({
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen-separated"),
  icon: z.string().optional().nullable(),
  parentId: z.number().int().optional().nullable(),
})

export const UpdateCategoryInputSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen-separated").optional(),
  icon: z.string().optional().nullable(),
  parentId: z.number().int().optional().nullable(), 
}).strict()

export type CreateCategoryInput = z.infer<typeof CreateCategoryInputSchema>
export type UpdateCategoryInput = z.infer<typeof UpdateCategoryInputSchema>
