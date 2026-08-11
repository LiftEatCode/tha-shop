import { z } from "zod";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const appointmentFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
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
  message: z
    .string()
    .trim()
    .min(10, "Add a short note about what you need.")
    .max(2000),
  companyWebsite: z.string().optional(),
});

function validatePhoto(file) {
  if (!file || file.size === 0) {
    return { ok: true, file: null };
  }
  if (!file.type.startsWith("image/")) {
    return {
      ok: false,
      message: "Photo must be an image file (JPG, PNG, or WEBP).",
    };
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return {
      ok: false,
      message: "Photo must be 5 MB or smaller.",
    };
  }
  return { ok: true, file };
}

async function submitAppointmentForm(formData) {
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

  return {
    success: true,
    message:
      "Thanks — your request was validated. Delivery is not connected yet, so please also call (936) 297-0820 to confirm.",
  };
}

const empty = new FormData();
empty.set("name", "");
empty.set("email", "bad");
empty.set("phone", "1");
empty.set("vehicle", "");
empty.set("message", "hi");
empty.set("companyWebsite", "");
console.log("INVALID:", JSON.stringify(await submitAppointmentForm(empty), null, 2));

const valid = new FormData();
valid.set("name", "Josh Tester");
valid.set("email", "josh@example.com");
valid.set("phone", "(936) 555-1212");
valid.set("vehicle", "1969 Mustang");
valid.set("message", "Need a diagnostic and oil change appointment next week.");
valid.set("companyWebsite", "");
console.log("VALID:", JSON.stringify(await submitAppointmentForm(valid), null, 2));

const honeypot = new FormData();
honeypot.set("name", "Bot");
honeypot.set("email", "bot@spam.com");
honeypot.set("phone", "1234567890");
honeypot.set("vehicle", "Car");
honeypot.set("message", "Spam message here");
honeypot.set("companyWebsite", "https://spam.example");
console.log("HONEYPOT:", JSON.stringify(await submitAppointmentForm(honeypot), null, 2));

const badPhoto = new FormData();
badPhoto.set("name", "Josh Tester");
badPhoto.set("email", "josh@example.com");
badPhoto.set("phone", "(936) 555-1212");
badPhoto.set("vehicle", "1969 Mustang");
badPhoto.set("message", "Need a diagnostic and oil change appointment next week.");
badPhoto.set("companyWebsite", "");
badPhoto.set("photo", new File([new Uint8Array(10)], "x.txt", { type: "text/plain" }));
console.log("BAD_PHOTO:", JSON.stringify(await submitAppointmentForm(badPhoto), null, 2));
