// middlewares/upload.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Đảm bảo thư mục public/uploads/<year> tồn tại
const currentYear = new Date().getFullYear();
const uploadDir = path.join(process.cwd(), 'public', 'uploads', `${currentYear}`);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình storage cho multer để lưu vào public/uploads/<year>
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // lưu vào thư mục public/uploads/<year>
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

// Bộ lọc định dạng file (nếu cần)
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Khởi tạo middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});
