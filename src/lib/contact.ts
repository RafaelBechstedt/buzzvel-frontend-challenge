/** Contact form validation, shared by the form and `POST /api/contact`. */

export const contactFields = ["name", "email", "message"] as const;

export type ContactField = (typeof contactFields)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Body of `POST /api/contact`. `errors` is set when validation fails. */
export type ContactResponse =
  { ok: true } | { ok: false; errors?: ContactErrors };

/** Simulated network and processing time, so the form shows its sending state. */
export const CONTACT_DELAY_MS = 800;

const requiredMessages: Record<ContactField, string> = {
  name: "Enter your full name.",
  email: "Enter your email.",
  message: "Enter your question.",
};

export const invalidEmailMessage =
  "Enter a valid email, like name@example.com.";

// Deliberately simple: something@something.tld, no spaces.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(
  field: ContactField,
  value: string,
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return requiredMessages[field];
  if (field === "email" && !emailPattern.test(trimmed)) {
    return invalidEmailMessage;
  }
  return undefined;
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of contactFields) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

/** Reads the fields from an untrusted request body; missing or non-string fields become "". */
export function toContactValues(body: unknown): ContactValues {
  const record =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};
  const read = (field: ContactField) =>
    typeof record[field] === "string" ? record[field] : "";

  return { name: read("name"), email: read("email"), message: read("message") };
}
