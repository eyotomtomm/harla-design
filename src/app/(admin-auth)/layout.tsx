import type { Metadata } from 'next';
import '@/styles/admin.css';

export const metadata: Metadata = {
  title: 'Admin login | Harla Design',
  robots: { index: false, follow: false },
};

/** Login lives outside the admin shell so the sidebar never shows to signed-out visitors. */
export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
