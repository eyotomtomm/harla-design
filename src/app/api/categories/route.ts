import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const [project, blog] = await Promise.all([
    prisma.projectCategory.findMany(),
    prisma.blogCategory.findMany(),
  ]);
  return NextResponse.json({ projectCategories: project, blogCategories: blog });
}
export async function POST(request: NextRequest) {
  const { type, ...data } = await request.json();
  if (type === 'blog') return NextResponse.json(await prisma.blogCategory.create({ data }), { status: 201 });
  return NextResponse.json(await prisma.projectCategory.create({ data }), { status: 201 });
}
