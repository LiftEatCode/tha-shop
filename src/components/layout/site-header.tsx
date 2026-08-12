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
    <header className="sticky top-0 z-50 border-b border-bay/10 bg-daylight/95 backdrop-blur-md">
      <div className="bg-bay text-daylight">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs sm:text-sm">
          <p className="font-medium tracking-wide">{siteConfig.discountBanner}</p>
          <a
            href={siteConfig.phone.href}
            className="inline-flex min-h-11 items-center gap-2 py-2 font-mono text-sm font-semibold hover:text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
            aria-label={`Call Tha Shops at ${siteConfig.phone.display}`}
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {siteConfig.phone.display}
          </a>
        </Container>
      </div>

      <Container className="flex h-16 items-center gap-4 md:h-20">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
          aria-label="Tha Shops home"
        >
          <Image
            src="/images/shop/logo-wordmark.png"
            alt="Tha Shops"
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
                  className="inline-flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-semibold text-bay/80 transition hover:bg-bay/5 hover:text-bay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
                >
                  {item.name}
                  <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 min-w-64 translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-sm border border-bay/10 bg-daylight p-2 shadow-lift">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block rounded-sm px-3 py-2 hover:bg-bay/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
                      >
                        <span className="block text-sm font-semibold text-bay">
                          {sub.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-steel">
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
                className="rounded-sm px-3 py-2 text-sm font-semibold text-bay/80 transition hover:bg-bay/5 hover:text-bay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
              >
                {item.name}
              </Link>
            ),
          )}
        </nav>

        <a
          href={siteConfig.primaryCta.href}
          className="ml-auto hidden rounded-sm bg-engine px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-engine-hot focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine sm:inline-flex lg:ml-3"
        >
          {siteConfig.primaryCta.name}
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-sm border border-bay/15 text-bay transition hover:bg-bay/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine lg:hidden"
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
          "border-t border-bay/10 bg-daylight lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4" as="nav">
          {siteConfig.navigation.map((item) => (
            <div key={item.name} className="flex flex-col">
              <Link
                href={item.href}
                className="rounded-sm px-3 py-2.5 text-base font-semibold text-bay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
              {hasItems(item)
                ? item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="rounded-sm px-6 py-2 text-sm text-steel focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
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
            className="mt-2 inline-flex items-center gap-2 rounded-sm bg-bay px-3 py-3 text-sm font-semibold text-daylight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-engine"
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
