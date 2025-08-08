import { Request, Response } from "express";
import * as authService from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import {success} from "@/utils/response";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });
    return success(res, user, "User registered successfully", 201);
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    // sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
    // sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });


  return success(res, result.user, "Login successful", 200);
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshAccessToken(refreshToken);
    return success(res, tokens, "Refresh token successful", 200);
  }
);
