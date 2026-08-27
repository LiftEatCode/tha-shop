import { blogConfig } from "../config";
import type { BlogPost } from "../types";

/**
 * Featured image: `/images/gallery/motorcycles/1.jpg`
 * No confirmed 1945 Harley-Davidson WL photo exists in the repo. This is a
 * vintage Harley-style V-twin on a lift in the shop — the closest local match.
 */
export const harleyDavidsonWl = {
  slug: "1945-harley-davidson-wl",
  title:
    "1945 Harley-Davidson WL: The Flathead That Helped Shape Harley History",
  metaTitle:
    "1945 Harley-Davidson WL: The Flathead That Helped Shape Harley History",
  description:
    "What the Harley-Davidson WL is, how the flathead W-series fits wartime and postwar riding, and what restoration, parts, brakes, and tuning actually involve.",
  excerpt:
    "The WL is a side-valve 45-cubic-inch Harley with a long afterlife. Here is how to think about originality, parts, and specialized service — without the mythology.",
  publishedAt: "2026-08-26",
  author: blogConfig.defaultAuthor,
  category: "Motorcycle Service",
  tags: [
    "vintage motorcycles",
    "Harley-Davidson",
    "restoration",
    "motorcycle service",
    "maintenance",
  ],
  featuredImage: "/images/gallery/motorcycles/1.jpg",
  featuredImageAlt:
    "Vintage Harley-Davidson-style motorcycle on a lift at Tha Shop in Magnolia, Texas",
  relatedService: {
    href: "/motorcycle-services",
    label: "Motorcycle Services",
  },
  cta: {
    title: "Have a vintage Harley that needs attention?",
    description:
      "Tell us the year if you know it, what the bike is doing, and whether you want it preserved or made more rideable. We will follow up from there.",
  },
  content: [
    {
      type: "p",
      text: "The Harley-Davidson WL belongs to the W-series of 45-cubic-inch side-valve V-twins — the engines most riders simply call flatheads. A 1945 WL sits at a useful point in that story: late enough that the design was thoroughly proven, close enough to wartime production that military cousins are part of how people talk about the bike. The appeal is not nostalgia as a slogan. It is a relatively simple motorcycle that still looks like a Harley, still sounds like one, and still asks for mechanics who understand how these machines were built.",
    },
    {
      type: "p",
      parts: [
        "This is not a factory archive and it is not a values guide. Production totals, exact military contracts, and “last of” claims get repeated online with more confidence than sources. Where a detail is uncertain, it is better to stay general. What we can talk about clearly is how the bike is laid out, what restoration actually involves, and why vintage motorcycles do poorly when they are treated like a late-model cruiser. For other bikes that come through the shop, see the ",
        { text: "motorcycle gallery", href: "/motorcycles" },
        ".",
      ],
    },
    {
      type: "h2",
      text: "What the WL is",
    },
    {
      type: "p",
      text: "In broad terms, the WL is a civilian W-series Harley: a 45-cubic-inch (about 750 cc) side-valve V-twin in a rigid-style chassis typical of the era, with a hand-shift, foot-clutch layout on many examples. Related military versions — commonly discussed as the WLA and allied variants — used the same basic engine family with equipment suited to service use. A 1945 civilian WL should not be assumed to be a “demilitarized WLA” without evidence. Some bikes were. Some were not. Stamping, equipment, and paperwork have to agree before anyone should use stronger language than that.",
    },
    {
      type: "p",
      text: "What you are looking at, mechanically, is a motorcycle designed around accessibility: an engine you can work on, a chassis you can see, and systems that make sense if you understand carburetion, points ignition, and drum brakes. That accessibility is also why so many have been modified, bobbed, or assembled from mixed years. Identity is a research problem as much as a parts problem.",
    },
    {
      type: "h2",
      text: "Flathead engine basics",
    },
    {
      type: "p",
      text: "A flathead (side-valve) engine places the valves in the block beside the cylinder rather than in the head. The head is largely a cover and a combustion-chamber surface. The design is compact, relatively quiet compared with some later Harley engines, and tolerant in ways overhead-valve engines are not — which is a polite way of saying it was built for durability and service, not peak power. Cooling, oiling, and ignition still have to be right. “Simple” is not the same as “indestructible.”",
    },
    {
      type: "p",
      text: "These engines care about oil, clearances, and heat. They do not love being started and shut off for short trips without ever reaching a stable temperature, and they do not love leftover fuel sitting in a carburetor for months. If you are buying or reviving a WL, assume the engine needs a real inspection: compression, leak-down if you have the tools, oil condition, and whether the motor has been apart before. A quiet idle in the driveway is not a rebuild history.",
    },
    {
      type: "h2",
      text: "Wartime context — carefully",
    },
    {
      type: "p",
      text: "Harley-Davidson produced large numbers of W-series motorcycles for military use during World War II. That fact is not in dispute. What often gets overstated is the exact role of any one surviving bike. A 1945 civilian WL is not automatically a combat veteran. Military-style equipment on a civilian frame is not automatically original. Treat wartime significance as family history for the engine design, not as a caption you can paste onto every 45-inch Harley from the mid-1940s.",
    },
    {
      type: "p",
      text: "If provenance matters to you, document it. Cases, numbers, period photographs, and consistent equipment are more useful than a story that starts with “they say.” If provenance does not matter, say so and enjoy the motorcycle as a W-series machine. That is still a historically important engine family without needing a battlefield attached to the VIN.",
    },
    {
      type: "h2",
      text: "Postwar appeal",
    },
    {
      type: "p",
      text: "After the war, riders kept using 45-inch Harleys because they were familiar, serviceable, and available. The later cultural life of the WL — bobbers, lookalike customs, and “period” builds — is a separate layer. Some owners want a motorcycle that could have sat at a 1940s curb. Some want a rider with better electrics and brakes that they will actually take out on FM 1488. Both are legitimate. Mixing them without deciding is how a restoration stalls.",
    },
    {
      type: "h2",
      text: "Restoration considerations",
    },
    {
      type: "p",
      text: "Start with identity and completeness. Is the frame, engine, and transmission a coherent set, or a well-loved assembly of W-series parts? Missing tin, a chopped wiring harness, and a front end from a different generation change the job. Photograph the bike before it comes apart. These motorcycles are full of small hardware that does not come in one labeled kit.",
    },
    {
      type: "p",
      text: "Then decide preserve versus ride. A preservation-minded restoration keeps period-correct finishes, fasteners, and equipment even when that makes the bike less convenient. A rider-focused restoration may update lighting, charging, and tires within what the chassis can honestly use. What you should not do is hide unsafe brakes or wiring behind correct-looking paint. Originality is not a reason to skip a mechanical inspection.",
    },
    {
      type: "h2",
      text: "Sourcing parts",
    },
    {
      type: "p",
      text: "W-series parts exist in a mix of original used, reproduction, and “close enough.” Close enough is how bikes end up with the wrong carburetor, the wrong generator setup, or brake parts that look right and do not work. Use a parts book and a knowledgeable supplier. Measure before you order. If a piece is structural — forks, wheels, brake drums, motor mounts — cheap reproductions are a safety issue, not a bargain.",
    },
    {
      type: "p",
      text: "Expect lead times. Expect to repair rather than replace some pieces. That is normal on a machine this old. It is also why a shop that already works on vintage motorcycles will save you from buying the same wrong gasket set twice.",
    },
    {
      type: "h2",
      text: "Originality",
    },
    {
      type: "p",
      text: "Originality on a WL is a spectrum. Matching numbers, correct finishes, and period equipment matter to some buyers and not to others. What matters to everyone is honesty. If the motor has been replaced, say so. If the front end is later, say so. A correctly described rider is easier to own than a “all original” bike that is original only in the listing title.",
    },
    {
      type: "h2",
      text: "Brakes and suspension",
    },
    {
      type: "p",
      text: "Drum brakes of this era can work if the drums are round, the shoes are correctly arced, the cables or linkages are free, and the rider understands the distances involved. They will not feel like a modern dual-disc cruiser. If the bike will see traffic, the brake system has to be sorted before the first enthusiastic ride, not after. Tires, wheels, and spokes belong in the same inspection. A beautiful motor behind a questionable front wheel is not a finished restoration.",
    },
    {
      type: "p",
      text: "Suspension is limited by the design. Springer-style fronts and a rigid rear (on many W-series machines) mean the rider is part of the suspension. Steering-head bearings, bushings, and correct trail/tire choices affect whether the bike tracks or weaves. Do not “upgrade” geometry with random later parts unless someone has thought through how those parts sit in this frame.",
    },
    {
      type: "h2",
      text: "Carburetion and tuning",
    },
    {
      type: "p",
      text: "Period W-series bikes commonly used Linkert-style carburetors or later replacements. The carburetor has to match the engine, the air cleaner, and the exhaust the bike actually has. Jets, floats, and passage cleanliness matter more than chrome. Points ignition needs correct timing and a condenser that is not a lottery ticket. If the bike has been converted to an aftermarket ignition, it still needs to be timed and grounded correctly.",
    },
    {
      type: "p",
      text: "Tuning a flathead is not the same as flashing a modern EFI Harley. It is mixture, idle, and whether the engine is internally healthy enough to tune. A WL that will not idle is often a fuel, air leak, or ignition problem — or an engine that needs to come apart. Guessing with larger jets on a worn motor wastes time.",
    },
    {
      type: "h2",
      text: "Preserving versus modifying",
    },
    {
      type: "p",
      parts: [
        "Bobbers and custom W-series bikes are part of Harley culture. If that is the build, commit to it and do the hidden work: brakes, bearings, wiring, and a motor that will live. If the goal is preservation, resist the urge to “just” change one visible piece that forces five other incorrect pieces. Crazy Eight Customs is the custom side of the shop when a vintage Harley is becoming a built rider rather than a static display — see ",
        { text: "Crazy Eight Customs", href: "/crazy-eight-customs" },
        ".",
      ],
    },
    {
      type: "h2",
      text: "Why vintage motorcycles need specialized attention",
    },
    {
      type: "p",
      parts: [
        "A 1945 WL is not a Sportster with older paint. Fasteners, tolerances, fuel systems, and brake designs are of their time. Procedures from a late-model service manual do not transfer. That is why these bikes belong with people who already work on vintage and custom motorcycles, not with a generalist who will learn on your generator. ",
        {
          text: "Motorcycle service at Tha Shop",
          href: "/motorcycle-services",
        },
        " covers the service side; custom and restoration conversations sit next to it in the same building.",
      ],
    },
    {
      type: "p",
      text: "If you have a W-series Harley — WL, related military variant, or a mixed-year rider — start with what the bike is, not what the internet says it should be worth. Identity, mechanical condition, and a clear preserve-versus-ride decision will take you further than a polish and a hopeful first start.",
    },
  ],
} satisfies BlogPost;
