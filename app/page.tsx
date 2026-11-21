import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { PartRequestForm } from "@/components/part-request-form";
import { Button } from "@/components/ui/button";
import { structuredData } from "@/lib/site";
import { directions, hours, region, tel, yards } from "@/lib/yards";
import yardPhoto from "@/public/photos/yard.jpg";
import racksPhoto from "@/public/photos/racks.jpg";
import alternatorPhoto from "@/public/photos/alternator.jpg";
import mirrorPhoto from "@/public/photos/mirror.jpg";

const label = "font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground";

// From their old site: "We always offer..." plus the hero promise. Nothing added.
const covered = [
  { title: "Great warranties", body: "We always offer a warranty. Ask the yard for the terms on your part." },
  { title: "New, recycled or aftermarket", body: "Quality parts at rates you can afford. Pick what fits the job and the budget." },
  { title: "Shipping or local delivery", body: "We ship parts with UPS and FedEx, and use local delivery services." },
  { title: "Real help on the phone", body: "Call any yard and one of our automotive professionals will help you find the part." },
];

export default function Home() {
  return (
    <>
      {/* Our own data, but escape "<" so nothing in it can close the script tag. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c") }} />
      <section className="grid md:grid-cols-12 md:border-b">
        {/* Full-bleed photo; the text column lines up with the 1400px container below. */}
        <div className="flex flex-col justify-center px-4 py-12 md:col-span-5 md:py-20 md:pr-10 md:pl-[max(2rem,calc((100vw_-_1400px)/2_+_2rem))]">
          <p className={label}>Used · New · Aftermarket auto parts</p>
          <h1 className="mt-5 font-heading text-[2.6rem] leading-[1.02] font-semibold tracking-tight uppercase md:text-[3.4rem]">
            The parts to get you back on the road.
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted-foreground">
            Three yards: Calgary, Regina and Fort Macleod. Search what&apos;s in stock online, call an automotive
            professional, or tell us the part you need.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="#yards" />} className="h-12 bg-brand px-6 text-base text-white hover:bg-brand/90">
              Search inventory
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="#request" />} className="h-12 border-foreground bg-transparent px-6 text-base">
              Request a part
            </Button>
          </div>
          <p className="mt-8 border-t pt-4 font-mono text-xs tracking-[0.08em] text-muted-foreground">
            {hours.weekdays} · {hours.weekends}
          </p>
        </div>
        <div className="relative aspect-[3/2] md:col-span-7 md:aspect-auto md:min-h-[640px]">
          <Image src={yardPhoto} alt="Rows of recycled cars in a prairie yard at sunrise" fill priority sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" placeholder="blur" />
        </div>
      </section>

      <section id="yards" className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pt-16 md:px-8 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-6">
          <div>
            <p className={label}>01 — Search inventory</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight uppercase md:text-4xl">Pick your yard.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Each yard has its own stock. Search the one closest to you, or call and we&apos;ll check the others.
          </p>
        </div>
        <div className="grid md:grid-cols-3">
          {yards.map((y, i) => (
            <article key={y.id} className="flex flex-col border-b py-8 md:border-b-0 md:px-8 md:py-10 md:not-first:border-l md:first:pl-0 md:last:pr-0">
              <p className={label}>No. 0{i + 1}</p>
              <h3 className="mt-2 font-heading text-3xl font-semibold tracking-tight uppercase">{y.city}</h3>
              <address className="mt-3 text-sm leading-relaxed not-italic text-muted-foreground">
                {y.street}
                <br />
                {region(y)}
              </address>
              {/* min-h keeps the buttons level when a yard has one phone number */}
              <div className="mt-5 flex flex-col gap-1 md:min-h-[4.25rem]">
                {y.phones.map((p) => (
                  <a key={p} href={tel(p)} className="w-fit font-heading text-2xl tracking-wide hover:text-brand">
                    {p}
                  </a>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-2">
                <Button size="lg" nativeButton={false} render={<a href={y.inventory.search} />} className="h-11 justify-between px-4">
                  Search {y.city} inventory
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
                <Button size="lg" variant="outline" nativeButton={false} render={<a href={y.inventory.multi} />} className="h-11 justify-between border-foreground/30 bg-transparent px-4">
                  Multi-part search
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
                <Button size="lg" variant="outline" nativeButton={false} render={<a href={y.inventory.image} />} className="h-11 justify-between border-foreground/30 bg-transparent px-4">
                  Search by picture
                  <ArrowUpRightIcon data-icon="inline-end" />
                </Button>
              </div>
              <p className="mt-6 flex gap-5 text-sm">
                <a href={directions(y)} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-brand">
                  Directions
                </a>
                <a href={`mailto:${y.email}`} className="underline underline-offset-4 hover:text-brand">
                  Email {y.city}
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="request" className="mx-auto mt-16 max-w-[1400px] scroll-mt-24 border-t md:mt-24">
        <div className="grid md:grid-cols-12">
          <div className="px-4 py-12 md:col-span-5 md:border-r md:py-20 md:pr-10 md:pl-8">
            <p className={label}>02 — Request a part</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight uppercase md:text-4xl">
              Can&apos;t find it online? Ask the yard.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Not every part makes it into the online search. Tell us the vehicle and the part, and your request goes
              straight to the yard you pick.
            </p>
            <figure className="relative mt-10 hidden aspect-square max-w-sm md:block">
              <Image src={alternatorPhoto} alt="A used alternator with a blank inventory tag on a workbench" fill sizes="384px" className="object-cover" placeholder="blur" />
            </figure>
          </div>
          <div className="px-4 pb-16 md:col-span-7 md:px-12 md:py-20">
            <PartRequestForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] border-t">
        <div className="grid md:grid-cols-12">
          <div className="relative aspect-[4/5] md:col-span-5 md:aspect-auto md:min-h-[720px]">
            <Image src={racksPhoto} alt="Used engines and transmissions on steel racking, each with a tag" fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" placeholder="blur" />
          </div>
          <div className="md:col-span-7 md:border-l">
            <div className="border-b px-4 py-12 md:px-12 md:py-16">
              <p className={label}>03 — You&apos;re covered</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight uppercase md:text-4xl">
                Attention to detail, on every part.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
                We take great pride in our attention to detail and in giving our customers the best service possible.
              </p>
            </div>
            <div className="grid sm:grid-cols-2">
              {covered.map((c, i) => (
                <div key={c.title} className="border-b px-4 py-8 sm:odd:border-r md:px-12">
                  <p className="font-mono text-xs text-brand">0{i + 1}</p>
                  <h3 className="mt-2 font-heading text-xl tracking-wide uppercase">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-[4/5] sm:aspect-auto sm:border-r">
                <Image src={mirrorPhoto} alt="A used side mirror and headlight wrapped and tagged, ready to ship" fill sizes="(min-width: 768px) 29vw, 100vw" className="object-cover" placeholder="blur" />
              </div>
              <div className="px-4 py-10 md:px-12">
                <p className={label}>{hours.label}</p>
                <p className="mt-3 font-heading text-2xl tracking-wide uppercase">{hours.weekdays}</p>
                <p className="font-heading text-2xl tracking-wide text-muted-foreground uppercase">{hours.weekends}</p>
                <Link href="/locations" className="mt-8 inline-flex items-center gap-1.5 text-sm underline underline-offset-4 hover:text-brand">
                  See all three yards on the map
                  <ArrowUpRightIcon className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
