import type { Metadata } from "next";

import { GalleryPageView } from "@/components/sections/gallery-page";
import { galleryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: galleryPages.motorcycles.title,
  description: galleryPages.motorcycles.metaDescription,
  alternates: { canonical: "/motorcycles" },
};

export default function MotorcyclesGalleryPage() {
  return (
    <GalleryPageView
      breadcrumbName="Motorcycles"
      path="/motorcycles"
      content={galleryPages.motorcycles}
      ctaTitle="Start a bike build or service"
    />
  );
}
