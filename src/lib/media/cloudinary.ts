import "server-only";
import { randomUUID } from "node:crypto";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { isImageUrl } from "./image-url";
export function cloudinaryConfig() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const api_key = process.env.CLOUDINARY_API_KEY?.trim();
  const api_secret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (!cloud_name || !api_key || !api_secret)
    throw new Error("Cloudinary is not configured");
  return { cloud_name, api_key, api_secret, secure: true };
}
export async function uploadImage(data: Buffer) {
  const config = cloudinaryConfig();
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        ...config,
        resource_type: "image",
        type: "upload",
        public_id: `tha-shop/${randomUUID()}`,
        overwrite: false,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [
          { width: 1920, height: 1920, crop: "limit", quality: "auto" },
        ],
        timeout: 45000,
      },
      (error, result) => {
        if (error || !result) reject(new Error("Image upload failed"));
        else resolve(result);
      },
    );
    stream.on("error", () => reject(new Error("Image upload failed")));
    stream.end(data);
  });
  const url = cloudinary.url(result.public_id, {
    cloud_name: config.cloud_name,
    secure: true,
    resource_type: "image",
    type: "upload",
    version: result.version,
    format: result.format,
    analytics: false,
    fetch_format: "auto",
    quality: "auto",
  });
  if (!isImageUrl(url)) throw new Error("Invalid image response");
  return {
    url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}
