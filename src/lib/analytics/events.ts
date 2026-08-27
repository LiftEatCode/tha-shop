export const ANALYTICS_EVENTS = {
  appointmentStarted: "appointment_started",
  appointmentSubmitted: "appointment_submitted",
  phoneClick: "phone_click",
  directionsClick: "directions_click",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i;

export function getGaMeasurementId(): string | null {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id || !GA_MEASUREMENT_ID_PATTERN.test(id)) {
    return null;
  }
  return id;
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  if (!getGaMeasurementId()) return;

  const gtag = window.gtag;
  if (typeof gtag !== "function") return;

  gtag("event", event, params);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: string,
      target: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}
