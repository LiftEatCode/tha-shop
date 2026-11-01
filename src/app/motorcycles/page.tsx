import { publicGallery } from "@/lib/gallery/store";
import type { Metadata } from "next";

import { VikingBagsPartner } from "@/components/sections/viking-bags-partner";

import { GalleryPageView } from "@/components/sections/gallery-page";
import { galleryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: galleryPages.motorcycles.title,
  description: galleryPages.motorcycles.metaDescription,
  alternates: { canonical: "/motorcycles" },
};

export const dynamic = "force-dynamic";
export default async function MotorcyclesGalleryPage() {
  const images = await publicGallery("motorcycles");
  return (
    <>
      <GalleryPageView
        breadcrumbName="Motorcycles"
        path="/motorcycles"
        content={{ ...galleryPages.motorcycles, images }}
        ctaTitle="Start a bike build or service"
      />
      <VikingBagsPartner />
    </>
  );
}
