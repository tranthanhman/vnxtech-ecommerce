import { Request, Response } from "express";
import * as authService from "./auth.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await authService.register({ name, email, password });

  res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await authService.login(email, password);

  res.status(200).json(new ApiResponse(200, tokens, "Login successful"));
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshAccessToken(refreshToken);

  res
    .status(200)
    .json(new ApiResponse(200, tokens, "Refresh token successful"));
};
