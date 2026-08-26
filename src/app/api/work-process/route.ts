import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, readJson, pick, badRequest, dbError, idFrom } from '@/lib/require-admin';

const FIELDS = ['stepNumber', 'title', 'description'];

export async function GET() {
  try {
    return NextResponse.json(await prisma.workProcessStep.findMany({ orderBy: { stepNumber: 'asc' } }));
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
  if (typeof data.stepNumber !== 'number' || !data.title || !data.description) {
    return badRequest('stepNumber, title and description are required');
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(await prisma.workProcessStep.create({ data: data as any }), { status: 201 });
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
    return NextResponse.json(await prisma.workProcessStep.update({ where: { id }, data: pick(body, FIELDS) }));
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
    await prisma.workProcessStep.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return dbError();
  }
}
