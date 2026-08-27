import { isRouteEnabled } from "./features";

export type NavLink = {
  name: string;
  href: string;
  description?: string;
};

export type NavItem = {
  name: string;
  href: string;
  items?: NavLink[];
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "For Sale", href: "/for-sale" },
  {
    name: "Services",
    href: "/auto-services",
    items: [
      {
        name: "Auto Services",
        description: "Diagnostics, maintenance, and full auto repair.",
        href: "/auto-services",
      },
      {
        name: "Motorcycle Services",
        description: "Scheduled service, performance, and custom work.",
        href: "/motorcycle-services",
      },
      {
        name: "Fleet Services",
        description: "Priority maintenance for commercial fleets.",
        href: "/fleet-services",
      },
      {
        name: "Crazy Eight Customs",
        description:
          "Custom and performance builds for bikes, rods, and classics.",
        href: "/crazy-eight-customs",
      },
      {
        name: "Fabrication Services",
        description: "Custom metalwork, builds, and shop fabrication.",
        href: "/fabrication-services",
      },
    ],
  },
  {
    name: "The Garage",
    href: "/cars",
    items: [
      {
        name: "Cars",
        description: "Custom builds, repairs, and projects from the shop.",
        href: "/cars",
      },
      {
        name: "Trucks",
        description: "Truck builds, lifts, and repair work.",
        href: "/trucks",
      },
      {
        name: "Motorcycles",
        description: "Bike builds, service, and custom projects.",
        href: "/motorcycles",
      },
      {
        name: "Events",
        description: "Rallies, shows, and shop community photos.",
        href: "/events",
      },
    ],
  },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Event Calendar", href: "/event-calendar" },
  { name: "Store", href: "/store" },
] satisfies NavItem[];

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "For Sale", href: "/for-sale" },
  { name: "Auto Services", href: "/auto-services" },
  { name: "Motorcycle Services", href: "/motorcycle-services" },
  { name: "Crazy Eight Customs", href: "/crazy-eight-customs" },
  { name: "Fabrication", href: "/fabrication-services" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms-and-conditions" },
] as const;

export const siteConfig = {
  name: "Tha Shop",
  legalName: "Tha Shop",
  url: "https://thashops.com",
  domain: "thashops.com",
  tagline:
    "Auto repair, motorcycle service, and custom fabrication in Magnolia, TX",
  description:
    "Tha Shop provides auto repair, motorcycle service, fleet maintenance, classic restoration, and custom fabrication at 24495 FM 1488 in Magnolia, Texas.",
  phone: {
    display: "(936) 297-0820",
    href: "tel:+19362970820",
    e164: "+19362970820",
  },
  address: {
    street: "24495 FM 1488",
    city: "Magnolia",
    state: "TX",
    postalCode: "77355",
    country: "US",
    full: "24495 FM 1488, Magnolia, TX 77355",
  },
  geo: {
    // Matches coordinates published on the live thashops.com LocalBusiness schema.
    latitude: 30.1886999,
    longitude: -95.8240045,
  },
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=24495%20FM%201488%2C%20Magnolia%2C%20TX%2077355",
  hours: [
    {
      days: "Monday–Friday",
      opens: "08:00",
      closes: "18:00",
      label: "8:00 AM – 6:00 PM",
    },
    { days: "Saturday–Sunday", opens: null, closes: null, label: "Closed" },
  ],
  openingHoursSpecification: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100054198384886",
    facebookAlt: "https://www.facebook.com/723233824202322",
    instagram: "https://www.instagram.com/thashops/",
    tiktok: "https://www.tiktok.com/@tha_shops",
    yelp: "https://www.yelp.com/biz/KFC9OqJRx3tu6daH91O2Rw",
  },
  discountBanner:
    "10% off parts and labor for veterans, first responders, and teachers",
  primaryCta: {
    name: "Request an Appointment",
    href: "/contact#appointment",
  },
  blog: {
    defaultAuthor: "Tha Shop Team",
  },
  navigation: navigation.filter((item) => isRouteEnabled(item.href)),
  footerLinks: footerLinks.filter((item) => isRouteEnabled(item.href)),
};
