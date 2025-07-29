import { Request, Response } from "express";
import * as categoryService from "./category.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const createCategory = async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
};
