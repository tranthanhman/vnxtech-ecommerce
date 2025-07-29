import express from "express";
import { createProduct, getProducts } from "./product.controller";
import { authGuard } from "../../middleware/auth";

const router = express.Router();

router.post("/", authGuard, createProduct);
router.get("/", getProducts);

export default router;
