"use client";

import { useEffect } from "react";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/events";

export function ConversionClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const hook = anchor.dataset.analytics;

      if (href.startsWith("tel:") || hook === ANALYTICS_EVENTS.phoneClick) {
        trackEvent(ANALYTICS_EVENTS.phoneClick);
        return;
      }

      if (
        hook === ANALYTICS_EVENTS.directionsClick ||
        href.includes("google.com/maps")
      ) {
        trackEvent(ANALYTICS_EVENTS.directionsClick);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
