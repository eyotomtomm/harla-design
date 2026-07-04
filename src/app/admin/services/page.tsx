'use client';
import { useState, useEffect } from 'react';

interface Service { id: number; title: string; description: string; icon: string; image: string; sortOrder: number; }

export default function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ title: '', description: '', icon: '', image: '', sortOrder: 0 });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/services');
    setItems(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/services', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ title: '', description: '', icon: '', image: '', sortOrder: 0 });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/services', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const startEdit = (item: Service) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, icon: item.icon, image: item.image, sortOrder: item.sortOrder });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Services</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ title: '', description: '', icon: '', image: '', sortOrder: 0 }); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit Service' : 'Add Service'}</h3>
        <div className="admin-form">
          <div className="form-group"><label>Title</label><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
          <div className="form-group"><label>Icon (FA class)</label><input type="text" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} /></div>
          <div className="form-group"><label>Image URL</label><input type="text" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
          <div className="form-group"><label>Sort Order</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>
      <div className="admin-card">
        <h3>All Services</h3>
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Icon</th><th>Order</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td><i className={item.icon}></i> {item.icon}</td>
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
