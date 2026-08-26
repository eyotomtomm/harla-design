import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, readJson, pick, badRequest, dbError } from '@/lib/require-admin';
import { defaultAbout } from '@/data/about';

const FIELDS = ['homeHeading', 'heading', 'intro', 'intro2', 'mission', 'vision', 'vision2', 'story', 'bannerImage', 'aboutImage', 'hoverImage'];

export async function GET() {
  try {
    const row = await prisma.aboutPage.findFirst();
    return NextResponse.json(row ?? { ...defaultAbout, id: null });
  } catch {
    return dbError();
  }
}

export async function PUT(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = await readJson(request);
  if (!body) return badRequest('Invalid JSON');
  const data = pick(body, FIELDS);
  try {
    const existing = await prisma.aboutPage.findFirst();
    const row = existing
      ? await prisma.aboutPage.update({ where: { id: existing.id }, data })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : await prisma.aboutPage.create({ data: { ...defaultAbout, ...(data as any) } });
    return NextResponse.json(row);
  } catch {
    return dbError();
  }
}
