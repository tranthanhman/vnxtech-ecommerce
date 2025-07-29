import express from "express";
import { createUser, getAllUsers } from "./user.controller";
import { validateRequestBody } from "../../middleware/validation.middleware";
import { CreateUserSchema } from "../../dto/user.dto";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", validateRequestBody(CreateUserSchema), createUser);

export default router;
