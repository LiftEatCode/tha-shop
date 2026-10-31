import { cmsDb } from "@/lib/cms/db";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) return new Response(null, { status: 404 });
  const result = await cmsDb().query<{ mime: string; data: Buffer }>(
    "SELECT mime,data FROM cms_images WHERE id=$1",
    [id],
  );
  const image = result.rows[0];
  if (!image) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
