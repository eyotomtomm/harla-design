'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
  sortOrder: number;
}

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', description: '', featuredImage: '', sortOrder: 0 });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/projects');
    setItems(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ title: '', slug: '', description: '', featuredImage: '', sortOrder: 0 });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    await fetch('/api/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const startEdit = (item: Project) => {
    setEditing(item);
    setForm({ title: item.title, slug: item.slug, description: item.description, featuredImage: item.featuredImage, sortOrder: item.sortOrder });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Projects</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ title: '', slug: '', description: '', featuredImage: '', sortOrder: 0 }); }}>Add New</button>
      </div>

      <div className="admin-card">
        <h3>{editing ? 'Edit Project' : 'Add Project'}</h3>
        <div className="admin-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Slug</label>
            <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <ImageUpload label="Featured Image" value={form.featuredImage} onChange={url => setForm(f => ({ ...f, featuredImage: url }))} />
          <div className="form-group">
            <label>Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} />
          </div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>

      <div className="admin-card">
        <h3>All Projects</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Image</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.slug}</td>
                <td><img src={item.featuredImage} alt="" style={{ width: 60, height: 40, objectFit: 'cover' }} /></td>
                <td>{item.sortOrder}</td>
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
