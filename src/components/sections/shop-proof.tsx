import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ButtonLink, Container, Section } from "@/components/ui/primitives";
export function ShopProof() {
  return (
    <Section tone="muted">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <figure>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/shop/hero-photo.jpg"
              alt="A Tha Shop mechanic working by hand in the engine bay of a hot rod"
              fill
              sizes="(max-width:1024px) 100vw,50vw"
              className="object-cover"
            />
          </div>
          <figcaption className="text-steel mt-3 text-sm">
            Hands-on work from the Magnolia shop floor.
          </figcaption>
        </figure>
        <div>
          <p className="text-engine font-mono text-xs tracking-widest uppercase">
            The people behind the work
          </p>
          <h2 className="font-display text-bay mt-3 text-4xl">
            Talk to the shop that works on your vehicle.
          </h2>
          <p className="text-steel mt-5 leading-relaxed">
            Bring the daily driver, work truck, motorcycle, or classic project.
            At Tha Shop on FM 1488, we diagnose first and explain what we find
            in plain language.
          </p>
          <ul className="text-steel mt-5 space-y-3">
            <li>
              <strong className="text-bay">Start with your concern.</strong>{" "}
              Tell us what changed and how you use the vehicle.
            </li>
            <li>
              <strong className="text-bay">Understand the next step.</strong>{" "}
              Discuss the findings and proposed work before planning the repair.
            </li>
            <li>
              <strong className="text-bay">See the work.</strong> Browse real
              shop photos and project spotlights.
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonLink href="/about" variant="secondary">
              Get to know Tha Shop
            </ButtonLink>
            <Link
              href="/projects"
              className="text-engine self-center underline"
            >
              Inside the workshop →
            </Link>
          </div>
          <div className="border-bay/15 mt-7 border-t pt-5">
            <h3 className="font-semibold">Hear from customers</h3>
            <p className="text-steel mt-2 text-sm">
              Find Tha Shop on Google to read customer reviews or share your
              experience after a visit.
            </p>
            <a
              className="text-engine mt-3 inline-block font-semibold underline"
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find Tha Shop and reviews on Google ↗
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
