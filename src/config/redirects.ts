/**
 * Permanent redirects from the former GoDaddy / Wix site.
 *
 * Add a `{ source, destination }` pair here. `next.config.ts` applies
 * `permanent: true` (HTTP 308) to every entry.
 *
 * Do not add a catch-all to `/`. Unknown old URLs should 404.
 * Do not point `/ols/all` at `/store` while the Store is disabled.
 */
export const permanentRedirects = [
  { source: "/events-1", destination: "/events" },
  { source: "/ols/all", destination: "/" },
  {
    source: "/blog/f/upcoming-ride-into-the-lone-star-rally-2025",
    destination: "/events",
  },
  {
    source:
      "/blog/f/born-free-texas-2025-the-ultimate-motorcycle-rally-in-the-heart",
    destination: "/events",
  },
  {
    source:
      "/blog/f/1962-dodge-d100-sweptline-a-classic-dodge-pickup-worth-restoring",
    destination: "/blog/1962-dodge-d100-sweptline",
  },
  {
    source:
      "/blog/f/how-to-inspect-a-classic-car-before-buying-one-a-complete-guide",
    destination: "/blog/how-to-inspect-a-classic-car-before-buying",
  },
  {
    source:
      "/blog/f/1945-harley-davidson-wl-the-flathead-that-shaped-harley-history",
    destination: "/blog/1945-harley-davidson-wl",
  },
  {
    source: "/blog/f/5-affordable-mods-to-improve-motorcycle-performance",
    destination: "/blog/5-affordable-motorcycle-performance-mods",
  },
] as const;
