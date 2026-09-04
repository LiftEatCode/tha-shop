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

const vendorApplicationPath =
  "/documents/burnout-bash-2026-vendor-application.pdf";
const vendorEmail = "tha2025shop@gmail.com";
const burnoutBashUrl = "https://thashops.com/event-calendar";
const burnoutBashDirectionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Drifters%2C%2029293%20FM%20149%2C%20Richards%2C%20TX%2077873";
const burnoutBashFacebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(burnoutBashUrl)}`;

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
                  <>
                    <div className="border-engine/30 bg-surface-muted relative mt-7 overflow-hidden border px-5 py-6 sm:px-7">
                      <div className="bg-engine absolute top-0 left-0 h-1 w-full" />
                      <p className="text-engine font-mono text-[11px] font-semibold tracking-[0.2em] uppercase">
                        October 3–4 • Richards, Texas
                      </p>
                      <h3 className="font-display text-bay mt-2 text-3xl tracking-wide sm:text-4xl">
                        All bikes. All weekend.
                      </h3>
                      <p className="text-steel mt-3 text-sm font-semibold tracking-wide uppercase">
                        Burnouts • Live Music • Food • Vendors • Giveaways
                      </p>
                      <p className="text-steel mt-4 max-w-2xl text-sm leading-relaxed">
                        Roll out to Drifters for a full weekend built around bikes and the Texas motorcycle community. Bring your crew, check out the vendors, and stay for the action.
                      </p>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a
                          href={burnoutBashDirectionsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-engine text-bay inline-flex min-h-11 items-center justify-center px-5 py-3 font-mono text-xs font-bold tracking-[0.12em] uppercase transition hover:bg-bay hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bay"
                        >
                          Get Directions
                        </a>
                        <a
                          href={burnoutBashFacebookShareUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="border-bay/25 text-bay hover:border-engine hover:text-engine inline-flex min-h-11 items-center justify-center border px-5 py-3 font-mono text-xs font-bold tracking-[0.12em] uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bay"
                        >
                          Share on Facebook
                        </a>
                        <a
                          href={burnoutBashUrl}
                          className="border-bay/25 text-bay hover:border-engine hover:text-engine inline-flex min-h-11 items-center justify-center border px-5 py-3 font-mono text-xs font-bold tracking-[0.12em] uppercase transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bay"
                          title="Copy this event link from your browser to share it"
                        >
                          Event Link
                        </a>
                      </div>
                      <p className="text-steel/70 mt-3 font-mono text-[10px] tracking-[0.1em] uppercase">
                        Share the Bash with your riding crew
                      </p>
                    </div>

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

                      <div className="border-engine/30 mt-7 border-t pt-6">
                        <p className="text-engine font-mono text-[11px] font-semibold tracking-[0.2em] uppercase">
                          Want a spot at the Bash?
                        </p>
                        <h4 className="font-display mt-1 text-2xl tracking-wide text-white">
                          Interested in becoming a vendor?
                        </h4>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                          Download the official vendor application, fill it out, and email the completed application to{" "}
                          <a
                            href={`mailto:${vendorEmail}`}
                            className="text-engine font-semibold underline decoration-white/20 underline-offset-4 transition hover:text-white"
                          >
                            {vendorEmail}
                          </a>
                          . Vendor spaces are assigned first-come, first-served, so get your application in early.
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          <a
                            href={vendorApplicationPath}
                            download
                            className="bg-engine text-bay inline-flex min-h-11 items-center justify-center px-5 py-3 font-mono text-xs font-bold tracking-[0.12em] uppercase transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            Download Vendor Application
                          </a>
                          <a
                            href={`mailto:${vendorEmail}?subject=${encodeURIComponent("Burnout Bash 2026 Vendor Application")}`}
                            className="border border-white/25 bg-white/[0.04] inline-flex min-h-11 items-center justify-center px-5 py-3 font-mono text-xs font-bold tracking-[0.12em] text-white uppercase transition hover:border-engine hover:text-engine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            Email Completed Application
                          </a>
                        </div>

                        <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-white/45 uppercase">
                          Vendor fee: $50 or approved promo code • Setup begins Friday, October 2 at 10 AM
                        </p>
                      </div>
                    </div>
                  </>
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
