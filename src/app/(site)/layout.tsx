import SiteShell from '@/components/layout/SiteShell';
import type { FooterSettings } from '@/components/layout/Footer';

async function loadSettings(): Promise<FooterSettings | undefined> {
  try {
    const prisma = (await import('@/lib/prisma')).default;
    const row = await prisma.siteSettings.findFirst();
    if (!row) return undefined;
    return {
      contactAddress: row.contactAddress,
      contactAddress2: row.contactAddress2,
      contactPhone: row.contactPhone,
      contactEmail: row.contactEmail,
      socialInstagram: row.socialInstagram,
      footerText1: row.footerText1,
      footerText2: row.footerText2,
      copyrightText: row.copyrightText,
    };
  } catch {
    return undefined; // no database configured — the footer uses its defaults
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await loadSettings();
  return <SiteShell settings={settings}>{children}</SiteShell>;
}
