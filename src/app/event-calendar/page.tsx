import Image from "next/image";
import type { Metadata } from "next";

import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { eventsCalendar, pastEventsNote } from "@/content/pages";
import {
  getBreadcrumbSchema,
  getEventSchema,
  serializeJsonLd,
} from "@/lib/seo";

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
