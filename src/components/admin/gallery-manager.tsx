"use client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  registerGalleryImage,
  saveGalleryImage,
  deleteGalleryImage,
  moveGalleryImage,
} from "@/app/admin/(protected)/gallery/actions";
import {
  galleryCategories,
  type GalleryCategory,
  type GalleryRecord,
  type GalleryInput,
} from "@/lib/gallery/model";
type UploadItem = { file: File; url?: string; error?: string; done?: boolean };
export function GalleryManager({
  category,
  rows,
  canDelete,
}: {
  category: GalleryCategory;
  rows: GalleryRecord[];
  canDelete: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState<UploadItem[]>([]),
    [uploading, setUploading] = useState(false),
    [message, setMessage] = useState(""),
    [album, setAlbum] = useState("");
  async function upload(batch: UploadItem[]) {
    setUploading(true);
    const results = [...batch];
    setItems(results);
    let succeeded = 0;
    for (let i = 0; i < results.length; i++) {
      const item = { ...results[i] };
      if (item.done) continue;
      setMessage(`Uploading ${i + 1} of ${results.length}…`);
      try {
        if (!item.url) {
          if (item.file.size > 3145728) throw Error("Image must be under 3 MB");
          const form = new FormData();
          form.set("file", item.file);
          const response = await fetch("/api/admin/images", {
            method: "POST",
            body: form,
          });
          const data = await response.json();
          if (!response.ok) throw Error(data.error || "Upload failed");
          item.url = data.url;
        }
        if (!item.url) throw Error("Upload did not return an image URL");
        const result = await registerGalleryImage(
          JSON.stringify({
            category,
            src: item.url,
            alt: "",
            caption: "",
            album,
            position: 0,
            is_cover: false,
            visible: false,
          } satisfies GalleryInput),
        );
        if (result.error) throw Error(result.error);
        item.done = true;
        item.error = undefined;
        succeeded++;
      } catch (e) {
        item.error = (e as Error).message;
      }
      results[i] = item;
      setItems([...results]);
    }
    setMessage(
      `${succeeded} photo${succeeded === 1 ? "" : "s"} added. New uploads are hidden until you add descriptions and save them as visible.`,
    );
    setUploading(false);
    router.refresh();
  }
  return (
    <>
      <div className="my-6 rounded border bg-white p-5">
        <h2 className="text-xl font-bold">Upload photos</h2>
        <label className="mt-4">
          Project / album (optional)
          <input
            maxLength={120}
            value={album}
            disabled={uploading}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </label>
        <label className="mt-4">
          Select up to 20 photos (JPEG, PNG, WebP; 3 MB each)
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 20) {
                setMessage("Select no more than 20 photos at a time.");
                return;
              }
              if (files.length) void upload(files.map((file) => ({ file })));
              e.target.value = "";
            }}
          />
        </label>
        <p role="status" className="mt-4">
          {message}
        </p>
        {items.length ? (
          <ul className="my-3 space-y-2">
            {items.map((item, i) => (
              <li key={i}>
                {item.file.name}:{" "}
                {item.done ? "Added" : item.error || "Waiting…"}
              </li>
            ))}
          </ul>
        ) : null}
        {items.some((i) => i.error) ? (
          <button disabled={uploading} onClick={() => void upload(items)}>
            Retry failed photos
          </button>
        ) : null}
      </div>
      <p className="my-4">
        {rows.length} photos. Order applies within each album; a cover photo
        appears first.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {rows.map((row) => (
          <PhotoCard
            key={`${row.id}-${row.version}`}
            row={row}
            canDelete={canDelete}
            disabled={uploading}
          />
        ))}
      </div>
      {!rows.length ? (
        <p>No photos yet. Upload photos above to start this gallery.</p>
      ) : null}
    </>
  );
}
function PhotoCard({
  row,
  canDelete,
  disabled,
}: {
  row: GalleryRecord;
  canDelete: boolean;
  disabled: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState<GalleryInput>(row),
    [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  function field<K extends keyof GalleryInput>(key: K, next: GalleryInput[K]) {
    setValue((v) => ({ ...v, [key]: next }));
  }
  function run(operation: () => Promise<{ error?: string }>, success: string) {
    startTransition(async () => {
      try {
        const result = await operation();
        if (result.error) setMessage(result.error);
        else {
          setMessage(success);
          router.refresh();
        }
      } catch {
        setMessage("Unable to reach the server. Please retry.");
      }
    });
  }
  return (
    <section className="rounded border bg-white p-5">
      <div className="relative mb-4 aspect-[4/3]">
        <Image
          src={row.src}
          alt={row.alt || "Gallery photo awaiting description"}
          fill
          sizes="(max-width:1024px) 100vw,50vw"
          className="object-contain"
        />
      </div>
      <p className="mb-3 font-semibold">
        {row.visible ? "Visible" : "Hidden"}
        {row.is_cover ? " · Cover" : ""}
      </p>
      <fieldset disabled={disabled || pending} className="space-y-4">
        <label>
          Image description (required to publish)
          <input
            value={value.alt}
            maxLength={300}
            onChange={(e) => field("alt", e.target.value)}
          />
        </label>
        <label>
          Caption
          <input
            value={value.caption}
            maxLength={1000}
            onChange={(e) => field("caption", e.target.value)}
          />
        </label>
        <label>
          Category
          <select
            value={value.category}
            onChange={(e) =>
              field("category", e.target.value as GalleryCategory)
            }
          >
            {galleryCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Project / album
          <input
            value={value.album}
            maxLength={120}
            onChange={(e) => field("album", e.target.value)}
          />
        </label>
        <label>
          Display order
          <input
            type="number"
            min={0}
            max={1000000}
            value={value.position}
            onChange={(e) => field("position", Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            className="gallery-checkbox"
            type="checkbox"
            checked={value.visible}
            onChange={(e) => field("visible", e.target.checked)}
          />
          Visible on website
        </label>
        <label className="flex items-center gap-2">
          <input
            className="gallery-checkbox"
            type="checkbox"
            checked={value.is_cover}
            onChange={(e) => field("is_cover", e.target.checked)}
          />
          Cover for this album
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              run(
                () =>
                  saveGalleryImage(row.id, row.version, JSON.stringify(value)),
                "Saved",
              )
            }
          >
            Save photo
          </button>
          <button
            onClick={() =>
              run(
                () => moveGalleryImage(row.id, row.version, -1),
                "Moved earlier",
              )
            }
          >
            Move earlier
          </button>
          <button
            onClick={() =>
              run(() => moveGalleryImage(row.id, row.version, 1), "Moved later")
            }
          >
            Move later
          </button>
          {canDelete ? (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Remove this photo from the gallery? The Cloudinary asset is retained so other pages using it keep working.",
                  )
                )
                  run(() => deleteGalleryImage(row.id, row.version), "Deleted");
              }}
            >
              Delete photo
            </button>
          ) : null}
        </div>
      </fieldset>
      <p role="status" className="mt-3">
        {message}
      </p>
    </section>
  );
}
