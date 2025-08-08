import { CreateProductInput } from "@/dto/product.dto";
import { prisma } from "../../config/prisma";

/**
 *
 * @param data
 * @returns
 */
export const createProduct = async (data: CreateProductInput) => {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      price: Number(data.price),
      stock: Number(data.stock),
      description: data.description,
      categoryId: Number(data.categoryId),
      brandId: Number(data.brandId),
      updatedAt: new Date(),
    },
  });

  if (data.galleryIds && Array.isArray(data.galleryIds)) {
    await prisma.media.updateMany({
      where: {
        id: { in: data.galleryIds.map(Number) },
      },
      data: {
        productId: product.id,
      },
    });
  }

  console.log('variants',data.variants);
  

  if (data.variants && Array.isArray(data.variants) && data.variants.length > 0) {
    const variantsToCreate = data.variants.map((variant: any) => ({
      productId: product.id,
      sku: variant.sku,
      name: variant.name,
      price: Number(variant.price),
      discountPrice: variant.discountPrice !== undefined ? Number(variant.discountPrice) : undefined,
      stock: Number(variant.stock),
    }));

    await prisma.productVariant.createMany({
      data: variantsToCreate,
    });
  }

  return product;
};

/**
 *
 * @param page
 * @param limit
 * @returns
 */
export const getProducts = async (page: number, limit: number) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const skip = (currentPage - 1) * currentLimit;
  const totalProducts = await prisma.product.count();

  const products = await prisma.product.findMany({
    include: {
      category: true,
      brand: true,
      gallery: true,
      thumbnail:true
    },
    skip,
    take: currentLimit,
  });

  const totalPages = Math.ceil(totalProducts / currentLimit);

  return {
    products,
    pagination: {
      total: totalProducts,
      page,
      limit: currentLimit,
      totalPages,
    },
  };
};

export const getProductBySlug = async (slug: string) => {
  const product = prisma.product.findUnique({
    where: {
      slug: slug,
    },
    include: {
      category: true,
      brand: true,
      gallery: true,
      thumbnail:true,
      variants:true
    },
  });

  return product;
};
