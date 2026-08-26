'use client';
import { useEffect, useState } from 'react';
import { submitJson, StatusMessage, type SaveState } from '@/components/admin/useAdminList';

const FIELDS = [
  { key: 'siteName', label: 'Site name' },
  { key: 'contactPhone', label: 'Phone' },
  { key: 'contactEmail', label: 'Email' },
  { key: 'contactAddress', label: 'Address line 1' },
  { key: 'contactAddress2', label: 'Address line 2' },
  { key: 'footerText1', label: 'Footer headline — wrap the italic word in *asterisks*' },
  { key: 'footerText2', label: 'Footer second line (starts with “Get in touch” to keep the link)' },
  { key: 'copyrightText', label: 'Copyright text (leave empty for the automatic year)' },
  { key: 'socialInstagram', label: 'Instagram URL' },
  { key: 'socialSpotify', label: 'Spotify show URL' },
  { key: 'socialSubstack', label: 'Substack URL' },
];

export default function SettingsAdmin() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then(async r => {
        if (!r.ok) throw new Error(`Request failed (${r.status})`);
        const data = await r.json();
        const next: Record<string, string> = {};
        for (const f of FIELDS) if (typeof data?.[f.key] === 'string') next[f.key] = data[f.key];
        setForm(next);
      })
      .catch(err => setLoadError(err instanceof Error ? err.message : 'Could not load settings'));
  }, []);

  const handleSave = async () => {
    setStatus(await submitJson('/api/settings', 'PUT', form));
  };

  return (
    <>
      <div className="admin-header">
        <h1>Site settings</h1>
        <button className="admin-btn primary" onClick={handleSave}>Save changes</button>
      </div>
      <p className="admin-alert success">These values appear in the site footer (contact block, CTA and copyright line).</p>
      {loadError && <p className="admin-alert error" role="alert">{loadError}</p>}
      <StatusMessage state={status} />
      <div className="admin-card">
        <div className="admin-form">
          {FIELDS.map(f => (
            <div className="form-group" key={f.key}>
              <label htmlFor={`set-${f.key}`}>{f.label}</label>
              <input id={`set-${f.key}`} type="text" value={form[f.key] || ''} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
