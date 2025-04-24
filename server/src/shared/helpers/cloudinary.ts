// --- Libraries
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { config } from "dotenv";

// --- Load Environment Variables from .env

config();

// --- Cloudinary Configurations

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  // secure: true,
});

// --- Cloudinary Upload Image

export const cloudinaryUploadImage = async (fileToUpload: string): Promise<UploadApiResponse> => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "baghdad-shop/products",
    });
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Cloudinary Error";
    throw new Error(errorMessage);
  }
};

// --- Cloudinary Remove Image

export const cloudinaryRemoveImage = async (imagePublicId: string): Promise<UploadApiResponse> => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Cloudinary Error";
    throw new Error(errorMessage);
  }
};
