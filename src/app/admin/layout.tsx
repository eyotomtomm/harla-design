import type { Metadata } from 'next';
import '@/styles/admin.css';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Harla Design Admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content" id="main">
        {children}
      </main>
    </div>
  );
}
