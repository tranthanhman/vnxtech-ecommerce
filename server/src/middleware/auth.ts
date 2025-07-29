import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const token = authHeader.split(" ")[1];
    console.log('token',token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS!);
    console.log("decorded", decoded);
    // Attach user to req, but first extend the type to avoid TS error
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token expired or invalid" });
  }
};
