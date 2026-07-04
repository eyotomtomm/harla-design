'use client';
import { useState, useEffect } from 'react';

export default function SettingsAdmin() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setForm);
  }, []);

  const handleSave = async () => {
    const { id, createdAt, updatedAt, ...data } = form;
    await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: 'siteName', label: 'Site Name' },
    { key: 'contactPhone', label: 'Phone' },
    { key: 'contactEmail', label: 'Email' },
    { key: 'contactAddress', label: 'Address Line 1' },
    { key: 'contactAddress2', label: 'Address Line 2' },
    { key: 'copyrightText', label: 'Copyright Text' },
    { key: 'socialFacebook', label: 'Facebook URL' },
    { key: 'socialInstagram', label: 'Instagram URL' },
    { key: 'socialLinkedin', label: 'LinkedIn URL' },
    { key: 'socialDribbble', label: 'Dribbble URL' },
  ];

  return (
    <>
      <div className="admin-header">
        <h1>Site Settings</h1>
        <button className="admin-btn primary" onClick={handleSave}>
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
      <div className="admin-card">
        <div className="admin-form">
          {fields.map(f => (
            <div className="form-group" key={f.key}>
              <label>{f.label}</label>
              <input type="text" value={form[f.key] || ''} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
