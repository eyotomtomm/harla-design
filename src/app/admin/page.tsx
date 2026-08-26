'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const SECTIONS = [
  { label: 'Gallery images', url: '/api/gallery', href: '/admin/gallery', where: 'Projects page and home “Selected work”' },
  { label: 'Gallery rows', url: '/api/categories', href: '/admin/categories', where: 'Projects page categories' },
  { label: 'Approach items', url: '/api/approach', href: '/admin/approach', where: 'Home “Our approach”' },
  { label: 'Process steps', url: '/api/work-process', href: '/admin/work-process', where: 'About page “From brief to delivery”' },
  { label: 'Messages', url: '/api/messages', href: '/admin/messages', where: 'Contact form inbox' },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      SECTIONS.map(async s => {
        try {
          const res = await fetch(s.url, { cache: 'no-store' });
          const data = res.ok ? await res.json() : null;
          return [s.label, Array.isArray(data) ? data.length : null] as const;
        } catch {
          return [s.label, null] as const;
        }
      }),
    ).then(entries => {
      if (!cancelled) setCounts(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>
      <div className="admin-stats">
        {SECTIONS.map(s => (
          <Link href={s.href} className="stat-card" key={s.label}>
            <div className="number">{counts[s.label] ?? '—'}</div>
            <div className="label">{s.label}</div>
          </Link>
        ))}
      </div>
      <div className="admin-card">
        <h3>Where each section appears on the site</h3>
        <table className="admin-table">
          <thead><tr><th>Section</th><th>Shown on</th></tr></thead>
          <tbody>
            {SECTIONS.map(s => (
              <tr key={s.label}><td><Link href={s.href}>{s.label}</Link></td><td>{s.where}</td></tr>
            ))}
            <tr><td><Link href="/admin/about">About copy</Link></td><td>Home “Who we are” and the About page</td></tr>
            <tr><td><Link href="/admin/settings">Settings</Link></td><td>Footer contact details, CTA text and copyright</td></tr>
          </tbody>
        </table>
        <p className="admin-muted" style={{ marginTop: 16 }}>
          Changes appear on the public site within a minute. While a table is empty the site shows its built-in defaults.
        </p>
      </div>
    </>
  );
}
