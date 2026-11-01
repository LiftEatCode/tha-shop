# Gallery management

`/admin/gallery` manages the existing Cars, Trucks, Motorcycles and Events galleries. Admins and editors can upload, caption, categorize, group into project albums, set one cover per album, reorder, publish and hide photos. Only admins can delete gallery entries, enforced by the server action. Deletion hides the entry and retains its source identity; it does not destroy Cloudinary assets that may be used in blog posts or elsewhere. Deleted entries have no restore UI.

## Setup

Use the same DATABASE_URL and Cloudinary variables already configured for the blog. Pull the gallery branch, install dependencies, then review and apply the gallery migration:

```bash
npm install
npm run gallery:migrate
npm run gallery:migrate -- --apply
npm run dev
```

DIRECT_URL is preferred for migration if provided. The migration creates the gallery table and imports every current image from the four source galleries in a transaction. Existing local files are retained, not uploaded to Cloudinary. Imports are idempotent and do not overwrite captions, album assignments, visibility, category moves or deletions. Apply this migration against the target database before deploying the gallery change. There is no migration during builds or requests.

Until the table exists, public pages retain their source galleries. After migration, hidden/deleted photos stay absent even if the category is completely empty. The separate curated homepage photo strip remains source-managed.

## Use

1. Open Gallery in the staff navigation and select a category.
2. Optionally name a project/album, then select up to 20 JPEG/PNG/WebP files, each under 3 MB.
3. Files upload sequentially to the existing authenticated Cloudinary endpoint. Each success registers a hidden gallery entry. Individual failures are shown; retry preserves successful entries and reuses uploaded URLs when only database registration failed. Registration by uploaded URL is idempotent, including retry after a lost response. Upload failures can leave an unused Cloudinary asset; there is no automatic remote deletion.
4. Enter an image description, optional caption and album. Check Visible on website and Save photo to publish. This updates the public gallery immediately; gallery metadata has no separate draft/published revisions.
5. Set Cover for this album to put a photo first within its group. Only one entry can be cover per category/album. Albums are simple text groups; they are created or renamed by editing photo assignments and have no separate URLs.
6. Use Display order or Move earlier/later to arrange photos within an album. Save metadata edits before reordering; reordering/cover changes refresh the affected rows. Lower display order sorts first, after the cover.
7. Uncheck Visible and save to hide. Admins can select Delete photo and confirm to remove the gallery entry. Cloudinary files and existing local files remain intact.

Public category pages render album headings, captions and optimized images through the existing gallery layout, retaining the partner section on Motorcycles and all existing page URLs. No automatic changes are made to homepage photos, service-page photos or blog images.

## Validation

`npm run test:gallery` runs actual SQL against isolated PGlite Postgres. It covers repeat schema/import, hidden uploads, idempotent registration, publish, captions/albums, single covers, ordering, category moves, optimistic conflicts, deleted-item edits, non-resurrection after repeat imports, empty galleries and invalid input. Server actions require current editor/admin authorization. Also run typecheck, lint, build, and test:media.

The workspace has no user Neon or Cloudinary credentials. After migration and deployment, verify authenticated batch upload, metadata save, visibility, cover/reordering and deletion against the configured environment. Use test photos; Cloudinary assets remain public by URL even while hidden from the gallery.
