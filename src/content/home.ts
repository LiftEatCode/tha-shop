export const subBrands = [
  {
    id: "crazy-eight",
    name: "Crazy Eight Customs",
    href: "/crazy-eight-customs",
    image: "/images/brands/crazy-eight.jpg",
    imageAlt: "Crazy Eight Customs logo",
    accent: "engine" as const,
    workImage: "/images/gallery/cars/home-1.jpg",
    workImageAlt:
      "Mechanic working on a Harley on a lift in the Crazy Eight Customs bay",
    summary:
      "Custom and performance builds for hot rods, Harleys, antiques, and classics — from concept sketches to finished machines.",
    body: "Custom and performance work — bikes, classics, hot rods, and one-off projects built from the ground up. Clear updates through the job, finished the way you pictured it.",
  },
  {
    id: "old-guys",
    name: "Old Guys Garage",
    href: "/auto-services",
    image: "/images/brands/old-guys-garage.jpg",
    imageAlt: "Old Guys Garage logo",
    accent: "lift" as const,
    workImage: "/images/brands/about-side.jpg",
    workImageAlt: "Restored cherry-red Ford pickup in the Old Guys Garage bay",
    summary:
      "Everyday maintenance and honest repairs on cars and trucks — brakes, suspension, alignments, exhaust, tune-ups, A/C, and electrical.",
    body: "The service bay for daily drivers and work trucks. Brakes, suspension, alignments, exhaust, tune-ups, A/C, and electrical — clear recommendations, work done right the first time.",
  },
  {
    id: "hotrod-fab",
    name: "Hotrod Fabrication",
    href: "/fabrication-services",
    image: "/images/brands/hotrod-fab.jpg",
    imageAlt: "Hotrod Fabrication logo",
    accent: "torch" as const,
    workImage: "/images/shop/hero-photo.jpg",
    workImageAlt: "Fabrication and engine work on a custom hot rod",
    summary:
      "In-house metal fabrication for custom parts, structural work, and durable signage built to last outdoors and on the road.",
    body: "In-house cutting, forming, welding, and finishing — steel, aluminum, and stainless for brackets, frames, signs, and project parts that have to survive Texas weather.",
  },
] as const;

export const homeGallery = {
  feature: {
    src: "/images/gallery/cars/home-1.jpg",
    alt: "Harley on a lift with Crazy Eight Customs work in progress",
  },
  side: {
    src: "/images/brands/about-side.jpg",
    alt: "Restored red Ford pickup inside the Magnolia shop",
  },
  tiles: [
    {
      src: "/images/gallery/cars/home-4.jpg",
      alt: "Finished project detail at Tha Shops",
    },
    {
      src: "/images/gallery/motorcycles/3.jpg",
      alt: "Bike build in the Magnolia shop",
    },
    {
      src: "/images/gallery/trucks/1.jpg",
      alt: "Truck restoration in progress at Tha Shops",
    },
    {
      src: "/images/gallery/cars/home-3.jpg",
      alt: "Custom work in the Magnolia bay",
    },
  ],
} as const;

export const homeContent = {
  hero: {
    title: "Tha Shops",
    headline: "Repair, restore, and build it right.",
    supporting:
      "Auto repair, motorcycle service, fleet care, and custom fabrication under one roof on FM 1488 in Magnolia.",
    image: "/images/shop/hero-photo.jpg",
    imageAlt:
      "Mechanic working on a red tri-power engine in a black hot rod at Tha Shops",
  },
  intro: {
    title: "One shop. Three bays.",
    body: "Bring a daily driver, a fleet van, or a project build — the same Magnolia crew owns the outcome. No bouncing between specialists for repair, restoration, and fab.",
  },
  servicesPreview: [
    {
      title: "Auto Services",
      href: "/auto-services",
      description:
        "Diagnostics, maintenance, brakes, suspension, electrical, and drivetrain repair.",
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
  workFloor: {
    title: "Work on the floor",
    body: "Real builds and repairs from the Magnolia bay — not stock photos. Browse the full garage for cars, trucks, motorcycles, and events.",
  },
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
