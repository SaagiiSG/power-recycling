import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { directions, hours, region, tel, yards } from "@/lib/yards";

export const metadata: Metadata = {
  title: "Locations",
  description: `Addresses, phone numbers and maps for the ${yards.length} Power Recycling yards: ${yards.map((y) => y.city).join(", ")}.`,
  alternates: { canonical: "/locations" },
};

const label = "font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground";

export default function Locations() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-12 pb-20 md:px-8 md:pt-20">
      <p className={label}>Locations</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight uppercase md:text-5xl">Three yards.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        {hours.label}: {hours.weekdays}. {hours.weekends}.
      </p>
      <div className="mt-12 border-t">
        {yards.map((y, i) => (
          <section key={y.id} className="grid gap-8 border-b py-10 md:grid-cols-12 md:py-12">
            <div className="md:col-span-4">
              <p className={label}>No. 0{i + 1}</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight uppercase">{y.city}</h2>
              <address className="mt-3 leading-relaxed not-italic text-muted-foreground">
                {y.street}
                <br />
                {region(y)}
              </address>
              <div className="mt-5 flex flex-col gap-1">
                {y.phones.map((p) => (
                  <a key={p} href={tel(p)} className="w-fit font-heading text-2xl tracking-wide hover:text-brand">
                    {p}
                  </a>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <Button size="lg" nativeButton={false} render={<a href={directions(y)} target="_blank" rel="noreferrer" />} className="h-11 px-4">
                  Directions
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
                <Button size="lg" variant="outline" nativeButton={false} render={<a href={y.inventory.search} />} className="h-11 border-foreground/30 bg-transparent px-4">
                  Search inventory
                </Button>
              </div>
            </div>
            <iframe
              src={y.map}
              title={`Map of Power Recycling ${y.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[16/10] w-full border md:col-span-8"
            />
          </section>
        ))}
      </div>
    </div>
  );
}
