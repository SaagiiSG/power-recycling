import Link from "next/link";
import { PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/#yards", label: "Search inventory" },
  { href: "/#request", label: "Request a part" },
  { href: "/locations", label: "Locations" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-heading text-xl font-semibold tracking-wide uppercase">
          <span aria-hidden className="size-3 bg-brand" />
          Power Recycling
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-mono text-xs tracking-[0.14em] uppercase hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>
        <Button size="lg" nativeButton={false} render={<Link href="/#yards" />} className="px-4">
          <PhoneIcon data-icon="inline-start" />
          Call a yard
        </Button>
      </div>
      <nav aria-label="Main" className="flex justify-between gap-4 overflow-x-auto border-t px-4 py-2.5 md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="shrink-0 font-mono text-[11px] tracking-[0.08em] uppercase">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
