import { describe, expect, it } from "vitest";

import { invalidEmailMessage, validateContact, validateField } from "./contact";

describe("validateField", () => {
  it.each(["alex@example.com", " alex.morgan+luma@mail.co.uk "])(
    "accepts the email %j",
    (email) => {
      expect(validateField("email", email)).toBeUndefined();
    },
  );

  it.each([
    "alex",
    "alex@",
    "alex@example",
    "alex @example.com",
    "@example.com",
  ])("rejects the email %j", (email) => {
    expect(validateField("email", email)).toBe(invalidEmailMessage);
  });

  it("treats whitespace as empty", () => {
    expect(validateField("name", "   ")).toBe("Enter your full name.");
  });
});

describe("validateContact", () => {
  it("returns no errors for valid values", () => {
    expect(
      validateContact({
        name: "Alex Morgan",
        email: "alex@example.com",
        message: "Hello",
      }),
    ).toEqual({});
  });
});
