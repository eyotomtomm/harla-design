import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({ include: { categories: true, images: true }, orderBy: { sortOrder: 'asc' } });
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const { categoryIds, ...data } = await request.json();
  const project = await prisma.project.create({
    data: { ...data, categories: categoryIds ? { connect: categoryIds.map((id: number) => ({ id })) } : undefined },
    include: { categories: true },
  });
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { id, categoryIds, ...data } = await request.json();
  const project = await prisma.project.update({
    where: { id },
    data: { ...data, categories: categoryIds ? { set: categoryIds.map((cid: number) => ({ id: cid })) } : undefined },
    include: { categories: true },
  });
  return NextResponse.json(project);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
