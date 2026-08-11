import { siteConfig } from "@/config/site";

export const SITE_URL = siteConfig.url;
export const SITE_NAME = siteConfig.name;

export function getAbsoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/** Escape `<` so JSON-LD cannot break out of the script tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Primary business entity for rich results (LocalBusiness + AutoRepair).
 * Do not add AggregateRating/Review nodes unless we have verifiable first-party reviews.
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: getAbsoluteUrl("/images/shop/logo-mark.png"),
    logo: getAbsoluteUrl("/images/shop/logo-wordmark.png"),
    description: siteConfig.description,
    telephone: siteConfig.phone.e164,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.openingHoursSpecification.map(
      (spec) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: spec.dayOfWeek,
        opens: spec.opens,
        closes: spec.closes,
      }),
    ),
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
      siteConfig.social.yelp,
    ],
    areaServed: {
      "@type": "City",
      name: "Magnolia",
      containedInPlace: {
        "@type": "State",
        name: "Texas",
      },
    },
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: siteConfig.description,
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function getServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: getAbsoluteUrl(input.path),
    serviceType: input.serviceType,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: {
      "@type": "City",
      name: "Magnolia",
    },
  };
}

export function getEventSchema(input: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  locationAddress: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate ?? input.startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: input.image ? [getAbsoluteUrl(input.image)] : undefined,
    url: getAbsoluteUrl(input.url),
    location: {
      "@type": "Place",
      name: input.locationName,
      address: input.locationAddress,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function getBreadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}
