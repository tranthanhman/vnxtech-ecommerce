import { CreateProductInput } from "@/dto/product.dto";
import { prisma } from "../../config/prisma";

export const createProduct = async (data: CreateProductInput) => {
  return prisma.product.create({ data });
};

export const getProducts = async (page: number, limit: number) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const skip = (currentPage - 1) * currentLimit;
  const totalProducts = await prisma.product.count();

  const products = await prisma.product.findMany({
    include: {
      category: true,
      brand: true,
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
