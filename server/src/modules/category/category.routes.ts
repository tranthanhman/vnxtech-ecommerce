import express from "express";
import { createCategory } from "./category.controller";
import {authGuard} from "../../middleware/auth";

const router = express.Router();

router.post("/", authGuard, createCategory);

export default router;
