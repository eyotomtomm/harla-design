'use client';
import { useState, useEffect } from 'react';

interface Category { id: number; name: string; slug: string; }

export default function CategoriesAdmin() {
  const [items, setItems] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', slug: '' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/categories');
    setItems(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/categories', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ name: '', slug: '' });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/categories', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const startEdit = (item: Category) => {
    setEditing(item);
    setForm({ name: item.name, slug: item.slug });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Categories</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ name: '', slug: '' }); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit Category' : 'Add Category'}</h3>
        <div className="admin-form">
          <div className="form-group"><label>Name</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div className="form-group"><label>Slug</label><input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>
      <div className="admin-card">
        <h3>All Categories</h3>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Slug</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                  <button className="admin-btn small" onClick={() => startEdit(item)}>Edit</button>
                  <button className="admin-btn small danger" style={{ marginLeft: '4px' }} onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
