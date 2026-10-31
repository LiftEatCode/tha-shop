# Tha Shop blog CMS

Tha Shop will have its own admin dashboard at `/admin`, with staff accounts stored in its own Postgres database. Existing blog URLs and public presentation remain the migration targets.

## Milestone 1: staff access (this branch)

- `/admin/login`: email/password login, no public signup.
- `/admin/blog`: protected inventory of the existing source-managed posts.
- `/admin/users`: admins can list staff and create admin or editor accounts.
- `/admin/account`: staff can change their password; other sessions are revoked.
- Better Auth handles password hashing, sessions, origin checks, and database-backed rate limiting. Session cookie caching is disabled so access checks use current database state.
- Admin capabilities are restricted to account creation and listing. Role assignment is allowed during creation; changes to existing roles, deletion, impersonation, and account suspension are not enabled in this milestone.
- Both roles can create, edit, and publish blog posts. Only admins can access user management.

## Local and deployment setup

Use Node 24 or newer and `npm ci`. Create a dedicated Postgres database for each environment. Do not point previews or integration checks at the production database.

Set these server-only environment variables in `.env.local` locally and in the hosting environment for deployment:

```dotenv
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
```

Generate a secret with `openssl rand -base64 32`. Production requires the site's exact HTTPS origin as `BETTER_AUTH_URL`. Each preview must have its own exact origin and database. Never expose these values with a `NEXT_PUBLIC_` prefix.

Review the generated authentication migration, then apply it:

```bash
npm run admin:migrate
npm run admin:migrate -- --apply
```

The migration uses the installed Better Auth version's schema, including the admin plugin and database rate limiter. Inspect its SQL against a staging database before production use. Migrations do not run automatically during builds or requests.

Create the first administrator from a trusted terminal. Set `ADMIN_EMAIL`, `ADMIN_NAME`, and `ADMIN_PASSWORD` temporarily in the shell; use a password manager and avoid command-line arguments or shell-history entries containing passwords. One Bash option is:

```bash
read -r -p 'Admin email: ' ADMIN_EMAIL
read -r -p 'Admin name: ' ADMIN_NAME
read -r -s -p 'Admin password (12+ characters): ' ADMIN_PASSWORD
export ADMIN_EMAIL ADMIN_NAME ADMIN_PASSWORD
npm run admin:bootstrap
unset ADMIN_EMAIL ADMIN_NAME ADMIN_PASSWORD
```

Bootstrap refuses to run if an admin already exists. Additional accounts are created at `/admin/users`. Administrators choose an initial password, communicate it securely, and ask the user to change it in My account. This milestone does not send invitations or provide email password recovery. A lost administrator password requires an operator recovery procedure; do not enable public signup as a workaround.

Without valid environment configuration, the public site remains usable, the login page shows setup is incomplete, and authentication endpoints return 503. Adding the code alone does not activate staff login.

## Validation

Run `npm run typecheck`, `npm run lint`, `npm run test:admin`, and `npm run build`.

`test:admin` runs the actual Better Auth request handler and migrations against an isolated, in-memory SQLite database using Node 24. It covers signup denial, anonymous/editor authorization, server-side password rules, duplicate accounts, CSRF rejection, rate limiting, password changes, hashing, and logout. It does not validate Postgres connectivity or production cookies; validate migration, login, account creation, and editor restrictions against a staging Postgres deployment before release.

## Milestone 2: blog authoring (implemented)

- Tiptap visual editing: headings, bold/italic, lists, links, images, undo/redo.
- New drafts, private saved-draft preview, publish and unpublish. Published JSON snapshots stay live while staff edit drafts. URLs are fixed at creation. Optimistic version checks reject stale writes; successful saves append revision records.
- SEO title/description, excerpt, author, publication date, category, tags, featured image/alt text, service link, and CTA are editable.
- Public article pages, metadata, related posts, index and sitemap use published snapshots on each request. Drafts never enter those queries. No deploy is needed to publish. Source posts remain available until import; an explicitly unpublished imported post never falls back to its source copy.
- Uploaded JPEG/PNG/WebP images persist in Postgres (3 MB per image), with authenticated same-origin uploads and bounded request bodies. Images are publicly accessible by their opaque URL, including before publishing; do not upload confidential media. This keeps the initial CMS on the existing database without another storage account. A future object-store migration is appropriate as the media library grows. This milestone has no media deletion UI.
- Rich content is validated and rendered as React elements, without trusting arbitrary HTML or executable URL protocols. Featured and inline images use local paths or uploaded image URLs.

### Activate locally

Get this branch's latest code, then:

```bash
npm install
npm run cms:migrate
npm run cms:migrate -- --apply
npm run dev
```

Use the existing `.env.local` with `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL=http://localhost:3000`. Prefer setting `DIRECT_URL` to Neon's unpooled URL for migrations; if omitted, the migration uses `DATABASE_URL`. The schema migration and all seven source-post imports run in one transaction. Re-running it does not overwrite CMS edits, republish unpublished articles, or duplicate posts. Authentication tables must already exist.

Visit `/admin/blog`, open an imported post or select New post, save a draft, preview it, then publish. Preview shows the most recently saved draft in a separate tab. Public dates are editorial labels; future dates do not schedule publishing. Publish takes effect immediately.

Before deploying the application, apply the same reviewed migration to the target environment and configure its exact HTTPS auth origin. No migration runs during the build. No secrets belong in Git.

### Validation

`npm run test:cms` uses an isolated PGlite Postgres engine and executes the migration and actual repository SQL. It verifies repeat imports, draft exclusion, publication, preserving the live version while editing, optimistic conflicts, republishing, unpublishing without source revival, revision records, and unsafe-link/image rejection. `npm run test:admin` covers the real auth handler and roles. Also run `npm run test:blog`, `npm run lint`, `npm run typecheck`, and `npm run build`.

A real Neon login/create-draft/upload/preview/publish/unpublish check remains required in the configured environment; isolated SQL tests do not prove remote connectivity or browser cookie behavior. Do these checks on a development database branch for content that should not appear on the live site.

## Later improvements

Account invitations and recovery email, role changes with last-admin protections, suspension/session revocation, scheduled publishing, richer image management, and activity history.

## Deleting posts

Administrators can select Delete post in the editor and confirm removal. Editors cannot delete posts; the server action independently requires an admin session. Deletion removes the article from the public blog, sitemap, admin list, editing and preview routes. Stored content, revisions and images are retained internally; this is a soft deletion with a timestamp and acting user ID, with no restore UI. The retained row prevents source-file fallback and repeat imports from resurrecting a deleted article. URLs remain reserved. A stale editor cannot save or republish a deleted post. No additional database migration is required.
