import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";

// One public page. No lastModified: a build-time date would not be a real edit date.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url }];
}
