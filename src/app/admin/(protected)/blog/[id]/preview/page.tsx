/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { requireEditor } from "@/lib/admin/session";
import { loadPost } from "@/lib/cms/store";
import { RichBody } from "@/components/blog/rich-body";
import { ArticleCta } from "@/components/blog/article-cta";
export const metadata = {
  title: "Draft preview",
  robots: { index: false, follow: false },
};
export default async function Preview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireEditor();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const row = await loadPost(id);
  if (!row) notFound();
  const p = row.draft;
  return (
    <article className="mx-auto max-w-3xl">
      <p className="mb-6 font-bold">Private preview · last saved draft</p>
      <p>
        {p.category} · {p.author}
      </p>
      <h1 className="my-6 text-4xl font-bold">{p.title}</h1>
      {p.featuredImage ? (
        <img
          src={p.featuredImage}
          alt={p.featuredImageAlt}
          className="mb-8 w-full"
        />
      ) : null}
      <RichBody content={p.richContent} />
      <ArticleCta
        title={p.cta?.title}
        description={p.cta?.description}
        serviceHref={p.relatedService?.href}
        serviceLabel={p.relatedService?.label}
      />
    </article>
  );
}
