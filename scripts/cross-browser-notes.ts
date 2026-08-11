/**
 * Cross-browser notes (audit section 7)
 * ------------------------------------
 * Chrome/Blink: verified via Playwright against the production server
 *   (home + contact form submit, sticky header, hero CTAs).
 * Safari/WebKit: Playwright WebKit could not launch in this environment
 *   (missing host libs: libavif / install-deps). Code review hardening applied:
 *   - avoided color-mix(oklab) for ::selection (older Safari)
 *   - sticky header / mobile call bar keep opaque cream backgrounds under blur
 *   - min() / sticky / flex gap are fine on modern Safari (16+)
 * Re-check on a Mac Safari once available.
 */
export {};
