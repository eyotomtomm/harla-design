'use client';
import { useEffect, useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { submitJson, StatusMessage, type SaveState } from '@/components/admin/useAdminList';

const FIELDS: { key: string; label: string; hint?: string; textarea?: boolean; image?: boolean }[] = [
  { key: 'homeHeading', label: 'Home heading', hint: 'Wrap the italic phrase in *asterisks*' },
  { key: 'intro', label: 'Intro sentence (home + About “Who we are”)', textarea: true },
  { key: 'heading', label: 'About page heading', hint: 'Wrap the italic phrase in *asterisks*' },
  { key: 'intro2', label: 'Who we are — second paragraph', textarea: true },
  { key: 'mission', label: 'Mission', textarea: true },
  { key: 'vision', label: 'Vision', textarea: true },
  { key: 'vision2', label: 'Vision — closing line' },
  { key: 'story', label: 'About tab on home (paragraphs separated by a blank line)', textarea: true },
  { key: 'bannerImage', label: 'About page banner image', image: true },
  { key: 'aboutImage', label: 'About page main image', image: true },
  { key: 'hoverImage', label: 'About page hover image', image: true },
];

export default function AboutAdmin() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  useEffect(() => {
    fetch('/api/about', { cache: 'no-store' })
      .then(async r => {
        if (!r.ok) throw new Error(`Request failed (${r.status})`);
        const data = await r.json();
        const next: Record<string, string> = {};
        for (const f of FIELDS) if (typeof data?.[f.key] === 'string') next[f.key] = data[f.key];
        setForm(next);
      })
      .catch(err => setLoadError(err instanceof Error ? err.message : 'Could not load the About copy'));
  }, []);

  const handleSave = async () => {
    setStatus(await submitJson('/api/about', 'PUT', form));
  };

  return (
    <>
      <div className="admin-header">
        <h1>About copy</h1>
        <button className="admin-btn primary" onClick={handleSave}>Save changes</button>
      </div>
      <p className="admin-alert success">Used by the home page “Who we are” section and the About page.</p>
      {loadError && <p className="admin-alert error" role="alert">{loadError}</p>}
      <StatusMessage state={status} />
      <div className="admin-card">
        <div className="admin-form">
          {FIELDS.map(f => (
            <div className="form-group" key={f.key}>
              {f.image ? (
                <ImageUpload value={form[f.key] || ''} onChange={url => setForm(prev => ({ ...prev, [f.key]: url }))} label={f.label} />
              ) : (
                <>
                  <label htmlFor={`about-${f.key}`}>{f.label}{f.hint ? ` — ${f.hint}` : ''}</label>
                  {f.textarea ? (
                    <textarea id={`about-${f.key}`} value={form[f.key] || ''} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} rows={f.key === 'story' ? 8 : 3} />
                  ) : (
                    <input id={`about-${f.key}`} type="text" value={form[f.key] || ''} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
