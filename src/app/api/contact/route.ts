import {
  CONTACT_DELAY_MS,
  type ContactResponse,
  toContactValues,
  validateContact,
} from "@/lib/contact";

/**
 * Simulated contact endpoint: the challenge has no backend, so a valid message
 * is accepted after a short delay and not stored or logged (docs/decisions.md).
 */
export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, CONTACT_DELAY_MS));

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false } satisfies ContactResponse, {
      status: 400,
    });
  }

  // Validated again on the server: the client cannot be trusted.
  const errors = validateContact(toContactValues(body));
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors } satisfies ContactResponse, {
      status: 400,
    });
  }

  return Response.json({ ok: true } satisfies ContactResponse);
}
