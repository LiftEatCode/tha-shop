"use server";

import {
  appointmentFormSchema,
  validatePhoto,
} from "@/lib/validations/appointment";
import { siteConfig } from "@/config/site";

export type AppointmentFormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<string, string[]>>;
};

/**
 * Server Action bound to the contact form via useActionState.
 *
 * Flow:
 * 1. Honeypot (`companyWebsite`) — filled bots get a fake success (no delivery).
 * 2. Zod field validation — returns fieldErrors for the client to highlight.
 * 3. Optional photo type/size check.
 * 4. Delivery — intentionally not wired yet. Set RESEND_* or DATABASE_URL in
 *    `.env` once the business chooses email vs DB (see `.env.example`).
 */
export async function submitAppointmentForm(
  _previousState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    vehicle: String(formData.get("vehicle") ?? ""),
    message: String(formData.get("message") ?? ""),
    companyWebsite: String(formData.get("companyWebsite") ?? ""),
  };

  if (raw.companyWebsite.trim()) {
    return {
      success: true,
      message: "Thanks — we received your request and will follow up shortly.",
    };
  }

  const parsed = appointmentFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const photoEntry = formData.get("photo");
  const photo =
    photoEntry instanceof File && photoEntry.size > 0 ? photoEntry : null;
  const photoCheck = validatePhoto(photo);
  if (!photoCheck.ok) {
    return {
      success: false,
      message: photoCheck.message,
      errors: { photo: [photoCheck.message] },
    };
  }

  // Delivery path awaits your choice: email notification vs database (or both).
  console.info("[appointment-request]", {
    ...parsed.data,
    photoName: photoCheck.file?.name ?? null,
    photoSize: photoCheck.file?.size ?? null,
    photoType: photoCheck.file?.type ?? null,
  });

  return {
    success: true,
    message: `Thanks — your request was validated. Delivery is not connected yet, so please also call ${siteConfig.phone.display} to confirm.`,
  };
}
