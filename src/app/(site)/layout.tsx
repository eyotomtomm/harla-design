import SiteShell from '@/components/layout/SiteShell';
import { getSettings } from '@/lib/content';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return <SiteShell settings={settings}>{children}</SiteShell>;
}
