import { Resend } from "resend";

import { siteConfig } from "@/config/site";

export type AppointmentPhotoAttachment = {
  filename: string;
  contentType: string;
  size: number;
  content: Buffer;
};

export type AppointmentLead = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  message: string;
  serviceNeeded: string;
  preferredContact: string;
  preferredDate?: string;
  source?: string;
  photo: AppointmentPhotoAttachment | null;
};

export type AppointmentDeliveryResult =
  { ok: true } | { ok: false; message: string };

function sanitizeFilename(filename: string) {
  return filename.replace(/[/\\]/g, "_").slice(0, 120) || "photo";
}

export function buildAppointmentEmail(lead: AppointmentLead) {
  const photoLine = lead.photo
    ? `${sanitizeFilename(lead.photo.filename)} (${lead.photo.contentType}, ${lead.photo.size} bytes)`
    : "None";

  const text = [
    `New appointment request for ${siteConfig.name}`,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Preferred contact: ${lead.preferredContact}`,
    `Service needed: ${lead.serviceNeeded}`,
    `Preferred date: ${lead.preferredDate ?? "Not specified"}`,
    `Vehicle: ${lead.vehicle}`,
    `Source page: ${lead.source || "Not provided"}`,
    `Photo: ${photoLine}`,
    "",
    "Message:",
    lead.message,
  ].join("\n");

  return {
    subject: `Appointment request: ${lead.serviceNeeded} — ${lead.name}`,
    text,
  };
}

export async function sendAppointmentLead(
  lead: AppointmentLead,
): Promise<AppointmentDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.APPOINTMENT_FROM_EMAIL?.trim();
  const to = process.env.APPOINTMENT_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    console.error("[appointment] email is not configured");
    return {
      ok: false,
      message: `We could not send your request. Please call ${siteConfig.phone.display}.`,
    };
  }

  const { subject, text } = buildAppointmentEmail(lead);
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject,
      text,
      attachments: lead.photo
        ? [
            {
              filename: sanitizeFilename(lead.photo.filename),
              content: lead.photo.content,
              contentType: lead.photo.contentType,
            },
          ]
        : undefined,
    });

    if (error) {
      console.error("[appointment] delivery failed");
      return {
        ok: false,
        message: `We could not send your request. Please call ${siteConfig.phone.display} or try again.`,
      };
    }

    return { ok: true };
  } catch {
    console.error("[appointment] delivery failed");
    return {
      ok: false,
      message: `We could not send your request. Please call ${siteConfig.phone.display} or try again.`,
    };
  }
}
