import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || "587");
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || smtpUser;
const emailTo = process.env.EMAIL_TO || smtpUser;

if (!smtpHost || !smtpUser || !smtpPass) {
  throw new Error("Missing SMTP environment variables");
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name = "",
      email = "",
      message = "",
      company = "",
    } = body as {
      name?: string;
      email?: string;
      message?: string;
      company?: string;
    };

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (company) {
      return NextResponse.json(
        { success: true, message: "Message received" },
        { status: 200 }
      );
    }

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (
      cleanName.length > 100 ||
      cleanEmail.length > 200 ||
      cleanMessage.length > 5000
    ) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br>");

    // Email to you
    const result = await transporter.sendMail({
      from: smtpFrom,
      to: emailTo,
      replyTo: cleanEmail,
      subject: `New contact form submission from ${cleanName}`,
      text: `
New Contact Form Submission

From: ${cleanName}
Email: ${cleanEmail}

Message:
${cleanMessage}
      `.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
          <h2 style="margin-bottom:16px;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <div style="padding:12px;border:1px solid #ddd;border-radius:8px;background:#fafafa;">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", result.messageId);

    // Auto-response to the user
    await transporter.sendMail({
      from: smtpFrom,
      to: cleanEmail,
      subject: `Hi ${cleanName}, we received your message`,
      text: `
Hi ${cleanName},

We received your message and will get back to you as soon as possible.

Your message:
${cleanMessage}

This is an automated response.
      `.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
          <h2 style="margin-bottom:16px;">Thanks for reaching out 👋</h2>
          <p>Hi ${safeName},</p>
          <p>We’ve received your message and will get back to you as soon as possible.</p>
          <div style="padding:12px;border:1px solid #ddd;border-radius:8px;background:#fafafa;margin:16px 0;">
            <strong>Your message:</strong><br><br>
            ${safeMessage}
          </div>
          <p>This is an automated response, so there is no need to reply to this email.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Message received and sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}