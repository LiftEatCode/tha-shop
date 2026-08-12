import type { MetadataRoute } from "next";

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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: getAbsoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.includes("services") ? 0.8 : 0.6,
  }));
}
