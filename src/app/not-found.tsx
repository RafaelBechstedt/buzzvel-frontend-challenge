import type { Metadata } from "next";

import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Button } from "@/components/ui/Button";
import { notFoundContent } from "@/data/not-found";

// Next adds <meta name="robots" content="noindex"> to 404 responses.
export const metadata: Metadata = {
  title: "Page not found",
};

/** Root 404: unmatched URLs and the out-of-scope routes (/login, /courses/…). */
export default function NotFound() {
  const { eyebrow, title, description, outOfScope, homeLink } = notFoundContent;

  return (
    <>
      <Header />
      <main
        id="main"
        aria-labelledby="not-found-title"
        className="flex flex-1 items-center bg-cream px-5 py-15 md:px-8 md:py-20 lg:py-25"
      >
        <div className="mx-auto flex max-w-140 flex-col items-center text-center">
          <p className="text-overline text-primary uppercase">{eyebrow}</p>
          <h1
            id="not-found-title"
            className="mt-4 font-display text-h3 text-ink lg:text-h3-desktop"
          >
            {title}
          </h1>
          <p className="mt-4 text-subtitle-1 text-ink-secondary lg:text-subtitle-1-desktop">
            {description}
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {outOfScope.map((page) => (
              <li
                key={page}
                className="rounded-full border border-line bg-white px-2.75 py-0.75 text-body text-ink-secondary"
              >
                {page}
              </li>
            ))}
          </ul>
          <Button href={homeLink.href} size="lg" className="mt-10">
            {homeLink.label}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
