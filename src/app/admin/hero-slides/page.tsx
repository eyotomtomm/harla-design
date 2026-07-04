'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Slide {
  id: number;
  rotateWord: string;
  description: string;
  image: string;
  linkUrl: string;
  sortOrder: number;
  variant: string;
}

export default function HeroSlidesAdmin() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [editing, setEditing] = useState<Slide | null>(null);
  const [form, setForm] = useState({ rotateWord: '', description: '', image: '', linkUrl: '', sortOrder: 0, variant: 'home1' });

  useEffect(() => { fetchSlides(); }, []);

  const fetchSlides = async () => {
    const res = await fetch('/api/hero-slides');
    setSlides(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/hero-slides', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ rotateWord: '', description: '', image: '', linkUrl: '', sortOrder: 0, variant: 'home1' });
    fetchSlides();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this slide?')) return;
    await fetch('/api/hero-slides', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchSlides();
  };

  const startEdit = (slide: Slide) => {
    setEditing(slide);
    setForm({ rotateWord: slide.rotateWord, description: slide.description, image: slide.image, linkUrl: slide.linkUrl, sortOrder: slide.sortOrder, variant: slide.variant });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Hero Slides</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ rotateWord: '', description: '', image: '', linkUrl: '', sortOrder: 0, variant: 'home1' }); }}>Add New</button>
      </div>

      <div className="admin-card">
        <h3>{editing ? 'Edit Slide' : 'Add Slide'}</h3>
        <div className="admin-form">
          <div className="form-group">
            <label>Rotate Word</label>
            <input type="text" value={form.rotateWord} onChange={e => setForm(f => ({ ...f, rotateWord: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <ImageUpload label="Slide Image" value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} />
          <div className="form-group">
            <label>Link URL</label>
            <input type="text" value={form.linkUrl} onChange={e => setForm(f => ({ ...f, linkUrl: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} />
          </div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>

      <div className="admin-card">
        <h3>All Slides</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Word</th>
              <th>Description</th>
              <th>Image</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map(slide => (
              <tr key={slide.id}>
                <td>{slide.rotateWord}</td>
                <td>{slide.description.substring(0, 50)}...</td>
                <td><img src={slide.image} alt="" style={{ width: 60, height: 40, objectFit: 'cover' }} /></td>
                <td>{slide.sortOrder}</td>
                <td>
                  <button className="admin-btn small" onClick={() => startEdit(slide)}>Edit</button>
                  <button className="admin-btn small danger" style={{ marginLeft: '4px' }} onClick={() => handleDelete(slide.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
