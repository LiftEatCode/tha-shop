import { z } from "zod";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const SERVICE_NEEDED_OPTIONS = [
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
];

const PREFERRED_CONTACT_OPTIONS = ["Phone", "Text", "Email"];

const appointmentFormSchema = z.object({
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

function getFormTimingError(formStartedAt, now) {
  const startedAt = Number.parseInt(formStartedAt, 10);
  if (!Number.isFinite(startedAt)) {
    return "Please try again.";
  }
  const elapsed = now - startedAt;
  if (elapsed < 800 || elapsed > 24 * 60 * 60 * 1000) {
    return "Please try again.";
  }
  return null;
}

async function processAppointmentForm(
  formData,
  { sendLead, now = Date.now() },
) {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    vehicle: String(formData.get("vehicle") ?? ""),
    serviceNeeded: String(formData.get("serviceNeeded") ?? ""),
    preferredContact: String(formData.get("preferredContact") ?? ""),
    preferredDate: String(formData.get("preferredDate") ?? ""),
    message: String(formData.get("message") ?? ""),
    source: String(formData.get("source") ?? ""),
    companyWebsite: String(formData.get("companyWebsite") ?? ""),
  };

  if (raw.companyWebsite.trim()) {
    return {
      success: true,
      message: "Thanks — we received your request and will follow up shortly.",
      sent: false,
    };
  }

  const timingError = getFormTimingError(
    String(formData.get("formStartedAt") ?? ""),
    now,
  );
  if (timingError) {
    return { success: false, message: timingError, sent: false };
  }

  const parsed = appointmentFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
      sent: false,
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
      sent: false,
    };
  }

  const delivery = await sendLead({
    ...parsed.data,
    photoName: photoCheck.file?.name ?? null,
  });

  if (!delivery.ok) {
    return {
      success: false,
      message:
        "We could not send your request. Please call (936) 297-0820 or try again.",
      sent: true,
    };
  }

  return {
    success: true,
    message: "Thanks — we received your request and will follow up shortly.",
    sent: true,
  };
}

function validFormData() {
  const formData = new FormData();
  formData.set("name", "Josh Tester");
  formData.set("email", "josh@example.com");
  formData.set("phone", "(936) 555-1212");
  formData.set("vehicle", "1969 Mustang");
  formData.set("serviceNeeded", "Check Engine / Diagnostics");
  formData.set("preferredContact", "Phone");
  formData.set("preferredDate", "2026-09-01");
  formData.set(
    "message",
    "Need a diagnostic and oil change appointment next week.",
  );
  formData.set("source", "/contact (from /auto-services)");
  formData.set("companyWebsite", "");
  formData.set("formStartedAt", String(Date.now() - 2_000));
  return formData;
}

let sendCalls = 0;
const mockSendOk = async () => {
  sendCalls += 1;
  return { ok: true };
};
const mockSendFail = async () => {
  sendCalls += 1;
  return { ok: false };
};

const empty = new FormData();
empty.set("name", "");
empty.set("email", "bad");
empty.set("phone", "1");
empty.set("vehicle", "");
empty.set("serviceNeeded", "");
empty.set("preferredContact", "");
empty.set("preferredDate", "");
empty.set("message", "hi");
empty.set("companyWebsite", "");
empty.set("formStartedAt", String(Date.now() - 2_000));
console.log(
  "INVALID:",
  JSON.stringify(
    await processAppointmentForm(empty, { sendLead: mockSendOk }),
    null,
    2,
  ),
);
console.log("INVALID_SEND_CALLS:", sendCalls);

sendCalls = 0;
console.log(
  "VALID:",
  JSON.stringify(
    await processAppointmentForm(validFormData(), { sendLead: mockSendOk }),
    null,
    2,
  ),
);
console.log("VALID_SEND_CALLS:", sendCalls);

sendCalls = 0;
const honeypot = validFormData();
honeypot.set("companyWebsite", "https://spam.example");
console.log(
  "HONEYPOT:",
  JSON.stringify(
    await processAppointmentForm(honeypot, { sendLead: mockSendOk }),
    null,
    2,
  ),
);
console.log("HONEYPOT_SEND_CALLS:", sendCalls);

sendCalls = 0;
const badPhoto = validFormData();
badPhoto.set(
  "photo",
  new File([new Uint8Array(10)], "x.txt", { type: "text/plain" }),
);
console.log(
  "BAD_PHOTO:",
  JSON.stringify(
    await processAppointmentForm(badPhoto, { sendLead: mockSendOk }),
    null,
    2,
  ),
);
console.log("BAD_PHOTO_SEND_CALLS:", sendCalls);

sendCalls = 0;
console.log(
  "DELIVERY_FAIL:",
  JSON.stringify(
    await processAppointmentForm(validFormData(), { sendLead: mockSendFail }),
    null,
    2,
  ),
);
console.log("DELIVERY_FAIL_SEND_CALLS:", sendCalls);

sendCalls = 0;
const tooFast = validFormData();
tooFast.set("formStartedAt", String(Date.now()));
console.log(
  "TOO_FAST:",
  JSON.stringify(
    await processAppointmentForm(tooFast, { sendLead: mockSendOk }),
    null,
    2,
  ),
);
console.log("TOO_FAST_SEND_CALLS:", sendCalls);

if (sendCalls !== 0) {
  throw new Error("Too-fast submissions should not call delivery");
}

console.log("FORM_TEST_OK");
