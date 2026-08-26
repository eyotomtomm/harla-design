import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, readJson, pick, badRequest, dbError, idFrom } from '@/lib/require-admin';

const FIELDS = ['question', 'subtitle', 'answer1', 'answer2', 'sortOrder'];

export async function GET() {
  try {
    return NextResponse.json(await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } }));
  } catch {
    return dbError();
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await readJson(request);
  if (!body) return badRequest('Invalid JSON');
  const data = pick(body, FIELDS);
  if (!data.question || !data.answer1) return badRequest('question and answer1 are required');
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(await prisma.faqItem.create({ data: data as any }), { status: 201 });
  } catch {
    return dbError();
  }
}

export async function PUT(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await readJson(request);
  const id = idFrom(body);
  if (!body || id === null) return badRequest('A numeric id is required');
  try {
    return NextResponse.json(await prisma.faqItem.update({ where: { id }, data: pick(body, FIELDS) }));
  } catch {
    return dbError();
  }
}

export async function DELETE(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const id = idFrom(await readJson(request));
  if (id === null) return badRequest('A numeric id is required');
  try {
    await prisma.faqItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return dbError();
  }
}
