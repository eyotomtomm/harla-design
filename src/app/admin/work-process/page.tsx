'use client';
import { useState } from 'react';
import { useAdminList, submitJson, StatusMessage, ListState, type SaveState } from '@/components/admin/useAdminList';

interface WorkStep { id: number; stepNumber: number; title: string; description: string; image: string; }
const EMPTY = { stepNumber: 1, title: '', description: '', image: '' };

export default function WorkProcessAdmin() {
  const { items, loading, error, refresh } = useAdminList<WorkStep>('/api/work-process');
  const [editing, setEditing] = useState<WorkStep | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  const handleSave = async () => {
    const result = await submitJson('/api/work-process', editing ? 'PUT' : 'POST', editing ? { id: editing.id, ...form } : form);
    setStatus(result);
    if (result.kind === 'success') {
      setEditing(null);
      setForm(EMPTY);
      void refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this step?')) return;
    setStatus(await submitJson('/api/work-process', 'DELETE', { id }));
    void refresh();
  };

  const startEdit = (item: WorkStep) => {
    setEditing(item);
    setForm({ stepNumber: item.stepNumber, title: item.title, description: item.description, image: item.image });
  };

  return (
    <>
      <div className="admin-header">
        <h1>Work Process</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm(EMPTY); }}>Add New</button>
      </div>
      <p className="admin-alert success">These steps appear in the &ldquo;From brief to delivery&rdquo; section on the home page.</p>
      <div className="admin-card">
        <h3>{editing ? 'Edit Step' : 'Add Step'}</h3>
        <div className="admin-form">
          <div className="form-group"><label htmlFor="wp-num">Step Number</label><input id="wp-num" type="number" value={form.stepNumber} onChange={e => setForm(f => ({ ...f, stepNumber: parseInt(e.target.value) || 1 }))} /></div>
          <div className="form-group"><label htmlFor="wp-title">Title</label><input id="wp-title" type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="wp-desc">Description</label><textarea id="wp-desc" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
          <StatusMessage state={status} />
        </div>
      </div>
      <div className="admin-card">
        <h3>All Steps</h3>
        <ListState loading={loading} error={error} count={items.length} />
        {items.length > 0 && (
          <table className="admin-table">
            <thead><tr><th>#</th><th>Title</th><th>Description</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.stepNumber}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
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
