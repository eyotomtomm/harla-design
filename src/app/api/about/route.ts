import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const [tabs, page] = await Promise.all([
    prisma.aboutTab.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aboutPage.findFirst(),
  ]);
  return NextResponse.json({ tabs, page });
}

export async function PUT(request: NextRequest) {
  const { type, id, ...data } = await request.json();
  if (type === 'tab') {
    return NextResponse.json(await prisma.aboutTab.update({ where: { id }, data }));
  }
  if (type === 'page') {
    return NextResponse.json(await prisma.aboutPage.update({ where: { id }, data }));
  }
  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}
