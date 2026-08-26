'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const SECTIONS = [
  { label: 'Projects', url: '/api/projects', href: '/admin/projects' },
  { label: 'Services', url: '/api/services', href: '/admin/services' },
  { label: 'FAQ items', url: '/api/faq', href: '/admin/faq' },
  { label: 'Process steps', url: '/api/work-process', href: '/admin/work-process' },
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
        <h3>What this admin controls</h3>
        <p style={{ color: '#ccc', marginBottom: 12 }}>
          <strong>Live on the public site:</strong> Work Process steps (home page) and Settings (footer contact details and copyright).
        </p>
        <p style={{ color: '#999' }}>
          Projects, Services, FAQ, About and Categories are stored in the database but the public pages currently
          read their content from code (<code>src/data/projects.ts</code> and the page components). Edits here will not
          appear on the site until those pages are connected.
        </p>
      </div>
    </>
  );
}
