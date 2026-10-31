import { notFound } from "next/navigation";
import { requireEditor } from "@/lib/admin/session";
import { loadPost } from "@/lib/cms/store";
import { PostEditor } from "@/components/admin/post-editor";
export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireEditor();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const row = await loadPost(id);
  if (!row) notFound();
  return (
    <PostEditor
      id={id}
      initial={row.draft}
      version={row.version}
      published={!!row.published}
    />
  );
}
