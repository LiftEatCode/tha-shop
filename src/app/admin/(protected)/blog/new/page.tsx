import { requireEditor } from "@/lib/admin/session";
import { createDraft } from "../actions";
export default async function NewPost({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireEditor();
  const { error } = await searchParams;
  return (
    <section>
      <h1 className="text-3xl font-bold">New post</h1>
      {error ? (
        <p role="alert">
          {error === "slug"
            ? "That URL is already in use. Choose another slug."
            : "Enter a title and a slug using lowercase letters, numbers, and hyphens."}
        </p>
      ) : null}
      <form action={createDraft} className="mt-6 max-w-xl space-y-5">
        <label>
          Title
          <input name="title" required maxLength={200} />
        </label>
        <label>
          URL slug
          <input
            name="slug"
            required
            maxLength={160}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
          />
          <span className="text-sm font-normal">
            Example: winter-car-care. The URL stays fixed after creation.
          </span>
        </label>
        <button>Create draft</button>
      </form>
    </section>
  );
}
