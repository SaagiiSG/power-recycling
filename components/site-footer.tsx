import Link from "next/link";
import { Suspense } from "react";
import { Year } from "@/components/year";
import { hours, region, tel, yards } from "@/lib/yards";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="flex items-center gap-2.5 font-heading text-xl font-semibold tracking-wide uppercase">
            <span aria-hidden className="size-3 bg-brand" />
            Power Recycling
          </p>
          <p className="mt-4 font-mono text-xs tracking-[0.14em] text-background/60 uppercase">{hours.label}</p>
          <p className="mt-1 text-sm">{hours.weekdays}</p>
          <p className="text-sm">{hours.weekends}</p>
        </div>
        {yards.map((y) => (
          <address key={y.id} className="text-sm not-italic">
            <p className="font-heading text-lg tracking-wide uppercase">{y.city}</p>
            <p className="mt-2 text-background/75">{y.street}</p>
            <p className="text-background/75">{region(y)}</p>
            <p className="mt-3 flex flex-wrap gap-x-3">
              {y.phones.map((p) => (
                <a key={p} href={tel(p)} className="underline-offset-4 hover:underline">
                  {p}
                </a>
              ))}
            </p>
            <a href={`mailto:${y.email}`} className="text-background/75 underline-offset-4 hover:underline">
              Email {y.city}
            </a>
          </address>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1400px] justify-between border-t border-background/15 px-4 py-5 font-mono text-[11px] tracking-[0.14em] text-background/60 uppercase md:px-8">
        <span>
          © <Suspense><Year /></Suspense> Power Recycling
        </span>
        <Link href="/locations" className="hover:text-background">
          Locations
        </Link>
      </div>
      <div className="mx-auto max-w-[1400px] border-t border-background/15 px-4 py-4 font-mono text-[11px] tracking-[0.14em] text-background/60 uppercase md:px-8">
        Powered by{" "}
        <a href="https://studio-21.co" target="_blank" rel="noopener" className="text-background underline-offset-4 hover:underline">
          Studio 21
        </a>
      </div>
    </footer>
  );
}
