import { publicGallery } from "@/lib/gallery/store";
import type { Metadata } from "next";

import { GalleryPageView } from "@/components/sections/gallery-page";
import { galleryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: galleryPages.events.title,
  description: galleryPages.events.metaDescription,
  alternates: { canonical: "/events" },
};

export const dynamic = "force-dynamic";
export default async function EventsGalleryPage() {
  const images = await publicGallery("events");
  return (
    <GalleryPageView
      breadcrumbName="Events"
      path="/events"
      content={{ ...galleryPages.events, images }}
      priorityCount={2}
    />
  );
}
