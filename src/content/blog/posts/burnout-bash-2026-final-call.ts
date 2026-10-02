import { blogConfig } from "../config";
import type { BlogPost } from "../types";

export const burnoutBashFinalCall = {
  slug: "burnout-bash-2026-final-call",
  title: "Burnout Bash 2026: Final Call for Vendors & Riders",
  metaTitle: "Burnout Bash 2026: October 3–4 at Drifters Ice House",
  description:
    "Join Tha Shop at Drifters Ice House in Richards, Texas October 3–4, 2026 for Burnout Bash. All bikes and spectators welcome. Final call for vendors.",
  excerpt:
    "Your weekend ride has a destination. Burnout Bash brings two days of bikes, biker games, burnouts, live music, and vendors to Drifters October 3–4.",
  publishedAt: "2026-09-30",
  author: blogConfig.defaultAuthor,
  category: "Shop Notes",
  tags: [
    "Burnout Bash",
    "motorcycles",
    "community",
    "vendors",
    "Richards Texas",
  ],
  featuredImage: "",
  featuredImageAlt: "",
  relatedService: {
    href: "/event-calendar",
    label: "Burnout Bash Event Details",
  },
  cta: {
    title: "We'll see you at Drifters",
    description:
      "October 3–4, 2026. Bring your bike, bring your crew, and join Tha Shop and Crazy Eight Customs for Burnout Bash. Contact us with vendor or event questions.",
  },
  content: [
    {
      type: "p",
      text: "Burnout Bash is almost here. On October 3–4, 2026, Tha Shop and Crazy Eight Customs are heading to Drifters Ice House, 29293 FM 149, Richards, TX 77873, for a weekend built around motorcycles, good people, competition, vendors, and Texas backroads.",
    },
    {
      type: "p",
      text: "Whether you're rolling in on a bagger, chopper, cruiser, sport bike, touring bike, or custom build—or coming out to watch—all bikes and spectators are welcome.",
    },
    { type: "h2", text: "Final Call for Burnout Bash Vendors" },
    {
      type: "p",
      text: "We're making one last push for vendors who want to get their products and businesses in front of the Burnout Bash crowd. Apparel, motorcycle gear and accessories, custom and handmade goods, hats, leather goods, and local brands all have a place in this community.",
    },
    {
      type: "p",
      text: "Vendor setup begins Friday, October 2 at 10 AM, giving everyone time to get situated before the weekend gets rolling. The vendor fee is $50 or an approved promo code. Contact Tha Shop to confirm availability and setup details.",
    },
    {
      type: "p",
      parts: [
        "Ready to get involved? ",
        {
          text: "Download the vendor application",
          href: "/documents/burnout-bash-2026-vendor-application.pdf",
        },
        ", fill it out, and email the completed application to ",
        {
          text: "tha2025shop@gmail.com",
          href: "mailto:tha2025shop@gmail.com?subject=Burnout%20Bash%202026%20Vendor%20Application",
        },
        ". Know a local business that belongs here? Send them this article.",
      ],
    },
    { type: "h2", text: "Two Days of Bikes, Games, Burnouts & Live Music" },
    {
      type: "p",
      text: "Burnout Bash brings riders together for burnout contests, biker games, live music, vendors, food and drinks, giveaways, and a full weekend with people who share the same love of motorcycles. Jump into the games or come watch the action.",
    },
    {
      type: "p",
      parts: [
        "Planning your weekend? Check the ",
        {
          text: "Burnout Bash event page",
          href: "/event-calendar",
        },
        " for the live music lineup, biker game times, vendor list, and event details.",
      ],
    },
    { type: "h2", text: "Drop It in the Group Chat" },
    {
      type: "p",
      text: "You know that group chat where everybody spends three days trying to figure out where they're riding this weekend? Problem solved. Send them this: Burnout Bash, October 3 & 4, 2026, at Drifters Ice House, 29293 FM 149, Richards, TX 77873.",
    },
    {
      type: "p",
      text: "Good bikes. Good people. Texas roads. Meet at Drifters. Riders from Magnolia, The Woodlands, Tomball, Spring, Conroe, and beyond—get your crew together and make a weekend of it.",
    },
    { type: "h2", text: "Same Passion. Different Builds. Bigger Stories." },
    {
      type: "p",
      text: "Tha Shop and Crazy Eight Customs are about more than what rolls through our bays in Magnolia. Motorcycles bring together the friends you ride with, the machines you build, the stories behind those machines, and the places you end up along the way. That's what Burnout Bash is about.",
    },
    {
      type: "p",
      text: "Bring the bike you spent all year building. Bring the daily rider covered in miles. Bring your friends who don't even own a bike yet. Come ready for a good weekend.",
    },
    { type: "h2", text: "We'll See You at Drifters" },
    {
      type: "p",
      text: "Burnout Bash 2026 happens October 3–4 at Drifters Ice House in Richards, Texas. All bikes are welcome. Spectators are welcome. Vendors can contact Tha Shop about getting involved.",
    },
    {
      type: "p",
      parts: [
        "Have a question? ",
        { text: "Contact Tha Shop", href: "/contact" },
        " or email ",
        { text: "tha2025shop@gmail.com", href: "mailto:tha2025shop@gmail.com" },
        ". And before you close this page, send it to the group chat. October 3 & 4. Drifters Ice House. We'll see you there.",
      ],
    },
  ],
} satisfies BlogPost;
