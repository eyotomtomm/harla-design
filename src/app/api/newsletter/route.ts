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

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // Send notification email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Harla Design Website" <${process.env.SMTP_USER}>`,
        to: 'contact@harladesign.com',
        subject: 'New Newsletter Subscriber',
        html: `<p>New newsletter signup: <strong>${email}</strong></p>`,
      });
    }

    // Try to save to database
    try {
      const prisma = (await import('@/lib/prisma')).default;
      const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
      if (!existing) {
        await prisma.newsletterSubscriber.create({ data: { email } });
      }
    } catch {
      // DB not available — email notification was already sent
    }

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
