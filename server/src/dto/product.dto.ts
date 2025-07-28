import { z } from 'zod'

export const CreateProductInputSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be greater than 0'),
  discountPrice: z.number().min(0, 'Discount price must be greater than 0'),
  stock: z.number().min(0, 'Stock must be greater than 0'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  description: z.string().min(1, 'Description is required'),
  specifications: z.string().min(1, 'Specifications is required'),
  isFeatured: z.boolean().default(false),
  categoryId: z.number().min(1, 'Category ID is required'),
  brandId: z.number().min(1, 'Brand ID is required'),
})

export type CreateProductInput = z.infer<typeof CreateProductInputSchema>
