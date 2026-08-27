import { blogConfig } from "../config";
import type { BlogPost } from "../types";

/**
 * Featured image: `/images/gallery/trucks/1.jpg`
 * This is the shop’s 1960s Dodge Sweptline in process — bare metal, on cribbing,
 * with modern wheels. It is the closest in-repo match to the article subject.
 */
export const dodgeD100Sweptline = {
  slug: "1962-dodge-d100-sweptline",
  title: "1962 Dodge D100 Sweptline: A Classic Pickup Worth Restoring",
  metaTitle: "1962 Dodge D100 Sweptline: A Classic Pickup Worth Restoring",
  description:
    "Why the 1962 Dodge D100 Sweptline is still worth restoring, what to inspect before you start, and how brakes, suspension, drivetrain, and bodywork shape the plan.",
  excerpt:
    "The Sweptline’s clean bed lines still hold up. Here is how to decide whether a 1962 D100 is a restoration, a resto-mod, or a fabrication project.",
  publishedAt: "2026-08-26",
  author: blogConfig.defaultAuthor,
  category: "Classic Cars",
  tags: [
    "restoration",
    "classic trucks",
    "fabrication",
    "brakes",
    "suspension",
    "Dodge",
  ],
  featuredImage: "/images/gallery/trucks/1.jpg",
  featuredImageAlt:
    "1960s Dodge Sweptline pickup in bare metal during restoration at Tha Shop in Magnolia, Texas",
  relatedService: {
    href: "/crazy-eight-customs",
    label: "Crazy Eight Customs",
  },
  cta: {
    title: "Planning a Sweptline restoration?",
    description:
      "Bring photos, a VIN if you have one, and what you want the truck to do. We will talk through the realistic next step.",
  },
  content: [
    {
      type: "p",
      text: "A 1962 Dodge D100 Sweptline is not the pickup everyone names first. That is part of the appeal. The slab-sided bed, the cab proportions, and the straightforward mechanical layout still look right sixty-plus years later. People restore them because they drive like a truck, photograph like a period piece, and can be built as a faithful driver or a capable resto-mod without pretending to be something they are not.",
    },
    {
      type: "p",
      parts: [
        "This is a planning guide, not a build sheet. Every Sweptline is a different combination of rust, previous work, and missing pieces. If you are looking at a truck in Magnolia or elsewhere in Montgomery County, the same questions apply: what is original, what is worn out, and what has to be fabricated before paint ever enters the conversation. For finished and in-progress truck work from the shop floor, see the ",
        { text: "truck gallery", href: "/trucks" },
        ".",
      ],
    },
    {
      type: "h2",
      text: "What makes the D100 Sweptline interesting",
    },
    {
      type: "p",
      text: "Dodge used “Sweptline” for the smooth-sided bed, as opposed to the stepside-style Utiline. The 1962 D100 sits in the early years of that styling. The bed follows the cab instead of sitting beside it like a box on a chassis. That single design choice is why these trucks still look current in a parking lot full of square bodies and modern crew cabs.",
    },
    {
      type: "p",
      text: "Underneath, the D100 of this era is a conventional light-duty truck: body on frame, leaf springs, a simple interior, and engine options that ranged from a workhorse six to a V8 depending on how the truck was ordered. Parts support is not as deep as a same-year Chevrolet or Ford in every category, which is both a warning and a reason people commit. When you finish one, it does not look like every other restored pickup on the highway.",
    },
    {
      type: "h2",
      text: "Why classic pickups still get restored",
    },
    {
      type: "p",
      text: "Classic pickups earn the work because they are useful. A D100 can haul, tow within reason, and still be the Saturday truck. That dual life changes the restoration brief. A show-only car can hide a weak brake system behind limited miles. A pickup that will actually get used needs stopping power, a cooling system that survives Texas heat, and suspension that does not beat the cab to pieces on FM 1488.",
    },
    {
      type: "p",
      text: "The other reason is visual. A Sweptline with a straight bed and honest panel gaps is a rolling advertisement for patience. People notice the bed sides, the roof line, and whether the stance looks planted or accidental. That is why bodywork and chassis decisions belong in the first conversation, not after the engine is already rebuilt.",
    },
    {
      type: "h2",
      text: "Originality versus resto-mod",
    },
    {
      type: "p",
      text: "Decide this before you spend money on the wrong parts. An original-leaning restoration keeps period-correct engines, drums or early-style brakes, and factory-style trim. A resto-mod keeps the Sweptline shape and updates what the truck has to do: disc brakes, a later drivetrain, modern cooling, better lighting, maybe air conditioning that actually works in August.",
    },
    {
      type: "p",
      text: "Neither path is automatically correct. Mixing them without a plan is what gets expensive. Putting a later V8 in a chassis that still has tired drums, original steering, and worn bushings is how a “simple engine swap” becomes a handling and stopping problem. Pick the job the truck has to do — cruise, haul, daily, show — and let that decide brakes, gears, and how much of the original drivetrain stays.",
    },
    {
      type: "h2",
      text: "Rust and body inspection",
    },
    {
      type: "p",
      text: "Start with the metal you cannot see from the driveway. Cab corners, rocker panels, floor pans, the bottom of the bed, and the front fenders around the inner wells are the usual trouble spots on trucks this age. Surface rust on a stripped panel is not the same as scale that has eaten a flange. Probe, do not assume. A magnet and a bright light still beat a fresh coat of primer.",
    },
    {
      type: "p",
      text: "The bed deserves its own inspection. Sweptline beds look simple and hide rot at the front bulkhead, the wheelhouses, and along the lower bed sides where mud sat for decades. A bed that looks “straight enough” from ten feet can still need patch panels or a full reconstruction once it is off the frame. Check the cab mounts and the bed mounts at the same time. If those are collapsed or patched with whatever was in the barn, the gaps you see in the doors are a chassis problem, not a door-alignment problem.",
    },
    {
      type: "p",
      text: "Texas trucks often rust differently than Midwest trucks. Less salt, more sun, more of the damage concentrated where water stood in the bed or inside a cab that leaked for years. Do not skip the frame. Look for bent horns, stretched holes, and previous welding that was never finished. A pretty cab on a twisted frame is a fabrication job wearing a restoration price.",
    },
    {
      type: "h2",
      text: "Brakes",
    },
    {
      type: "p",
      text: "Factory-style drums can be made to work on a light, original D100 that is not going to see highway traffic every day. They still need round drums, healthy wheel cylinders, fresh fluid, and hardware that is not frozen. If the truck will carry weight, see modern traffic, or receive a stronger engine, disc conversion on at least the front is a safety decision, not a style decision.",
    },
    {
      type: "p",
      text: "Budget for the whole system. Lines, hoses, a master cylinder that matches the valve and calipers you install, and a parking brake that actually holds the truck on a grade. Brake work is not the place to “get to it later” after the engine is in. A Sweptline with more power and the original stopping distance is a truck you will not enjoy driving.",
    },
    {
      type: "h2",
      text: "Suspension",
    },
    {
      type: "p",
      text: "Leaf springs, shackles, bushings, and shocks do more than set ride height. They control how the axle sits under the bed and whether the truck hops, wanders, or sits with the stance you wanted. Tired springs sag. Aftermarket lowering kits change pinion angle and bump-stop clearance. If you are dropping the truck, plan the driveshaft, steering, and tire clearance in the same conversation.",
    },
    {
      type: "p",
      text: "Steering components age as badly as springs. Worn tie rods, a tired box, and dry kingpins or ball joints will make even a straight frame feel loose. Alignment comes after the parts are sound. Putting new tires on a wandering front end just spends money twice.",
    },
    {
      type: "h2",
      text: "Engine and drivetrain options",
    },
    {
      type: "p",
      text: "Keep the original engine if it is complete, rebuildable, and matches the truck you want to own. Rebuild it if the internals are unknown and you plan to drive the truck. Replace it if it is missing, seized beyond reason, or if the resto-mod brief calls for a later engine with parts you can actually buy. There is no single correct mill for a 1962 D100. There is a correct mill for your budget, your cooling plan, and your transmission choice.",
    },
    {
      type: "p",
      text: "The transmission and rear axle have to live with that decision. An original three-speed may be charming and wrong for highway use. A later automatic needs a crossmember, cooling, and a driveshaft built to the new length. Gearing that made sense behind a six-cylinder will not necessarily make sense behind a V8. Cooling in Magnolia heat is not optional. If the truck idles in traffic, the radiator, fan, and shroud have to be part of the engine plan, not an afterthought when it overheats on 1488.",
    },
    {
      type: "h2",
      text: "Restoration planning",
    },
    {
      type: "p",
      text: "A usable plan has a sequence: inspect and document, decide original versus resto-mod, stabilize the chassis, finish metalwork, then paint, then assembly. Skipping the first two steps is how people paint over rot or order an engine before they know the frame is straight. Photograph everything before it comes apart. Bag fasteners. Write down what is missing while the truck is still a truck, not a pile of panels.",
    },
    {
      type: "p",
      text: "Budget in phases you can actually stop between. Body and chassis first if the metal is the unknown. Drivetrain first only if the body is already proven and you need the truck rolling for mock-up. Electrical is its own phase. Old trucks hide chopped harnesses, incorrect grounds, and previous stereo or light work that will not pass a serious inspection. Plan a harness that matches the accessories you are actually installing.",
    },
    {
      type: "h2",
      text: "When professional fabrication is needed",
    },
    {
      type: "p",
      parts: [
        "Some Sweptline work is bolt-on. Some is not. Patching a rusted cab corner so it lasts is fabrication. Building a bed floor that sits flat and drains is fabrication. Crossmembers, motor mounts, disc-brake brackets, and custom exhaust are fabrication. If the truck needs metal that does not exist as a catalog panel, that is shop work, not a weekend with a body filler tub. See ",
        {
          text: "fabrication services at Tha Shop",
          href: "/fabrication-services",
        },
        " for the kind of metalwork these trucks actually require.",
      ],
    },
    {
      type: "p",
      parts: [
        "Crazy Eight Customs is the custom and restoration side of the same building. If the D100 is becoming a driver with updated brakes and stance, or a tighter resto-mod, that conversation belongs there — not on a parts-store counter. Look through ",
        { text: "Crazy Eight Customs", href: "/crazy-eight-customs" },
        " for how custom and restoration work is handled on site.",
      ],
    },
    {
      type: "h2",
      text: "Is a 1962 D100 worth restoring?",
    },
    {
      type: "p",
      text: "It is worth it if the bones are honest and you are restoring the truck you actually have, not the one in a brochure. A straight frame, a cab that can be saved, and a clear originality-versus-performance decision will get you further than a truck that only looks complete in photos. A cheap Sweptline with a rotten bed and a bent frame is not a bargain. It is a fabrication project priced like a restoration.",
    },
    {
      type: "p",
      text: "If you are considering one, start with a real inspection: metal, chassis, brakes, and what you want the finished truck to do. Then decide what belongs in the shop and what you can stage. That is how these trucks get finished instead of sitting on stands for another decade.",
    },
  ],
} satisfies BlogPost;
