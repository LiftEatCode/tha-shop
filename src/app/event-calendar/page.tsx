import Image from "next/image";
import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { eventsCalendar, pastEventsNote } from "@/content/pages";
import {
  getBreadcrumbSchema,
  getEventSchema,
  serializeJsonLd,
} from "@/lib/seo";

const burnoutBashVendors = [
  "MooseCycles",
  "333 Tattoo",
  "Harley Davidson The Ranch",
  "Tha Shop",
  "Maws Paws Farm and Kitchen",
  "Wratch",
  "Good Ole Gals Bakery",
  "The Monroe Kennedy Group",
] as const;

export const metadata: Metadata = {
  title: "Event Calendar",
  description:
    "Upcoming motorcycle rallies, burnout events, and shows on the Tha Shop calendar.",
  alternates: { canonical: "/event-calendar" },
};

export default function EventCalendarPage() {
  const schema = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Event Calendar", path: "/event-calendar" },
    ]),
    ...eventsCalendar.map((event) =>
      getEventSchema({
        name: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        locationName: event.location.split(",")[0] ?? event.location,
        locationAddress: event.location,
        image: event.image,
        url: "/event-calendar",
      }),
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pt-16 pb-10 md:pt-24">
        <Container>
          <PageHeader
            title="Upcoming events"
            description="Motorcycle rallies, shows, and gatherings worth putting on the calendar. Dates below are taken from the live Tha Shop listings."
          />
        </Container>
      </Section>

      <Section>
        <Container className="space-y-10">
          {eventsCalendar.map((event) => (
            <article
              key={event.id}
              className="border-bay/15 grid gap-8 border-t pt-8 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="bg-bay/5 relative aspect-[3/4] overflow-hidden sm:aspect-[4/3] lg:aspect-square">
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-engine font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                  {event.displayDate}
                </p>
                <h2 className="font-display text-bay mt-2 text-3xl tracking-wide">
                  {event.title}
                </h2>
                <p className="text-bay mt-3 text-sm font-medium">
                  {event.location}
                </p>
                <p className="text-steel mt-4 text-sm leading-relaxed">
                  {event.description}
                </p>

                {event.id === "burnout-bash-2026" && (
                  <div className="border-engine/35 bg-bay relative mt-8 overflow-hidden border px-5 py-6 sm:px-7">
                    <div className="bg-engine absolute top-0 left-0 h-1 w-full" />
                    <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-4">
                      <div>
                        <p className="text-engine font-mono text-[11px] font-semibold tracking-[0.2em] uppercase">
                          Burnout Bash 2026
                        </p>
                        <h3 className="font-display mt-1 text-2xl tracking-wide text-white sm:text-3xl">
                          Vendor Lineup
                        </h3>
                      </div>
                      <span className="font-mono text-xs tracking-[0.14em] text-white/55 uppercase">
                        Richards, TX
                      </span>
                    </div>

                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      {burnoutBashVendors.map((vendor, index) => (
                        <div
                          key={vendor}
                          className="flex items-center gap-3 border border-white/10 bg-white/[0.04] px-4 py-3"
                        >
                          <span className="text-engine font-mono text-xs font-bold">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-semibold tracking-wide text-white">
                            {vendor}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-[0.12em] text-white/60 uppercase">
                      Bikes • Ink • Food • Local Vendors • Texas Motorcycle Community
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}

          <p className="border-bay/25 bg-surface-muted text-steel border border-dashed px-5 py-4 text-sm leading-relaxed">
            {pastEventsNote}
          </p>
        </Container>
      </Section>
    </>
  );
}
