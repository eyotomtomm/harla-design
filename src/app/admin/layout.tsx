import '@/styles/admin.css';
import Link from 'next/link';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: 'fa-tachometer-alt' },
  { href: '/admin/hero-slides', label: 'Hero Slides', icon: 'fa-images' },
  { href: '/admin/about', label: 'About', icon: 'fa-info-circle' },
  { href: '/admin/services', label: 'Services', icon: 'fa-cogs' },
  { href: '/admin/projects', label: 'Projects', icon: 'fa-project-diagram' },
  { href: '/admin/blog-posts', label: 'Blog Posts', icon: 'fa-blog' },
  { href: '/admin/team', label: 'Team', icon: 'fa-users' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: 'fa-quote-left' },
  { href: '/admin/faq', label: 'FAQ', icon: 'fa-question-circle' },
  { href: '/admin/work-process', label: 'Work Process', icon: 'fa-tasks' },
  { href: '/admin/categories', label: 'Categories', icon: 'fa-tags' },
  { href: '/admin/settings', label: 'Settings', icon: 'fa-cog' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/images/logos/logo-dark.png" alt="Harla" style={{ height: '35px', width: 'auto' }} />
            <span style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 200, fontSize: '18px', letterSpacing: '3px', color: '#C9A84C' }}>Harla</span>
          </Link>
        </div>
        <nav>
          <ul>
            {sidebarLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href}>
                  <i className={`fas ${link.icon}`}></i>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/api/auth/signout">
                <i className="fas fa-sign-out-alt"></i>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
