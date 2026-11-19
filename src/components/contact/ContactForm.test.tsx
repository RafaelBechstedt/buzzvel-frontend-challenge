import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { contactContent } from "@/data/contact";
import { type ContactResponse, invalidEmailMessage } from "@/lib/contact";

import { ContactForm } from "./ContactForm";

const { form: content } = contactContent;

let fetchMock: ReturnType<typeof vi.fn>;

/** A fetch response with the given JSON body. */
function reply(data: ContactResponse) {
  return { json: async () => data } as Response;
}

beforeEach(() => {
  fetchMock = vi.fn(async () => reply({ ok: true }));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function setup() {
  const user = userEvent.setup();
  render(<ContactForm />);
  return {
    user,
    name: screen.getByRole("textbox", { name: "Full name" }),
    email: screen.getByRole("textbox", { name: "Email" }),
    message: screen.getByRole("textbox", { name: "Your question" }),
    submit: screen.getByRole("button", { name: content.submitLabel }),
  };
}

const validValues = {
  name: "Alex Morgan",
  email: "alex@example.com",
  message: "Do you have team plans?",
};

describe("ContactForm", () => {
  it("shows an error on every empty field when sent empty", async () => {
    const { user, name, email, message, submit } = setup();

    await user.click(submit);

    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Enter your full name.");
    expect(email).toHaveAccessibleDescription("Enter your email.");
    expect(message).toHaveAccessibleDescription("Enter your question.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("validates the email on blur, not while typing", async () => {
    const { user, email } = setup();

    await user.type(email, "alex@");
    expect(email).not.toHaveAttribute("aria-invalid");

    await user.tab();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription(invalidEmailMessage);

    await user.type(email, "example.com");
    await user.tab();
    expect(email).not.toHaveAttribute("aria-invalid");
  });

  it("shows no error when tabbing through an untouched field", async () => {
    const { user, name } = setup();

    await user.tab();
    expect(name).toHaveFocus();
    await user.tab();

    expect(name).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText("Enter your full name.")).not.toBeInTheDocument();
  });

  it("moves focus to the first invalid field on submit", async () => {
    const { user, name, email, submit } = setup();

    await user.type(name, validValues.name);
    await user.type(email, "alex@example");
    await user.click(submit);

    expect(email).toHaveFocus();
    expect(email).toHaveAccessibleDescription(invalidEmailMessage);
  });

  it("sends the message and shows the success message", async () => {
    let resolve!: (response: Response) => void;
    fetchMock.mockImplementationOnce(
      () => new Promise<Response>((done) => (resolve = done)),
    );
    const { user, name, email, message, submit } = setup();

    await user.type(name, validValues.name);
    await user.type(email, validValues.email);
    await user.type(message, validValues.message);
    await user.click(submit);

    expect(submit).toBeDisabled();
    expect(submit).toHaveAccessibleName(content.sendingLabel);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(validValues),
      }),
    );

    // A browser moves focus to <body> when the focused button gets disabled.
    submit.blur();
    resolve(reply({ ok: true }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      content.successMessage,
    );
    expect(submit).toBeEnabled();
    expect(submit).toHaveFocus();
    expect(name).toHaveValue("");
    expect(email).toHaveValue("");
    expect(message).toHaveValue("");
  });

  it("sends only once when submitted twice", async () => {
    const { user, name, email, message } = setup();

    await user.type(name, validValues.name);
    await user.type(email, validValues.email);
    await user.type(message, validValues.message);

    const form = screen.getByRole("form", { name: content.title });
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(await screen.findByText(content.successMessage)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows the server's field errors", async () => {
    fetchMock.mockResolvedValueOnce(
      reply({ ok: false, errors: { email: invalidEmailMessage } }),
    );
    const { user, name, email, message, submit } = setup();

    await user.type(name, validValues.name);
    await user.type(email, validValues.email);
    await user.type(message, validValues.message);
    await user.click(submit);

    expect(email).toHaveFocus();
    expect(email).toHaveAccessibleDescription(invalidEmailMessage);
  });

  it("shows an alert when sending fails", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    const { user, name, email, message, submit } = setup();

    await user.type(name, validValues.name);
    await user.type(email, validValues.email);
    await user.type(message, validValues.message);
    await user.click(submit);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      content.failureMessage,
    );
    expect(name).toHaveValue(validValues.name);
  });
});
