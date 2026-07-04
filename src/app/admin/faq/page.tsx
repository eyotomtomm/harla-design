'use client';
import { useState, useEffect } from 'react';

interface FaqItem { id: number; question: string; subtitle: string; answer1: string; answer2: string; }

export default function FaqAdmin() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState({ question: '', subtitle: '', answer1: '', answer2: '' });

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/faq');
    setItems(await res.json());
  };

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch('/api/faq', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setEditing(null);
    setForm({ question: '', subtitle: '', answer1: '', answer2: '' });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/faq', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  const startEdit = (item: FaqItem) => {
    setEditing(item);
    setForm({ question: item.question, subtitle: item.subtitle, answer1: item.answer1, answer2: item.answer2 });
  };

  return (
    <>
      <div className="admin-header">
        <h1>FAQ</h1>
        <button className="admin-btn primary" onClick={() => { setEditing(null); setForm({ question: '', subtitle: '', answer1: '', answer2: '' }); }}>Add New</button>
      </div>
      <div className="admin-card">
        <h3>{editing ? 'Edit FAQ' : 'Add FAQ'}</h3>
        <div className="admin-form">
          <div className="form-group"><label>Question</label><input type="text" value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} /></div>
          <div className="form-group"><label>Subtitle</label><textarea value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} rows={2} /></div>
          <div className="form-group"><label>Answer 1</label><textarea value={form.answer1} onChange={e => setForm(f => ({ ...f, answer1: e.target.value }))} rows={3} /></div>
          <div className="form-group"><label>Answer 2</label><textarea value={form.answer2} onChange={e => setForm(f => ({ ...f, answer2: e.target.value }))} rows={3} /></div>
          <button className="admin-btn primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button className="admin-btn" style={{ marginLeft: '8px' }} onClick={() => setEditing(null)}>Cancel</button>}
        </div>
      </div>
      <div className="admin-card">
        <h3>All FAQs</h3>
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
      </div>
    </>
  );
}
