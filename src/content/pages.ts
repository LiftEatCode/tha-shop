export const aboutContent = {
  title: "About Us",
  description:
    "Meet Tha Shops in Magnolia, TX — auto and motorcycle repair, restoration, and custom builds with a focus on safety and craftsmanship.",
  mission: {
    title: "Mission and philosophy",
    body: "Great auto care starts with people you can trust. We take the responsibility you place in us seriously — keeping you and the people who ride with you safe on the road. Loyalty, honesty, accountability, teamwork, innovation, and passion guide how we diagnose problems, explain options, and finish the job.",
  },
  craft: {
    title: "Beyond repairs: your vision, our craft",
    body: "Honest repair work is the foundation, but it is only part of what happens here. Custom motorcycle builds, one-off cars and trucks, frame-up projects, performance upgrades, lifts, paint, and interior work all live under the same roof. If you have a dream build or an upgrade you have been sitting on, bring it in and we will map a real plan.",
  },
  discount: {
    title: "Military, first responders, and teachers",
    body: "We offer 10% off parts and labor for veterans, first responders, and teachers. Ask at the counter when you check in — we are glad to honor the people who serve this community.",
  },
  image: "/images/brands/about-side.jpg",
  imageAlt: "Tha Shops shop floor and project vehicles",
} as const;

export const inventory = [
  {
    id: "sunbeam-alpine-62",
    title: "1962 Sunbeam Alpine",
    shortTitle: "62 Sunbeam Alpine",
    category: "Classic car",
    description:
      "A rare classic roadster with sleek vintage lines and timeless British style. Fully inspected, turn-key ready, and waiting for its next weekend cruise.",
    image: "/images/inventory/sunbeam-1.jpg",
    imageAlt: "1962 Sunbeam Alpine for sale at Tha Shops",
  },
  {
    id: "mustang-66",
    title: "1966 Ford Mustang",
    shortTitle: "1966 Ford Mustang",
    category: "Classic car",
    description:
      "An iconic American classic packed with style and sound. Drives as clean as it looks — come test drive a true piece of automotive history.",
    image: "/images/inventory/mustang-1.jpg",
    imageAlt: "1966 Ford Mustang for sale at Tha Shops",
  },
  {
    id: "cougar-2022",
    title: "2022 Cougar",
    shortTitle: "2022 Cougar",
    category: "RV",
    description:
      "Modern luxury on wheels. Loaded with premium amenities, spacious layout, and impeccably maintained for your next adventure.",
    image: "/images/inventory/cougar-1.jpg",
    imageAlt: "2022 Cougar RV for sale at Tha Shops",
  },
  {
    id: "freightliner-glider-2016",
    title: "2016 Freightliner Glider",
    shortTitle: "2016 Freightliner Glider",
    category: "Commercial truck",
    description:
      "Heavy-duty power engineered for the long haul. Fully serviced, spec sheet attached, and ready to go straight to work.",
    image: "/images/inventory/freightliner-1.jpg",
    imageAlt: "2016 Freightliner Glider for sale at Tha Shops",
  },
] as const;

