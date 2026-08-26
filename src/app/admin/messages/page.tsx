'use client';
import { useState } from 'react';
import { useAdminList, submitJson, StatusMessage, ListState, type SaveState } from '@/components/admin/useAdminList';

interface Message { id: number; name: string; organisation: string | null; email: string; message: string; isRead: boolean; createdAt: string; }

export default function MessagesAdmin() {
  const { items, loading, error, refresh } = useAdminList<Message>('/api/messages');
  const [status, setStatus] = useState<SaveState>({ kind: 'idle' });
  const [open, setOpen] = useState<number | null>(null);

  const toggleRead = async (m: Message) => {
    setStatus(await submitJson('/api/messages', 'PUT', { id: m.id, isRead: !m.isRead }));
    void refresh();
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this message permanently?')) return;
    setStatus(await submitJson('/api/messages', 'DELETE', { id }));
    void refresh();
  };

  return (
    <>
      <div className="admin-header">
        <h1>Messages</h1>
      </div>
      <p className="admin-alert success">Contact-form submissions. Each one was also emailed to contact@harladesign.com.</p>
      <StatusMessage state={status} />
      <div className="admin-card">
        <ListState loading={loading} error={error} count={items.length} />
        {items.length > 0 && (
          <table className="admin-table">
            <thead><tr><th></th><th>From</th><th>Organisation</th><th>Received</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map(m => (
                <>
                  <tr key={m.id} style={{ fontWeight: m.isRead ? 400 : 600 }}>
                    <td>{m.isRead ? '' : '●'}</td>
                    <td>{m.name}<br /><a href={`mailto:${m.email}`} style={{ fontWeight: 400 }}>{m.email}</a></td>
                    <td>{m.organisation ?? '—'}</td>
                    <td>{new Date(m.createdAt).toLocaleString('en-GB')}</td>
                    <td>
                      <button className="admin-btn small" onClick={() => setOpen(open === m.id ? null : m.id)}>{open === m.id ? 'Hide' : 'Read'}</button>
                      <button className="admin-btn small" style={{ marginLeft: '4px' }} onClick={() => toggleRead(m)}>{m.isRead ? 'Mark unread' : 'Mark read'}</button>
                      <button className="admin-btn small danger" style={{ marginLeft: '4px' }} onClick={() => remove(m.id)}>Delete</button>
                    </td>
                  </tr>
                  {open === m.id && (
                    <tr key={`${m.id}-body`}>
                      <td></td>
                      <td colSpan={4} style={{ whiteSpace: 'pre-wrap', fontWeight: 400 }}>{m.message}</td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
