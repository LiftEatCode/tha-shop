# Tha Shop service and content improvements

## Included

- Five dedicated service pages: /services/brake-repair, /services/ac-repair, /services/check-engine-diagnostics, /services/suspension-repair, /services/motorcycle-maintenance. Each has specific copy, visible FAQs, an appointment CTA, phone/directions, canonical metadata, Service/Breadcrumb schema and relevant published-article links. Existing service hubs remain at their original URLs and link to the new pages.
- A visible homepage H1 describing auto/motorcycle repair in Magnolia, existing branding/tagline retained, specific service links, real mechanic imagery, customer-review discovery link, project cards and a feed of current published shop notes.
- /projects plus three individual photo-led spotlights based on inspected existing shop photographs. The pages intentionally do not claim a repair diagnosis, job completion, customer history, measured performance gain or before/after result without records. Linked from homepage, navigation, galleries and relevant service pages.
- Three new dated guides: November vehicle maintenance, preparing for check-engine diagnostics, and motorcycle service after storage. New content links to relevant service pages and appointment requests. Existing articles receive related service links without rewriting their database content.
- Burnout Bash's existing blog URL is retained with an explicit past-event banner and archive metadata. It moves to a Past events section on the blog and is excluded from homepage latest posts/related-current posts. The calendar checks dates in America/Chicago, suppresses expired application/attendance promotion and excludes expired events from upcoming Event schema.
- New service/project pages and guides appear in the sitemap. Unknown static-page modification dates are omitted instead of changing on every request.

## Deployment

No schema migration or analytics configuration is included. The new guides are registered as source content, so public pages can show them immediately via the existing source fallback. To import them into the staff editor after pulling this branch, use the existing idempotent content import:

```bash
npm install
npm run cms:migrate
npm run cms:migrate -- --apply
```

This inserts only missing posts and does not overwrite CMS-edited content or revive unpublished/deleted posts. Past-event notices also work on previously imported database copies, without altering their stored editorial content.

Merge the PR to deploy after review. Confirm the Google review-discovery link resolves to the correct business. A verified direct listing/review URL can replace this search link later.

## Evidence still needed

A review-discovery link and real crew imagery are included. No customer quotations, star scores, technician names/certifications, specific job histories or outcomes were invented. Add verified customer excerpts with attribution and confirmed technician/job details when available. These photo-led pages are project spotlights, not documented diagnostic case studies. No map-ranking or traffic increase is guaranteed.

## Validation

`npm run test:growth` starts the built app, checks new rendered routes, exactly one H1, homepage headline visibility in markup, canonical/schema output, service appointment CTAs, expired-event treatment, new sitemap entries, internal links and unknown-route 404s. Run after `npm run build`. Also run lint, typecheck, test:cms and test:blog. This workspace has no production database credentials, so verification uses public source fallback and isolated SQL tests; verify CMS-managed content on the deployed preview. Headless Chromium checks also cover mobile homepage/service layouts and a desktop project page, horizontal overflow and browser runtime errors.
