export type ProjectSpotlight = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  gallery: "/cars" | "/trucks" | "/motorcycles";
  service: string;
  serviceLabel: string;
  sections: { title: string; body: string }[];
};
/** Photo-led shop spotlights; no unverified customer history or repair outcomes. */
export const projectSpotlights: ProjectSpotlight[] = [
  {
    slug: "hot-rod-engine-bay",
    title: "Hot rod engine work in the Magnolia bay",
    description:
      "A closer look at a mechanic working around a three-carburetor engine at Tha Shop, with planning questions for your own classic or custom project.",
    image: "/images/shop/hero-photo.jpg",
    alt: "Mechanic working around a three-carburetor engine in a black hot rod at Tha Shop",
    gallery: "/cars",
    service: "/services/check-engine-diagnostics",
    serviceLabel: "Engine and check-engine diagnostics",
    sections: [
      {
        title: "Up close with the engine bay",
        body: "This shop-floor photo shows a mechanic leaning into an open engine bay, with three carburetors, polished components, and a red-painted engine. It is a closer view of the hands-on work behind the vehicles in our gallery.",
      },
      {
        title: "Plan around the vehicle you have",
        body: "A classic or custom vehicle may have components that differ from its original specification. When you contact the shop about engine work, include any known engine, fuel-system, ignition, and drivetrain changes, along with the problem you want to solve.",
      },
      {
        title: "Tell us the goal before the parts list",
        body: "A dependable weekend cruiser, a daily driver, and a custom build can call for different plans. Share how you use the vehicle and any previous work or available records so we can discuss the scope before you bring it in.",
      },
    ],
  },
  {
    slug: "harley-in-the-bay",
    title: "A Harley-Davidson on the lift at Tha Shop",
    description:
      "See a Harley-Davidson in the Magnolia workshop and learn what information to bring when planning motorcycle maintenance or custom work.",
    image: "/images/gallery/cars/home-1.jpg",
    alt: "Mechanic beside a burgundy Harley-Davidson motorcycle on a workshop lift",
    gallery: "/motorcycles",
    service: "/services/motorcycle-maintenance",
    serviceLabel: "Motorcycle maintenance in Magnolia",
    sections: [
      {
        title: "A look inside the motorcycle bay",
        body: "The photo shows a burgundy Harley-Davidson on a lift, with a mechanic working beside it. The Crazy Eight Customs banner and workshop equipment place the bike in the same Magnolia shop where we handle motorcycle service and custom work.",
      },
      {
        title: "Maintenance starts with the exact bike",
        body: "For your service request, include the year, model, mileage, and last known service. List modifications separately; an aftermarket component can change the questions we need to ask about maintenance and fitment.",
      },
      {
        title: "Service and custom work have different scopes",
        body: "Oil changes, mileage services, tires, and brake work are part of our motorcycle offering. If you are also considering a handlebar, exhaust, intake, or other change, tell us about the riding experience you want so we can discuss those plans alongside the maintenance needs.",
      },
    ],
  },
  {
    slug: "classic-pickup-in-the-shop",
    title: "A red classic pickup on the shop floor",
    description:
      "A photo spotlight on a red classic pickup at Tha Shop in Magnolia, plus practical planning questions for a truck restoration or custom project.",
    image: "/images/brands/about-side.jpg",
    alt: "Red classic pickup with wood bed rails and black wheels inside Tha Shop",
    gallery: "/trucks",
    service: "/crazy-eight-customs",
    serviceLabel: "Classic and custom project work",
    sections: [
      {
        title: "The details in the photo",
        body: "A red classic pickup sits inside the shop, with wooden bed rails, black wheels, and bright trim along the hood and running boards. The side view gives a clear look at the stance and exterior details.",
      },
      {
        title: "Separate appearance from mechanical condition",
        body: "A photograph can help explain the style you like. It cannot tell you the condition of brakes, steering, suspension, wiring, or the drivetrain. If you are bringing in a classic truck, describe both the appearance you want and the mechanical issues you already know about.",
      },
      {
        title: "Bring a useful project brief",
        body: "Photos of the current vehicle, previous-work records, a list of known modifications, and your intended use help start a realistic conversation. Tell us whether you want maintenance, help with a particular issue, or a larger restoration or fabrication plan.",
      },
    ],
  },
];
export function findProject(slug: string) {
  return projectSpotlights.find((p) => p.slug === slug);
}
