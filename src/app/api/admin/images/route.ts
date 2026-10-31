import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { getAdminAuth } from "@/lib/admin/auth";
import { cmsDb } from "@/lib/cms/db";
export async function POST(request: Request) {
  if (
    request.headers.get("origin") !==
    new URL(process.env.BETTER_AUTH_URL || request.url).origin
  )
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  const session = await getAdminAuth().api.getSession({
    headers: await headers(),
  });
  if (
    !session ||
    session.user.banned ||
    !["admin", "editor"].includes(session.user.role || "")
  )
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 3300000)
    return Response.json(
      { error: "Maximum image size is 3 MB" },
      { status: 413 },
    );
  // Bound the stream as well as Content-Length, which may be absent.
  const reader = request.body?.getReader();
  if (!reader)
    return Response.json({ error: "Missing image" }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > 3300000) {
      await reader.cancel();
      return Response.json(
        { error: "Maximum image size is 3 MB" },
        { status: 413 },
      );
    }
    chunks.push(value);
  }
  let form: FormData;
  try {
    form = await new Response(Buffer.concat(chunks), {
      headers: { "Content-Type": request.headers.get("content-type") || "" },
    }).formData();
  } catch {
    return Response.json({ error: "Invalid image upload" }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File) || file.size > 3145728)
    return Response.json(
      { error: "Choose an image under 3 MB" },
      { status: 400 },
    );
  const data = Buffer.from(await file.arrayBuffer());
  const mime = data
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    ? "image/png"
    : data[0] === 255 && data[1] === 216 && data[2] === 255
      ? "image/jpeg"
      : data.toString("ascii", 0, 4) === "RIFF" &&
          data.toString("ascii", 8, 12) === "WEBP"
        ? "image/webp"
        : null;
  if (!mime)
    return Response.json(
      { error: "Only PNG, JPEG, and WebP images are accepted" },
      { status: 400 },
    );
  const id = randomUUID();
  await cmsDb().query("INSERT INTO cms_images(id,mime,data) VALUES($1,$2,$3)", [
    id,
    mime,
    data,
  ]);
  return Response.json({ url: `/api/blog-images/${id}` });
}
