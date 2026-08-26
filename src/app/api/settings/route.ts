import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, readJson, pick, badRequest, dbError } from '@/lib/require-admin';

const FIELDS = ['siteName', 'contactPhone', 'contactEmail', 'contactAddress', 'contactAddress2', 'footerText1', 'footerText2', 'copyrightText', 'socialInstagram', 'socialSpotify', 'socialSubstack'];

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    // Reads never create rows; return an empty object when nothing is configured.
    return NextResponse.json(settings ?? {});
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
    const existing = await prisma.siteSettings.findFirst();
    const settings = existing
      ? await prisma.siteSettings.update({ where: { id: existing.id }, data })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : await prisma.siteSettings.create({ data: data as any });
    return NextResponse.json(settings);
  } catch {
    return dbError();
  }
}
