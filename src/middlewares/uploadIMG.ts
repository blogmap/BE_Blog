import { Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import cloudinary from '../services/cloudinaryConfig'; // Import Cloudinary config từ cloudinaryConfig.ts
import sharp from 'sharp';

// Cấu hình multer để lưu trữ ảnh ở bộ nhớ
const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage: storage });

// Middleware upload ảnh lên Cloudinary
export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file; // Lấy file từ trường 'image' trong form-data
    if (!file) {
      return next(new Error('No image file provided'));
    }

    // Resize ảnh (tùy chọn)
    const resizedBuffer: Buffer = await sharp(file.buffer)
      .resize({ width: 800, height: 600 }) // Bạn có thể thay đổi kích thước theo ý muốn
      .toBuffer();

    // Upload ảnh lên Cloudinary
    cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'posts' }, // Đặt tên thư mục Cloudinary nếu cần
      (err: any, result: any) => {
        if (err) {
          console.error('Cloudinary upload error:', err);
          return next(err);
        }

        if (!result) {
          return next(new Error('Cloudinary upload result is undefined'));
        }

        // Lưu URL ảnh vào body của request để tiếp tục sử dụng
        req.body.cloudinaryUrl = result.secure_url;
        next();
      }
    ).end(resizedBuffer);
  } catch (error) {
    console.error('Error in uploadToCloudinary middleware:', error);
    next(error);
  }
};
