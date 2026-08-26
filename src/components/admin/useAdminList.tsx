'use client';

import { useCallback, useEffect, useState } from 'react';

export type SaveState = { kind: 'idle' } | { kind: 'success'; message: string } | { kind: 'error'; message: string };

async function readError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (data && typeof data.error === 'string') return data.error;
  } catch {
    // ignore
  }
  return `Request failed (${res.status})`;
}

/**
 * Shared list-page state for the admin: fetches `url`, never lets a non-array
 * payload reach `.map`, and exposes loading / error / refresh.
 */
export function useAdminList<T>(url: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(await readError(res));
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Unexpected response from the server');
      setItems(data as T[]);
    } catch (err) {
      setItems([]);
      setError(err instanceof Error ? err.message : 'Could not load items');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    // Deferred so the first fetch doesn't set state synchronously inside the effect.
    const timer = setTimeout(() => void refresh(), 0);
    return () => clearTimeout(timer);
  }, [refresh]);

  return { items, loading, error, refresh };
}

/** POST/PUT/DELETE helper that resolves to a SaveState instead of throwing. */
export async function submitJson(url: string, method: 'POST' | 'PUT' | 'DELETE', body: unknown): Promise<SaveState> {
  try {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) return { kind: 'error', message: `Save failed: ${await readError(res)}` };
    return { kind: 'success', message: method === 'DELETE' ? 'Deleted' : 'Saved' };
  } catch {
    return { kind: 'error', message: 'Save failed: network error' };
  }
}

export function StatusMessage({ state }: { state: SaveState }) {
  if (state.kind === 'idle') return null;
  return (
    <p className={`admin-alert ${state.kind}`} role={state.kind === 'error' ? 'alert' : 'status'}>
      {state.message}
    </p>
  );
}

export function ListState({ loading, error, count }: { loading: boolean; error: string | null; count: number }) {
  if (loading) return <p className="admin-muted">Loading…</p>;
  if (error) return <p className="admin-alert error" role="alert">{error}</p>;
  if (count === 0) return <p className="admin-muted">No items yet.</p>;
  return null;
}
