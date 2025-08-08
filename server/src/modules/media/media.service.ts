import path from "path";
import fs from "fs";
import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

export const getListMedia = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const media = await prisma.media.findMany({
    skip,
    take: limit,
  });

  return media;
};

export const handleUploadFile = async (files: Express.Multer.File[]) => {
  if (!files || files.length === 0) {
    throw new ApiError(400, "No files uploaded");
  }

  const currentYear = new Date().getFullYear();

  const uploaded = await Promise.all(
    files.map(async (file: Express.Multer.File) => {
      const media = await prisma.media.create({
        data: {
          url: `${
            process.env.BASE_URL || "http://localhost:8090"
          }/uploads/${currentYear}/${file.filename}`,
          type: "IMAGE",
          altText: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
        },
      });
      return media;
    })
  );

  return {
    count: uploaded.length,
    media: uploaded,
  };
};

// Hàm để xóa file
export const deleteFile = async (id: string) => {
  const media = await prisma.media.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!media) {
    return;
  }
  const fullPath = path.join(process.cwd(), "public", media.url);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
  await prisma.media.delete({
    where: {
      id: Number(id),
    },
  });
};
