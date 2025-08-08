import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

interface CustomError extends Error {
  status?: number;
  statusCode?: number;
  code?: string | number;
  message: string;
}

const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });
  }

  if (error.status === 401 && error.message === "Unauthorized") {
    return res.status(401).json({ message: "Requires authentication" });
  }

  if (
    error.status === 401 &&
    error.code === "invalid_token" &&
    error.message === "Permission denied"
  ) {
    return res.status(403).json({ message: error.message });
  }

  const status =
    typeof error.statusCode === "number"
      ? error.statusCode
      : typeof error.code === "number"
      ? Number(error.code)
      : 500;

  const message = error.message || "Internal Server Error";
  return res.status(status).json({ message });
};

export { errorHandler };
