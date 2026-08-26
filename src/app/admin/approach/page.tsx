'use client';
import { useState } from 'react';
import { useAdminList, submitJson, StatusMessage, ListState, type SaveState } from '@/components/admin/useAdminList';

interface ApproachItem { id: number; title: string; description: string; icon: string; link: string; sortOrder: number; }
const EMPTY = { title: '', description: '', icon: 'fas fa-compass', link: '/about', sortOrder: 0 };

export default function ApproachAdmin() {
  const { items, loading, error, refresh } = useAdminList<ApproachItem>('/api/approach');
  const [editing, setEditing] = useState<ApproachItem | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  const handleSave = async () => {
    const result = await submitJson('/api/approach', editing ? 'PUT' : 'POST', editing ? { id: editing.id, ...form } : form);
    setStatus(result);
    if (result.kind === 'success') {
      setEditing(null);
      setForm(EMPTY);
      void refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return;
    setStatus(await submitJson('/api/approach', 'DELETE', { id }));
    void refresh();
  };

  const startEdit = (item: ApproachItem) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, icon: item.icon, link: item.link, sortOrder: item.sortOrder });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Our approach</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm(EMPTY); }}>Add item</button>
      </div>
      <p className="admin-alert success">The six cards in “Our approach” on the home page. Set the link to <code>/thought-leadership</code> to show the podcast and Substack links on a card.</p>
      <div className="admin-card">
        <h3>{editing ? 'Edit item' : 'Add item'}</h3>
        <div className="admin-form">
          <div className="form-group"><label htmlFor="ap-title">Title</label><input id="ap-title" type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="ap-desc">Description</label><textarea id="ap-desc" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
          <div className="form-group"><label htmlFor="ap-icon">Icon (Font Awesome class) — preview: <i className={form.icon} aria-hidden="true"></i></label><input id="ap-icon" type="text" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="ap-link">Link (page the arrow goes to)</label><input id="ap-link" type="text" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="ap-order">Sort order</label><input id="ap-order" type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} /></div>
          <button className="admin-btn primary" onClick={handleSave} disabled={!form.title || !form.description}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => { setEditing(null); setForm(EMPTY); }}>Cancel</button>}
          <StatusMessage state={status} />
        </div>
      </div>
      <div className="admin-card">
        <h3>All items</h3>
        <ListState loading={loading} error={error} count={items.length} />
        {items.length > 0 && (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Icon</th><th>Title</th><th>Link</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.sortOrder}</td>
                  <td><i className={item.icon} aria-hidden="true"></i></td>
                  <td>{item.title}</td>
                  <td>{item.link}</td>
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
