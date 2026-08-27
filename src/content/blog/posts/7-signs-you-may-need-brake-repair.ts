import { blogConfig } from "../config";
import type { BlogPost } from "../types";

/**
 * Featured image: `/images/shop/hero-photo.jpg`
 * No dedicated brake-closeup photo exists in the repo. This is the shop-floor
 * work image already used on the homepage (mechanic in the Magnolia bay).
 */
export const signsYouNeedBrakeRepair = {
  slug: "7-signs-you-may-need-brake-repair",
  title: "7 Signs You May Need Brake Repair",
  metaTitle: "7 Signs You May Need Brake Repair",
  description:
    "Squealing, grinding, a soft pedal, or extra stopping distance can mean the brakes need inspection. What each symptom may indicate, and when to have the system checked.",
  excerpt:
    "Brakes usually warn you before they fail. Here are seven symptoms worth taking seriously, plus what a proper inspection actually covers.",
  publishedAt: "2026-08-26",
  updatedAt: "2026-08-26",
  author: blogConfig.defaultAuthor,
  category: "Auto Repair",
  tags: [
    "brakes",
    "brake pads",
    "brake inspection",
    "rotors",
    "ABS",
    "auto repair",
  ],
  featuredImage: "/images/shop/hero-photo.jpg",
  featuredImageAlt:
    "Mechanic working on a vehicle in the Tha Shop bay in Magnolia, Texas",
  relatedService: {
    href: "/auto-services",
    label: "Auto Services",
  },
  cta: {
    title: "Need the brakes inspected?",
    description:
      "Tell us the vehicle and what you are hearing or feeling. We will follow up to confirm an appointment.",
  },
  content: [
    {
      type: "p",
      text: "Brake problems rarely appear out of nowhere. Pads wear. Rotors heat-cycle. Fluid ages. Calipers stick. Most of that shows up first as a sound, a change in pedal feel, a pull, or a light on the dash. None of those symptoms names a single failed part on its own — they tell you the system should be inspected before a small issue becomes a rotor, caliper, or safety problem.",
    },
    {
      type: "p",
      text: "This is a practical checklist for daily drivers and work trucks. Use it to decide whether the next stop should be the shop, not to diagnose the job from the driveway. Heat, humidity, stop-and-go traffic, and towing all change how brakes wear.",
    },
    {
      type: "h2",
      text: "1. Squealing or squeaking brakes",
    },
    {
      type: "p",
      text: "A light squeal is one of the more common brake complaints, and it is not always an emergency. Many pads have a wear indicator — a small metal tab that starts to scrape the rotor when the friction material is getting thin. That high-pitched squeak is the pad telling you it is time for a measurement, not a guess.",
    },
    {
      type: "p",
      text: "Squeaking can also come from glazed pads, cheap compounds, or rust film after the vehicle sat. A squeak that disappears after the first couple of stops is often surface rust. A squeal that stays with you through a drive, especially under light braking, is more likely wear. Looking at pad thickness is faster than waiting to find out the hard way.",
    },
    {
      type: "h2",
      text: "2. Grinding noises",
    },
    {
      type: "p",
      text: "Grinding is a different sound. It is usually lower, harsher, and it tends to get worse instead of fading. It can indicate the friction material is gone and metal is contacting the rotor — the pad backing plate, a worn hardware clip, or debris trapped in the caliper. Once that starts, you are no longer talking about a pad swap. Rotors score. Heat builds. Stopping power drops.",
    },
    {
      type: "p",
      text: "Keep driving with a confirmed grind and you often turn a pad job into pads, rotors, and sometimes a caliper. If you hear grinding, treat it as a reason to get the vehicle in promptly. Do not plan around “it still stops.” Stopping is not the same as stopping well, especially in a panic stop on FM 1488 or in wet weather.",
    },
    {
      type: "h2",
      text: "3. Vibration while braking",
    },
    {
      type: "p",
      text: "A shake in the steering wheel or the pedal when you apply the brakes often points to the rotors. What people call a “warped rotor” is usually thickness variation — high and low spots from heat, uneven deposits, or a rotor that was not replaced when the pads were. Heavy braking, towing, and repeated stops in Texas heat can all contribute. So can a caliper that is not releasing fully and keeps one pad dragging.",
    },
    {
      type: "p",
      text: "Vibration can also come from tires, bent wheels, or worn suspension. If the shake only happens under braking, rotors and calipers are the first place to measure. If it happens all the time, the inspection should widen.",
    },
    {
      type: "h2",
      text: "4. Soft or spongy brake pedal",
    },
    {
      type: "p",
      text: "The pedal should feel firm and consistent. A pedal that sinks, feels mushy, or takes more travel than it used to can indicate air in the hydraulic system, a fluid leak, a failing master cylinder, or brake fluid that has absorbed enough moisture to boil under heat. Soft pedal is a safety symptom. It is not something to “keep an eye on” for a few weeks.",
    },
    {
      type: "p",
      text: "Brake fluid is hydraulic oil with a job: it does not compress. Air does. Moisture lowers the boiling point. Once fluid boils, you get vapor in the lines and the pedal you counted on is suddenly longer. A leak at a hose, caliper, or wheel cylinder does the same thing by dropping pressure. If the pedal feel changed, the vehicle should be inspected before the next long trip — and before you trust it with family in the cab.",
    },
    {
      type: "h2",
      text: "5. Vehicle pulling while braking",
    },
    {
      type: "p",
      text: "If the truck or car pulls left or right when you brake, one side may be working harder than the other. That can be a sticking caliper, a collapsed brake hose that acts like a one-way valve, uneven pad wear, or contaminated friction material on one side. Alignment and tire issues can also pull, but a pull that shows up only under braking usually starts in the brake system.",
    },
    {
      type: "p",
      text: "A sticking caliper is easy to miss if you only look at pad thickness on one wheel. The dragged side often runs hotter, wears faster, and can blue the rotor. The other side may still look decent. That is why both sides of an axle get inspected together, and why hardware and slide pins matter as much as the pads you can see through the wheel.",
    },
    {
      type: "h2",
      text: "6. Brake or ABS warning lights",
    },
    {
      type: "p",
      text: "A red brake warning light is not a suggestion. It can mean the parking brake is engaged, fluid is low, or there is a hydraulic fault. Low fluid often means the pads are worn enough to need service, or there is a leak. Do not keep topping off the reservoir as a plan. Find why the level dropped.",
    },
    {
      type: "p",
      text: "An ABS light is a different message. The anti-lock system may have a sensor, tone ring, wiring, or module fault. Regular hydraulic braking can still work with ABS disabled, but you lose anti-lock control on a wet or gravel surface — the exact moment you want it. A scan of the system tells you whether you are looking at a wheel-speed sensor, a wiring break, or something deeper. Guessing from the light alone wastes time.",
    },
    {
      type: "h2",
      text: "7. Longer stopping distance",
    },
    {
      type: "p",
      text: "If the vehicle takes more road to stop than it used to, believe that feeling. Worn pads, contaminated pads (oil, grease, or leaked brake fluid on the friction surface), glazed rotors, or brake fade after repeated stops can all stretch stopping distance. Fade is especially common after a long downhill, towing, or a string of hard stops in heat. The pedal may still feel okay while the actual bite is gone.",
    },
    {
      type: "p",
      text: "Longer stops are easy to shrug off because they sneak up. You leave more room without thinking about it. Then traffic closes up, or a light changes late, and there is less margin than you assumed. If stopping distance has changed, have the pads, rotors, fluid, and calipers checked. Do not wait for grinding to confirm what the vehicle already told you.",
    },
    {
      type: "h2",
      text: "What happens during a brake inspection?",
    },
    {
      type: "p",
      text: "A useful inspection is more than “pads look okay.” We measure remaining pad material on all four corners, check rotor thickness and surface condition, and look at caliper operation, slide pins, and hardware. Rubber hoses get a look for cracks, swelling, or leaks. Fluid level and condition get checked. If a warning light is on, the scan tool comes out before parts get ordered.",
    },
    {
      type: "p",
      text: "You should leave with a plain-language explanation: what is worn, what is still in spec, and what can wait versus what should be done now. Pads are usually replaced in axle sets. Rotors are measured, not assumed. Some can be resurfaced if they still have thickness; many are replaced with the pads. Calipers come off when they leak, stick, or will not release.",
    },
    {
      type: "h2",
      text: "How long do brake pads usually last?",
    },
    {
      type: "p",
      text: "There is no honest single mileage. Highway commuters on FM 1488 can go a long time on a set of pads. Short-trip driving, towing, heavy trucks, and aggressive stops eat pads faster. Pad compound matters too. A hard, quiet pad may last longer and bite less. A more aggressive pad may stop harder and dust more. Anyone quoting one number for every vehicle is guessing.",
    },
    {
      type: "p",
      text: "Rotors can last through more than one pad set when they stay in spec and have not been overheated. Once a rotor is under minimum thickness, scored, or heat-spotted, it should come off with the pads. Fluid is often ignored until the pedal feels odd. If it has been years since a flush, that belongs in the inspection — as maintenance, not a scare tactic.",
    },
    {
      type: "h2",
      text: "Should you keep driving with brake problems?",
    },
    {
      type: "p",
      text: "It depends on the symptom. A faint morning squeak that disappears after the first stop is not the same as grinding, a sinking pedal, a brake warning light, or a vehicle that will not hold a straight line under braking. The first can wait for a scheduled inspection. The others should not. If you are unsure which category you are in, treat it as the second group and get it checked.",
    },
    {
      type: "p",
      text: "Driving on metal-to-metal brakes is a choice to spend more money and take more risk. Driving with a soft pedal is a choice to trust a hydraulic system that has already told you it is compromised. Neither is worth the extra day of convenience. If the vehicle still moves, that is not the same as the brakes being fine.",
    },
    {
      type: "h2",
      text: "Brake service in Magnolia, TX",
    },
    {
      type: "p",
      parts: [
        "Tha Shop inspects and repairs brakes on cars and trucks at 24495 FM 1488. We measure first, explain what we find, and do the work that actually belongs on the vehicle — pads, rotors, calipers, hoses, fluid, and ABS diagnosis when the lights are involved. For the broader service list, see ",
        { text: "auto repair at Tha Shop", href: "/auto-services" },
        ".",
      ],
    },
    {
      type: "p",
      text: "If something in this list matches what you are hearing or feeling, request an appointment or call the shop. Bring the year, make, and model, and a short note about when the symptom showed up. That is enough to get the inspection started without a sales pitch.",
    },
  ],
} satisfies BlogPost;
