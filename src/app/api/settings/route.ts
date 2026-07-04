import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d96776.56071496992!2d-74.02420878160657!3d40.71212692665102!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1676287097391!5m2!1sen!2sbd', footerText1: 'The greatest architecture & interior design company, best in its industry.' },
    });
  }
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  const existing = await prisma.siteSettings.findFirst();
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const settings = await prisma.siteSettings.update({ where: { id: existing.id }, data });
  return NextResponse.json(settings);
}
