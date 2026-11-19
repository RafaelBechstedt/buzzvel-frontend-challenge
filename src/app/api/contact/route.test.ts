// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { invalidEmailMessage } from "@/lib/contact";

import { POST } from "./route";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

/** Calls the handler and skips the simulated delay. */
async function post(body: string) {
  const pending = POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),
  );
  await vi.runAllTimersAsync();
  return pending;
}

describe("POST /api/contact", () => {
  it("accepts a valid message", async () => {
    const response = await post(
      JSON.stringify({
        name: "Alex Morgan",
        email: "alex@example.com",
        message: "Do you have team plans?",
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it("returns the errors of each invalid field", async () => {
    const response = await post(
      JSON.stringify({ name: "  ", email: "alex@", message: 42 }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      ok: false,
      errors: {
        name: "Enter your full name.",
        email: invalidEmailMessage,
        message: "Enter your question.",
      },
    });
  });

  it("rejects a body that is not JSON", async () => {
    const response = await post("name=Alex");

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false });
  });
});
