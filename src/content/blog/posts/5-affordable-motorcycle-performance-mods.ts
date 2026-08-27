import { blogConfig } from "../config";
import type { BlogPost } from "../types";

/**
 * Featured image: `/images/gallery/motorcycles/2.jpg`
 * No dedicated “performance dyno” photo exists. This is in-progress motorcycle
 * service on a lift — a relevant shop image for setup, tuning, and mechanical work.
 */
export const affordableMotorcyclePerformanceMods = {
  slug: "5-affordable-motorcycle-performance-mods",
  title:
    "5 Affordable Motorcycle Performance Mods That Can Make a Real Difference",
  metaTitle:
    "5 Affordable Motorcycle Performance Mods That Can Make a Real Difference",
  description:
    "Five practical motorcycle upgrades — intake, exhaust, tuning, gearing, and suspension — plus tires and maintenance. Performance is not just horsepower.",
  excerpt:
    "Intake, exhaust, tuning, gearing, and suspension can change how a bike rides more than a catalog “horsepower kit.” Start with a healthy motorcycle.",
  publishedAt: "2026-08-26",
  author: blogConfig.defaultAuthor,
  category: "Motorcycle Service",
  tags: [
    "motorcycle performance",
    "motorcycle service",
    "maintenance",
    "suspension",
    "performance",
  ],
  featuredImage: "/images/gallery/motorcycles/2.jpg",
  featuredImageAlt:
    "Mechanic working on a motorcycle at Tha Shop in Magnolia, Texas",
  relatedService: {
    href: "/motorcycle-services",
    label: "Motorcycle Services",
  },
  cta: {
    title: "Want the bike set up to ride better?",
    description:
      "Tell us the make, model, and what feels off — flat power, harsh suspension, or gearing that is wrong for how you ride. We will follow up to get it on the schedule.",
  },
  content: [
    {
      type: "p",
      text: "“Performance” on a motorcycle is easy to sell as horsepower. On the road it is also how the bike stops, how it turns, how it puts power down, and whether it still starts on a hot Magnolia afternoon. Affordable modifications can make a real difference. They can also make a healthy bike worse if you skip maintenance, ignore tuning, or install parts that do not belong on a street motorcycle.",
    },
    {
      type: "p",
      text: "This list is five changes that usually pay off when the motorcycle is already mechanically sound. It is not a recipe for racing, and it is not advice to remove emissions equipment or run an illegal exhaust. If a modification would make the bike non-compliant where you ride, skip it. There is enough to gain from setup and matching parts that you do not need to cheat the legal piece.",
    },
    {
      type: "h2",
      text: "Start with a maintenance baseline",
    },
    {
      type: "p",
      parts: [
        "Before intake kits and sprockets, confirm the boring things: oil, filter, air filter condition, spark plugs, valve adjustment if the engine needs it, chain slack and wear, brake pads, and tire age. A bike with a dirty filter, a dry chain, and dragging brakes will feel “transformed” after a service that did not add a single horsepower. That is still performance. If you want that baseline done in the shop, start with ",
        {
          text: "motorcycle services at Tha Shop",
          href: "/motorcycle-services",
        },
        ".",
      ],
    },
    {
      type: "p",
      text: "Do not stack modifications on a motor that burns oil, overheats, or has a slipping clutch. You will tune around a fault and pay twice. Affordable performance assumes the engine, transmission, and chassis are honest.",
    },
    {
      type: "h2",
      text: "1. Intake — cleaner air, matched to the engine",
    },
    {
      type: "p",
      text: "A clogged or collapsing air filter is free power left on the table. Replacing it with the correct filter — and keeping it serviceable — is the first intake job. Aftermarket high-flow filters and open intakes can help a motorcycle breathe, but only if the fueling can follow. More air without more fuel, or with a mixture that goes lean under load, is heat and risk, not a upgrade.",
    },
    {
      type: "p",
      text: "Keep the intake legal and appropriate for the bike. Do not confuse a louder snorkel with a better one. A filter that ingest rain or road grit because it sits in the wrong place will wear the engine. If you change the intake, plan the tune in the same visit. Intake-only “bolt-ons” on fuel-injected bikes often need a calibration; carbureted bikes need jets and mixture that match the new airflow.",
    },
    {
      type: "h2",
      text: "2. Exhaust — flow, not just volume",
    },
    {
      type: "p",
      text: "A well-designed exhaust can reduce restriction, shed weight, and change how the engine delivers torque. A cheap loud pipe can do the opposite: flatten the midrange, lean the mixture, and annoy everyone on 1488 including you after the third tank of gas. Match the system to the motorcycle and to the intake you actually have. Slip-ons and full systems are different jobs. Full systems that replace catalytic converters or other required emissions components are not an “affordable mod” we will recommend for street use.",
    },
    {
      type: "p",
      text: "Stay with equipment that is legal for the road you ride. If the bike must retain its catalytic converter or specific muffler, keep it. Performance that gets the motorcycle rejected at inspection, or that is simply unlawful, is not a win. A quiet, well-made system that the engine is tuned for will ride better than a race pipe on a street bike that never sees a track.",
    },
    {
      type: "h2",
      text: "3. Proper tuning",
    },
    {
      type: "p",
      text: "Tuning is the modification that makes the first two worth doing. Carbureted bikes need the right jets, needle, and idle mixture for the air cleaner and exhaust they wear. Fuel-injected bikes need a calibration that matches those parts — a reputable tuner, a module designed for the combination, or a shop that can measure what the engine is actually doing. “It has a kit on it” is not a tune.",
    },
    {
      type: "p",
      text: "Symptoms of a bike that was modified and not tuned include surge, hot starting problems, popping on overrun that is more than mild deceleration, and a motor that feels strong for a minute and then harsh. Heat is the enemy, especially in Texas summer traffic. A lean street bike is not “efficient.” It is a candidate for a damaged piston. Pay for the tune. It is usually cheaper than guessing with catalogs.",
    },
    {
      type: "h2",
      text: "4. Gearing",
    },
    {
      type: "p",
      text: "Sprocket changes are some of the most honest inexpensive performance work you can do. A tooth or two at the front or rear changes how quickly the bike gets off a stop and how busy the engine is at highway speed. Shorter gearing (effectively lower) wakes up acceleration and raises cruising rpm. Taller gearing calms the engine on the highway and can make the bike feel lazier from a light.",
    },
    {
      type: "p",
      text: "There is no universal correct sprocket. A commuter on FM 1488 does not need the same gearing as a bike that rarely sees 60 mph. Chain length, clearance, and speedometer/gear-indicator behavior can change with the sprocket. So can chain life if the new ratio hammers a worn chain and worn sprockets. Replace worn pieces as a set. Gearing is not a substitute for a slipping clutch or a motor that is down on compression.",
    },
    {
      type: "h2",
      text: "5. Suspension setup",
    },
    {
      type: "p",
      text: "A motorcycle that does not use its travel well is slow even when the dyno chart looks fine. Sag, spring rate, rebound, and compression (where you have adjusters) should match the rider’s weight and the way the bike is ridden. Many bikes leave the dealer or a previous owner with sag that is wrong, damping that is harsh, and fork oil that is old. Setting sag and refreshing fluids is affordable. It changes how the tire stays on the ground, which is performance.",
    },
    {
      type: "p",
      text: "If the springs are truly wrong for the rider, replacing them is still usually cheaper than a full “premium” shock that gets installed at the stock sag and never touched. Alignment, linkage lubrication on bikes that have it, and steering-head bearings belong in the same conversation. A fancy shock on a bike with a notched steering head is not a setup. It is a catalog purchase.",
    },
    {
      type: "h2",
      text: "Tires — the contact patch is the rest of the job",
    },
    {
      type: "p",
      text: "Tires are not a numbered “mod” on this list because they are maintenance until they are a choice. Age, remaining tread, correct pressure, and a compound suited to the street you ride will change grip and steering more than most bolt-ons. A performance exhaust on ten-year-old tires is backwards. Replace tires that are old even if they “still have tread.” Rubber hardens. Pressure that is wrong for the load will make a good suspension setup feel broken.",
    },
    {
      type: "h2",
      text: "What this is not",
    },
    {
      type: "p",
      text: "This is not a list of nitrous, big-bore kits, or “defeat the emissions system and go.” Those paths have cost, heat, and legal problems that do not belong in an affordable street-performance article. It is also not a promise of a specific horsepower number. Anyone quoting a single gain for every motorcycle is selling, not measuring.",
    },
    {
      type: "p",
      text: "Do not confuse louder with faster. Do not disable safety systems. Do not ride a newly geared or newly suspended bike like you already know it; the chassis will feel different. If you are unsure whether a part is legal or appropriate, ask before it is installed.",
    },
    {
      type: "h2",
      text: "Putting the five together",
    },
    {
      type: "p",
      parts: [
        "The order that usually works is: maintenance first, then tires if they are due, then suspension sag, then intake and exhaust as a matched pair, then the tune, then gearing for how you actually ride. Skipping the tune after changing air and exhaust is the most common way this list goes wrong. If the bike is also a custom or a vintage machine, the same logic applies with more caution about parts that fit the chassis — that is where ",
        { text: "Crazy Eight Customs", href: "/crazy-eight-customs" },
        " sits alongside regular service.",
      ],
    },
    {
      type: "p",
      parts: [
        "If you want help deciding which of these is worth doing on your motorcycle, ",
        { text: "request an appointment", href: "/contact" },
        ". Bring the year, make, model, and what you want the bike to do better — around town, on the highway, or two-up. We can tell you what is setup, what is a parts combination, and what should wait until the basics are healthy.",
      ],
    },
  ],
} satisfies BlogPost;
