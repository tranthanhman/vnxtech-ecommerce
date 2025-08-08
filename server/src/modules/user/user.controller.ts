import { Request, Response } from "express";
import * as UserService from "./user.service";
import { success } from "../../utils/response";
import { CreateUserDTO } from "../../dto/user.dto";
import { asyncHandler } from "@/utils/asyncHandler";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await UserService.getUsers(Number(page), Number(limit));
  return success(res, users, "Users fetched successfully", 200);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body as CreateUserDTO);
  if (result instanceof Error) {
    // If service returns an error, send error response
    return res.status((result as any).statusCode || 400).json({
      success: false,
      message: result.message,
    });
  }
  return success(res, null, "User created successfully", 201);
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
 
  return success(res, user, "Get Profile successfully");
});