import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/auth/"],
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    // Host is a non-Google directive (Yandex); keep bare hostname only.
    host: siteConfig.domain,
  };
}
