import Link from "next/link";
import { requireEditor } from "@/lib/admin/session";
import { listPosts } from "@/lib/cms/store";
export default async function AdminBlogPage() {
  await requireEditor();
  let posts;
  try {
    posts = await listPosts();
  } catch {
    return (
      <section>
        <h1 className="text-3xl font-bold">Blog setup required</h1>
        <p>
          Run <code>npm run cms:migrate -- --apply</code> from the project
          terminal to create the blog tables and import existing posts.
        </p>
      </section>
    );
  }
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog posts</h1>
        <Link className="admin-button" href="/admin/blog/new">
          New post
        </Link>
      </div>
      <p className="mt-3">
        Save changes as drafts, then publish when ready. Draft edits leave the
        live article unchanged.
      </p>
      <div className="mt-8 overflow-x-auto rounded border bg-white">
        <table className="w-full">
          <caption className="sr-only">Blog posts</caption>
          <thead>
            <tr>
              <th>Post</th>
              <th>Status</th>
              <th>Category</th>
              <th>Public page</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link className="underline" href={`/admin/blog/${p.id}`}>
                    {p.draft.title}
                  </Link>
                </td>
                <td>
                  {p.published ? "Published" : "Draft"}
                  {p.published &&
                  JSON.stringify(p.draft) !== JSON.stringify(p.published)
                    ? " · draft changes"
                    : ""}
                </td>
                <td>{p.draft.category}</td>
                <td>
                  {p.published ? (
                    <Link className="underline" href={`/blog/${p.slug}`}>
                      View
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
