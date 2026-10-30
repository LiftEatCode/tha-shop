import Link from "next/link";
import { getPublishedPosts } from "@/content/blog";
import { requireEditor } from "@/lib/admin/session";

export default async function AdminBlogPage() {
  await requireEditor();
  const posts = getPublishedPosts();
  return (
    <section>
      <h1 className="text-3xl font-bold">Blog posts</h1>
      <p className="mt-3 max-w-2xl text-gray-700">
        The admin foundation is ready. These posts are currently managed in the
        website source. Creating and editing posts in this dashboard is the next
        CMS milestone.
      </p>
      <div className="mt-8 overflow-x-auto rounded border border-gray-300 bg-white">
        <table className="w-full">
          <caption className="sr-only">Existing published blog posts</caption>
          <thead>
            <tr>
              <th scope="col">Post</th>
              <th scope="col">Category</th>
              <th scope="col">Published</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug}>
                <td>
                  <Link className="underline" href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </td>
                <td>{post.category}</td>
                <td>{post.publishedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
