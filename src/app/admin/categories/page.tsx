'use client';
import { useState } from 'react';
import { useAdminList, submitJson, StatusMessage, ListState, type SaveState } from '@/components/admin/useAdminList';

interface Category { id: number; name: string; slug: string; description: string; sortOrder: number; _count?: { images: number }; }
const EMPTY = { name: '', slug: '', description: '', sortOrder: 0 };
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function CategoriesAdmin() {
  const { items, loading, error, refresh } = useAdminList<Category>('/api/categories');
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  const handleSave = async () => {
    const result = await submitJson('/api/categories', editing ? 'PUT' : 'POST', editing ? { id: editing.id, ...form } : form);
    setStatus(result);
    if (result.kind === 'success') {
      setEditing(null);
      setForm(EMPTY);
      void refresh();
    }
  };

  const handleDelete = async (item: Category) => {
    const n = item._count?.images ?? 0;
    if (!confirm(n > 0 ? `Delete “${item.name}” and its ${n} image(s)?` : `Delete “${item.name}”?`)) return;
    setStatus(await submitJson('/api/categories', 'DELETE', { id: item.id }));
    void refresh();
  };

  const startEdit = (item: Category) => {
    setEditing(item);
    setForm({ name: item.name, slug: item.slug, description: item.description, sortOrder: item.sortOrder });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Gallery rows</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm(EMPTY); }}>Add row</button>
      </div>
      <p className="admin-alert success">Rows are the category headings on the Projects page (Lifestyle, Institutions, …), shown in sort order.</p>
      <div className="admin-card">
        <h3>{editing ? 'Edit row' : 'Add row'}</h3>
        <div className="admin-form">
          <div className="form-group"><label htmlFor="cat-name">Name</label><input id="cat-name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: editing ? f.slug : slugify(e.target.value) }))} /></div>
          <div className="form-group"><label htmlFor="cat-slug">Slug (used in the page anchor, e.g. /projects#retail)</label><input id="cat-slug" type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))} /></div>
          <div className="form-group"><label htmlFor="cat-desc">One-line description</label><input id="cat-desc" type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="cat-order">Sort order</label><input id="cat-order" type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} /></div>
          <button className="admin-btn primary" onClick={handleSave} disabled={!form.name || !form.slug}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => { setEditing(null); setForm(EMPTY); }}>Cancel</button>}
          <StatusMessage state={status} />
        </div>
      </div>
      <div className="admin-card">
        <h3>All rows</h3>
        <ListState loading={loading} error={error} count={items.length} />
        {items.length > 0 && (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Name</th><th>Slug</th><th>Images</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.sortOrder}</td>
                  <td>{item.name}</td>
                  <td>{item.slug}</td>
                  <td>{item._count?.images ?? '—'}</td>
                  <td>
                    <button className="admin-btn small" onClick={() => startEdit(item)}>Edit</button>
                    <button className="admin-btn small danger" style={{ marginLeft: '4px' }} onClick={() => handleDelete(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
