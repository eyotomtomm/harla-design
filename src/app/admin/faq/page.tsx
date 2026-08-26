'use client';
import { useState } from 'react';
import { useAdminList, submitJson, StatusMessage, ListState, type SaveState } from '@/components/admin/useAdminList';

interface FaqItem { id: number; question: string; subtitle: string; answer1: string; answer2: string; }
const EMPTY = { question: '', subtitle: '', answer1: '', answer2: '' };

export default function FaqAdmin() {
  const { items, loading, error, refresh } = useAdminList<FaqItem>('/api/faq');
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });

  const handleSave = async () => {
    const result = await submitJson('/api/faq', editing ? 'PUT' : 'POST', editing ? { id: editing.id, ...form } : form);
    setStatus(result);
    if (result.kind === 'success') {
      setEditing(null);
      setForm(EMPTY);
      void refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this FAQ item?')) return;
    setStatus(await submitJson('/api/faq', 'DELETE', { id }));
    void refresh();
  };

  const startEdit = (item: FaqItem) => {
    setEditing(item);
    setForm({ question: item.question, subtitle: item.subtitle, answer1: item.answer1, answer2: item.answer2 });
  };

  return (
    <>
      <div className="admin-header">
        <h1>FAQ</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm(EMPTY); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit FAQ' : 'Add FAQ'}</h3>
        <div className="admin-form">
          <div className="form-group"><label htmlFor="faq-q">Question</label><input id="faq-q" type="text" value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} /></div>
          <div className="form-group"><label htmlFor="faq-sub">Subtitle</label><textarea id="faq-sub" value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} rows={2} /></div>
          <div className="form-group"><label htmlFor="faq-a1">Answer 1</label><textarea id="faq-a1" value={form.answer1} onChange={e => setForm(f => ({ ...f, answer1: e.target.value }))} rows={3} /></div>
          <div className="form-group"><label htmlFor="faq-a2">Answer 2</label><textarea id="faq-a2" value={form.answer2} onChange={e => setForm(f => ({ ...f, answer2: e.target.value }))} rows={3} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
          <StatusMessage state={status} />
        </div>
      </div>
      <div className="admin-card">
        <h3>All FAQs</h3>
        <ListState loading={loading} error={error} count={items.length} />
        {items.length > 0 && (
          <table className="admin-table">
            <thead><tr><th>Question</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.question}</td>
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
