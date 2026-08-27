import { z } from "zod";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

export const SERVICE_NEEDED_OPTIONS = [
  "General Auto Repair",
  "Brake Repair",
  "A/C Repair",
  "Check Engine / Diagnostics",
  "Oil Change / Maintenance",
  "Suspension / Steering",
  "Engine / Cooling System",
  "Electrical / Battery / Starter / Alternator",
  "Motorcycle Service",
  "Fleet Service",
  "Custom / Performance Build",
  "Fabrication",
  "Other",
] as const;

export const PREFERRED_CONTACT_OPTIONS = ["Phone", "Text", "Email"] as const;

export const appointmentFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number we can reach you at.")
    .max(30, "Phone number looks too long."),
  vehicle: z
    .string()
    .trim()
    .min(2, "Tell us the year, make, and model.")
    .max(120),
  serviceNeeded: z.enum(SERVICE_NEEDED_OPTIONS, {
    error: "Select the service you need.",
  }),
  preferredContact: z.enum(PREFERRED_CONTACT_OPTIONS, {
    error: "Choose how we should reach you.",
  }),
  preferredDate: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value),
      "Enter a valid date.",
    )
    .transform((value) => value || undefined),
  message: z
    .string()
    .trim()
    .min(10, "Add a short note about what you need.")
    .max(2000),
  source: z.string().trim().max(300).optional(),
  companyWebsite: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export function validatePhoto(file: File | null) {
  if (!file || file.size === 0) {
    return { ok: true as const, file: null };
  }

  if (!file.type.startsWith("image/")) {
    return {
      ok: false as const,
      message: "Photo must be an image file (JPG, PNG, or WEBP).",
    };
  }

  if (file.size > MAX_PHOTO_BYTES) {
    return {
      ok: false as const,
      message: "Photo must be 5 MB or smaller.",
    };
  }

  return { ok: true as const, file };
}
