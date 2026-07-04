'use client';
import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  author: string;
}

export default function BlogPostsAdmin() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', content: '', featuredImage: '', author: 'Admin' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/blog-posts');
    setItems(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/blog-posts', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ title: '', slug: '', content: '', featuredImage: '', author: 'Admin' });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch('/api/blog-posts', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const startEdit = (item: BlogPost) => {
    setEditing(item);
    setForm({ title: item.title, slug: item.slug, content: item.content, featuredImage: item.featuredImage, author: item.author });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Blog Posts</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ title: '', slug: '', content: '', featuredImage: '', author: 'Admin' }); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit Post' : 'Add Post'}</h3>
        <div className="admin-form">
          <div className="form-group"><label>Title</label><input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="form-group"><label>Slug</label><input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></div>
          <div className="form-group"><label>Author</label><input type="text" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} /></div>
          <ImageUpload label="Featured Image" value={form.featuredImage} onChange={url => setForm(f => ({ ...f, featuredImage: url }))} />
          <div className="form-group"><label>Content</label><textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={10} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>
      <div className="admin-card">
        <h3>All Posts</h3>
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Slug</th><th>Author</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.slug}</td>
                <td>{item.author}</td>
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
