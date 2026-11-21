import { describe, expect, it } from "vitest";
import { parsePartRequest, partRequestEmail } from "./part-request";

const good = {
  yard: "regina",
  year: "2014",
  make: "Ford",
  model: "F-150",
  part: "Driver side mirror",
  vin: "",
  name: "Sam",
  phone: "306-555-0100",
  email: "",
  note: "",
};

describe("parsePartRequest", () => {
  it("accepts a normal request and finds the yard", () => {
    expect(parsePartRequest(good)?.yard.city).toBe("Regina");
  });

  it.each([
    ["unknown yard", { yard: "edmonton" }],
    ["bad year", { year: "14" }],
    ["missing part", { part: "  " }],
    ["bad phone", { phone: "call me" }],
    ["short VIN", { vin: "123" }],
    ["bad email", { email: "nope" }],
    ["too long", { note: "x".repeat(1001) }],
    ["bot filled the honeypot", { company: "Acme" }],
  ])("rejects %s", (_, patch) => {
    expect(parsePartRequest({ ...good, ...patch })).toBeNull();
  });

  it("rejects junk bodies", () => {
    expect(parsePartRequest(null)).toBeNull();
    expect(parsePartRequest("hello")).toBeNull();
  });
});

describe("partRequestEmail", () => {
  it("escapes whatever the customer typed", () => {
    const r = parsePartRequest({ ...good, name: '<img src=x onerror="alert(1)">', note: "a\nb" })!;
    const { html, subject } = partRequestEmail(r);
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
    expect(html).toContain("a<br>b");
    expect(subject).toBe("Part request: Driver side mirror for a 2014 Ford F-150");
  });
});
