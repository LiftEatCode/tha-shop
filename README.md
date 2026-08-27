# Tha Shop

Production rebuild of [thashops.com](https://thashops.com) — auto and motorcycle repair, restoration, and custom fabrication in Magnolia, TX.

The business name is **Tha Shop**. The domain is **thashops.com** because `thashop.com` was unavailable.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Deploy target: Vercel

## Scripts

```bash
npm install
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint
npm run typecheck
npm run test:form
npm run test:blog
npm run test:redirects
```

## Environment variables

Copy `.env.example` to `.env.local` and fill:

- `RESEND_API_KEY` — Resend API key (server-only)
- `APPOINTMENT_FROM_EMAIL` — verified sender, for example `Tha Shop <appointments@thashops.com>`
- `APPOINTMENT_TO_EMAIL` — inbox that should receive appointment leads
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 measurement ID when a real property exists; leave empty until then

## Site map

- `/` Home
- `/about`
- `/for-sale`
- `/auto-services`, `/motorcycle-services`, `/fleet-services`, `/fabrication-services`
- `/cars`, `/trucks`, `/motorcycles`, `/events` (The Garage)
- `/contact` (appointment request form)
- `/blog`, `/blog/[slug]`, `/event-calendar`
- `/store` exists in the codebase but is disabled until `featureFlags.storeEnabled` is set to `true` in `src/config/features.ts`

## Notes

- Appointment requests are validated server-side and delivered by Resend email. Photo attachments are included when present.
- Form protection is a honeypot, a minimum fill time, and per-instance in-memory rate limiting. Shared production rate limiting should use Vercel Firewall or Upstash Redis.
- Conversion events (`appointment_started`, `appointment_submitted`, `phone_click`, `directions_click`) no-op until `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- Blog posts live in `src/content/blog/posts/` and are registered in `src/content/blog/index.ts`. Sitemap, metadata, and JSON-LD are generated from that registry.
- Permanent redirects from the former GoDaddy site live in `src/config/redirects.ts` and are applied in `next.config.ts`.
- Testimonials / AggregateRating schema omitted until real review content is provided.
