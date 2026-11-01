import { blogConfig } from "../config";
import type { BlogPost } from "../types";
export const seasonalServiceGuides: BlogPost[] = [
  {
    slug: "november-vehicle-maintenance-magnolia",
    title: "A November Vehicle Maintenance Checklist for Magnolia Drivers",
    metaTitle: "November Vehicle Maintenance in Magnolia, TX",
    description:
      "Plan battery, heater, tire, brake, and fluid checks before holiday driving. A practical vehicle maintenance checklist from Tha Shop in Magnolia.",
    excerpt:
      "Before the holiday miles add up, take stock of the battery, heater, tires, brakes, and maintenance history. Here is what to note before requesting service.",
    publishedAt: "2026-11-01",
    author: blogConfig.defaultAuthor,
    category: "Auto Repair",
    tags: ["maintenance", "Magnolia", "battery", "heater", "brakes"],
    featuredImage: "/images/shop/winterizeVehicle.png",
    featuredImageAlt:
      "Battery and cooling-system checks for seasonal vehicle maintenance",
    relatedService: {
      href: "/auto-services",
      label: "Auto repair and maintenance",
    },
    cta: {
      title: "Plan maintenance before your next trip",
      description:
        "Share your vehicle details, mileage, and the checks you need. The shop will follow up to confirm availability.",
    },
    content: [
      {
        type: "p",
        text: "November is a useful time to look at the vehicle you depend on before holiday errands and longer drives fill the calendar. In Magnolia, planning for seasonal changes is less about a single date on the calendar and more about the condition of the car or truck you actually have. Start with its maintenance records and any symptoms you have been putting off.",
      },
      { type: "h2", text: "Start with the service history" },
      {
        type: "p",
        text: "Check the mileage and the date of the last oil change, fluid service, and tire work against the schedule for your vehicle. A dashboard reminder is useful, but it does not describe every maintenance need. If the records are incomplete, tell the shop what you know rather than guessing at what was done.",
      },
      { type: "h2", text: "Notice changes in starting" },
      {
        type: "p",
        text: "Slow cranking, an intermittent no-start, or recent jump-starts are worth mentioning before a trip. A starting complaint can involve the battery, connections, starter, or charging system. The age of the battery and the conditions under which the problem occurs help explain the history; they do not establish the diagnosis on their own.",
      },
      { type: "h2", text: "Try the heater and check airflow" },
      {
        type: "p",
        parts: [
          "Before you need warm air on a colder morning, note whether the heater warms the cabin and whether the fan moves air normally. Tell us if the temperature changes at idle or if defrost performance has changed. Heating and cooling complaints belong in the same service conversation; learn more about our ",
          { text: "heating and A/C service", href: "/services/ac-repair" },
          ".",
        ],
      },
      { type: "h2", text: "Look at tires and listen to the brakes" },
      {
        type: "p",
        text: "Use the vehicle manufacturer’s recommended tire-pressure guidance and note visible damage or unusual wear. A shake, pull, squeal, or change in brake-pedal feel deserves attention before a long drive. Do not assume a symptom has a single cause based on a quick look in the driveway.",
      },
      {
        type: "p",
        parts: [
          "Tha Shop offers a ",
          {
            text: "full brake inspection at no charge",
            href: "/services/brake-repair",
          },
          ". Repair work and replacement parts are separate. If braking or handling feels unsafe, arrange assistance instead of driving to an appointment.",
        ],
      },
      { type: "h2", text: "Bring a short list, not a parts order" },
      {
        type: "p",
        text: "Write down what you notice, when it happens, and anything that changed after recent work. Include your year, make, model, mileage, and the date of any planned trip. Ask about scheduling and the time needed to inspect the vehicle before assuming the job can be completed the day you call.",
      },
      {
        type: "p",
        parts: [
          "Tha Shop is at 24495 FM 1488 in Magnolia. We handle auto repair, maintenance, motorcycle service, and project work. ",
          { text: "Request service", href: "/contact#appointment" },
          " with your list, and we will follow up to confirm availability.",
        ],
      },
    ],
  },
  {
    slug: "prepare-for-check-engine-diagnostics",
    title: "What to Bring to a Check-Engine Diagnostic Appointment",
    metaTitle: "Prepare for Check Engine Diagnostics in Magnolia",
    description:
      "Vehicle history, symptoms, codes, and operating conditions can help explain a check-engine complaint. Prepare for your Tha Shop diagnostic appointment.",
    excerpt:
      "A code is a starting point. Bring a useful symptom history and recent repair records so the diagnostic conversation starts with the whole picture.",
    publishedAt: "2026-11-01",
    author: blogConfig.defaultAuthor,
    category: "Auto Repair",
    tags: ["diagnostics", "check engine light", "Magnolia"],
    featuredImage: "/images/shop/hero-photo.jpg",
    featuredImageAlt:
      "Mechanic working in the engine bay of a vehicle at Tha Shop",
    relatedService: {
      href: "/services/check-engine-diagnostics",
      label: "Check-engine light diagnostics",
    },
    cta: {
      title: "Tell us what the vehicle is doing",
      description:
        "Include vehicle details, mileage, warning lights, and recent work. We will follow up about diagnostic availability.",
    },
    content: [
      {
        type: "p",
        text: "When the check-engine light comes on, the most useful first conversation is about what changed. The light is part of the story. How the vehicle starts, idles, accelerates, and behaves under different conditions fills in more of the picture. Preparing a few notes can make a service request much clearer.",
      },
      { type: "h2", text: "Record the exact vehicle and mileage" },
      {
        type: "p",
        text: "Start with the year, make, model, and current mileage. Include the engine or other configuration details if you know them. Mention modifications, especially on a classic or custom vehicle, instead of assuming the factory specification still describes everything under the hood.",
      },
      { type: "h2", text: "Describe a pattern you can recognize" },
      {
        type: "p",
        text: "Does it run differently on the first start of the day? Does the symptom appear once the engine is warm, at a stop, or while accelerating? Was it raining? Are other warning lights on? A short description of what you actually experienced is more useful than deciding in advance which part must have failed.",
      },
      {
        type: "h2",
        text: "Bring code reports without treating them as a repair order",
      },
      {
        type: "p",
        text: "If you already have a printed or saved code report, bring it. A fault code describes a condition detected by the vehicle. It does not always identify one failed component, and clearing it does not repair the cause. Avoid clearing information simply to turn the light off before the visit.",
      },
      { type: "h2", text: "Include recent repairs and previous symptoms" },
      {
        type: "p",
        text: "Battery replacement, engine work, new components, and earlier diagnostic findings may all be relevant history. Bring receipts or previous reports when you have them. If a symptom existed before the light appeared, say so; the order in which things happened can matter.",
      },
      { type: "h2", text: "Ask about the diagnostic process and scheduling" },
      {
        type: "p",
        parts: [
          "A code scan and finding the cause are not necessarily the same task. The work needed depends on the complaint and the vehicle. Ask about diagnostic charges and availability when requesting ",
          {
            text: "check-engine diagnostics at Tha Shop",
            href: "/services/check-engine-diagnostics",
          },
          ". Our free brake inspection is a separate offer.",
        ],
      },
      { type: "h2", text: "Safety comes before keeping an appointment" },
      {
        type: "p",
        text: "If a warning light is flashing, the vehicle is running badly, or you are unsure it is safe to continue, stop somewhere safe and follow the owner’s manual or arrange assistance. Tell the shop if the vehicle needs to arrive by transport rather than driving it in to make a scheduled time.",
      },
      {
        type: "p",
        parts: [
          "Send your notes through the ",
          { text: "appointment request form", href: "/contact#appointment" },
          " or call (936) 297-0820. Tha Shop is on FM 1488 in Magnolia, and we will follow up to confirm the next step.",
        ],
      },
    ],
  },
  {
    slug: "motorcycle-checks-after-sitting",
    title: "Planning Motorcycle Service After Your Bike Has Been Sitting",
    metaTitle: "Motorcycle Service After Storage in Magnolia, TX",
    description:
      "Before returning a parked motorcycle to use, review service history, tires, brakes, fluids, and starting complaints with Tha Shop in Magnolia.",
    excerpt:
      "A bike that starts is not automatically ready for the road. Here is the information to gather before planning service after time off the bike.",
    publishedAt: "2026-11-01",
    author: blogConfig.defaultAuthor,
    category: "Motorcycle Service",
    tags: ["motorcycle maintenance", "Magnolia", "tires", "brakes"],
    featuredImage: "/images/gallery/cars/home-1.jpg",
    featuredImageAlt:
      "Harley-Davidson on a lift with a mechanic beside it in the Magnolia workshop",
    relatedService: {
      href: "/services/motorcycle-maintenance",
      label: "Motorcycle maintenance",
    },
    cta: {
      title: "Get a service plan before the next ride",
      description:
        "Tell us the bike, mileage, how long it has been parked, and any known issues. We will follow up to discuss service availability.",
    },
    content: [
      {
        type: "p",
        text: "A motorcycle can spend time parked for many reasons: weather, work, a repair that got delayed, or simply a busy stretch of life. Before taking it back on the road, think beyond whether the engine starts. Service history, storage conditions, and the current condition of the bike all belong in the plan.",
      },
      { type: "h2", text: "Start with the model and the time parked" },
      {
        type: "p",
        text: "Write down the year, make, model, mileage, and how long the motorcycle has been sitting. Include whether it was stored indoors, any known leaks or starting issues, and the last documented service. Use the maintenance schedule for the exact bike rather than a general mileage rule found online.",
      },
      { type: "h2", text: "Tires and brakes deserve a closer look" },
      {
        type: "p",
        text: "Visible wear is only part of tire condition. Age, damage, pressure, and time spent sitting can matter too. Brake feel and the condition of brake components should also be considered before riding. A short engine start in the garage does not tell you whether either system is ready for road use.",
      },
      { type: "h2", text: "Mention fluids, starting, and final drive" },
      {
        type: "p",
        text: "Tell the shop about the last oil and filter change, any previous fluid service, and what happens when you try to start the bike. Note the type of final drive and any modifications. Avoid assuming a no-start has one cause or repeatedly attempting to run a bike with an unresolved problem.",
      },
      { type: "h2", text: "Separate maintenance from the next upgrade" },
      {
        type: "p",
        parts: [
          "An exhaust, intake, handlebar, or other change may be on your list, but first discuss the current condition of the motorcycle. See our ",
          {
            text: "motorcycle maintenance page",
            href: "/services/motorcycle-maintenance",
          },
          " for the service offering, and bring a separate list of changes you are considering.",
        ],
      },
      { type: "h2", text: "Make the service request useful" },
      {
        type: "p",
        text: "Share the bike details, storage history, symptoms, and available records. Let us know if it rolls freely, whether it starts, and if you need to arrange transport. Do not ride a motorcycle you are uncertain is safe just to get it to the shop.",
      },
      {
        type: "p",
        parts: [
          "You can ",
          { text: "request motorcycle service", href: "/contact#appointment" },
          " at Tha Shop on FM 1488 in Magnolia. We will follow up to discuss availability and the appropriate next step for the bike. For a look inside the bay, see our ",
          {
            text: "Harley workshop spotlight",
            href: "/projects/harley-in-the-bay",
          },
          ".",
        ],
      },
    ],
  },
];
