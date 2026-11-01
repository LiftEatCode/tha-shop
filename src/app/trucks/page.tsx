import { publicGallery } from "@/lib/gallery/store";
import type { Metadata } from "next";

import { GalleryPageView } from "@/components/sections/gallery-page";
import { galleryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: galleryPages.trucks.title,
  description: galleryPages.trucks.metaDescription,
  alternates: { canonical: "/trucks" },
};

export const dynamic = "force-dynamic";
export default async function TrucksPage() {
  const images = await publicGallery("trucks");
  return (
    <GalleryPageView
      breadcrumbName="Trucks"
      path="/trucks"
      content={{ ...galleryPages.trucks, images }}
      ctaTitle="Talk about a truck project"
    />
  );
}
