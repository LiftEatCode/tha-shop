import { publicGallery } from "@/lib/gallery/store";
import type { Metadata } from "next";

import { GalleryPageView } from "@/components/sections/gallery-page";
import { galleryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: galleryPages.cars.title,
  description: galleryPages.cars.metaDescription,
  alternates: { canonical: "/cars" },
};

export const dynamic = "force-dynamic";
export default async function CarsPage() {
  const images = await publicGallery("cars");
  return (
    <GalleryPageView
      breadcrumbName="Cars"
      path="/cars"
      content={{ ...galleryPages.cars, images }}
      ctaTitle="Want your car in the gallery?"
    />
  );
}
