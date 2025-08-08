import express from "express";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
  getProductsByCategory,
  updateCategoryById,
} from "./category.controller";
import { authGuard } from "../../middleware/auth";

const router = express.Router();

router.get("/", getAllCategory);
router.post("/", authGuard, createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategoryById);
router.get("/:slug/products", getProductsByCategory);

export default router;
