"use client";
import { useActionState, useState } from "react";
import { createDraft } from "@/app/admin/(protected)/blog/actions";
export function NewPostForm() {
  const [state, action, pending] = useActionState(createDraft, { error: "" });
  const [title, setTitle] = useState(""),
    [slug, setSlug] = useState(""),
    [customSlug, setCustomSlug] = useState(false);
  return (
    <form action={action} className="mt-6 max-w-xl space-y-5">
      <p>
        Enter a title to get started. You’ll write the article on the next
        screen.
      </p>
      <label>
        Title
        <input
          name="title"
          required
          maxLength={200}
          value={title}
          disabled={pending}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!customSlug)
              setSlug(
                e.target.value
                  .toLowerCase()
                  .normalize("NFKD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")
                  .slice(0, 160)
                  .replace(/-$/, ""),
              );
          }}
        />
      </label>
      <label>
        URL slug
        <input
          name="slug"
          required
          maxLength={160}
          value={slug}
          disabled={pending}
          onChange={(e) => {
            setCustomSlug(true);
            setSlug(e.target.value);
          }}
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          title="Use lowercase letters, numbers, and hyphens, for example winter-car-care"
        />
        <span className="text-sm font-normal">
          Generated from your title. You can customize it before creating the
          draft.
        </span>
      </label>
      <p className="text-sm">Public URL: /blog/{slug || "your-post-title"}</p>
      {state.error ? (
        <p role="alert" className="text-red-800">
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending}>
        {pending ? "Creating draft…" : "Create draft and open editor"}
      </button>
    </form>
  );
}
