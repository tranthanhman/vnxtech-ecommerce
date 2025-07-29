"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const token = authHeader.split(" ")[1];
        console.log('token', token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_ACCESS);
        console.log("decorded", decoded);
        // Attach user to req, but first extend the type to avoid TS error
        req.user = decoded;
        next();
    }
    catch {
        return res.status(403).json({ message: "Token expired or invalid" });
    }
};
exports.authGuard = authGuard;
