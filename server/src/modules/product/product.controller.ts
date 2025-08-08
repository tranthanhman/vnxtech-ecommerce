import { Request, Response } from "express";
import * as productService from "./product.service";
import { asyncHandler } from "@/utils/asyncHandler";
import { success } from "../../utils/response";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);
    return success(res, product, "Product created successfully");
  }
);

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const products = await productService.getProducts(
    Number(page),
    Number(limit)
  );
  return success(res, products, "Products fetched successfully");
});

export const getProductBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const product = await productService.getProductBySlug(slug);
    return success(res, product, "Product fetched successfully");
  }
);
