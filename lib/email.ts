import { Resend } from "resend";
import { site } from "@/lib/site-config";

/** Resend-backed form email delivery. */

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function istNow(): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

export interface ClinicEmailRow {
  label: string;
  value: string;
}

/**
 * Branded clinic notification email: alert top line, field table, tel/wa.me
 * links, source page, IST timestamp, exact consent text + time.
 */
function clinicEmailHtml(opts: {
  subject: string;
  rows: ClinicEmailRow[];
  phone: string;
  sourcePage: string;
  consentText: string;
}): string {
  const waDigits = opts.phone.replace(/\D/g, "");
  const waMsg = encodeURIComponent(
    "Hello, this is Niramay Clinics about your appointment request."
  );
  const rows = opts.rows
    .map(
      (r) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;font-size:14px;vertical-align:top">${esc(
          r.label
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px">${esc(
          r.value
        )}</td></tr>`
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#f6f4f8;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:560px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e0ea">
  <div style="background:#734569;color:#fff;padding:16px 20px;font-size:16px;font-weight:bold">${esc(opts.subject)}</div>
  <div style="padding:12px 20px;background:#fff4e5;color:#7a4b00;font-size:14px;border-bottom:1px solid #eee">
    Online request. Not yet confirmed. Please call or WhatsApp to confirm.
  </div>
  <table style="width:100%;border-collapse:collapse">${rows}</table>
  <div style="padding:16px 20px;font-size:14px">
    <a href="tel:${esc(opts.phone)}" style="color:#734569;font-weight:bold">Call ${esc(opts.phone)}</a>
    &nbsp;·&nbsp;
    <a href="https://wa.me/${waDigits}?text=${waMsg}" style="color:#734569;font-weight:bold">WhatsApp the requester</a>
  </div>
  <div style="padding:0 20px 16px;font-size:12.5px;color:#777">
    Source page: ${esc(opts.sourcePage)}<br>
    Received: ${esc(istNow())} (IST)<br>
    Consent text shown: "${esc(opts.consentText)}" - agreed ${esc(istNow())} (IST)
  </div>
</div></body></html>`;
}

function clinicEmailText(opts: {
  subject: string;
  rows: ClinicEmailRow[];
  phone: string;
  sourcePage: string;
  consentText: string;
}): string {
  const lines = opts.rows.map((r) => `${r.label}: ${r.value}`).join("\n");
  return [
    opts.subject,
    "",
    "Online request. Not yet confirmed. Please call or WhatsApp to confirm.",
    "",
    lines,
    "",
    `Call: ${opts.phone}`,
    `WhatsApp: https://wa.me/${opts.phone.replace(/\D/g, "")}`,
    `Source page: ${opts.sourcePage}`,
    `Received: ${istNow()} (IST)`,
    `Consent text shown: "${opts.consentText}" - agreed ${istNow()} (IST)`,
  ].join("\n");
}

export interface SendResult {
  ok: boolean;
  error?: string;
}

export async function sendClinicEmail(opts: {
  subject: string;
  rows: ClinicEmailRow[];
  phone: string;
  sourcePage: string;
  consentText: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FORM_TO_EMAIL || site.email;
  const from = process.env.FORM_FROM_EMAIL || "Niramay Clinics <onboarding@resend.dev>";
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY is not set" };
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    subject: opts.subject,
    html: clinicEmailHtml(opts),
    text: clinicEmailText(opts),
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Workshop requester acknowledgement (plain, no medical content). */
export async function sendWorkshopAck(opts: {
  to: string;
  organisation: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORM_FROM_EMAIL || "Niramay Clinics <onboarding@resend.dev>";
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY is not set" };
  const resend = new Resend(apiKey);
  const subject = "We received your workshop request. Niramay Clinics";
  const text = [
    `Thank you for your workshop request from ${opts.organisation}.`,
    "We will contact you within 2 working days.",
    "",
    `Niramay Clinics, Dhantoli, Nagpur`,
    `Phone: ${site.phone.display} or ${site.mobile.display}`,
  ].join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#f6f4f8;font-family:Arial,Helvetica,sans-serif">
<div style="max-width:560px;margin:24px auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e0ea;font-size:14px;color:#333">
  <p>Thank you for your workshop request from <strong>${esc(opts.organisation)}</strong>.</p>
  <p>We will contact you within 2 working days.</p>
  <p style="color:#777">Niramay Clinics, Dhantoli, Nagpur<br>Phone: ${esc(site.phone.display)} or ${esc(site.mobile.display)}</p>
</div></body></html>`;
  const { error } = await resend.emails.send({ from, to: opts.to, subject, html, text });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
