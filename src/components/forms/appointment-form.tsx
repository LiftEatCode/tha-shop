"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";

import {
  submitAppointmentForm,
  type AppointmentFormState,
} from "@/app/contact/actions";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";
import {
  PREFERRED_CONTACT_OPTIONS,
  SERVICE_NEEDED_OPTIONS,
} from "@/lib/validations/appointment";

const initialState: AppointmentFormState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-engine hover:bg-engine-hot focus-visible:outline-engine inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Request an Appointment"}
    </button>
  );
}

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="text-danger mt-1 text-xs">{messages[0]}</p>;
}

function captureSourcePath() {
  const path = window.location.pathname;
  try {
    const referrer = document.referrer;
    if (!referrer) return path;
    const url = new URL(referrer);
    if (url.origin === window.location.origin && url.pathname !== path) {
      return `${path} (from ${url.pathname})`;
    }
  } catch {
    return path;
  }
  return path;
}

export function AppointmentForm() {
  const [state, formAction] = useActionState(
    submitAppointmentForm,
    initialState,
  );
  const startedAtRef = useRef<string | null>(null);
  const startedTracked = useRef(false);
  const submittedTracked = useRef(false);
  const serviceId = useId();
  const contactId = useId();

  useEffect(() => {
    if (state.success && !submittedTracked.current) {
      submittedTracked.current = true;
      trackEvent(ANALYTICS_EVENTS.appointmentSubmitted);
    }
  }, [state.success]);

  function ensureStartedAt() {
    if (!startedAtRef.current) {
      startedAtRef.current = String(Date.now());
    }
    return startedAtRef.current;
  }

  function handleFocusCapture() {
    ensureStartedAt();
    if (startedTracked.current) return;
    startedTracked.current = true;
    trackEvent(ANALYTICS_EVENTS.appointmentStarted);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const startedAtInput = form.elements.namedItem("formStartedAt");
    const sourceInput = form.elements.namedItem("source");
    if (startedAtInput instanceof HTMLInputElement) {
      startedAtInput.value = ensureStartedAt();
    }
    if (sourceInput instanceof HTMLInputElement) {
      sourceInput.value = captureSourcePath();
    }
  }

  return (
    <form
      action={formAction}
      onFocusCapture={handleFocusCapture}
      onSubmit={handleSubmit}
      className="border-engine/30 focus-within:border-engine relative grid gap-4 border-t-2 pt-6 transition-[border-color] duration-300"
      noValidate
      aria-describedby={state.message ? "appointment-form-status" : undefined}
    >
      <input type="hidden" name="source" defaultValue="" />
      <input type="hidden" name="formStartedAt" defaultValue="" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-bay block text-sm font-medium">
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClass}
            aria-invalid={Boolean(state.errors?.name)}
          />
          <FieldError messages={state.errors?.name} />
        </label>
        <label className="text-bay block text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
            aria-invalid={Boolean(state.errors?.email)}
          />
          <FieldError messages={state.errors?.email} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-bay block text-sm font-medium">
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={fieldClass}
            aria-invalid={Boolean(state.errors?.phone)}
          />
          <FieldError messages={state.errors?.phone} />
        </label>
        <label className="text-bay block text-sm font-medium">
          Vehicle (year, make, model)
          <input
            name="vehicle"
            type="text"
            required
            className={fieldClass}
            aria-invalid={Boolean(state.errors?.vehicle)}
          />
          <FieldError messages={state.errors?.vehicle} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label
          className="text-bay block text-sm font-medium"
          htmlFor={serviceId}
        >
          Service needed
          <select
            id={serviceId}
            name="serviceNeeded"
            required
            defaultValue=""
            className={fieldClass}
            aria-invalid={Boolean(state.errors?.serviceNeeded)}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_NEEDED_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError messages={state.errors?.serviceNeeded} />
        </label>
        <label
          className="text-bay block text-sm font-medium"
          htmlFor={contactId}
        >
          Preferred contact method
          <select
            id={contactId}
            name="preferredContact"
            required
            defaultValue=""
            className={fieldClass}
            aria-invalid={Boolean(state.errors?.preferredContact)}
          >
            <option value="" disabled>
              Phone, text, or email
            </option>
            {PREFERRED_CONTACT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError messages={state.errors?.preferredContact} />
        </label>
      </div>

      <label className="text-bay block text-sm font-medium">
        Preferred appointment date{" "}
        <span className="text-steel font-normal">(optional)</span>
        <input
          name="preferredDate"
          type="date"
          className={fieldClass}
          aria-invalid={Boolean(state.errors?.preferredDate)}
        />
        <FieldError messages={state.errors?.preferredDate} />
      </label>

      <label className="text-bay block text-sm font-medium">
        How can we help?
        <textarea
          name="message"
          rows={5}
          required
          className={cn(fieldClass, "resize-y")}
          aria-invalid={Boolean(state.errors?.message)}
        />
        <FieldError messages={state.errors?.message} />
      </label>

      <label className="text-bay block text-sm font-medium">
        Photo attachment (optional)
        <input
          name="photo"
          type="file"
          accept="image/*"
          className="text-steel file:bg-bay file:text-daylight mt-1.5 block w-full text-sm file:mr-3 file:rounded-sm file:border-0 file:px-3 file:py-2 file:text-sm file:font-semibold"
          aria-invalid={Boolean(state.errors?.photo)}
        />
        <FieldError messages={state.errors?.photo} />
      </label>

      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label>
          Company website
          <input
            name="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        {state.message ? (
          <p
            id="appointment-form-status"
            role="status"
            className={cn(
              "text-sm",
              state.success ? "text-success" : "text-danger",
            )}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

const fieldClass =
  "mt-1.5 w-full rounded-sm border border-bay/15 bg-white px-3 py-2.5 text-sm text-bay shadow-sm outline-none transition placeholder:text-steel/60 focus:border-engine focus:ring-2 focus:ring-engine/20";
