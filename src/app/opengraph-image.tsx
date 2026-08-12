import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = "Tha Shops — Auto & Motorcycle Repair in Magnolia, TX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, #12151a 0%, #1f2933 55%, #b01020 140%)",
          color: "#e4e7eb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          Magnolia, TX
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 0.95,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 34,
              maxWidth: 820,
              lineHeight: 1.25,
              opacity: 0.9,
            }}
          >
            Auto repair, motorcycle service, fleet care, and custom fabrication
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, opacity: 0.85 }}>
          {siteConfig.phone.display} · {siteConfig.address.full}
        </div>
      </div>
    ),
    { ...size },
  );
}
