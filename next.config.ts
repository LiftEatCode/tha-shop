import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/events-1",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
