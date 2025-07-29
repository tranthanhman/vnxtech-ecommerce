import { Request, Response } from "express";
import * as UserService from "./user.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { CreateUserDTO } from "../../dto/user.dto";

export const getAllUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const users = await UserService.getUsers(Number(page), Number(limit));
  res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
};

export const createUser = async (req: Request, res: Response) => {
  return UserService.createUser(req.body as CreateUserDTO);
};