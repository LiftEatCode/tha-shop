import type { Metadata } from "next";

import { GalleryPageView } from "@/components/sections/gallery-page";
import { galleryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: galleryPages.events.title,
  description: galleryPages.events.metaDescription,
  alternates: { canonical: "/events" },
};

export default function EventsGalleryPage() {
  return (
    <GalleryPageView
      breadcrumbName="Events"
      path="/events"
      content={galleryPages.events}
      priorityCount={2}
    />
  );
}
