'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface TeamMember { id: number; name: string; role: string; image: string; rating: number; sortOrder: number; }

export default function TeamAdmin() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState({ name: '', role: '', image: '', rating: 5, sortOrder: 0 });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/team');
    setItems(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/team', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ name: '', role: '', image: '', rating: 5, sortOrder: 0 });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/team', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const startEdit = (item: TeamMember) => {
    setEditing(item);
    setForm({ name: item.name, role: item.role, image: item.image, rating: item.rating, sortOrder: item.sortOrder });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Team Members</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ name: '', role: '', image: '', rating: 5, sortOrder: 0 }); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit Member' : 'Add Member'}</h3>
        <div className="admin-form">
          <div className="form-group"><label>Name</label><input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div className="form-group"><label>Role</label><input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} /></div>
          <ImageUpload label="Photo" value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} />
          <div className="form-group"><label>Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) || 5 }))} /></div>
          <div className="form-group"><label>Sort Order</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>
      <div className="admin-card">
        <h3>All Members</h3>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Role</th><th>Image</th><th>Order</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td><img src={item.image} alt="" style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} /></td>
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
