import express from "express";
import * as mediaController from "./media.controller";
import { authGuard } from "../../middleware/auth";
import { upload } from "../../middleware/upload";

const router = express.Router();

router.get("/", authGuard, mediaController.getListMedia);
router.post("/upload", authGuard, upload.array("files"), mediaController.uploadImage);
router.delete("/:id", authGuard, mediaController.deleteMedia);

export default router;
