import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.blogPost.findMany({ include: { categories: true, _count: { select: { comments: true } } }, orderBy: { publishedAt: 'desc' } });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const { categoryIds, ...data } = await request.json();
  const post = await prisma.blogPost.create({
    data: { ...data, categories: categoryIds ? { connect: categoryIds.map((id: number) => ({ id })) } : undefined },
    include: { categories: true },
  });
  return NextResponse.json(post, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { id, categoryIds, ...data } = await request.json();
  const post = await prisma.blogPost.update({
    where: { id },
    data: { ...data, categories: categoryIds ? { set: categoryIds.map((cid: number) => ({ id: cid })) } : undefined },
    include: { categories: true },
  });
  return NextResponse.json(post);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
