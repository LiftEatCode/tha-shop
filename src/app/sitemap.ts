import type { MetadataRoute } from "next";

import { getBlogSitemapEntries } from "@/content/blog";
import { isRouteEnabled } from "@/config/features";
import { getAbsoluteUrl } from "@/lib/seo";

const routes = [
  "/",
  "/about",
  "/for-sale",
  "/auto-services",
  "/motorcycle-services",
  "/fleet-services",
  "/crazy-eight-customs",
  "/fabrication-services",
  "/cars",
  "/trucks",
  "/motorcycles",
  "/events",
  "/contact",
  "/blog",
  "/event-calendar",
  "/store",
  "/privacy-policy",
  "/terms-and-conditions",
].filter((path) => isRouteEnabled(path));

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = routes.map((path) => ({
    url: getAbsoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : path.includes("services") ? 0.8 : 0.6,
  }));

  const blogEntries = getBlogSitemapEntries().map((entry) => ({
    url: getAbsoluteUrl(entry.path),
    lastModified: new Date(entry.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
