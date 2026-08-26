'use client';
import { useEffect, useState } from 'react';
import { submitJson, StatusMessage, type SaveState } from '@/components/admin/useAdminList';

interface Category { id: number; name: string; slug: string; }

export default function CategoriesAdmin() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '' });
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/categories', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setItems(Array.isArray(data?.projectCategories) ? data.projectCategories : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => void load(), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    const result = await submitJson('/api/categories', 'POST', form);
    setStatus(result);
    if (result.kind === 'success') {
      setForm({ name: '', slug: '' });
      void load();
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1>Project Categories</h1>
      </div>
      <div className="admin-card">
        <h3>Add Category</h3>
        <div className="admin-form">
          <div className="form-group"><label htmlFor="cat-name">Name</label><input id="cat-name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="cat-slug">Slug</label><input id="cat-slug" type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></div>
          <button className="admin-btn primary" onClick={handleSave} disabled={!form.name || !form.slug}>Create</button>
          <StatusMessage state={status} />
        </div>
      </div>
      <div className="admin-card">
        <h3>All Categories</h3>
        {loading ? <p className="admin-muted">Loading…</p> : error ? <p className="admin-alert error" role="alert">{error}</p> : items.length === 0 ? <p className="admin-muted">No categories yet.</p> : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Slug</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}><td>{item.name}</td><td>{item.slug}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
