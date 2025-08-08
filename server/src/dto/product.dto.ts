import { z } from "zod";

export const CreateProductInputSchema = z
  .object({
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must contain only lowercase letters, numbers, and hyphens"
      ),
    name: z
      .string()
      .min(1, "Name is required")
      .max(200, "Name must be less than 200 characters"),
    price: z
      .number()
      .min(0, "Price must be greater than or equal to 0")
      .max(999999, "Price must be less than 999,999"),
    discountPrice: z
      .number()
      .min(0, "Discount price must be greater than or equal to 0")
      .max(999999, "Discount price must be less than 999,999")
      .optional(),
    stock: z
      .number()
      .int("Stock must be an integer")
      .min(0, "Stock must be greater than or equal to 0"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(2000, "Description must be less than 2000 characters"),
    categoryId: z
      .number()
      .int("Category ID must be an integer")
      .min(1, "Category ID is required"),
    brandId: z
      .number()
      .int("Brand ID must be an integer")
      .min(1, "Brand ID is required"),
    galleryIds: z.array(z.number()).optional(),
    variants: z.array(z.object()).optional()
  })
  .refine(
    (data) => {
      // Kiểm tra discountPrice không được lớn hơn price
      if (data.discountPrice && data.discountPrice > data.price) {
        return false;
      }
      return true;
    },
    {
      message: "Discount price cannot be greater than regular price",
      path: ["discountPrice"],
    }
  );

export type CreateProductInput = z.infer<typeof CreateProductInputSchema>;
