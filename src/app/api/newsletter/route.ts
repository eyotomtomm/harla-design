import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ message: 'Already subscribed' });
    await prisma.newsletterSubscriber.create({ data: { email } });
    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
