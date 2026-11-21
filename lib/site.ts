import { directions, yards } from "./yards";

// Vercel sets this at build time: the custom domain once one is added, else the .vercel.app one.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// Demo until the owner says yes. Flip to true at launch so Google and AI search can list the site.
export const live = false;

export const description =
  "Used, new and aftermarket auto parts from three yards in Calgary, Regina and Fort Macleod. Search each yard's inventory online, call, or send a part request.";

// schema.org data that Google and AI answer engines read: one business, three stores.
export function structuredData() {
  const org = `${siteUrl}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": org, name: "Power Recycling", url: siteUrl, logo: `${siteUrl}/icon.png`, description },
      ...yards.map((y) => ({
        "@type": "AutoPartsStore",
        "@id": `${siteUrl}/#${y.id}`,
        name: `Power Recycling ${y.city}`,
        parentOrganization: { "@id": org },
        url: `${siteUrl}/locations`,
        image: `${siteUrl}/opengraph-image.jpg`,
        telephone: y.phones.map((p) => `+1-${p}`),
        email: y.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: y.street,
          addressLocality: y.city,
          addressRegion: y.province,
          postalCode: y.postal,
          addressCountry: "CA",
        },
        hasMap: directions(y),
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:30",
        },
      })),
    ],
  };
}
