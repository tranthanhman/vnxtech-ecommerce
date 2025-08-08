import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import * as mediaService from "./media.service";
import { success } from "../../utils/response";

export const getListMedia = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 50 } = req.query;
    const media = await mediaService.getListMedia(Number(page), Number(limit));
    return success(res, media, "Media fetched successfully");
  }
);

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const result = await mediaService.handleUploadFile(files);

  return success(res, result, "Files uploaded successfully");
});
  
export const deleteMedia = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await mediaService.deleteFile(id);
  return success(res, null, "File deleted successfully");
});
