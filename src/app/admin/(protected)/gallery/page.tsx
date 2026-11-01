import Link from "next/link";
import { requireEditor } from "@/lib/admin/session";
import { galleryList } from "@/lib/gallery/store";
import { galleryCategories } from "@/lib/gallery/model";
import { GalleryManager } from "@/components/admin/gallery-manager";
export default async function GalleryAdmin({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const session = await requireEditor();
  const query = await searchParams;
  const category =
    galleryCategories.find((c) => c === query.category) || "cars";
  let rows;
  try {
    rows = await galleryList(category);
  } catch {
    return (
      <section>
        <h1 className="text-3xl font-bold">Gallery setup required</h1>
        <p className="mt-4">
          Run <code>npm run gallery:migrate -- --apply</code> in the project
          terminal to import the existing photos.
        </p>
      </section>
    );
  }
  return (
    <section>
      <h1 className="text-3xl font-bold">Gallery</h1>
      <p className="my-3">
        Upload photos, review descriptions, then make them visible. Changes
        appear on the public gallery after saving.
      </p>
      <nav
        className="my-6 flex flex-wrap gap-4"
        aria-label="Gallery categories"
      >
        {galleryCategories.map((c) => (
          <Link
            key={c}
            aria-current={c === category ? "page" : undefined}
            className={c === category ? "font-bold underline" : "underline"}
            href={`/admin/gallery?category=${c}`}
          >
            {c}
          </Link>
        ))}
        <Link href={`/${category}`} className="underline">
          View public gallery ↗
        </Link>
      </nav>
      <GalleryManager
        key={category}
        category={category}
        rows={rows}
        canDelete={session.user.role === "admin"}
      />
    </section>
  );
}
