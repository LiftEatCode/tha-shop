import Image from "next/image";

import { Container, Section } from "@/components/ui/primitives";

const vikingBagsUrl =
  "https://www.vikingbags.com/collections/bmw-f-850-gs-adventure-touring-hard-side-cases";

export function VikingBagsPartner() {
  return (
    <Section tone="muted">
      <Container>
        <div className="border-bay/15 flex flex-col gap-6 border p-6 sm:flex-row sm:items-center sm:gap-10 md:p-8">
          <a
            href={vikingBagsUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            aria-label="Viking Bags BMW F 850 GS Adventure touring hard side cases (opens in a new tab)"
            className="focus-visible:outline-engine bg-bay self-start rounded-sm p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Image
              src="/images/partners/viking-bags.png"
              alt="Viking Bags"
              width={390}
              height={325}
              className="h-auto w-32"
              sizes="128px"
            />
          </a>
          <div>
            <p className="text-engine font-mono text-xs font-semibold tracking-[0.16em] uppercase">
              Product partner
            </p>
            <h2 className="font-display text-bay mt-2 text-3xl tracking-wide">
              Viking Bags
            </h2>
            <p className="text-steel mt-3 max-w-2xl text-sm leading-relaxed">
              Explore Viking Bags hard side cases for the BMW F 850 GS Adventure
              touring motorcycle.
            </p>
            <a
              href={vikingBagsUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="text-engine hover:text-engine-hot focus-visible:outline-engine mt-4 inline-block text-sm font-semibold underline underline-offset-4 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Shop BMW F 850 GS Adventure hard side cases
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="text-steel mt-4 text-xs leading-relaxed">
              Viking Bags provided product in exchange for this placement.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
