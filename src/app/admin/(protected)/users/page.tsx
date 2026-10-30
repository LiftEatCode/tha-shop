import { headers } from "next/headers";
import { getAdminAuth } from "@/lib/admin/auth";
import { requireAdmin } from "@/lib/admin/session";
import { CreateUserForm } from "@/components/admin/create-user-form";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requireAdmin();
  const requested = Number((await searchParams).page ?? 1);
  const page = Number.isSafeInteger(requested) && requested > 0 ? requested : 1;
  const limit = 25;
  const result = await getAdminAuth().api.listUsers({
    headers: await headers(),
    query: {
      limit,
      offset: (page - 1) * limit,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  });
  return (
    <section>
      <h1 className="text-3xl font-bold">Users</h1>
      <p className="mt-3 text-gray-700">
        Add staff accounts and choose who can manage users. Public registration
        is closed.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="rounded border border-gray-300 bg-white p-6">
          <h2 className="text-xl font-semibold">Add a user</h2>
          <CreateUserForm />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <caption className="sr-only">Staff accounts</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {result.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === "admin" ? "Admin" : "Editor"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="mt-4 flex gap-6" aria-label="User pages">
            {page > 1 && (
              <a className="underline" href={`?page=${page - 1}`}>
                Previous
              </a>
            )}
            {page * limit < result.total && (
              <a className="underline" href={`?page=${page + 1}`}>
                Next
              </a>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}
