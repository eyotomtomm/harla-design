import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Public API endpoints that accept unauthenticated writes.
const PUBLIC_WRITE = new Set(['/api/contact']);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = await getToken({ req: request });
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect admin API routes (POST/PUT/DELETE). Handlers also check the
  // session themselves via requireAdmin(); this is defence in depth.
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method) && !PUBLIC_WRITE.has(pathname)) {
      const token = await getToken({ req: request });
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
