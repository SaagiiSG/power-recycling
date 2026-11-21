"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tel, yards } from "@/lib/yards";

const yardItems = yards.map((y) => ({ value: y.id, label: y.city }));

type Status = { kind: "idle" | "sending" } | { kind: "sent"; yard: string } | { kind: "error"; message: string };

export function PartRequestForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    const res = await fetch("/api/part-request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null);
    const data = await res?.json().catch(() => null);
    if (res?.ok) {
      setStatus({ kind: "sent", yard: data.yard });
      form.reset();
    } else {
      setStatus({
        kind: "error",
        message:
          res?.status === 400
            ? "Please check the year, phone number and VIN (17 characters, optional)."
            : `That didn't send. Call us instead: Calgary ${yards[0].phones[0]}.`,
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="border-t-2 border-brand pt-6">
        <p className="font-heading text-2xl tracking-wide uppercase">Request sent to {status.yard}.</p>
        <p className="mt-3 max-w-md text-muted-foreground">
          The yard has your part, vehicle and phone number. If you need it today, call them too.
        </p>
        <Button variant="outline" size="lg" className="mt-6 px-4" onClick={() => setStatus({ kind: "idle" })}>
          Ask for another part
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="@container/field-group">
      <FieldGroup className="gap-5">
        <Field>
          <FieldLabel htmlFor="part">Part you need</FieldLabel>
          <Input id="part" name="part" required maxLength={200} placeholder="Driver side mirror, alternator, transmission…" className="h-11" />
        </Field>
        <div className="grid grid-cols-[6rem_1fr] gap-4 sm:grid-cols-[6rem_1fr_1fr]">
          <Field>
            <FieldLabel htmlFor="year">Year</FieldLabel>
            <Input id="year" name="year" required inputMode="numeric" pattern="(19[5-9]\d|20[0-4]\d)" maxLength={4} placeholder="2014" className="h-11" />
          </Field>
          <Field>
            <FieldLabel htmlFor="make">Make</FieldLabel>
            <Input id="make" name="make" required maxLength={40} placeholder="Ford" className="h-11" />
          </Field>
          <Field className="col-span-2 sm:col-span-1">
            <FieldLabel htmlFor="model">Model</FieldLabel>
            <Input id="model" name="model" required maxLength={60} placeholder="F-150" className="h-11" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="vin">VIN (optional)</FieldLabel>
          <Input id="vin" name="vin" maxLength={17} pattern="[A-HJ-NPR-Za-hj-npr-z0-9]{17}" autoCapitalize="characters" className="h-11 font-mono uppercase" />
          <FieldDescription>17 characters, on the driver side of the dash. It helps the yard match the exact part.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Which yard?</FieldLabel>
          <Select name="yard" items={yardItems} defaultValue="calgary" required>
            <SelectTrigger className="h-11 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yardItems.map((y) => (
                <SelectItem key={y.value} value={y.value}>
                  {y.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Your name</FieldLabel>
            <Input id="name" name="name" required maxLength={80} autoComplete="name" className="h-11" />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input id="phone" name="phone" type="tel" required maxLength={25} autoComplete="tel" className="h-11" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email (optional)</FieldLabel>
          <Input id="email" name="email" type="email" maxLength={254} autoComplete="email" className="h-11" />
        </Field>
        <Field>
          <FieldLabel htmlFor="note">Anything else? (optional)</FieldLabel>
          <Textarea id="note" name="note" maxLength={1000} rows={3} placeholder="Colour, trim, engine size, how soon you need it…" />
        </Field>
        {/* Honeypot: people never see it, form-filling bots do. */}
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />
        {status.kind === "error" && (
          <p role="alert" className="text-sm text-destructive">
            {status.message}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button type="submit" size="lg" disabled={status.kind === "sending"} className="h-12 bg-brand px-6 text-base text-white hover:bg-brand/90">
            {status.kind === "sending" ? "Sending…" : "Send request"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Rather talk? <a href={tel(yards[0].phones[0])} className="text-foreground underline underline-offset-4">Call Calgary</a>
          </p>
        </div>
      </FieldGroup>
    </form>
  );
}
