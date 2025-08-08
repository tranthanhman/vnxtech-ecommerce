import {
  CreateCategoryInput,
  UpdateCategoryInput,
  UpdateCategoryInputSchema, // Import schema
} from "../../dto/category.dto";
import { prisma } from "../../config/prisma";
import { ApiError } from "@/utils/ApiError";
import { StatusCodes } from "http-status-codes";

/**
 * GET LIST
 */
export const getListCategory = async (page: number, limit: number) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const skip = (currentPage - 1) * currentLimit;
  const totalCategory = await prisma.category.count();

  const categories = await prisma.category.findMany({
    skip,
    take: currentLimit,
  });

  const totalPages = Math.ceil(totalCategory / currentLimit);

  return {
    categories,
    pagination: {
      total: totalCategory,
      page,
      limit: currentLimit,
      totalPages,
    },
  };
};

/**
 * GET PRODUCTS BY CATEGORY SLUG
 */
export const getProductsByCategorySlug = async (
  slug: string,
  page: number,
  limit: number
) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const skip = (currentPage - 1) * currentLimit;
  const totalProducts = await prisma.product.count();

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: slug,
      },
    },
    include: {
      category: true,
      brand: true,
      gallery: true,
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

/**
 * GET CATEGORY BY ID
 */
export const getCategoryById = async (id: number) => {
  const category = prisma.category.findUnique({
    where: { id },
  });

  if(!category){
    throw new Error(`Category with id '${id}' not found.`);
  }

  return category
};

/**
 * CREATE CATEGORY
 */
export const createCategory = async (data: CreateCategoryInput) => {
  return prisma.category.create({ data });
};

/**
 * UPDATE CATEGORY
 */
export const updateCategoryById = async (
  id: number,
  data: UpdateCategoryInput 
) => {  
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });  

  if (!existingCategory) {
    return new ApiError(StatusCodes.BAD_REQUEST, `Category with id '${id}' not found.`);
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data,
  });

  return updatedCategory;
};




