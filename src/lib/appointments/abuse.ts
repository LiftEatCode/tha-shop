const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MIN_FILL_MS = 800;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

const hitsByIp = new Map<string, number[]>();

export function getClientIp(headerStore: Headers): string {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return headerStore.get("x-real-ip")?.trim() || "unknown";
}

export function isRateLimited(ip: string, now = Date.now()): boolean {
  if (process.env.NODE_ENV === "test") return false;

  const recent = (hitsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    hitsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  hitsByIp.set(ip, recent);
  return false;
}

export function getFormTimingError(
  formStartedAt: string,
  now = Date.now(),
): string | null {
  const startedAt = Number.parseInt(formStartedAt, 10);
  if (!Number.isFinite(startedAt)) {
    return "Please try again.";
  }

  const elapsed = now - startedAt;
  if (elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    return "Please try again.";
  }

  return null;
}

/**
 * In-memory rate limiting is per server instance. On Vercel that is not a
 * shared store, so production abuse control should move to Vercel Firewall
 * rate limiting (or Upstash Redis) as the next step.
 */
export const ABUSE_PROTECTION_NOTE =
  "Next step: add Vercel Firewall rate limiting (or Upstash Redis) so appointment submissions are limited across all instances.";
