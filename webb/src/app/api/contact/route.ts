import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/** Nodemailer kräver Node (inte Edge). */
export const runtime = "nodejs";

const MAX_LEN = {
  name: 200,
  email: 320,
  phone: 80,
  address: 500,
  message: 8000,
} as const;

function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}

function clip(s: string, max: number): string {
  const t = s.trim();
  return t.length > max ? t.slice(0, max) : t;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ogiltig begäran." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Ogiltig begäran." }, { status: 400 });
  }

  const d = body as Record<string, unknown>;
  const name = typeof d.name === "string" ? clip(d.name, MAX_LEN.name) : "";
  const email = typeof d.email === "string" ? clip(d.email, MAX_LEN.email) : "";
  const phone =
    typeof d.phone === "string" ? clip(d.phone, MAX_LEN.phone) : "";
  const address =
    typeof d.address === "string" ? clip(d.address, MAX_LEN.address) : "";
  const message =
    typeof d.message === "string" ? clip(d.message, MAX_LEN.message) : "";

  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !message ||
    !isValidEmail(email)
  ) {
    return NextResponse.json(
      {
        error: "Fyll i alla obligatoriska fält med en giltig e-postadress.",
      },
      { status: 400 }
    );
  }

  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    console.error(
      "contact/route: SMTP_USER eller SMTP_PASS saknas i miljövariabler."
    );
    return NextResponse.json(
      { error: "E-post är inte konfigurerad på servern." },
      { status: 503 }
    );
  }

  const host = process.env.SMTP_HOST?.trim() || "send.one.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  const mailTo =
    process.env.CONTACT_MAIL_TO?.trim() || "info@tradgardsform.se";
  const mailFrom =
    process.env.CONTACT_MAIL_FROM?.trim() || mailTo || smtpUser;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const textLines = [
    `Intresseanmälan via webbplatsen`,
    ``,
    `Namn: ${name}`,
    `E-post (svara till): ${email}`,
    `Telefon: ${phone}`,
    `Adress: ${address}`,
    ``,
    `Meddelande:`,
    message,
  ];

  const subject = `Intresseanmälan via webben — ${name}`;

  try {
    await transporter.sendMail({
      from: `Trädgårdsform <${mailFrom}>`,
      to: mailTo,
      replyTo: email,
      subject,
      text: textLines.join("\n"),
    });
  } catch (err) {
    console.error("contact/route: SMTP error", err);
    return NextResponse.json(
      { error: "E-postmeddelandet kunde inte skickas. Försök igen senare." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
