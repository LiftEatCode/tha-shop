import { requireEditor } from "@/lib/admin/session";
import { NewPostForm } from "@/components/admin/new-post-form";
export default async function NewPost() {
  await requireEditor();
  return (
    <section>
      <h1 className="text-3xl font-bold">New post</h1>
      <NewPostForm />
    </section>
  );
}
