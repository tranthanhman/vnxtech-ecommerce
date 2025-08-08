import express from "express";
import { createUser, getAllUsers, getMe } from "./user.controller";
import { validateRequestBody } from "../../middleware/validation";
import { CreateUserSchema } from "../../dto/user.dto";
import { authGuard } from "@/middleware/auth";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", validateRequestBody(CreateUserSchema), createUser);
router.get("/me", authGuard, getMe);

export default router;
