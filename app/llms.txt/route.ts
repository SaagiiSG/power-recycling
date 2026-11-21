import { description, siteUrl } from "@/lib/site";
import { hours, region, yards } from "@/lib/yards";

// llms.txt: a plain summary AI assistants can read in one fetch. Built from lib/yards.ts so it never drifts.
export function GET() {
  const body = `# Power Recycling

> ${description}

## Yards

${yards
  .map(
    (y) =>
      `- ${y.city}: ${y.street}, ${region(y)}. Phone ${y.phones.join(" or ")}. Email ${y.email}. [Search ${y.city} inventory](${y.inventory.search})`
  )
  .join("\n")}

## Hours

${hours.weekdays} (MST/MDT). ${hours.weekends}.

## What we offer

- Quality new, recycled and aftermarket auto parts
- Great warranties
- Shipping with UPS and FedEx, plus local delivery services
- Help on the phone from automotive professionals

## Pages

- [Home: search inventory by yard and request a part](${siteUrl}/)
- [Locations and maps](${siteUrl}/locations)
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
