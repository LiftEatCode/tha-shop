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
            title="Contact Us"
            description="Drop us a line or stop by during business hours. We are glad to talk through repairs, builds, and fleet needs."
          />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div id="appointment" className="scroll-mt-28">
            <h2 className="font-display text-3xl tracking-wide text-ink">
              Request an Appointment
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              Share your vehicle details and what you need. Optional photo uploads help us
              prepare before you arrive.
            </p>
            <div className="relative mt-6">
              <AppointmentForm />
            </div>
          </div>

          <aside className="space-y-8 border-t border-ink/15 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <h2 className="font-display text-2xl tracking-wide">Better yet, see us in person</h2>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                Visit during normal business hours for repairs, maintenance, motorcycle
                service, or to talk through a custom project.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <p className="inline-flex items-start gap-3 text-ink">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden="true" />
                <span>{siteConfig.address.full}</span>
              </p>
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center gap-3 font-semibold text-ink hover:text-ember"
                aria-label={`Call Tha Shops at ${siteConfig.phone.display}`}
              >
                <Phone className="size-4 text-ember" aria-hidden="true" />
                {siteConfig.phone.display}
              </a>
              <div className="inline-flex items-start gap-3 text-ink">
                <Clock className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden="true" />
                <ul className="space-y-1">
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
              className="inline-flex text-sm font-semibold text-ember hover:text-ember-hot"
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
