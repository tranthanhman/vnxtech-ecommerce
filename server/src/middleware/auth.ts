import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken; // <-- lấy từ cookie

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS!);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token expired or invalid" });
  }
};
