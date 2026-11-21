import { Resend } from "resend";
import { parsePartRequest, partRequestEmail } from "@/lib/part-request";

// shortcut: no rate limit, only the honeypot. Add an Upstash counter (like Arson Wraps) before launch.
export async function POST(request: Request) {
  const req = parsePartRequest(await request.json().catch(() => null));
  if (!req) return Response.json({ error: "bad-request" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("part request not sent: RESEND_API_KEY missing");
    return Response.json({ error: "not-configured" }, { status: 503 });
  }

  // Demo: PART_REQUEST_TO sends every request to Studio 21. Unset it at launch so each yard gets its own.
  const to = process.env.PART_REQUEST_TO || req.yard.email;
  const { subject, html } = partRequestEmail(req);
  const { error } = await new Resend(key).emails.send({
    from: process.env.EMAIL_FROM || "Power Recycling <onboarding@resend.dev>",
    to,
    replyTo: req.email || undefined,
    subject,
    html,
  });
  if (error) {
    console.error(`part request not sent: ${error.message}`);
    return Response.json({ error: "failed" }, { status: 502 });
  }
  return Response.json({ ok: true, yard: req.yard.city });
}
