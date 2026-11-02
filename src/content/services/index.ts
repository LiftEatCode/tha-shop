export type ServiceDetail = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  parent: "/auto-services" | "/motorcycle-services";
  image: string;
  alt: string;
  cta: string;
  sections: { title: string; body: string; items?: string[] }[];
  faq: { q: string; a: string }[];
  articleSlugs: string[];
  projectSlugs: string[];
};
export const serviceDetails: ServiceDetail[] = [
  {
    slug: "brake-repair",
    name: "Brake repair",
    title: "Brake Repair & Free Inspection in Magnolia, TX",
    description:
      "Full brake inspections at no charge, brake and ABS repair for cars and trucks at Tha Shop on FM 1488 in Magnolia. Request an appointment.",
    intro:
      "A squeal, a shake, or a change in pedal feel deserves a closer look. Bring your car or truck to Tha Shop for a full brake inspection at no charge and a plain-language explanation of what we find.",
    parent: "/auto-services",
    image: "/images/shop/brakeInspection.png",
    alt: "Brake rotor and caliper being inspected with a flashlight",
    cta: "Request a free brake inspection",
    sections: [
      {
        title: "Start with an inspection",
        body: "Brake symptoms can have more than one cause. An inspection helps separate worn friction parts from hydraulic, hardware, or electronic faults before a repair is recommended.",
        items: [
          "Tell us when the noise or vibration happens.",
          "Let us know about warning lights or a change in pedal feel.",
          "Bring the year, make, model, and any recent brake-service history.",
        ],
      },
      {
        title: "Brake and ABS repair for daily drivers and work trucks",
        body: "Our auto service offering includes brake and ABS repair. Once the vehicle has been checked, we can discuss the work it needs and how it fits with the way you use it, whether that is a daily commute or a truck carrying tools.",
      },
      {
        title: "What affects the repair estimate?",
        body: "The vehicle, the condition of the system, the parts required, and the work needed to correct the fault all affect the estimate. An inspection comes before a firm repair price. The free inspection does not mean repairs or replacement parts are free.",
      },
      {
        title: "Visit the Magnolia shop",
        body: "Tha Shop is at 24495 FM 1488 in Magnolia. Request an inspection or call before heading over so we can discuss the vehicle and confirm availability. If braking feels unsafe, arrange assistance rather than driving it to the shop.",
      },
    ],
    faq: [
      {
        q: "Is the brake inspection really free?",
        a: "Yes. Tha Shop offers a full brake inspection at no charge. We explain our findings; any repair work and parts are separate.",
      },
      {
        q: "Can you identify the problem from a noise alone?",
        a: "A description helps us prepare, but it does not replace inspecting the vehicle. A similar noise can come from different faults.",
      },
      {
        q: "Do I need an appointment?",
        a: "Call or send a service request so we can confirm availability. The request form does not reserve a time until the shop follows up.",
      },
    ],
    articleSlugs: ["7-signs-you-may-need-brake-repair"],
    projectSlugs: [],
  },
  {
    slug: "ac-repair",
    name: "Auto A/C repair",
    title: "Car A/C Repair in Magnolia, TX",
    description:
      "Heating and air conditioning service for cars and trucks in Magnolia. Tell Tha Shop about warm air, weak airflow, or cooling that changes at idle.",
    intro:
      "Warm air, weak airflow, or an A/C that only seems to work on the highway calls for diagnosis. Tha Shop provides automotive heating and air conditioning service on FM 1488 in Magnolia.",
    parent: "/auto-services",
    image: "/images/shop/hero-photo.jpg",
    alt: "Mechanic working under the hood of a vehicle at Tha Shop",
    cta: "Request A/C service",
    sections: [
      {
        title: "Tell us how the cooling changes",
        body: "Does it cool while moving but warm up at a stop? Is airflow weak at every fan setting? Does the problem start immediately or after a longer drive? Those details help us understand the complaint before the vehicle arrives.",
      },
      {
        title: "Diagnosis before a parts list",
        body: "Cabin cooling depends on more than one component. Airflow, controls, refrigerant condition, and the rest of the cooling system can affect what you feel at the vents. Service should address the cause of the complaint instead of assuming every warm-air problem needs the same fix.",
      },
      {
        title: "Heating and cooling service",
        body: "Heating and air conditioning are part of our auto repair offering. Tell us about unusual noises, changes after previous work, or a heater that is not warming the cab. Include any recent A/C service records with your request.",
      },
      {
        title: "Plan the visit",
        body: "Bring the vehicle details and a description of when the symptom occurs. Diagnosis, access to components, required parts, and the work identified affect cost and turnaround. Call the shop for availability rather than relying on a generic online price.",
      },
    ],
    faq: [
      {
        q: "Does warm air always mean the system needs refrigerant?",
        a: "No. Warm air is a symptom, not a diagnosis. The system needs to be checked to understand what is causing it.",
      },
      {
        q: "Can you help if cooling changes at idle?",
        a: "Yes—describe exactly when cooling changes in your service request. That pattern is useful information for the inspection.",
      },
      {
        q: "Do you also offer heating service?",
        a: "Yes. Automotive heating and air conditioning service is included in our auto service offering.",
      },
    ],
    articleSlugs: [
      "signs-your-car-ac-needs-repair",
      "november-vehicle-maintenance-magnolia",
    ],
    projectSlugs: [],
  },
  {
    slug: "check-engine-diagnostics",
    name: "Check-engine diagnostics",
    title: "Check Engine Light Diagnostics in Magnolia, TX",
    description:
      "Check-engine light and drivability diagnostics at Tha Shop in Magnolia. Bring symptoms, vehicle details, and service history for diagnosis-first auto repair.",
    intro:
      "A warning light tells you the vehicle needs attention. It does not identify a repair by itself. Tha Shop offers check-engine light diagnostics and engine performance checks for cars and trucks in Magnolia.",
    parent: "/auto-services",
    image: "/images/shop/hero-photo.jpg",
    alt: "Mechanic inspecting a vehicle engine in the Magnolia shop",
    cta: "Request a diagnostic appointment",
    sections: [
      {
        title: "A code is a starting point",
        body: "A fault code can point toward a system or condition. It is one part of finding the cause, alongside the symptoms, operating conditions, and checks the vehicle needs. Replacing a part simply because its name appears in a code description can miss the underlying problem.",
      },
      {
        title: "Describe the way it drives",
        body: "Tell us about rough running, hard starting, loss of power, or changes in fuel use. Note whether the symptom appears cold, after warming up, at idle, or while accelerating. Include any other warning lights.",
      },
      {
        title: "Bring the history with the vehicle",
        body: "Recent repairs, battery changes, and previous diagnostic results help avoid starting with an incomplete picture. If you already have a code report, bring it with you. Do not clear warning information just to make the light disappear before the visit.",
      },
      {
        title: "From findings to a repair discussion",
        body: "We diagnose first and explain what we find. The checks required and the fault identified determine the next step. Ask about diagnostic charges and scheduling when you call; this is separate from our free brake inspection offer.",
      },
    ],
    faq: [
      {
        q: "Can a code scan tell me exactly which part to buy?",
        a: "Not reliably. A code describes a detected condition, and the cause may require additional checks.",
      },
      {
        q: "What should I include in my request?",
        a: "Year, make, model, mileage, how it is running, when the symptom occurs, and any recent repair or code information.",
      },
      {
        q: "Should I drive with a flashing warning light?",
        a: "If the vehicle is running poorly, the light is flashing, or you are uncertain it is safe, stop somewhere safe and follow the owner’s manual or arrange assistance. Do not drive it in simply to keep an appointment.",
      },
    ],
    articleSlugs: ["prepare-for-check-engine-diagnostics"],
    projectSlugs: ["hot-rod-engine-bay"],
  },
  {
    slug: "suspension-repair",
    name: "Suspension & steering repair",
    title: "Suspension & Steering Repair in Magnolia, TX",
    description:
      "Shocks, struts, chassis, suspension and steering repair at Tha Shop in Magnolia. Request a check for clunks, bouncing, or a change in handling.",
    intro:
      "A clunk, extra bounce, or a change in steering deserves a check. Tha Shop offers shocks, struts, chassis, suspension, and steering repair for cars and trucks at the Magnolia shop.",
    parent: "/auto-services",
    image: "/images/brands/about-side.jpg",
    alt: "Red classic pickup inside Tha Shop in Magnolia",
    cta: "Request a suspension check",
    sections: [
      {
        title: "Describe the road and the symptom",
        body: "A noise over a driveway entrance may behave differently from vibration at highway speed. Tell us where you feel it, when you hear it, and whether braking or turning changes it. Mention recent impacts, tire work, or suspension modifications.",
      },
      {
        title: "Inspect the system together",
        body: "Tires, steering, suspension, and brakes can produce symptoms that overlap. Looking at the complaint in context helps avoid treating every pull or vibration as the same repair.",
      },
      {
        title: "Cars, work trucks, and project vehicles",
        body: "We work on daily drivers and trucks as well as custom and classic projects. If the vehicle has a lift, lowered suspension, or nonstandard components, describe those changes when requesting service so we can discuss the scope.",
      },
      {
        title: "Understand the proposed work",
        body: "Required parts, vehicle configuration, access, and the condition of related components affect the estimate. Ask what the inspection found and what follow-up work is appropriate for your vehicle before deciding how to proceed.",
      },
    ],
    faq: [
      {
        q: "Does a clunk always mean the shocks are bad?",
        a: "No. A clunk can have several causes. An inspection is needed before recommending a part.",
      },
      {
        q: "Can I bring a modified truck?",
        a: "Tell us about the modifications and the symptom before the visit so we can discuss the work and confirm availability.",
      },
      {
        q: "What if steering suddenly feels unsafe?",
        a: "Do not drive a vehicle you cannot control safely. Arrange assistance and let the shop know what happened.",
      },
    ],
    articleSlugs: ["november-vehicle-maintenance-magnolia"],
    projectSlugs: ["classic-pickup-in-the-shop"],
  },
  {
    slug: "motorcycle-maintenance",
    name: "Motorcycle maintenance",
    title: "Motorcycle Maintenance in Magnolia, TX",
    description:
      "Motorcycle oil changes, mileage services, brakes, tires, chains and sprockets at Tha Shop in Magnolia. Request service before the next ride.",
    intro:
      "Before the next ride, get the maintenance that fits your motorcycle. Tha Shop provides oil and filter changes, mileage services, brake work, tires, and chain and sprocket service in Magnolia.",
    parent: "/motorcycle-services",
    image: "/images/gallery/cars/home-1.jpg",
    alt: "Mechanic working beside a Harley-Davidson on a lift at Tha Shop",
    cta: "Request motorcycle service",
    sections: [
      {
        title: "Use the schedule for your bike",
        body: "Our motorcycle service offering includes break-in and mileage-based maintenance. The exact interval and work depend on the manufacturer, model, year, and service history. Bring the owner’s manual or previous service records if available.",
      },
      {
        title: "The basics matter between rides",
        body: "Oil and filter changes, brakes, tire condition, and final-drive maintenance all deserve attention. Tell us whether the bike is a daily ride, a weekend machine, or has been sitting. Include any changes in starting, handling, braking, or unusual sounds.",
      },
      {
        title: "Service before upgrades",
        body: "Handlebars, exhaust, intake, tuning, and custom work are part of the broader motorcycle offering. Start by discussing the bike’s condition and the result you want. Maintenance and performance modifications are different jobs and should be planned accordingly.",
      },
      {
        title: "Book a Magnolia shop visit",
        body: "Include year, make, model, mileage, modifications, and the service you need. We will follow up to confirm availability. If you are not sure the bike is safe to ride, arrange transport rather than riding it to the shop.",
      },
    ],
    faq: [
      {
        q: "Do you offer motorcycle oil and filter changes?",
        a: "Yes. Oil and filter changes are part of our motorcycle maintenance offering.",
      },
      {
        q: "What mileage service does my motorcycle need?",
        a: "Use the schedule for the exact bike and its service history. Share those details so we can discuss the appropriate maintenance.",
      },
      {
        q: "Can you help with a bike that has been sitting?",
        a: "Tell us how long it has been parked, whether it starts, and any known issues. We can discuss the checks and service needed before it returns to use.",
      },
    ],
    articleSlugs: [
      "motorcycle-checks-after-sitting",
      "5-affordable-motorcycle-performance-mods",
    ],
    projectSlugs: ["harley-in-the-bay"],
  },
];
export function findService(slug: string) {
  return serviceDetails.find((s) => s.slug === slug);
}
