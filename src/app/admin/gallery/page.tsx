'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import { useAdminList, submitJson, StatusMessage, ListState, type SaveState } from '@/components/admin/useAdminList';

interface Category { id: number; name: string; slug: string; }
interface GalleryImage {
  id: number; client: string; type: string; location: string | null; image: string; alt: string; sortOrder: number;
  categoryId: number; category: { id: number; name: string; slug: string };
}
const EMPTY = { client: '', type: '', location: 'Addis Ababa, Ethiopia', image: '', alt: '', sortOrder: 0, categoryId: 0 };

export default function GalleryAdmin() {
  const { items, loading, error, refresh } = useAdminList<GalleryImage>('/api/gallery');
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/categories', { cache: 'no-store' });
        const data = res.ok ? await res.json() : [];
        if (Array.isArray(data)) {
          setCategories(data);
          setForm(f => (f.categoryId === 0 && data[0] ? { ...f, categoryId: data[0].id } : f));
        }
      } catch {
        // categories list stays empty; the select shows a hint
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    const payload = { ...form, location: form.location || null, alt: form.alt || `${form.client} — ${form.type}` };
    const result = await submitJson('/api/gallery', editing ? 'PUT' : 'POST', editing ? { id: editing.id, ...payload } : payload);
    setStatus(result);
    if (result.kind === 'success') {
      setEditing(null);
      setForm({ ...EMPTY, categoryId: form.categoryId });
      void refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this image from the gallery?')) return;
    setStatus(await submitJson('/api/gallery', 'DELETE', { id }));
    void refresh();
  };

  const startEdit = (item: GalleryImage) => {
    setEditing(item);
    setForm({ client: item.client, type: item.type, location: item.location ?? '', image: item.image, alt: item.alt, sortOrder: item.sortOrder, categoryId: item.categoryId });
    window.scrollTo({ top: 0 });
  };

  const field = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: key === 'sortOrder' || key === 'categoryId' ? parseInt(e.target.value) || 0 : e.target.value }));

  return (
    <>
      <div className="admin-header">
        <h1>Projects gallery</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ ...EMPTY, categoryId: form.categoryId }); }}>Add image</button>
      </div>
      <p className="admin-alert success">
        Each image is one tile on the Projects page, captioned “Client · Type · Location”. The first image of each row is also the tile on the home page.
        {categories.length === 0 && <> No rows exist yet — <Link href="/admin/categories">create a gallery row</Link> first.</>}
      </p>
      <div className="admin-card">
        <h3>{editing ? 'Edit image' : 'Add image'}</h3>
        <div className="admin-form">
          <div className="form-group">
            <label htmlFor="g-cat">Row (category)</label>
            <select id="g-cat" value={form.categoryId} onChange={field('categoryId')}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group"><label htmlFor="g-client">Client</label><input id="g-client" type="text" value={form.client} onChange={field('client')} placeholder="e.g. Abay Bank" /></div>
          <div className="form-group"><label htmlFor="g-type">Project type</label><input id="g-type" type="text" value={form.type} onChange={field('type')} placeholder="e.g. Headquarters Lobby" /></div>
          <div className="form-group"><label htmlFor="g-loc">Location</label><input id="g-loc" type="text" value={form.location} onChange={field('location')} placeholder="e.g. Addis Ababa, Ethiopia" /></div>
          <ImageUpload value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} label="Image" />
          <div className="form-group"><label htmlFor="g-alt">Image description (alt text)</label><input id="g-alt" type="text" value={form.alt} onChange={field('alt')} placeholder="What the photo shows" /></div>
          <div className="form-group"><label htmlFor="g-order">Sort order</label><input id="g-order" type="number" value={form.sortOrder} onChange={field('sortOrder')} /></div>
          <button className="admin-btn primary" onClick={handleSave} disabled={!form.client || !form.type || !form.image || !form.categoryId}>{editing ? 'Update' : 'Add to gallery'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => { setEditing(null); setForm({ ...EMPTY, categoryId: form.categoryId }); }}>Cancel</button>}
          <StatusMessage state={status} />
        </div>
      </div>
      <div className="admin-card">
        <h3>All images</h3>
        <ListState loading={loading} error={error} count={items.length} />
        {items.length > 0 && (
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Row</th><th>Client</th><th>Type</th><th>Location</th><th>Order</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt="" style={{ width: 72, height: 54, objectFit: 'cover' }} /></td>
                  <td>{item.category?.name}</td>
                  <td>{item.client}</td>
                  <td>{item.type}</td>
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
