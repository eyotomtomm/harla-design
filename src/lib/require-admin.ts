import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

/**
 * Guard for mutating API handlers. Returns a 401 response when there is no
 * admin session, otherwise null. Usage:
 *
 *   const denied = await requireAdmin();
 *   if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

/** Parse a JSON body; returns null when the body is missing or invalid. */
export async function readJson<T = Record<string, unknown>>(request: Request): Promise<T | null> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? (body as T) : null;
  } catch {
    return null;
  }
}

/** Keep only whitelisted keys from an untrusted body. */
export function pick<T extends Record<string, unknown>>(body: T, keys: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of keys) {
    if (key in body && body[key] !== undefined) out[key] = body[key];
  }
  return out;
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function dbError() {
  return NextResponse.json({ error: 'Database error' }, { status: 500 });
}

export function idFrom(body: Record<string, unknown> | null): number | null {
  const id = body?.id;
  return typeof id === 'number' && Number.isInteger(id) ? id : null;
}
