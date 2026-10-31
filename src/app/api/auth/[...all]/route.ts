import { getAdminAuth, isAdminConfigured } from "@/lib/admin/auth";

export const runtime = "nodejs";

async function handle(request: Request) {
  if (!isAdminConfigured()) {
    return Response.json(
      { message: "Admin is not configured." },
      { status: 503 },
    );
  }
  return getAdminAuth().handler(request);
}

export { handle as GET, handle as POST };
