import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Crawlers stay allowed even during the demo: Messenger, Instagram and iMessage need to read
// the page to build link previews. The noindex tag in layout.tsx keeps it out of search.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
