import { z } from "zod";
import { isImageUrl } from "../media/image-url";
export const galleryCategories = [
  "cars",
  "trucks",
  "motorcycles",
  "events",
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];
export const galleryInput = z
  .object({
    category: z.enum(galleryCategories),
    src: z.string().max(2048).refine(isImageUrl, "Use an uploaded image"),
    alt: z.string().trim().max(300),
    caption: z.string().trim().max(1000),
    album: z.string().trim().max(120),
    position: z.number().int().min(0).max(1000000),
    is_cover: z.boolean(),
    visible: z.boolean(),
  })
  .refine((v) => !v.visible || v.alt.length > 0, {
    message: "Add an image description before publishing",
    path: ["alt"],
  });
export type GalleryInput = z.infer<typeof galleryInput>;
export type GalleryRecord = GalleryInput & { id: string; version: number };
