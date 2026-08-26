import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const LIMITS = { name: 120, organisation: 160, email: 200, message: 4000 };
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory cap
  return recent.length > RATE_MAX;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const name = clean(body.name, LIMITS.name);
  const organisation = clean(body.organisation, LIMITS.organisation);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const text = [
        `Name: ${name}`,
        `Organisation: ${organisation || 'Not provided'}`,
        `Email: ${email}`,
        '',
        message,
      ].join('\n');
      await transporter.sendMail({
        from: `"Harla Design Website" <${process.env.SMTP_USER}>`,
        to: 'contact@harladesign.com',
        replyTo: email,
        subject: `New contact form submission from ${name}`,
        text,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Organisation:</strong> ${escapeHtml(organisation || 'Not provided')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `,
      });
    }

    // Store a copy (optional — the DB may not be available).
    try {
      const prisma = (await import('@/lib/prisma')).default;
      await prisma.contactSubmission.create({
        data: { name, organisation: organisation || null, email, message },
      });
    } catch {
      // DB not available — the email was already sent.
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send your message.' }, { status: 500 });
  }
}
