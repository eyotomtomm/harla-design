import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const { postId, name, email, content, parentId } = await request.json();
  if (!postId || !name || !email || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const comment = await prisma.comment.create({
    data: { postId, name, email, content, parentId: parentId || null },
  });
  return NextResponse.json(comment, { status: 201 });
}