export const services = {
  auto: {
    title: "Auto Services",
    metaTitle: "Auto Repair Services",
    metaDescription:
      "Diagnostics, factory maintenance, brakes, suspension, electrical, and drivetrain repair at Tha Shops in Magnolia, TX.",
    h1: "Auto repair built around diagnostics and clear recommendations",
    intro:
      "From scheduled maintenance to the check-engine light that will not go away, our auto bay covers the work most Magnolia drivers need under one roof. We diagnose first, explain what we find, and get your vehicle back on the road without the runaround.",
    categories: [
      {
        title: "Standard maintenance",
        items: [
          "30/60/90/120K mile services",
          "Oil changes and fluid services",
          "Tune-ups and filter replacements",
          "Safety and emissions inspections",
          "Windshield wiper blade replacement",
          "Check engine light diagnostics",
          "Brake and ABS repair",
          "Shocks, struts, chassis, and steering repair",
        ],
      },
      {
        title: "Engine services",
        items: [
          "Engine repair and replacement",
          "Engine performance checks",
          "Belt and hose replacement",
          "Cooling system repair",
          "Radiator repair and replacement",
          "Water pump repair and replacement",
        ],
      },
      {
        title: "Electrical",
        items: [
          "Electrical system diagnostics",
          "Battery, starter, and alternator service",
          "Power window, lock, and seat repair",
        ],
      },
      {
        title: "Drivetrain, exhaust, tires, and climate",
        items: [
          "Transmission service and repair",
          "Exhaust repair and replacement",
          "Tire mounting, balancing, and repair",
          "Heating and air conditioning service",
        ],
      },
    ],
  },
  motorcycle: {
    title: "Motorcycle Services",
    metaTitle: "Motorcycle Repair & Customization",
    metaDescription:
      "Motorcycle maintenance, tires, brakes, chain service, and performance upgrades at Tha Shops in Magnolia, TX.",
    h1: "Motorcycle repair and customization that keeps you ride-ready",
    intro:
      "Every time you throw a leg over the bike, you want it ready for the open road. We handle break-in and mileage services, then move into the custom and performance work that makes the bike yours.",
    categories: [
      {
        title: "Routine maintenance",
        items: [
          "500-mile break-in service",
          "5K, 10K, and 20K scheduled services",
          "Oil and filter changes",
          "Brake pad, rotor, and fluid service",
          "Tire mounting, balancing, and repair",
          "Chain and sprocket maintenance",
        ],
      },
      {
        title: "Upgrades and custom work",
        items: [
          "Handlebar and seat upgrades",
          "Chain drive installs",
          "Exhaust systems",
          "Tuners and high-flow air intakes",
          "Full custom builds",
        ],
      },
    ],
  },
  fleet: {
    title: "Fleet Services",
    metaTitle: "Fleet Maintenance & Repair",
    metaDescription:
      "Priority fleet scheduling, preventive maintenance, and digital service records from Tha Shops in Magnolia, TX.",
    h1: "Precision fleet care that keeps your business moving",
    intro:
      "Vehicle downtime is lost revenue. Fleet partners get priority scheduling, preventive programs matched to how you use the vehicles, and digital records that make audits and resale simpler.",
    points: [
      {
        title: "Priority scheduling and rapid turnaround",
        body: "Emergency repairs and routine inspections for commercial vehicles move to the front of the line so your team is back on the road in hours, not days.",
      },
      {
        title: "Preventive maintenance that prevents breakdowns",
        body: "PM programs tailored to light-duty vans or heavy-duty trucks, with service history tracking so critical mileages are not missed.",
      },
      {
        title: "Digital fleet records and compliance support",
        body: "Digital service records help you track cost of ownership, stay ready for DOT inspections, and document maintenance for warranties or resale.",
      },
      {
        title: "Transparent fleet billing",
        body: "Competitive fleet labor rates and clear invoices — no surprise fees after the work is done.",
      },
    ],
  },
  fabrication: {
    title: "Fabrication Services",
    metaTitle: "Custom Fabrication & Metalwork",
    metaDescription:
      "Custom metal fabrication, project builds, and durable signage from Hotrod Fabrication at Tha Shops in Magnolia, TX.",
    h1: "Custom fabrication for vehicles and durable metal signage",
    intro:
      "Hotrod Fabrication designs and builds metalwork in-house — from brackets and structural pieces for project vehicles to storefront and interior signage that has to survive real weather and daily wear.",
    body: [
      "We cut, form, weld, and finish steel, aluminum, and stainless so every piece fits the job. Projects range from dimensional letters and logo panels to custom frames, brackets, and architectural sign structures.",
      "Durability is planned up front: environmental exposure, structural support, powder coating, and protective finishes so the work still looks right years later — indoors or outside.",
    ],
  },
} as const;

export const eventsCalendar = [
  {
    id: "burnout-bash-2026",
    title: "Burnout Bash at Drifters",
    startDate: "2026-10-03",
    endDate: "2026-10-04",
    displayDate: "October 3–4, 2026",
    location: "Drifters, 29293 FM 149, Richards, TX 77873",
    description:
      "ALL BIKES WELCOME — baggers, choppers, cruisers, touring bikes, sport bikes, and customs. Burnout contests, live music, food and drinks, vendors, giveaways, and a full weekend with riders from across Texas.",
    status: "upcoming" as const,
    image: "/images/gallery/events/burnout-bash.jpg",
    imageAlt: "Burnout Bash motorcycle event promotional image",
  },
] as const;

export const pastEventsNote =
  "Earlier rally listings on the previous site (Wrath Motorcycle Rally, Born Free Texas, Lonestar Rally, and Nitty Gritty Chopper City) have passed. Photos from shop events live on the Events gallery page.";

