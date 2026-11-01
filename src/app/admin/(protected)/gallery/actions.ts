"use server";
import { revalidatePath } from "next/cache";
import { requireEditor, requireAdmin } from "@/lib/admin/session";
import { galleryInput } from "@/lib/gallery/model";
import { addGallery, changeGallery, moveGallery } from "@/lib/gallery/store";
function refresh() {
  for (const path of [
    "/cars",
    "/trucks",
    "/motorcycles",
    "/events",
    "/admin/gallery",
  ])
    revalidatePath(path);
}
export async function registerGalleryImage(
  payload: string,
): Promise<{ error?: string; id?: string }> {
  await requireEditor();
  if (typeof payload !== "string" || payload.length > 10000)
    return { error: "Invalid photo data" };
  let parsed;
  try {
    parsed = galleryInput.safeParse(JSON.parse(payload));
  } catch {
    return { error: "Invalid photo data" };
  }
  if (!parsed.success)
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  try {
    const id = await addGallery(parsed.data);
    refresh();
    return { id };
  } catch {
    return {
      error:
        "Could not save the uploaded photo to the gallery. Check the gallery migration and database connection.",
    };
  }
}
export async function saveGalleryImage(
  id: string,
  version: number,
  payload: string,
): Promise<{ error?: string }> {
  await requireEditor();
  if (
    !/^[0-9a-f-]{36}$/.test(id) ||
    !Number.isSafeInteger(version) ||
    typeof payload !== "string" ||
    payload.length > 10000
  )
    return { error: "Invalid photo data" };
  let parsed;
  try {
    parsed = galleryInput.safeParse(JSON.parse(payload));
  } catch {
    return { error: "Invalid photo data" };
  }
  if (!parsed.success)
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  try {
    await changeGallery(id, version, parsed.data);
    refresh();
    return {};
  } catch {
    return {
      error:
        "Could not save this photo. It may have changed in another window. Reload and retry.",
    };
  }
}
export async function deleteGalleryImage(
  id: string,
  version: number,
): Promise<{ error?: string }> {
  await requireAdmin();
  if (!/^[0-9a-f-]{36}$/.test(id) || !Number.isSafeInteger(version))
    return { error: "Invalid photo" };
  try {
    await changeGallery(id, version, null);
    refresh();
    return {};
  } catch {
    return { error: "Could not delete this photo. Reload and retry." };
  }
}
export async function moveGalleryImage(
  id: string,
  version: number,
  direction: number,
): Promise<{ error?: string }> {
  await requireEditor();
  if (
    !/^[0-9a-f-]{36}$/.test(id) ||
    !Number.isSafeInteger(version) ||
    ![1, -1].includes(direction)
  )
    return { error: "Invalid photo order" };
  try {
    await moveGallery(id, version, direction);
    refresh();
    return {};
  } catch {
    return { error: "Could not reorder this photo. Reload and retry." };
  }
}
