import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, readJson, pick, badRequest, dbError, idFrom } from '@/lib/require-admin';

const FIELDS = ['title', 'slug', 'description', 'description2', 'featuredImage', 'projectDate', 'location', 'architect', 'beforeImage', 'afterImage', 'tags', 'sortOrder', 'isFullWidth'];

function categoryIds(body: Record<string, unknown>): number[] | undefined {
  const ids = body.categoryIds;
  if (!Array.isArray(ids)) return undefined;
  return ids.filter((id): id is number => typeof id === 'number' && Number.isInteger(id));
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ include: { categories: true, images: true }, orderBy: { sortOrder: 'asc' } });
    return NextResponse.json(projects);
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
  if (!data.title || !data.slug || !data.description || !data.featuredImage) {
    return badRequest('title, slug, description and featuredImage are required');
  }
  const ids = categoryIds(body);
  try {
    const project = await prisma.project.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { ...(data as any), categories: ids ? { connect: ids.map(id => ({ id })) } : undefined },
      include: { categories: true },
    });
    return NextResponse.json(project, { status: 201 });
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
  const ids = categoryIds(body);
  try {
    const project = await prisma.project.update({
      where: { id },
      data: { ...pick(body, FIELDS), categories: ids ? { set: ids.map(cid => ({ id: cid })) } : undefined },
      include: { categories: true },
    });
    return NextResponse.json(project);
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
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return dbError();
  }
}
