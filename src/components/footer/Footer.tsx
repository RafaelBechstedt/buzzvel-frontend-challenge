import { cacheLife } from "next/cache";
import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { footerContent } from "@/data/footer";
import type { NavLink } from "@/data/navigation";

/** Cached for a day: the year stays in the static shell and still rolls over. */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkClassName =
  "rounded-sm text-body text-on-dark-tertiary hover:text-white motion-safe:transition-colors";

function FooterLink({ label, href }: NavLink) {
  // Anchors stay on this page; routes are out of scope, so no prefetch.
  return href.startsWith("#") ? (
    <a href={href} className={linkClassName}>
      {label}
    </a>
  ) : (
    <Link href={href} prefetch={false} className={linkClassName}>
      {label}
    </Link>
  );
}

export async function Footer() {
  const { tagline, columns, copyrightHolder } = footerContent;
  const year = await getCurrentYear();

  return (
    <footer className="bg-navy px-5 pt-15 pb-5 [--focus-ring:var(--color-white)] md:px-8 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-page">
        {/* Brand on top below lg; brand left and the three columns right from lg (docs/decisions.md). */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8">
          <div>
            {/* "#top" scrolls to the top of the document (HTML spec). */}
            <a
              href="#top"
              aria-label="Luma home"
              className="flex w-fit rounded-sm text-white"
            >
              <Logo />
            </a>
            <p className="mt-3 text-body text-on-dark-tertiary lg:max-w-60">
              {tagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-[repeat(3,13rem)] lg:gap-8"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-overline text-on-dark-secondary uppercase">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col items-start gap-3">
                  {column.links.map((link) => (
                    <li key={link.label} className="flex">
                      <FooterLink {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Gap from the last link to the line, measured on the screens: 36px, 66px from lg. */}
        <div className="mt-9 border-t border-ink-secondary pt-6 lg:mt-16.5">
          {/* One-off style: the copyright has no text style in Figma (docs/decisions.md). */}
          <p className="text-center text-[13px] leading-normal text-on-dark-secondary md:text-left">
            © {year} {copyrightHolder}
          </p>
        </div>
      </div>
    </footer>
  );
}
