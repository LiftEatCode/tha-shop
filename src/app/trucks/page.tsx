import type { Metadata } from "next";

import { GalleryPageView } from "@/components/sections/gallery-page";
import { galleryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: galleryPages.trucks.title,
  description: galleryPages.trucks.metaDescription,
  alternates: { canonical: "/trucks" },
};

export default function TrucksPage() {
  return (
    <GalleryPageView
      breadcrumbName="Trucks"
      path="/trucks"
      content={galleryPages.trucks}
      ctaTitle="Talk about a truck project"
    />
  );
}
