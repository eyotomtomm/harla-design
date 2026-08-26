'use client';
import { useEffect, useState } from 'react';
import { submitJson, StatusMessage, type SaveState } from '@/components/admin/useAdminList';

const FIELDS = [
  { key: 'heading', label: 'Heading' },
  { key: 'whoWeAre', label: 'Who We Are', textarea: true },
  { key: 'mission', label: 'Mission', textarea: true },
  { key: 'vision', label: 'Vision', textarea: true },
  { key: 'bannerImage', label: 'Banner Image URL' },
];

export default function AboutAdmin() {
  const [pageId, setPageId] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  useEffect(() => {
    fetch('/api/about', { cache: 'no-store' })
      .then(async r => {
        if (!r.ok) throw new Error(`Request failed (${r.status})`);
        const data = await r.json();
        const page = data?.page;
        if (!page) throw new Error('No About page row exists yet — run the database seed first.');
        setPageId(page.id);
        const next: Record<string, string> = {};
        for (const f of FIELDS) if (typeof page[f.key] === 'string') next[f.key] = page[f.key];
        setForm(next);
      })
      .catch(err => setLoadError(err instanceof Error ? err.message : 'Could not load the About page'));
  }, []);

  const handleSave = async () => {
    if (pageId === null) return;
    setStatus(await submitJson('/api/about', 'PUT', { type: 'page', id: pageId, ...form }));
  };

  return (
    <>
      <div className="admin-header">
        <h1>About Page</h1>
        <button className="admin-btn primary" onClick={handleSave} disabled={pageId === null}>Save Changes</button>
      </div>
      <p className="admin-alert error">The public About page currently reads its copy from code; edits here are stored but not shown until it is connected.</p>
      {loadError && <p className="admin-alert error" role="alert">{loadError}</p>}
      <StatusMessage state={status} />
      <div className="admin-card">
        <div className="admin-form">
          {FIELDS.map(f => (
            <div className="form-group" key={f.key}>
              <label htmlFor={`about-${f.key}`}>{f.label}</label>
              {f.textarea ? (
                <textarea id={`about-${f.key}`} value={form[f.key] || ''} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} rows={4} />
              ) : (
                <input id={`about-${f.key}`} type="text" value={form[f.key] || ''} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
