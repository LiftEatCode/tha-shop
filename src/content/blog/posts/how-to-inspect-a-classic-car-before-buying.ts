import { blogConfig } from "../config";
import type { BlogPost } from "../types";

/**
 * Featured image: `/images/gallery/cars/1.jpg`
 * No dedicated “inspection in progress” photo exists in the repo. This is a
 * finished classic in the shop bay — used as a relevant shop/gallery stand-in.
 */
export const inspectClassicCarBeforeBuying = {
  slug: "how-to-inspect-a-classic-car-before-buying",
  title: "How to Inspect a Classic Car Before Buying One",
  metaTitle: "How to Inspect a Classic Car Before Buying One",
  description:
    "A practical pre-purchase checklist for classic cars: rust, frame, paint, engine, brakes, electrical, title paperwork, and why a professional inspection still matters.",
  excerpt:
    "A clean photograph is not an inspection. Here is what to look at — and what a shop inspection is actually for — before you buy a classic.",
  publishedAt: "2026-08-26",
  author: blogConfig.defaultAuthor,
  category: "Classic Cars",
  tags: [
    "restoration",
    "classic cars",
    "inspection",
    "brakes",
    "auto repair",
    "maintenance",
  ],
  featuredImage: "/images/gallery/cars/1.jpg",
  featuredImageAlt:
    "Classic Chevrolet Camaro in the shop bay at Tha Shop in Magnolia, Texas",
  relatedService: {
    href: "/crazy-eight-customs",
    label: "Crazy Eight Customs",
  },
  cta: {
    title: "Want a pre-purchase inspection?",
    description:
      "If you can get the car to Magnolia, we can look at the metal, mechanicals, and the work already done — then tell you what we actually see.",
  },
  content: [
    {
      type: "p",
      text: "Buying a classic is not like buying a five-year-old daily. The paint can hide rust. The engine can sound healthy for a ten-minute test drive and still be tired. Previous restoration work can be excellent, cosmetic, or a problem you inherit. A walk-around in a parking lot is a start. It is not a substitute for a methodical inspection, and it is not a substitute for a professional pre-purchase inspection when the money is real.",
    },
    {
      type: "p",
      text: "Use this as a field guide so you know what you are looking at and what you are asking a shop to confirm. It will not make you a body man or a diagnostic tech in an afternoon. If the seller will not allow a proper inspection, treat that as information. Good cars usually survive being looked at closely.",
    },
    {
      type: "h2",
      text: "Body rust",
    },
    {
      type: "p",
      text: "Rust is the first filter because it decides whether you are buying a car or a metalwork project. Look at floors, trunk floors, lower fenders, rocker panels, wheelhouses, and the cowl. Open the doors and check the bottoms of the jambs. Lift the trunk mat and the carpet if the seller will allow it. Surface rust on a chassis component is not automatically fatal. Perforation in a floor, a trunk, or a structural rail is a different conversation.",
    },
    {
      type: "p",
      text: "Texas cars often look better from ten feet than Midwest cars and still hide water damage from leaking windows, clogged drains, or a trunk that sat wet. Bubbles under paint, wavy lower panels, and filler that a magnet will not stick to are clues. Do not trust a fresh undercoating that covers everything in the same texture. Ask why it was applied and whether you can see the metal underneath in a few representative spots.",
    },
    {
      type: "h2",
      text: "Frame and structure",
    },
    {
      type: "p",
      text: "On a body-on-frame car, look at the rails, crossmembers, and body mounts. On a unibody car, look at the torque boxes, inner rockers, strut towers, and the areas around the rear suspension. You want consistent metal, factory-style seams where they should be, and no unexplained kinks. A frame that has been repaired can be fine if the work is documented and done correctly. A frame that has been plated over damage is a warning.",
    },
    {
      type: "p",
      text: "Stand back and look at the gaps. Doors that do not line up with the quarter, a hood that sits high on one side, or a trunk lid that hits the bumper are not just “old car character.” They can mean a bent structure, a cheap previous repair, or mounts that have collapsed. Measuring is better than squinting, which is one reason a lift inspection exists.",
    },
    {
      type: "h2",
      text: "Paint and bodywork clues",
    },
    {
      type: "p",
      text: "Shine a light down the flanks. Orange peel that changes from panel to panel, overspray in door jambs, and color mismatch in the engine bay versus the exterior all tell a story. None of that automatically means a bad car. It means someone painted it, and you need to know how far the work went. A respray over original metal is different from a respray over filler and patch panels nobody documented.",
    },
    {
      type: "p",
      text: "Look at weatherstripping, chrome fitment, and whether the trim holes still line up. Cheap restorations often look good in photos and fuzzy in person: thick paint on edges, missing body lines, and hardware that was painted in place. Run your hand along the lower panels. Waves you can feel will show up in sunlight after you own it.",
    },
    {
      type: "h2",
      text: "Engine condition",
    },
    {
      type: "p",
      text: "Cold start matters. A seller who only shows the car already warm is removing information. Listen for knocking, lifter noise that does not quiet down, and exhaust that is clearly burning oil. Look at the dipstick, the coolant, and the underside of the oil filler cap. Leaks are common on old engines. A coating of fresh degreaser with a drip still forming is more useful than a bone-dry engine that was just detailed.",
    },
    {
      type: "p",
      text: "Ask what was done and when. “Rebuilt” without receipts is a claim, not a history. Compression or leak-down testing is more honest than a short idle in a driveway. Overheating history shows up in discolored coolant, a crusty radiator, and warped components you will not see without pulling things apart. In Magnolia heat, cooling is not a footnote. If the car cannot idle with the fans working, it will not be a pleasant driver.",
    },
    {
      type: "h2",
      text: "Transmission",
    },
    {
      type: "p",
      text: "An automatic should shift without banging, slipping, or hunting. A manual should take all gears, including reverse, without grinding that the clutch cannot explain. Test from a stop and at speed if it is safe to do so. Fluid should look like transmission fluid, not glitter soup. A limited slip or a particular gear set is only a plus if it matches how you will use the car.",
    },
    {
      type: "p",
      text: "Clutch engagement that starts at the floor, a delayed automatic take-up, or a driveline clunk on throttle can be adjustment — or a failing component. Do not assume it is “just an old car.” Old cars can be sorted. Unsorted cars are priced like they are sorted until someone inspects them.",
    },
    {
      type: "h2",
      text: "Suspension and steering",
    },
    {
      type: "p",
      text: "Bounce each corner. Look at bushings, ball joints, shocks, and springs. Uneven ride height can be tired springs or a previous lowering job that was never finished. Play in the steering wheel before the tires move is a measurement, not a vibe. Tie rods, idler arms, and steering boxes wear. New tires on a wandering front end are a tell: someone spent money where it showed and skipped the parts that make the car track straight.",
    },
    {
      type: "h2",
      text: "Brakes",
    },
    {
      type: "p",
      text: "The pedal should be firm. The car should stop in a straight line. Pulling, a soft pedal, or a parking brake that does nothing are not quirks. Look at fluid level, hose condition, and whether the hardware looks recently replaced or original and seized. Disc conversions are common on classics. They need a matching master cylinder and a system that was actually bled and adjusted, not just bolted on.",
    },
    {
      type: "h2",
      text: "Electrical",
    },
    {
      type: "p",
      text: "Turn on every switch. Lights, wipers, horn, gauges, heater blower, and charging system. Wiring that is melted, reverse-polarity jumpered, or buried under aftermarket accessories without a fuse is a fire and reliability risk. A clean engine bay with a rat’s nest under the dash is a pattern. Charging voltage and a battery that is actually held down are basic. Intermittent electrical problems are some of the most expensive “small issues” on an old car because they eat time.",
    },
    {
      type: "h2",
      text: "VIN, title, and documentation",
    },
    {
      type: "p",
      text: "Match the VIN on the title to the car. Know where the VIN should appear on that year and body style, and be suspicious if plates look disturbed, restamped, or missing where they should exist. A clear title in the seller’s name is the baseline. Salvage, rebuilt, and bonded titles are not automatically a no — they change value and insurance, and they should be disclosed before you fall in love with the paint.",
    },
    {
      type: "p",
      text: "Build sheets, restoration receipts, and photo records help. They are still claims until they match the car in front of you. Numbers-matching language gets used loosely. If that matters to you, verify it instead of repeating the listing. If it does not matter, say so and do not pay a numbers-matching premium.",
    },
    {
      type: "h2",
      text: "Signs of previous restoration",
    },
    {
      type: "p",
      text: "Look for overspray, new fasteners mixed with old, silicone everywhere, and parts that are cleaner than the surfaces they bolt to. Quality restorations have consistent workmanship and paperwork. Cosmetic restorations look good until you get under the car. Neither is automatically dishonest. You need to know which one you are buying so the price matches the remaining work.",
    },
    {
      type: "h2",
      text: "Originality versus modifications",
    },
    {
      type: "p",
      text: "Modifications are not a defect. Undocumented modifications are a risk. Engine swaps, disc brakes, aftermarket wiring, and air conditioning installs can be excellent. They can also be unfinished. Ask what was changed, who did it, and whether the car still has the parts to reverse the work if that matters to you. A modified classic needs to be evaluated as the car it is now, not the brochure version of what it left the factory as.",
    },
    {
      type: "h2",
      text: "Estimating restoration scope",
    },
    {
      type: "p",
      parts: [
        "Sort findings into three piles: drive and maintain, repair before regular use, and body or structural work. The last pile is where budgets break. Paint, rust repair, and fabrication do not scale like a water pump. If the car needs floors, a trunk, and a frame repair, you are not “putting a little money into it.” You are starting a restoration. For how custom and restoration work is scoped here, see ",
        { text: "Crazy Eight Customs", href: "/crazy-eight-customs" },
        ".",
      ],
    },
    {
      type: "p",
      parts: [
        "Mechanical work is more predictable when the structure is sound. Brakes, cooling, and a charging system that works are the difference between a weekend car and a trailer queen. Everyday service still applies to classics that actually get driven — see ",
        { text: "auto services at Tha Shop", href: "/auto-services" },
        " for inspection and repair once the car is yours.",
      ],
    },
    {
      type: "h2",
      text: "Why a professional pre-purchase inspection matters",
    },
    {
      type: "p",
      text: "This checklist is a way to walk in informed. It is not a professional inspection. A shop inspection puts the car in the air, measures what can be measured, and names what cannot be known without disassembly. That last part matters. Nobody honest will promise that a compression test reveals a cracked block you cannot see yet. What you should get is a clear report: what is worn, what is unsafe, what looks like previous work, and what the next owner should budget.",
    },
    {
      type: "p",
      parts: [
        "If you are close enough to bring the car to Magnolia — or to have it trailered — request an appointment before you wire a deposit you cannot unwind. ",
        { text: "Contact Tha Shop", href: "/contact" },
        " with the year, make, model, and what the seller has claimed. We will tell you what we can inspect on a visit and what still has to be a judgment call. That is the point of a pre-purchase inspection: fewer surprises after the title is in your name.",
      ],
    },
  ],
} satisfies BlogPost;
