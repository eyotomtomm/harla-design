import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const service = await prisma.service.create({ data });
  return NextResponse.json(service, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  const service = await prisma.service.update({ where: { id }, data });
  return NextResponse.json(service);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
