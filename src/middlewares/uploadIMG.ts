import { Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import cloudinary from '../services/cloudinaryConfig'; 
import sharp from 'sharp';

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage: storage });

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file; 
    if (!file) {
      return next(new Error('No image file provided'));
    }

    const resizedBuffer: Buffer = await sharp(file.buffer)
      .resize({ width: 800, height: 600 }) 
      .toBuffer();

    cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'posts' }, 
      (err: any, result: any) => {
        if (err) {
          console.error('Cloudinary upload error:', err);
          return next(err);
        }

        if (!result) {
          return next(new Error('Cloudinary upload result is undefined'));
        }

        req.body.cloudinaryUrl = result.secure_url;
        next();
      }
    ).end(resizedBuffer);
  } catch (error) {
    console.error('Error in uploadToCloudinary middleware:', error);
    next(error);
  }
};
