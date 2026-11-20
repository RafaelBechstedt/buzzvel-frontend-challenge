import { siteConfig } from "@/data/site";

const organizationId = `${siteConfig.url}/#organization`;

/**
 * Schema.org data for the home page: who publishes the site and what the site
 * is. Only facts shown on the page; no ratings, courses or contact details
 * (they are mock content, see docs/decisions.md).
 */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.organization,
      url: siteConfig.url,
      logo: `${siteConfig.url}/apple-icon.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
  ],
};

/** JSON for a `<script type="application/ld+json">`, with `<` escaped (Next JSON-LD guide). */
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
