import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, readJson, pick, badRequest, dbError, idFrom } from '@/lib/require-admin';

const TAB_FIELDS = ['tabLabel', 'paragraph1', 'paragraph2', 'bigImage', 'smallImage', 'sortOrder'];
const PAGE_FIELDS = ['heading', 'whoWeAre', 'whoWeAre2', 'mission', 'mission2', 'vision', 'vision2', 'bannerImage', 'bannerImageLight', 'aboutImage', 'hoverImage'];

export async function GET() {
  try {
    const [tabs, page] = await Promise.all([
      prisma.aboutTab.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.aboutPage.findFirst(),
    ]);
    return NextResponse.json({ tabs, page });
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
    if (body.type === 'tab') {
      return NextResponse.json(await prisma.aboutTab.update({ where: { id }, data: pick(body, TAB_FIELDS) }));
    }
    if (body.type === 'page') {
      return NextResponse.json(await prisma.aboutPage.update({ where: { id }, data: pick(body, PAGE_FIELDS) }));
    }
    return badRequest('type must be "tab" or "page"');
  } catch {
    return dbError();
  }
}
