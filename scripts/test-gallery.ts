import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import type { Pool } from "pg";
import { galleryPages } from "../src/content/pages";
import { galleryCategories, galleryInput } from "../src/lib/gallery/model";
import {
  galleryList,
  publicGallery,
  addGallery,
  changeGallery,
  moveGallery,
} from "../src/lib/gallery/store";
async function main() {
  const db = new PGlite();
  const query = async (sql: string, params?: unknown[]) => {
    const r = await db.query(sql, params);
    return {
      ...r,
      rowCount: /^\s*SELECT/i.test(sql) ? r.rows.length : r.affectedRows,
    };
  };
  const pool = {
    query,
    connect: async () => ({ query, release() {} }),
  } as unknown as Pool;
  try {
    const sql = await readFile("migrations/002-gallery.sql", "utf8");
    await db.exec(sql);
    await db.exec(sql);
    async function seed() {
      for (const category of galleryCategories)
        for (const [i, image] of galleryPages[category].images.entries())
          await query(
            "INSERT INTO gallery_images(id,source_key,category,src,alt,position,visible) VALUES($1,$2,$3,$4,$5,$6,true) ON CONFLICT(source_key) DO NOTHING",
            [
              randomUUID(),
              `${category}:${image.src}`,
              category,
              image.src,
              image.alt,
              i,
            ],
          );
    }
    await seed();
    await seed();
    for (const c of galleryCategories)
      assert.equal(
        (await publicGallery(c, pool)).length,
        galleryPages[c].images.length,
      );
    const first = (await galleryList("cars", pool))[0];
    await changeGallery(
      first.id,
      1,
      {
        ...first,
        visible: false,
        caption: "Changed caption",
        album: "Restoration",
      },
      pool,
    );
    assert(!(await publicGallery("cars", pool)).some((r) => r.id === first.id));
    await seed();
    assert(!(await publicGallery("cars", pool)).some((r) => r.id === first.id));
    await assert.rejects(changeGallery(first.id, 1, first, pool), /changed/);
    const input = galleryInput.parse({
      category: "cars",
      src: "https://res.cloudinary.com/shop/image/upload/v1/photo.jpg",
      alt: "Classic car",
      caption: "New build",
      album: "Restoration",
      position: 0,
      is_cover: false,
      visible: false,
    });
    const id = await addGallery(input, pool);
    assert.equal(await addGallery(input, pool), id);
    assert(!(await publicGallery("cars", pool)).some((r) => r.id === id));
    let row = (await galleryList("cars", pool)).find((r) => r.id === id)!;
    assert(row.position > 0);
    await changeGallery(id, 1, { ...row, visible: true, is_cover: true }, pool);
    assert(
      (await publicGallery("cars", pool)).find((r) => r.id === id)?.is_cover,
    );
    const secondId = await addGallery(
      { ...input, src: "/images/gallery/cars/2.jpg" },
      pool,
    );
    let second = (await galleryList("cars", pool)).find(
      (r) => r.id === secondId,
    )!;
    await changeGallery(
      secondId,
      second.version,
      { ...second, visible: true, is_cover: true },
      pool,
    );
    const album = (await publicGallery("cars", pool)).filter(
      (r) => r.album === "Restoration",
    );
    assert.equal(album.filter((r) => r.is_cover).length, 1);
    assert.equal(album[0].id, secondId);
    row = (await galleryList("cars", pool)).find((r) => r.id === id)!;
    await moveGallery(id, row.version, -1, pool);
    const reordered = (await galleryList("cars", pool)).filter(
      (r) => r.album === "Restoration",
    );
    assert.equal(reordered[0].id, id);
    second = (await galleryList("cars", pool)).find((r) => r.id === secondId)!;
    await changeGallery(
      secondId,
      second.version,
      { ...second, category: "trucks", album: "Work trucks" },
      pool,
    );
    assert(!(await publicGallery("cars", pool)).some((r) => r.id === secondId));
    assert(
      (await publicGallery("trucks", pool)).some((r) => r.id === secondId),
    );
    const imported = (await galleryList("cars", pool)).find(
      (r) => r.id === first.id,
    )!;
    await changeGallery(first.id, imported.version, null, pool);
    await seed();
    assert(!(await galleryList("cars", pool)).some((r) => r.id === first.id));
    assert(!(await publicGallery("cars", pool)).some((r) => r.id === first.id));
    row = (await galleryList("cars", pool)).find((r) => r.id === id)!;
    await changeGallery(id, row.version, null, pool);
    await assert.rejects(changeGallery(id, row.version + 1, row, pool));
    const cars = await galleryList("cars", pool);
    for (const r of cars)
      await changeGallery(r.id, r.version, { ...r, visible: false }, pool);
    assert.equal((await publicGallery("cars", pool)).length, 0);
    assert(
      !galleryInput.safeParse({ ...input, visible: true, alt: "" }).success,
    );
    assert(
      !galleryInput.safeParse({ ...input, src: "javascript:alert(1)" }).success,
    );
    assert(!galleryInput.safeParse({ ...input, category: "bad" }).success);
    console.log(
      "PASS: existing photo import/idempotence, hidden uploads, publish, captions/albums, unique covers, ordering, category moves, stale writes, deletion/import non-revival, empty gallery without fallback, unsafe input rejection.",
    );
  } finally {
    await db.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
