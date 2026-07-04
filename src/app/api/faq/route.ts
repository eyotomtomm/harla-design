import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  return NextResponse.json(await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } }));
}
export async function POST(request: NextRequest) {
  return NextResponse.json(await prisma.faqItem.create({ data: await request.json() }), { status: 201 });
}
export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  return NextResponse.json(await prisma.faqItem.update({ where: { id }, data }));
}
export async function DELETE(request: NextRequest) {
  await prisma.faqItem.delete({ where: { id: (await request.json()).id } });
  return NextResponse.json({ success: true });
}
