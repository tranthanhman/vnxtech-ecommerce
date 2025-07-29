import { Request, Response } from "express";
import * as productService from "./product.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const createProduct = async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const products = await productService.getProducts(
    Number(page),
    Number(limit)
  );
  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
};
