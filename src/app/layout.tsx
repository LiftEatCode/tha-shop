import type { Metadata } from "next";
import { Barlow, Big_Shoulders_Stencil, IBM_Plex_Mono } from "next/font/google";

import { ConversionClickTracker } from "@/components/analytics/conversion-clicks";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { siteConfig } from "@/config/site";
import {
  getLocalBusinessSchema,
  getWebsiteSchema,
  serializeJsonLd,
} from "@/lib/seo";

import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const stencil = Big_Shoulders_Stencil({
  variable: "--font-stencil",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Auto & Motorcycle Repair in Magnolia, TX`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/images/shop/logo-wordmark.png",
        width: 600,
        height: 300,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/shop/logo-wordmark.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [getLocalBusinessSchema(), getWebsiteSchema()];

  return (
    <html
      lang="en"
      className={`${barlow.variable} ${stencil.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="text-bay flex min-h-full flex-col font-sans">
        <a
          href="#main-content"
          className="focus:bg-engine sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <SiteFooter />
        <MobileCallBar />
        <GoogleAnalytics />
        <ConversionClickTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(structuredData),
          }}
        />
      </body>
    </html>
  );
}
