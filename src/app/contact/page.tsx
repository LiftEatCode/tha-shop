import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";

import { AppointmentForm } from "@/components/forms/appointment-form";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request an appointment or visit Tha Shops at 24495 FM 1488, Magnolia, TX. Call (936) 297-0820.",
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
      <Section className="grain pb-10 pt-16 md:pt-24">
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
            <h2 className="font-display text-3xl tracking-wide text-bay">
              Request an Appointment
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              Share the vehicle and what you need. A photo helps us prepare before you arrive.
            </p>
            <div className="relative mt-6">
              <AppointmentForm />
            </div>
          </div>

          <aside className="space-y-8 border-t border-bay/15 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <h2 className="font-display text-2xl tracking-wide">Come see the shop</h2>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                Walk in during business hours for repairs, motorcycle service, or to talk through
                a custom project.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <p className="inline-flex items-start gap-3 text-bay">
                <MapPin className="mt-0.5 size-4 shrink-0 text-engine" aria-hidden="true" />
                <span>{siteConfig.address.full}</span>
              </p>
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center gap-3 font-mono font-semibold text-bay transition hover:text-engine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
                aria-label={`Call Tha Shops at ${siteConfig.phone.display}`}
              >
                <Phone className="size-4 text-engine" aria-hidden="true" />
                {siteConfig.phone.display}
              </a>
              <div className="inline-flex items-start gap-3 text-bay">
                <Clock className="mt-0.5 size-4 shrink-0 text-engine" aria-hidden="true" />
                <ul className="space-y-1 font-mono text-xs tracking-wide">
                  {siteConfig.hours.map((row) => (
                    <li key={row.days}>
                      <span className="font-medium">{row.days}:</span> {row.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`}
              className="inline-flex text-sm font-semibold text-engine transition hover:text-engine-hot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
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
