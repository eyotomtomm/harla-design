'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: 'fa-tachometer-alt' },
  { href: '/admin/gallery', label: 'Projects gallery', icon: 'fa-images' },
  { href: '/admin/categories', label: 'Gallery rows', icon: 'fa-tags' },
  { href: '/admin/approach', label: 'Our approach', icon: 'fa-compass' },
  { href: '/admin/about', label: 'About copy', icon: 'fa-info-circle' },
  { href: '/admin/work-process', label: 'Process steps', icon: 'fa-tasks' },
  { href: '/admin/messages', label: 'Messages', icon: 'fa-envelope' },
  { href: '/admin/settings', label: 'Settings', icon: 'fa-cog' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  return (
    <>
      <button
        type="button"
        className="admin-menu-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="admin-sidebar"
        onClick={() => setOpen(o => !o)}
      >
        <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
      </button>
      {open && <div className="admin-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
      <aside id="admin-sidebar" className={`admin-sidebar${open ? ' open' : ''}`}>
        <div className="logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/images/logos/logo-dark.png" alt="" style={{ height: '35px', width: 'auto' }} />
            <span style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 200, fontSize: '18px', letterSpacing: '3px', color: '#FFFFFF' }}>Harla Design</span>
          </Link>
        </div>
        <nav aria-label="Admin">
          <ul>
            {sidebarLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive(link.href) ? 'active' : undefined}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <i className={`fas ${link.icon}`} aria-hidden="true"></i>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button type="button" className="admin-signout" onClick={() => signOut({ callbackUrl: '/admin/login' })}>
                <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
