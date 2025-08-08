import express from "express";
import {
  createProduct,
  getProductBySlug,
  getProducts,
} from "./product.controller";
import { authGuard } from "../../middleware/auth";
import { validateRequestBody } from "../../middleware/validation";
import { CreateProductInputSchema } from "../../dto/product.dto";

const router = express.Router();

// Route với single image upload
router.post(
  "/",
  authGuard,
  validateRequestBody(CreateProductInputSchema),
  createProduct
);

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

export default router;
