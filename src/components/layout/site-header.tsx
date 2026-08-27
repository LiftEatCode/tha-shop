"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { siteConfig, type NavItem, type NavLink } from "@/config/site";
import { Container } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

function hasItems(item: NavItem): item is NavItem & { items: NavLink[] } {
  return Array.isArray(item.items) && item.items.length > 0;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="border-bay/10 bg-daylight/95 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="bg-bay text-daylight">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs sm:text-sm">
          <p className="font-medium tracking-wide">
            {siteConfig.discountBanner}
          </p>
          <a
            href={siteConfig.phone.href}
            className="hover:text-chrome focus-visible:outline-chrome inline-flex min-h-11 items-center gap-2 py-2 font-mono text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={`Call ${siteConfig.name} at ${siteConfig.phone.display}`}
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {siteConfig.phone.display}
          </a>
        </Container>
      </div>

      <Container className="flex h-16 items-center gap-4 md:h-20">
        <Link
          href="/"
          className="group focus-visible:outline-engine flex shrink-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/images/shop/logo-wordmark.png"
            alt={siteConfig.name}
            width={180}
            height={90}
            className="h-12 w-auto object-contain md:h-14"
            priority
          />
        </Link>

        <nav
          className="ml-auto hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {siteConfig.navigation.map((item) =>
            hasItems(item) ? (
              <div key={item.name} className="group relative">
                <Link
                  href={item.href}
                  className="text-bay/80 hover:bg-bay/5 hover:text-bay focus-visible:outline-engine inline-flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {item.name}
                  <ChevronDown
                    className="size-3.5 opacity-60"
                    aria-hidden="true"
                  />
                </Link>
                <div className="invisible absolute top-full left-0 z-50 min-w-64 translate-y-1 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="border-bay/10 bg-daylight shadow-lift rounded-sm border p-2">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="hover:bg-bay/5 focus-visible:outline-engine block rounded-sm px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <span className="text-bay block text-sm font-semibold">
                          {sub.name}
                        </span>
                        <span className="text-steel mt-0.5 block text-xs">
                          {sub.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-bay/80 hover:bg-bay/5 hover:text-bay focus-visible:outline-engine rounded-sm px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {item.name}
              </Link>
            ),
          )}
        </nav>

        <a
          href={siteConfig.primaryCta.href}
          className="bg-engine hover:bg-engine-hot focus-visible:outline-engine ml-auto hidden rounded-sm px-4 py-2.5 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex lg:ml-3"
        >
          {siteConfig.primaryCta.name}
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="border-bay/15 text-bay hover:bg-bay/5 focus-visible:outline-engine inline-flex size-10 items-center justify-center rounded-sm border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
          aria-expanded={open}
          aria-controls={mobileNavId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </Container>

      <div
        id={mobileNavId}
        className={cn(
          "border-bay/10 bg-daylight border-t lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4" as="nav">
          {siteConfig.navigation.map((item) => (
            <div key={item.name} className="flex flex-col">
              <Link
                href={item.href}
                className="text-bay focus-visible:outline-engine rounded-sm px-3 py-2.5 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
              {hasItems(item)
                ? item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="text-steel focus-visible:outline-engine rounded-sm px-6 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))
                : null}
            </div>
          ))}
          <a
            href={siteConfig.phone.href}
            className="bg-bay text-daylight focus-visible:outline-engine mt-2 inline-flex items-center gap-2 rounded-sm px-3 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setOpen(false)}
          >
            <Phone className="size-4" aria-hidden="true" />
            Call {siteConfig.phone.display}
          </a>
        </Container>
      </div>
    </header>
  );
}
