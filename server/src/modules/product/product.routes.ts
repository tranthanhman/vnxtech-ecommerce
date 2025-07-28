import express from "express";
import { createProduct } from "./product.controller";
import { authGuard } from "../../middleware/auth";

const router = express.Router();

router.post("/", authGuard, createProduct);

export default router;
