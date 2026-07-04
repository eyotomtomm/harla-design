'use client';
import { useState, useEffect } from 'react';

export default function AboutAdmin() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/about').then(r => r.json()).then(setForm).catch(() => {});
  }, []);

  const handleSave = async () => {
    const { id, createdAt, updatedAt, ...data } = form;
    await fetch('/api/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: 'heading', label: 'Heading' },
    { key: 'whoWeAre', label: 'Who We Are', textarea: true },
    { key: 'mission', label: 'Mission', textarea: true },
    { key: 'vision', label: 'Vision', textarea: true },
    { key: 'bannerImage', label: 'Banner Image URL' },
    { key: 'bannerImageLight', label: 'Banner Image Light URL' },
  ];

  return (
    <>
      <div className="admin-header">
        <h1>About Page</h1>
        <button className="admin-btn primary" onClick={handleSave}>
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
      <div className="admin-card">
        <div className="admin-form">
          {fields.map(f => (
            <div className="form-group" key={f.key}>
              <label>{f.label}</label>
              {f.textarea ? (
                <textarea value={form[f.key] || ''} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} rows={4} />
              ) : (
                <input type="text" value={form[f.key] || ''} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
