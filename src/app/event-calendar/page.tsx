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
    "Upcoming motorcycle rallies, burnout events, and shows on the Tha Shops calendar.",
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
      <Section className="grain pb-10 pt-16 md:pt-24">
        <Container>
          <PageHeader
            title="Upcoming events"
            description="Motorcycle rallies, shows, and gatherings worth putting on the calendar. Dates below are taken from the live Tha Shops listings."
          />
        </Container>
      </Section>

      <Section>
        <Container className="space-y-10">
          {eventsCalendar.map((event) => (
            <article
              key={event.id}
              className="grid gap-8 border-t border-ink/15 pt-8 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink/5 sm:aspect-[4/3] lg:aspect-square">
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
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">
                  {event.displayDate}
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-wide text-ink">
                  {event.title}
                </h2>
                <p className="mt-3 text-sm font-medium text-ink">{event.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-steel">{event.description}</p>
              </div>
            </article>
          ))}

          <p className="rounded-xl border border-dashed border-ink/20 bg-surface-muted px-5 py-4 text-sm leading-relaxed text-steel">
            {pastEventsNote}
          </p>
        </Container>
      </Section>
    </>
  );
}
