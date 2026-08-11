export const subBrands = [
  {
    id: "crazy-eight",
    name: "Crazy Eight Customs",
    href: "/fabrication-services",
    image: "/images/brands/crazy-eight.jpg",
    imageAlt: "Crazy Eight Customs logo",
    summary:
      "Custom and performance builds for hot rods, Harleys, antiques, and classics — from concept sketches to finished machines.",
    body: "Crazy Eight Customs is the performance and custom-build arm of Tha Shops. This is where frame-up projects, antique and classic restorations, Harley work, and one-off custom vehicles get planned and built. If you want a machine that looks, sounds, and drives the way you imagined — not a catalog clone — this is the division that owns that work.",
  },
  {
    id: "old-guys",
    name: "Old Guys Garage",
    href: "/auto-services",
    image: "/images/brands/old-guys-garage.jpg",
    imageAlt: "Old Guys Garage logo",
    summary:
      "Everyday maintenance and honest repairs on cars and trucks — brakes, suspension, alignments, exhaust, tune-ups, A/C, and electrical.",
    body: "Old Guys Garage is the bread-and-butter service bay. Bring daily drivers and work trucks for the maintenance and repairs that keep them safe and reliable: suspension and alignment, brakes, exhaust, tune-ups, heating and A/C, and electrical diagnostics. No drama, no upsell theater — just clear recommendations and work done right the first time.",
  },
  {
    id: "hotrod-fab",
    name: "Hotrod Fabrication",
    href: "/fabrication-services",
    image: "/images/brands/hotrod-fab.jpg",
    imageAlt: "Hotrod Fabrication logo",
    summary:
      "In-house metal fabrication for custom parts, structural work, and durable signage built to last outdoors and on the road.",
    body: "Hotrod Fabrication is the metal shop behind the builds. Cutting, forming, welding, and finishing happen in-house so brackets, frames, panels, and custom metal signs are made to fit the job — not jury-rigged from whatever is on the shelf. Whether you need structural fab for a project vehicle or storefront signage that can take Texas weather, this is the team that shapes the steel.",
  },
] as const;

export const homeContent = {
  hero: {
    title: "Tha Shops",
    headline: "Repair, restore, and build it right in Magnolia.",
    supporting:
      "Auto repair, motorcycle service, fleet care, and custom fabrication under one roof on FM 1488.",
    image: "/images/shop/hero-photo.jpg",
    imageAlt:
      "Tha Shops facility and vehicles at 24495 FM 1488 in Magnolia, Texas",
  },
  intro: {
    title: "One shop. Three specialties.",
    body: "Tha Shops brings general repair, motorcycle work, and custom fabrication together so you are not bouncing between specialists for a daily driver, a fleet van, and a project build. Walk in for an oil change or a full custom — the same crew owns the outcome.",
  },
  servicesPreview: [
    {
      title: "Auto Services",
      href: "/auto-services",
      description:
        "Factory maintenance, diagnostics, brakes, suspension, electrical, and drivetrain repair.",
    },
    {
      title: "Motorcycle Services",
      href: "/motorcycle-services",
      description:
        "Mileage services, tires, brakes, chain and sprocket work, and performance upgrades.",
    },
    {
      title: "Fleet Services",
      href: "/fleet-services",
      description:
        "Priority scheduling, preventive maintenance, and digital service records for commercial vehicles.",
    },
    {
      title: "Fabrication",
      href: "/fabrication-services",
      description:
        "Custom metalwork, project fabrication, and durable signage built in-house.",
    },
  ],
  featuredEvent: {
    title: "Burnout Bash at Drifters",
    dates: "October 3–4, 2026",
    location: "Drifters, 29293 FM 149, Richards, TX 77873",
    description:
      "All bikes welcome for burnout contests, live music, food, vendors, and a full weekend with riders from across Texas.",
    href: "/event-calendar",
    image: "/images/gallery/events/burnout-bash.jpg",
    imageAlt: "Motorcycle event flyer for Burnout Bash at Drifters",
  },
} as const;
