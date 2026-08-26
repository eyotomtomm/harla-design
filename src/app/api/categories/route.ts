import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, readJson, badRequest, dbError } from '@/lib/require-admin';

export async function GET() {
  try {
    const categories = await prisma.projectCategory.findMany();
    return NextResponse.json({ projectCategories: categories });
  } catch {
    return dbError();
  }
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await readJson(request);
  if (!body) return badRequest('Invalid JSON');
  const { name, slug } = body;
  if (typeof name !== 'string' || typeof slug !== 'string' || !name.trim() || !slug.trim()) {
    return badRequest('name and slug are required');
  }
  try {
    const category = await prisma.projectCategory.create({ data: { name: name.trim(), slug: slug.trim() } });
    return NextResponse.json(category, { status: 201 });
  } catch {
    return dbError();
  }
}
