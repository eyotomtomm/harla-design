'use client';
import { useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { useAdminList, submitJson, StatusMessage, ListState, type SaveState } from '@/components/admin/useAdminList';

interface Service { id: number; title: string; description: string; icon: string; image: string | null; sortOrder: number; }
const EMPTY = { title: '', description: '', icon: '', image: '', sortOrder: 0 };

export default function ServicesAdmin() {
  const { items, loading, error, refresh } = useAdminList<Service>('/api/services');
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  const handleSave = async () => {
    const result = await submitJson('/api/services', editing ? 'PUT' : 'POST', editing ? { id: editing.id, ...form } : form);
    setStatus(result);
    if (result.kind === 'success') {
      setEditing(null);
      setForm(EMPTY);
      void refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    setStatus(await submitJson('/api/services', 'DELETE', { id }));
    void refresh();
  };

  const startEdit = (item: Service) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, icon: item.icon, image: item.image ?? '', sortOrder: item.sortOrder });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Services</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm(EMPTY); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit Service' : 'Add Service'}</h3>
        <div className="admin-form">
          <div className="form-group"><label htmlFor="svc-title">Title</label><input id="svc-title" type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="svc-desc">Description</label><textarea id="svc-desc" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
          <div className="form-group"><label htmlFor="svc-icon">Icon (Font Awesome class, e.g. fas fa-compass)</label><input id="svc-icon" type="text" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} /></div>
          <ImageUpload value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} label="Image" />
          <div className="form-group"><label htmlFor="svc-order">Sort Order</label><input id="svc-order" type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
          <StatusMessage state={status} />
        </div>
      </div>
      <div className="admin-card">
        <h3>All Services</h3>
        <ListState loading={loading} error={error} count={items.length} />
        {items.length > 0 && (
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Icon</th><th>Order</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td><i className={item.icon} aria-hidden="true"></i> {item.icon}</td>
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
