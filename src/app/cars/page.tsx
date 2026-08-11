import type { Metadata } from "next";

import { GalleryPageView } from "@/components/sections/gallery-page";
import { galleryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: galleryPages.cars.title,
  description: galleryPages.cars.metaDescription,
  alternates: { canonical: "/cars" },
};

export default function CarsPage() {
  return (
    <GalleryPageView
      breadcrumbName="Cars"
      path="/cars"
      content={galleryPages.cars}
      ctaTitle="Want your car in the gallery?"
    />
  );
}
