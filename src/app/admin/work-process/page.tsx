'use client';
import { useState, useEffect } from 'react';

interface WorkStep { id: number; stepNumber: number; title: string; description: string; image: string; }

export default function WorkProcessAdmin() {
  const [items, setItems] = useState<WorkStep[]>([]);
  const [editing, setEditing] = useState<WorkStep | null>(null);
  const [form, setForm] = useState({ stepNumber: 1, title: '', description: '', image: '' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/work-process');
    setItems(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/work-process', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ stepNumber: 1, title: '', description: '', image: '' });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/work-process', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const startEdit = (item: WorkStep) => {
    setEditing(item);
    setForm({ stepNumber: item.stepNumber, title: item.title, description: item.description, image: item.image });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Work Process</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ stepNumber: 1, title: '', description: '', image: '' }); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit Step' : 'Add Step'}</h3>
        <div className="admin-form">
          <div className="form-group"><label>Step Number</label><input type="number" value={form.stepNumber} onChange={e => setForm(f => ({ ...f, stepNumber: parseInt(e.target.value) || 1 }))} /></div>
          <div className="form-group"><label>Title</label><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
          <div className="form-group"><label>Image URL</label><input type="text" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>
      <div className="admin-card">
        <h3>All Steps</h3>
        <table className="admin-table">
          <thead><tr><th>#</th><th>Title</th><th>Image</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.stepNumber}</td>
                <td>{item.title}</td>
                <td><img src={item.image} alt="" style={{ width: 60, height: 40, objectFit: 'cover' }} /></td>
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
