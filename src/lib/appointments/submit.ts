import { getFormTimingError, isRateLimited } from "@/lib/appointments/abuse";
import {
  sendAppointmentLead,
  type AppointmentLead,
  type AppointmentDeliveryResult,
} from "@/lib/email/appointment";
import {
  appointmentFormSchema,
  validatePhoto,
} from "@/lib/validations/appointment";

export type AppointmentFormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<string, string[]>>;
};

const HONEYPOT_SUCCESS: AppointmentFormState = {
  success: true,
  message: "Thanks — we received your request and will follow up shortly.",
};

type SubmitOptions = {
  ip: string;
  now?: number;
  sendLead?: (lead: AppointmentLead) => Promise<AppointmentDeliveryResult>;
};

export async function processAppointmentForm(
  formData: FormData,
  { ip, now = Date.now(), sendLead = sendAppointmentLead }: SubmitOptions,
): Promise<AppointmentFormState> {
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
    return HONEYPOT_SUCCESS;
  }

  const timingError = getFormTimingError(
    String(formData.get("formStartedAt") ?? ""),
    now,
  );
  if (timingError) {
    return {
      success: false,
      message: timingError,
    };
  }

  const parsed = appointmentFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten()
        .fieldErrors as AppointmentFormState["errors"],
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

  if (isRateLimited(ip, now)) {
    return {
      success: false,
      message: "Please wait a few minutes before sending another request.",
    };
  }

  let photoAttachment: AppointmentLead["photo"] = null;
  if (photoCheck.file) {
    const content = Buffer.from(await photoCheck.file.arrayBuffer());
    photoAttachment = {
      filename: photoCheck.file.name,
      contentType: photoCheck.file.type,
      size: photoCheck.file.size,
      content,
    };
  }

  const delivery = await sendLead({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    vehicle: parsed.data.vehicle,
    message: parsed.data.message,
    serviceNeeded: parsed.data.serviceNeeded,
    preferredContact: parsed.data.preferredContact,
    preferredDate: parsed.data.preferredDate,
    source: parsed.data.source,
    photo: photoAttachment,
  });

  if (!delivery.ok) {
    return {
      success: false,
      message: delivery.message,
    };
  }

  return HONEYPOT_SUCCESS;
}
