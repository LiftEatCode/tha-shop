CREATE TABLE IF NOT EXISTS cms_posts (
 id uuid PRIMARY KEY, slug text NOT NULL UNIQUE,
 draft jsonb NOT NULL, published jsonb,
 version integer NOT NULL DEFAULT 1,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS cms_revisions (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 post_id uuid NOT NULL REFERENCES cms_posts(id), author_id text REFERENCES "user"(id) ON DELETE SET NULL,
 action text NOT NULL CHECK(action IN ('save','publish','unpublish')),
 body jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS cms_images (
 id uuid PRIMARY KEY, mime text NOT NULL, data bytea NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(octet_length(data)<=5242880)
);
