import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { loginLink, navLinks, startLink } from "@/data/navigation";

import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-[69px] border-b border-line bg-cream px-5 md:px-8 lg:h-[70px]">
      <a
        href="#main"
        className="sr-only rounded-lg bg-white px-4 py-2.5 text-body font-bold text-ink shadow-badge focus:not-sr-only focus:absolute focus:top-3 focus:left-5 focus:z-50"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-full max-w-page items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* "#top" scrolls to the top of the document (HTML spec). */}
        <a
          href="#top"
          aria-label="Luma home"
          className="inline-flex justify-self-start rounded-sm text-ink"
        >
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  className="rounded-sm text-body text-ink-secondary hover:text-ink motion-safe:transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden gap-2 justify-self-end lg:flex">
          <Button href={loginLink.href} variant="ghost" prefetch={false}>
            {loginLink.label}
          </Button>
          <Button href={startLink.href}>{startLink.label}</Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
