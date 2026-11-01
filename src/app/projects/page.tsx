import type { Metadata } from "next";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { ProjectCards } from "@/components/sections/project-cards";
import { ServiceCta } from "@/components/sections/service-cta";
export const metadata: Metadata = {
  title: "Projects from the Magnolia Shop Floor",
  description:
    "Photo-led spotlights from Tha Shop: hot rod engine work, a Harley on the lift, and a classic pickup in the Magnolia workshop.",
  alternates: { canonical: "/projects" },
};
export default function Projects() {
  return (
    <>
      <Section className="grain">
        <Container>
          <PageHeader
            eyebrow="Tha Shop · Magnolia, TX"
            title="Inside the shop"
            description="Take a closer look at the vehicles and hands-on work behind our gallery. Browse a spotlight, then tell us what you have in mind for your own vehicle."
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <ProjectCards />
        </Container>
      </Section>
      <Section>
        <Container>
          <ServiceCta title="Tell us about your project" />
        </Container>
      </Section>
    </>
  );
}
