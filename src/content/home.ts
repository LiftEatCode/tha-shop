export const subBrands = [
  {
    id: "crazy-eight",
    name: "Crazy Eight Customs",
    href: "/fabrication-services",
    image: "/images/brands/crazy-eight.jpg",
    imageAlt: "Crazy Eight Customs logo",
    summary:
      "Custom and performance builds for hot rods, Harleys, antiques, and classics — from concept sketches to finished machines.",
    body: "Crazy Eight Customs is dedicated to custom and performance work — motorcycle services and builds, classic restorations, hot rods, and one-off projects built from the ground up. You get clear status updates through the job and results that match the vision you brought in, not a catalog clone.",
  },
  {
    id: "old-guys",
    name: "Old Guys Garage",
    href: "/auto-services",
    image: "/images/brands/old-guys-garage.jpg",
    imageAlt: "Old Guys Garage logo",
    summary:
      "Everyday maintenance and honest repairs on cars and trucks — brakes, suspension, alignments, exhaust, tune-ups, A/C, and electrical.",
    // Live site reused Crazy Eight SEO copy for this section; this text is the
    // distinct service identity (general repair) rather than that duplicated blurb.
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
    body: "Hotrod Fabrication designs and builds metal signage and custom fab in-house — cutting, forming, welding, and finishing steel, aluminum, and stainless for storefront signs, brackets, frames, and project parts that have to survive real Texas weather.",
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
      "Presented by Tha Shop: two days of burnout contests, live music, food, vendors, giveaways, and riders from across Texas. All bikes welcome — baggers, choppers, cruisers, touring, sport, and customs.",
    href: "/event-calendar",
    image: "/images/gallery/events/burnout-bash.jpg",
    imageAlt: "Motorcycle event flyer for Burnout Bash at Drifters",
  },
} as const;
