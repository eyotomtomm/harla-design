'use client';
import { useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { useAdminList, submitJson, StatusMessage, ListState, type SaveState } from '@/components/admin/useAdminList';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
  location: string | null;
  sortOrder: number;
}
const EMPTY = { title: '', slug: '', description: '', featuredImage: '', location: '', sortOrder: 0 };

export default function ProjectsAdmin() {
  const { items, loading, error, refresh } = useAdminList<Project>('/api/projects');
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  const handleSave = async () => {
    const result = await submitJson('/api/projects', editing ? 'PUT' : 'POST', editing ? { id: editing.id, ...form } : form);
    setStatus(result);
    if (result.kind === 'success') {
      setEditing(null);
      setForm(EMPTY);
      void refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    setStatus(await submitJson('/api/projects', 'DELETE', { id }));
    void refresh();
  };

  const startEdit = (item: Project) => {
    setEditing(item);
    setForm({ title: item.title, slug: item.slug, description: item.description, featuredImage: item.featuredImage, location: item.location ?? '', sortOrder: item.sortOrder });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Projects</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm(EMPTY); }}>Add New</button>
      </div>
      <p className="admin-alert error">
        The public gallery currently reads from <code>src/data/projects.ts</code>, not from this list. Entries here are stored but not shown until the gallery is connected.
      </p>
      <div className="admin-card">
        <h3>{editing ? 'Edit Project' : 'Add Project'}</h3>
        <div className="admin-form">
          <div className="form-group"><label htmlFor="pr-title">Client / Title</label><input id="pr-title" type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="pr-slug">Slug</label><input id="pr-slug" type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="pr-desc">Project type / description</label><textarea id="pr-desc" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
          <div className="form-group"><label htmlFor="pr-loc">Location</label><input id="pr-loc" type="text" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
          <ImageUpload value={form.featuredImage} onChange={url => setForm(f => ({ ...f, featuredImage: url }))} label="Image" />
          <div className="form-group"><label htmlFor="pr-order">Sort Order</label><input id="pr-order" type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
          <StatusMessage state={status} />
        </div>
      </div>
      <div className="admin-card">
        <h3>All Projects</h3>
        <ListState loading={loading} error={error} count={items.length} />
        {items.length > 0 && (
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Title</th><th>Location</th><th>Order</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><img src={item.featuredImage} alt="" style={{ width: 60, height: 40, objectFit: 'cover' }} /></td>
                  <td>{item.title}</td>
                  <td>{item.location ?? '—'}</td>
                  <td>{item.sortOrder}</td>
                  <td>
                    <button className="admin-btn small" onClick={() => startEdit(item)}>Edit</button>
                    <button className="admin-btn small danger" style={{ marginLeft: '4px' }} onClick={() => handleDelete(item.id)}>Delete</button>
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
