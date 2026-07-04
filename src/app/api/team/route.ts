import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  return NextResponse.json(await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } }));
}
export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json(await prisma.teamMember.create({ data }), { status: 201 });
}
export async function PUT(request: NextRequest) {
  const { id, ...data } = await request.json();
  return NextResponse.json(await prisma.teamMember.update({ where: { id }, data }));
}
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
