// A customer asks a yard for a part. Everything here is typed by a stranger,
// so it is length-checked on the way in and HTML-escaped on the way out.

import { yards, type Yard } from "./yards";

export type PartRequest = {
  yard: Yard;
  year: string;
  make: string;
  model: string;
  part: string;
  vin: string;
  name: string;
  phone: string;
  email: string;
  note: string;
};

const YEAR = /^(19[5-9]\d|20[0-4]\d)$/;
const PHONE = /^[0-9+()\-.\s]{7,25}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VIN = /^[A-HJ-NPR-Z0-9]{17}$/i;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max + 1) : "");

// Returns null for anything we would not want to forward to a yard.
export function parsePartRequest(body: unknown): PartRequest | null {
  const b = (body ?? {}) as Record<string, unknown>;
  if (str(b.company, 200)) return null; // honeypot: hidden from people, filled by bots
  const yard = yards.find((y) => y.id === b.yard);
  const r = {
    year: str(b.year, 4),
    make: str(b.make, 40),
    model: str(b.model, 60),
    part: str(b.part, 200),
    vin: str(b.vin, 17),
    name: str(b.name, 80),
    phone: str(b.phone, 25),
    email: str(b.email, 254),
    note: str(b.note, 1000),
  };
  const ok =
    yard &&
    YEAR.test(r.year) &&
    r.make && r.make.length <= 40 &&
    r.model && r.model.length <= 60 &&
    r.part && r.part.length <= 200 &&
    (!r.vin || VIN.test(r.vin)) &&
    r.name && r.name.length <= 80 &&
    PHONE.test(r.phone) &&
    (!r.email || (r.email.length <= 254 && EMAIL.test(r.email))) &&
    r.note.length <= 1000;
  return ok ? { yard, ...r, vin: r.vin.toUpperCase() } : null;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function partRequestEmail(r: PartRequest) {
  const vehicle = `${r.year} ${r.make} ${r.model}`;
  const rows: [string, string][] = [
    ["Part", r.part],
    ["Vehicle", vehicle],
    ...(r.vin ? [["VIN", r.vin] as [string, string]] : []),
    ["Name", r.name],
    ["Phone", r.phone],
    ...(r.email ? [["Email", r.email] as [string, string]] : []),
    ...(r.note ? [["Note", r.note] as [string, string]] : []),
  ];
  return {
    // Subject lines can't carry markup, but strip newlines so nothing can fake a header.
    subject: `Part request: ${r.part} for a ${vehicle}`.replace(/[\r\n]+/g, " "),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1a1917">
<p>New part request for <b>${esc(r.yard.city)}</b> from the website.</p>
<table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#6b675f;border-bottom:1px solid #ddd8cc">${k}</td><td style="border-bottom:1px solid #ddd8cc">${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("")}</table>
<p>Call ${esc(r.name)} back at <a href="tel:${esc(r.phone.replace(/[^0-9+]/g, ""))}">${esc(r.phone)}</a>.</p>
</div>`,
  };
}
