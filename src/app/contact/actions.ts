"use server";

import { headers } from "next/headers";

import { getClientIp } from "@/lib/appointments/abuse";
import { processAppointmentForm } from "@/lib/appointments/submit";
import type { AppointmentFormState } from "@/lib/appointments/submit";

export type { AppointmentFormState };

export async function submitAppointmentForm(
  _previousState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const headerStore = await headers();

  return processAppointmentForm(formData, {
    ip: getClientIp(headerStore),
  });
}
