"use client";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { BLOG_CATEGORIES } from "@/content/blog/config";
import { safeUrl, type CmsPost, type RichNode } from "@/lib/cms/model";
import { updatePost } from "@/app/admin/(protected)/blog/actions";
export function PostEditor({
  id,
  initial,
  version: initialVersion,
  published,
}: {
  id: string;
  initial: CmsPost;
  version: number;
  published: boolean;
}) {
  const [post, setPost] = useState(initial),
    [version, setVersion] = useState(initialVersion),
    [live, setLive] = useState(published),
    [message, setMessage] = useState(""),
    [dirty, setDirty] = useState(false),
    [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    function warn(e: BeforeUnloadEvent) {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false },
      }),
      Image,
    ],
    content: initial.richContent,
    immediatelyRender: false,
    onUpdate: () => setDirty(true),
    editorProps: {
      attributes: {
        "aria-label": "Article content",
        class: "cms-article min-h-80 rounded border bg-white p-5",
      },
    },
  });
  function field<K extends keyof CmsPost>(key: K, value: CmsPost[K]) {
    setPost((p) => ({ ...p, [key]: value }));
    setDirty(true);
  }
  function save(action: "save" | "publish" | "unpublish") {
    if (!editor) return;
    if (
      action === "unpublish" &&
      !window.confirm("Remove this article from the public blog?")
    )
      return;
    startTransition(async () => {
      const result = await updatePost(id, version, action, {
        ...post,
        richContent: editor.getJSON() as RichNode,
      });
      if (result.error) setMessage(result.error);
      else {
        setVersion(result.version!);
        setDirty(false);
        if (action !== "save") setLive(action === "publish");
        setMessage(
          action === "save"
            ? "Draft saved."
            : action === "publish"
              ? "Published."
              : "Unpublished.",
        );
      }
    });
  }
  async function upload(file: File | undefined, inline: boolean) {
    if (!file) return;
    setUploading(true);
    setMessage("Uploading image…");
    try {
      const form = new FormData();
      form.set("file", file);
      const r = await fetch("/api/admin/images", {
        method: "POST",
        body: form,
      });
      const data = await r.json();
      if (!r.ok) throw Error(data.error || "Upload failed");
      if (inline) {
        const alt = window.prompt(
          "Describe this image for readers using screen readers:",
        );
        if (alt === null) return;
        editor?.chain().focus().setImage({ src: data.url, alt }).run();
      } else field("featuredImage", data.url);
      setMessage("Image uploaded. Save the draft to keep it in the article.");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setUploading(false);
    }
  }
  const fields = [
    ["title", "Title"],
    ["metaTitle", "SEO title"],
    ["description", "SEO description"],
    ["excerpt", "Excerpt"],
    ["author", "Author"],
    ["featuredImageAlt", "Featured image description"],
  ] as const;
  return (
    <section>
      <Link href="/admin/blog" className="underline">
        ← All posts
      </Link>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Edit post</h1>
        <span>
          {live ? "Published" : "Draft"}
          {dirty ? " · unsaved changes" : ""}
        </span>
      </div>
      <p className="mt-2">/blog/{post.slug}</p>
      <div className="my-6 flex flex-wrap gap-3">
        <button
          disabled={pending || uploading || !editor}
          onClick={() => save("save")}
        >
          Save draft
        </button>
        <button
          disabled={pending || uploading || !editor}
          onClick={() => save("publish")}
        >
          Publish
        </button>
        {live ? (
          <button
            disabled={pending || uploading}
            onClick={() => save("unpublish")}
          >
            Unpublish
          </button>
        ) : null}
        <Link
          href={`/admin/blog/${id}/preview`}
          target="_blank"
          className="admin-button"
        >
          Preview saved draft ↗
        </Link>
      </div>
      <p role="status" aria-live="polite">
        {message}
      </p>
      <div className="my-6 grid gap-5 md:grid-cols-2">
        {fields.map(([key, label]) => (
          <label key={key}>
            {label}
            <input
              value={post[key]}
              onChange={(e) => field(key, e.target.value)}
              maxLength={
                key === "excerpt" ? 1000 : key === "description" ? 500 : 300
              }
            />
          </label>
        ))}
        <label>
          Category
          <select
            value={post.category}
            onChange={(e) =>
              field("category", e.target.value as CmsPost["category"])
            }
          >
            {BLOG_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Tags (comma separated)
          <input
            defaultValue={post.tags.join(", ")}
            onChange={(e) =>
              field(
                "tags",
                e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
        <label>
          Publication date
          <input
            type="date"
            value={post.publishedAt}
            onChange={(e) => field("publishedAt", e.target.value)}
          />
        </label>
        <label>
          Featured image path
          <input
            value={post.featuredImage}
            onChange={(e) => field("featuredImage", e.target.value)}
          />
        </label>
        <label>
          Upload featured image (PNG, JPEG, WebP; 3 MB)
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            disabled={uploading || pending}
            onChange={(e) => {
              void upload(e.target.files?.[0], false);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <h2 className="mb-3 text-xl font-bold">Article</h2>
      <div
        className="mb-3 flex flex-wrap gap-2"
        role="toolbar"
        aria-label="Article formatting"
      >
        <button
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          disabled={!editor}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          Heading
        </button>
        <button
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          Bullets
        </button>
        <button
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          Numbered list
        </button>
        <button
          disabled={!editor}
          onClick={() => {
            const href = window.prompt("Link URL (blank removes link)");
            if (href === "") editor?.chain().focus().unsetLink().run();
            else if (href && safeUrl(href))
              editor?.chain().focus().setLink({ href }).run();
          }}
        >
          Link
        </button>
        <button
          disabled={!editor}
          onClick={() => editor?.chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          disabled={!editor}
          onClick={() => editor?.chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>
      <EditorContent editor={editor} />
      <label className="my-5">
        Insert article image
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          disabled={uploading || pending}
          onChange={(e) => {
            void upload(e.target.files?.[0], true);
            e.target.value = "";
          }}
        />
      </label>
      <details className="mt-8">
        <summary>Service link and call to action</summary>
        <div className="mt-4 grid gap-4">
          {(["href", "label"] as const).map((k) => (
            <label key={k}>
              Service {k}
              <input
                value={post.relatedService?.[k] || ""}
                onChange={(e) =>
                  field("relatedService", {
                    href: post.relatedService?.href || "",
                    label: post.relatedService?.label || "",
                    [k]: e.target.value,
                  })
                }
              />
            </label>
          ))}
          {(["title", "description"] as const).map((k) => (
            <label key={k}>
              Call to action {k}
              <input
                value={post.cta?.[k] || ""}
                onChange={(e) =>
                  field("cta", {
                    title: post.cta?.title || "",
                    description: post.cta?.description || "",
                    [k]: e.target.value,
                  })
                }
              />
            </label>
          ))}
        </div>
      </details>
    </section>
  );
}
