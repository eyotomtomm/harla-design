import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json(slides);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const slide = await prisma.heroSlide.create({ data });
  return NextResponse.json(slide, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  const slide = await prisma.heroSlide.update({ where: { id }, data });
  return NextResponse.json(slide);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.heroSlide.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
