"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductInputSchema = void 0;
const zod_1 = require("zod");
exports.CreateProductInputSchema = zod_1.z.object({
    slug: zod_1.z.string().min(1, 'Slug is required'),
    name: zod_1.z.string().min(1, 'Name is required'),
    price: zod_1.z.number().min(0, 'Price must be greater than 0'),
    discountPrice: zod_1.z.number().min(0, 'Discount price must be greater than 0'),
    stock: zod_1.z.number().min(0, 'Stock must be greater than 0'),
    imageUrl: zod_1.z.string().min(1, 'Image URL is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    specifications: zod_1.z.string().min(1, 'Specifications is required'),
    isFeatured: zod_1.z.boolean().default(false),
    categoryId: zod_1.z.number().min(1, 'Category ID is required'),
    brandId: zod_1.z.number().min(1, 'Brand ID is required'),
});
