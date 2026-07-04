'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Testimonial { id: number; quote: string; authorName: string; designation: string; authorImage: string; rating: number; }

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ quote: '', authorName: '', designation: '', authorImage: '', rating: 5 });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/testimonials');
    setItems(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/testimonials', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ quote: '', authorName: '', designation: '', authorImage: '', rating: 5 });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const startEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({ quote: item.quote, authorName: item.authorName, designation: item.designation, authorImage: item.authorImage, rating: item.rating });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Testimonials</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ quote: '', authorName: '', designation: '', authorImage: '', rating: 5 }); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
        <div className="admin-form">
          <div className="form-group"><label>Quote</label><textarea value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} rows={4} /></div>
          <div className="form-group"><label>Author Name</label><input type="text" value={form.authorName} onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))} /></div>
          <div className="form-group"><label>Designation</label><input type="text" value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} /></div>
          <ImageUpload label="Author Photo" value={form.authorImage} onChange={url => setForm(f => ({ ...f, authorImage: url }))} />
          <div className="form-group"><label>Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: parseInt(e.target.value) || 5 }))} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>
      <div className="admin-card">
        <h3>All Testimonials</h3>
        <table className="admin-table">
          <thead><tr><th>Author</th><th>Quote</th><th>Rating</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.authorName}</td>
                <td>{item.quote.substring(0, 60)}...</td>
                <td>{item.rating}</td>
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
