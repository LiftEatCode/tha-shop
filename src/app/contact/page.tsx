import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";

import { AppointmentForm } from "@/components/forms/appointment-form";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request an appointment or visit Tha Shop at 24495 FM 1488, Magnolia, TX. Call (936) 297-0820.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const schema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <Section className="grain pt-16 pb-10 md:pt-24">
        <Container>
          <PageHeader
            title="Contact"
            description="Call, stop by, or request an appointment. We will talk through repairs, builds, and fleet needs without the sales pitch."
          />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div id="appointment" className="scroll-mt-28">
            <h2 className="font-display text-bay text-3xl tracking-wide">
              Request an Appointment
            </h2>
            <p className="text-steel mt-3 text-sm leading-relaxed">
              Share the vehicle and what you need. A photo helps us prepare
              before you arrive.
            </p>
            <div className="relative mt-6">
              <AppointmentForm />
            </div>
          </div>

          <aside className="border-bay/15 space-y-8 border-t pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <div>
              <h2 className="font-display text-2xl tracking-wide">
                Come see the shop
              </h2>
              <p className="text-steel mt-3 text-sm leading-relaxed">
                Walk in during business hours for repairs, motorcycle service,
                or to talk through a custom project.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <p className="text-bay inline-flex items-start gap-3">
                <MapPin
                  className="text-engine mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <span>{siteConfig.address.full}</span>
              </p>
              <a
                href={siteConfig.phone.href}
                className="text-bay hover:text-engine focus-visible:outline-engine inline-flex items-center gap-3 font-mono font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={`Call ${siteConfig.name} at ${siteConfig.phone.display}`}
              >
                <Phone className="text-engine size-4" aria-hidden="true" />
                {siteConfig.phone.display}
              </a>
              <div className="text-bay inline-flex items-start gap-3">
                <Clock
                  className="text-engine mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <ul className="space-y-1 font-mono text-xs tracking-wide">
                  {siteConfig.hours.map((row) => (
                    <li key={row.days}>
                      <span className="font-medium">{row.days}:</span>{" "}
                      {row.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={siteConfig.directionsUrl}
              data-analytics="directions_click"
              className="text-engine hover:text-engine-hot focus-visible:outline-engine inline-flex text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </aside>
        </Container>
      </Section>
    </>
  );
}
