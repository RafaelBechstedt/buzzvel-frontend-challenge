"use client";

import { useEffect, useId, useRef, useState } from "react";

import { CloseIcon } from "@/components/icons/CloseIcon";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { Button } from "@/components/ui/Button";
import { loginLink, navLinks, startLink } from "@/data/navigation";

/** Same breakpoint as Tailwind `lg`, where the desktop navigation shows. */
export const DESKTOP_QUERY = "(min-width: 64rem)";

/**
 * Disclosure menu for mobile and tablet (see "Mobile menu panel" in
 * docs/decisions.md). Not a modal: no focus trap and no scroll lock.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);
    function handleBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleBreakpoint);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex size-9 items-center justify-center rounded-lg text-ink"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--spacing-header))] overflow-y-auto border-y border-line bg-cream px-5 pt-2 pb-6 motion-safe:transition-[opacity,translate] motion-safe:duration-200 motion-safe:ease-out md:px-8 motion-safe:starting:-translate-y-2 motion-safe:starting:opacity-0"
      >
        <nav aria-label="Main">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block rounded-sm py-3 text-body text-ink-secondary hover:text-ink motion-safe:transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <Button
            href={loginLink.href}
            variant="secondary"
            size="lg"
            fullWidth
            prefetch={false}
            onClick={close}
          >
            {loginLink.label}
          </Button>
          <Button href={startLink.href} size="lg" fullWidth onClick={close}>
            {startLink.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
