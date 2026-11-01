import "server-only";
import { randomUUID } from "node:crypto";
import type { Pool } from "pg";
import { cmsDb } from "../cms/db";
import { galleryPages } from "../../content/pages";
import type { GalleryCategory, GalleryInput, GalleryRecord } from "./model";
export async function galleryList(
  category: GalleryCategory,
  database: Pool = cmsDb(),
) {
  return (
    await database.query<GalleryRecord>(
      "SELECT id,category,src,alt,caption,album,position,is_cover,visible,version FROM gallery_images WHERE category=$1 AND deleted_at IS NULL ORDER BY position,id",
      [category],
    )
  ).rows;
}
export async function publicGallery(
  category: GalleryCategory,
  database?: Pool,
): Promise<GalleryRecord[]> {
  if (!database && !process.env.DATABASE_URL) return sourceGallery(category);
  try {
    return (await galleryList(category, database ?? cmsDb()))
      .filter((r) => r.visible)
      .sort(
        (a, b) =>
          Number(b.is_cover) - Number(a.is_cover) ||
          a.position - b.position ||
          a.id.localeCompare(b.id),
      );
  } catch (e) {
    if ((e as { code?: string }).code === "42P01")
      return sourceGallery(category);
    throw e;
  }
}
function sourceGallery(category: GalleryCategory): GalleryRecord[] {
  return galleryPages[category].images.map((r, i) => ({
    ...r,
    id: `source-${i}`,
    version: 1,
    category,
    caption: "",
    album: "",
    position: i,
    is_cover: false,
    visible: true,
  }));
}
export async function addGallery(
  input: GalleryInput,
  database: Pool = cmsDb(),
) {
  const id = randomUUID();
  const result = await database.query<{ id: string }>(
    "INSERT INTO gallery_images(id,category,src,alt,caption,album,position,is_cover,visible,source_key) SELECT $1,$2,$3,$4,$5,$6,COALESCE(MAX(position),-1)+1,false,false,$7 FROM gallery_images WHERE category=$2 ON CONFLICT(source_key) DO UPDATE SET source_key=EXCLUDED.source_key WHERE gallery_images.deleted_at IS NULL RETURNING id",
    [
      id,
      input.category,
      input.src,
      input.alt,
      input.caption,
      input.album,
      `upload:${input.src}`,
    ],
  );
  if (!result.rows[0])
    throw Error(
      "This photo was already deleted. Upload it again to create a new gallery entry.",
    );
  return result.rows[0].id;
}
export async function changeGallery(
  id: string,
  version: number,
  input: GalleryInput | null,
  database: Pool = cmsDb(),
) {
  const c = await database.connect();
  try {
    await c.query("BEGIN");
    await c.query("SELECT pg_advisory_xact_lock(754886)");
    const existing = await c.query<GalleryRecord>(
      "SELECT * FROM gallery_images WHERE id=$1 AND version=$2 AND deleted_at IS NULL FOR UPDATE",
      [id, version],
    );
    if (!existing.rowCount)
      throw Error("This photo changed. Reload and retry.");
    if (input) {
      if (input.is_cover)
        await c.query(
          "UPDATE gallery_images SET is_cover=false,version=version+1 WHERE category=$1 AND album=$2 AND is_cover=true AND id<>$3 AND deleted_at IS NULL",
          [input.category, input.album, id],
        );
      await c.query(
        "UPDATE gallery_images SET category=$2,src=$3,alt=$4,caption=$5,album=$6,position=$7,is_cover=$8,visible=$9,version=version+1,updated_at=now() WHERE id=$1",
        [
          id,
          input.category,
          input.src,
          input.alt,
          input.caption,
          input.album,
          input.position,
          input.is_cover,
          input.visible,
        ],
      );
    } else
      await c.query(
        "UPDATE gallery_images SET visible=false,is_cover=false,deleted_at=now(),version=version+1,updated_at=now() WHERE id=$1",
        [id],
      );
    await c.query("COMMIT");
    return existing.rows[0].category;
  } catch (e) {
    await c.query("ROLLBACK");
    throw e;
  } finally {
    c.release();
  }
}
export async function moveGallery(
  id: string,
  version: number,
  direction: number,
  database: Pool = cmsDb(),
) {
  const c = await database.connect();
  try {
    await c.query("BEGIN");
    await c.query("SELECT pg_advisory_xact_lock(754886)");
    const row = (
      await c.query<GalleryRecord>(
        "SELECT * FROM gallery_images WHERE id=$1 AND version=$2 AND deleted_at IS NULL FOR UPDATE",
        [id, version],
      )
    ).rows[0];
    if (!row) throw Error("Photo changed");
    const rows = (
      await c.query<GalleryRecord>(
        "SELECT * FROM gallery_images WHERE category=$1 AND album=$2 AND deleted_at IS NULL ORDER BY position,id FOR UPDATE",
        [row.category, row.album],
      )
    ).rows;
    const index = rows.findIndex((r) => r.id === id),
      next = index + direction;
    if (next >= 0 && next < rows.length) {
      [rows[index], rows[next]] = [rows[next], rows[index]];
      for (const [i, r] of rows.entries())
        await c.query(
          "UPDATE gallery_images SET position=$2,version=version+1,updated_at=now() WHERE id=$1 AND position IS DISTINCT FROM $2",
          [r.id, i],
        );
    }
    await c.query("COMMIT");
  } catch (e) {
    await c.query("ROLLBACK");
    throw e;
  } finally {
    c.release();
  }
}
