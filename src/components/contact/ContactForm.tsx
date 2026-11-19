"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/Button";
import { TextField, TextareaField } from "@/components/ui/Field";
import { contactContent } from "@/data/contact";
import {
  type ContactErrors,
  type ContactField,
  type ContactResponse,
  type ContactValues,
  contactFields,
  validateContact,
  validateField,
} from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

const emptyValues: ContactValues = { name: "", email: "", message: "" };

const { form: content } = contactContent;

/**
 * Validates on blur and on submit (not on every key), then posts to the
 * simulated `/api/contact` route (docs/decisions.md).
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  // Set before the re-render that disables the button, so a second submit is ignored.
  const sendingRef = useRef(false);
  // Fields the user has typed in: an untouched empty field shows no error on blur.
  const editedRef = useRef(new Set<ContactField>());

  /** Shows the errors, then moves focus to the first invalid field (DOM order). */
  function showErrors(nextErrors: ContactErrors) {
    // Render aria-invalid and the message before focus, so screen readers read them.
    flushSync(() => setErrors(nextErrors));
    const first = contactFields.find((field) => nextErrors[field]);
    if (!first) return false;
    const element = formRef.current?.elements.namedItem(first);
    if (element instanceof HTMLElement) element.focus();
    return true;
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as ContactField;
    editedRef.current.add(field);
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (status === "success" || status === "error") setStatus("idle");
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as ContactField;
    if (!editedRef.current.has(field) && !errors[field]) return;
    setErrors((current) => ({
      ...current,
      [field]: validateField(field, event.target.value),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;

    if (showErrors(validateContact(values))) {
      setStatus("idle");
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    let next: Status = "error";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as ContactResponse;

      if (data.ok) {
        setValues(emptyValues);
        editedRef.current.clear();
        next = "success";
      } else if (data.errors && showErrors(data.errors)) {
        next = "idle";
      }
    } catch {
      // Network error or a body that is not JSON: `next` stays "error".
    }
    sendingRef.current = false;

    // The disabled button lost focus (it moves to <body>): give it back once enabled.
    const focusLost =
      document.activeElement === null ||
      document.activeElement === document.body;
    flushSync(() => setStatus(next));
    if (focusLost) submitRef.current?.focus();
  }

  // Data only: the handlers go straight in the JSX (they read refs, so not during render).
  const fieldProps = (field: ContactField) => ({
    name: field,
    label: content.fields[field].label,
    placeholder: content.fields[field].placeholder,
    value: values[field],
    error: errors[field],
    required: true,
  });

  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      // Without JavaScript the browser posts to the route (never a GET with the data in the URL).
      method="post"
      action="/api/contact"
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
      aria-describedby="contact-form-description"
      className="flex flex-col gap-6 rounded-2xl border border-line bg-white px-5 py-6 shadow-form lg:p-10"
    >
      <div className="flex flex-col gap-2">
        <h3
          id="contact-form-title"
          className="font-display text-h5 text-ink lg:text-h5-desktop"
        >
          {content.title}
        </h3>
        <p
          id="contact-form-description"
          className="text-body text-ink-secondary"
        >
          {content.description}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <TextField
          {...fieldProps("name")}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
        />
        <TextField
          {...fieldProps("email")}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          autoComplete="email"
          spellCheck={false}
        />
        <TextareaField
          {...fieldProps("message")}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <Button
          ref={submitRef}
          type="submit"
          size="lg"
          fullWidth
          disabled={sending}
        >
          {sending ? content.sendingLabel : content.submitLabel}
        </Button>
        {/* Live regions stay in the DOM so the messages are announced when they appear. */}
        <div role="status">
          {status === "success" && (
            <p className="mt-4 text-body text-ink">{content.successMessage}</p>
          )}
        </div>
        <div role="alert">
          {status === "error" && (
            <p className="mt-4 text-body text-error">
              {content.failureMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
