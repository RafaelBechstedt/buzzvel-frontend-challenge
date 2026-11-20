import { type ComponentProps, type ReactNode, useId } from "react";

type FieldBaseProps = {
  label: string;
  /** Shown below the control and linked with `aria-describedby`. */
  error?: string;
  /** For layout (margins, width). Applied to the wrapper. */
  className?: string;
};

export type TextFieldProps = FieldBaseProps &
  Omit<ComponentProps<"input">, keyof FieldBaseProps | "id">;

export type TextareaFieldProps = FieldBaseProps &
  Omit<ComponentProps<"textarea">, keyof FieldBaseProps | "id">;

// The error state is not in the design (see docs/decisions.md).
const control =
  "w-full rounded-lg border border-line bg-cream px-4 text-body text-ink placeholder:text-ink-secondary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error";

type ShellProps = FieldBaseProps & {
  id: string;
  errorId: string;
  children: ReactNode;
};

function FieldShell({
  id,
  errorId,
  label,
  error,
  className,
  children,
}: ShellProps) {
  return (
    <div
      className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}
    >
      <label htmlFor={id} className="text-body font-bold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-body text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** `aria-invalid` and `aria-describedby` for the error, kept with any passed in. */
function useFieldA11y(error: string | undefined, describedBy?: string) {
  const id = useId();
  const errorId = `${id}-error`;
  const ariaDescribedBy =
    [describedBy, error && errorId].filter(Boolean).join(" ") || undefined;

  return {
    id,
    errorId,
    controlProps: {
      id,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": ariaDescribedBy,
    },
  };
}

/** Labelled text input (48px high). */
export function TextField({
  label,
  error,
  className,
  "aria-describedby": describedBy,
  ...inputProps
}: TextFieldProps) {
  const { id, errorId, controlProps } = useFieldA11y(error, describedBy);

  return (
    <FieldShell
      id={id}
      errorId={errorId}
      label={label}
      error={error}
      className={className}
    >
      <input
        {...inputProps}
        {...controlProps}
        className={`${control} py-[11px]`}
      />
    </FieldShell>
  );
}

/** Labelled textarea: 100px high on mobile, 120px from `lg`; resizable vertically. */
export function TextareaField({
  label,
  error,
  className,
  "aria-describedby": describedBy,
  ...textareaProps
}: TextareaFieldProps) {
  const { id, errorId, controlProps } = useFieldA11y(error, describedBy);

  return (
    <FieldShell
      id={id}
      errorId={errorId}
      label={label}
      error={error}
      className={className}
    >
      <textarea
        {...textareaProps}
        {...controlProps}
        className={`${control} block min-h-25 resize-y py-[13px] lg:min-h-30`}
      />
    </FieldShell>
  );
}
