# Tha Shops

Production rebuild of [thashops.com](https://thashops.com) — auto and motorcycle repair, restoration, and custom fabrication in Magnolia, TX.

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
```

## Site map

- `/` Home
- `/about`
- `/for-sale`
- `/auto-services`, `/motorcycle-services`, `/fleet-services`, `/fabrication-services`
- `/cars`, `/trucks`, `/motorcycles`, `/events` (The Garage)
- `/contact` (appointment request form)
- `/blog`, `/event-calendar`, `/store`

## Notes

- Appointment form validates and accepts photo attachments; delivery (email vs database) is not wired until configured.
- Blog and store show honest empty states — no invented posts or products.
- Testimonials / AggregateRating schema omitted until real review content is provided.