export const galleryPages = {
  cars: {
    title: "Car Gallery",
    metaDescription:
      "Photos of custom builds, repairs, and car projects from Tha Shops in Magnolia, TX.",
    h1: "Cars that have rolled through the shop",
    intro:
      "A look at classic muscle, customs, and daily drivers we have worked on — builds, repairs, and finishes from the bay floor.",
    images: [
      { src: "/images/gallery/cars/1.jpg", alt: "Custom car project at Tha Shops" },
      { src: "/images/gallery/cars/2.jpg", alt: "Finished car detail work at Tha Shops" },
      { src: "/images/gallery/cars/3.jpg", alt: "Classic car in the Tha Shops garage" },
      { src: "/images/gallery/cars/4.jpg", alt: "Performance car build at Tha Shops" },
      { src: "/images/gallery/cars/5.jpg", alt: "Car restoration progress at Tha Shops" },
      { src: "/images/gallery/cars/6.jpg", alt: "Custom paint and body work at Tha Shops" },
      { src: "/images/gallery/cars/7.jpg", alt: "Shop project vehicle at Tha Shops" },
      { src: "/images/gallery/cars/8.jpg", alt: "Completed car service project at Tha Shops" },
      { src: "/images/gallery/cars/home-1.jpg", alt: "Vehicle lineup at Tha Shops" },
      { src: "/images/gallery/cars/home-2.jpg", alt: "Shop floor car project" },
      { src: "/images/gallery/cars/home-3.jpg", alt: "Custom car detail at Tha Shops" },
      { src: "/images/gallery/cars/home-4.jpg", alt: "Finished automotive project" },
    ],
  },
  trucks: {
    title: "Truck Gallery",
    metaDescription:
      "Truck builds, lifts, and repair projects photographed at Tha Shops in Magnolia, TX.",
    h1: "Trucks from the shop floor",
    intro:
      "Lifts, custom work, and heavy-duty repairs — a sample of the trucks that come through Tha Shops.",
    images: [
      { src: "/images/gallery/trucks/1.jpg", alt: "Custom truck at Tha Shops" },
      { src: "/images/gallery/trucks/2.jpg", alt: "Lifted truck project at Tha Shops" },
      { src: "/images/gallery/trucks/3.jpg", alt: "Truck repair and build work" },
      { src: "/images/gallery/trucks/4.jpg", alt: "Shop truck project detail" },
      { src: "/images/gallery/trucks/5.jpg", alt: "Completed truck build at Tha Shops" },
      { src: "/images/gallery/trucks/6.jpg", alt: "Truck customization at Tha Shops" },
      { src: "/images/gallery/trucks/7.jpg", alt: "Heavy-duty truck service project" },
      { src: "/images/gallery/trucks/8.jpg", alt: "Truck on the Tha Shops lot" },
    ],
  },
  motorcycles: {
    title: "Motorcycle Gallery",
    metaDescription:
      "Motorcycle builds, customs, and service projects from Tha Shops in Magnolia, TX.",
    h1: "Motorcycles built and serviced here",
    intro:
      "Customs, cruisers, and service work from the motorcycle side of the shop.",
    images: [
      { src: "/images/gallery/motorcycles/1.jpg", alt: "Custom motorcycle at Tha Shops" },
      { src: "/images/gallery/motorcycles/2.jpg", alt: "Motorcycle service project" },
      { src: "/images/gallery/motorcycles/3.jpg", alt: "Bike build in the shop" },
      { src: "/images/gallery/motorcycles/4.jpg", alt: "Finished motorcycle custom work" },
      { src: "/images/gallery/motorcycles/5.jpg", alt: "Harley or cruiser project at Tha Shops" },
      { src: "/images/gallery/motorcycles/6.jpg", alt: "Motorcycle detail and chrome work" },
      { src: "/images/gallery/motorcycles/7.jpg", alt: "Shop motorcycle lineup" },
      { src: "/images/gallery/motorcycles/8.jpg", alt: "Custom bike at Tha Shops" },
    ],
  },
  events: {
    title: "Events Gallery",
    metaDescription:
      "Photos from motorcycle rallies, shop gatherings, and community events with Tha Shops.",
    h1: "Events and community",
    intro:
      "Rallies, meets, and shop gatherings — the people and machines that show up when the community rolls out.",
    images: [
      { src: "/images/gallery/events/burnout-bash.jpg", alt: "Burnout Bash event" },
      { src: "/images/gallery/events/1000017766.jpg", alt: "Shop event crowd and bikes" },
      { src: "/images/gallery/events/1000017768.jpg", alt: "Motorcycle event photo" },
      { src: "/images/gallery/events/1000017769.jpg", alt: "Riders at a Tha Shops event" },
      { src: "/images/gallery/events/1000017770.jpg", alt: "Event bikes on display" },
      { src: "/images/gallery/events/1000017771.jpg", alt: "Community motorcycle gathering" },
      { src: "/images/gallery/events/1000017772.jpg", alt: "Shop event highlight" },
      { src: "/images/gallery/events/1000017773.jpg", alt: "Riders and customs at an event" },
      { src: "/images/gallery/events/1000017774.jpg", alt: "Event day at the shop community" },
      { src: "/images/gallery/events/1000018039.jpg", alt: "Motorcycle rally photo" },
      { src: "/images/gallery/events/1000018470.jpg", alt: "Show bike at a local event" },
      { src: "/images/gallery/events/1000018482.jpg", alt: "Event staging and bikes" },
      { src: "/images/gallery/events/1000018484.jpg", alt: "Custom motorcycle at a show" },
      { src: "/images/gallery/events/1000018486.jpg", alt: "Crowd and machines at an event" },
      { src: "/images/gallery/events/1000018487.jpg", alt: "Night event motorcycle lineup" },
      { src: "/images/gallery/events/1000018488.jpg", alt: "Shop community event photo" },
      { src: "/images/gallery/events/1000018489.jpg", alt: "Riders gathered for an event" },
      { src: "/images/gallery/events/IMG_8255.jpg", alt: "Event photo from Tha Shops community" },
      { src: "/images/gallery/events/IMG_8258_108.jpg", alt: "Motorcycle event action shot" },
      { src: "/images/gallery/events/IMG_8272.jpg", alt: "Show floor motorcycles" },
      { src: "/images/gallery/events/IMG_8277.jpg", alt: "Custom bike at community event" },
      { src: "/images/gallery/events/IMG_8279.jpg", alt: "Event attendees and bikes" },
      { src: "/images/gallery/events/IMG_8280.jpg", alt: "Tha Shops event gallery photo" },
    ],
  },
} as const;
