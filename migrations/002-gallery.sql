CREATE TABLE IF NOT EXISTS gallery_images (
 id uuid PRIMARY KEY,
 source_key text UNIQUE,
 category text NOT NULL CHECK(category IN ('cars','trucks','motorcycles','events')),
 src text NOT NULL,
 alt text NOT NULL DEFAULT '',
 caption text NOT NULL DEFAULT '',
 album text NOT NULL DEFAULT '',
 position integer NOT NULL DEFAULT 0,
 is_cover boolean NOT NULL DEFAULT false,
 visible boolean NOT NULL DEFAULT false,
 version integer NOT NULL DEFAULT 1,
 deleted_at timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS gallery_images_category_order ON gallery_images(category,position,id);
