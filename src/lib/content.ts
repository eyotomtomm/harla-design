/**
 * Server-side content loaders. Each one reads from the database and falls
 * back to the defaults in src/data when the database is not configured or
 * the table is empty — so the public site always renders.
 */
import 'server-only';
import { databaseUrl } from '@/lib/prisma';
import { projectCategories as defaultGallery, type ProjectCategory } from '@/data/projects';
import { defaultApproach, type ApproachItem } from '@/data/approach';
import { defaultAbout, type AboutCopy } from '@/data/about';
import { defaultWorkSteps, type ProcessStep } from '@/data/process';
import type { FooterSettings } from '@/components/layout/Footer';

async function db() {
  if (!databaseUrl()) return null;
  try {
    return (await import('@/lib/prisma')).default;
  } catch {
    return null;
  }
}

export async function getGallery(): Promise<ProjectCategory[]> {
  const prisma = await db();
  if (!prisma) return defaultGallery;
  try {
    const rows = await prisma.projectCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });
    if (rows.length === 0) return defaultGallery;
    return rows.map(cat => ({
      id: cat.slug,
      title: cat.name,
      description: cat.description,
      items: cat.images.map(img => ({
        client: img.client,
        type: img.type,
        location: img.location ?? undefined,
        image: img.image,
        alt: img.alt || `${img.client} — ${img.type}`,
      })),
    }));
  } catch {
    return defaultGallery;
  }
}

export async function getApproach(): Promise<ApproachItem[]> {
  const prisma = await db();
  if (!prisma) return defaultApproach;
  try {
    const rows = await prisma.approachItem.findMany({ orderBy: { sortOrder: 'asc' } });
    return rows.length ? rows.map(r => ({ title: r.title, description: r.description, icon: r.icon, link: r.link })) : defaultApproach;
  } catch {
    return defaultApproach;
  }
}

export async function getAbout(): Promise<AboutCopy> {
  const prisma = await db();
  if (!prisma) return defaultAbout;
  try {
    const row = await prisma.aboutPage.findFirst();
    return row ?? defaultAbout;
  } catch {
    return defaultAbout;
  }
}

export async function getWorkSteps(): Promise<ProcessStep[]> {
  const prisma = await db();
  if (!prisma) return defaultWorkSteps;
  try {
    const rows = await prisma.workProcessStep.findMany({ orderBy: { stepNumber: 'asc' } });
    return rows.length ? rows : defaultWorkSteps;
  } catch {
    return defaultWorkSteps;
  }
}

export async function getSettings(): Promise<FooterSettings | undefined> {
  const prisma = await db();
  if (!prisma) return undefined;
  try {
    const row = await prisma.siteSettings.findFirst();
    return row ?? undefined;
  } catch {
    return undefined;
  }
}
