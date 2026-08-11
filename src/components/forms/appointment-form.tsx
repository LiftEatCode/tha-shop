"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  submitAppointmentForm,
  type AppointmentFormState,
} from "@/app/contact/actions";
import { cn } from "@/lib/utils";

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
      className="inline-flex items-center justify-center rounded-md bg-ember px-5 py-3 text-sm font-semibold text-white transition hover:bg-ember-hot disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Request an Appointment"}
    </button>
  );
}

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1 text-xs text-danger">{messages[0]}</p>;
}

export function AppointmentForm() {
  const [state, formAction] = useActionState(
    submitAppointmentForm,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="grid gap-4"
      noValidate
      aria-describedby={state.message ? "appointment-form-status" : undefined}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
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
        <label className="block text-sm font-medium text-ink">
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
        <label className="block text-sm font-medium text-ink">
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
        <label className="block text-sm font-medium text-ink">
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

      <label className="block text-sm font-medium text-ink">
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

      <label className="block text-sm font-medium text-ink">
        Photo attachment (optional)
        <input
          name="photo"
          type="file"
          accept="image/*"
          className="mt-1.5 block w-full text-sm text-steel file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:font-semibold file:text-cream"
          aria-invalid={Boolean(state.errors?.photo)}
        />
        <FieldError messages={state.errors?.photo} />
      </label>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
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
  "mt-1.5 w-full rounded-md border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition placeholder:text-steel/60 focus:border-ember focus:ring-2 focus:ring-ember/20";
