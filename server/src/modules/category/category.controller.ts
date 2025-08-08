import { success } from "../../utils/response";
import { Request, Response } from "express";
import * as categoryService from "./category.service";
import { asyncHandler } from "@/utils/asyncHandler";
import { UpdateCategoryInputSchema } from "@/dto/category.dto";

export const getAllCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const categories = await categoryService.getListCategory(
      Number(page),
      Number(limit)
    );
    return success(res, categories, "Categories fetched successfully");
  }
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await categoryService.createCategory(req.body);
    return success(res, category, "Category created successfully", 201);
  }
);

export const getProductsByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { page = 1, limit = 10 } = req.query;

    console.log("slug", slug);

    const products = await categoryService.getProductsByCategorySlug(
      String(slug),
      Number(page),
      Number(limit)
    );
    return success(res, products, "Products fetched successfully");
  }
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(Number(id));
    return success(res, category, "Category created successfully", 201);
  }
);

export const updateCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const result = UpdateCategoryInputSchema.safeParse(body);

    if (!result.success) {
      throw result.error;
    }

    const category = await categoryService.updateCategoryById(
      Number(id),
      result.data
    );
    return success(res, category, "Category created successfully", 201);
  }
);
