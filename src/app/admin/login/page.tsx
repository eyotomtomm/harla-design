'use client';
import { Suspense, useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const ERRORS: Record<string, string> = {
  CredentialsSignin: 'The email or password is incorrect.',
  Configuration: 'Sign-in is not configured on this server. Check DATABASE_URL and NEXTAUTH_SECRET.',
};

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setPending(true);
    try {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (!result || result.error) {
        setError(ERRORS[result?.error ?? ''] ?? `Sign-in failed (${result?.error ?? 'no response'}).`);
        return;
      }
      const callbackUrl = params.get('callbackUrl');
      router.push(callbackUrl && callbackUrl.startsWith('/admin') ? callbackUrl : '/admin');
    } catch {
      setError('Sign-in failed: the server could not be reached.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-box">
        <h1>Admin Login</h1>
        {error && <p className="error" role="alert">{error}</p>}
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input id="login-email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="admin-btn primary" disabled={pending} aria-busy={pending} style={{ width: '100%', justifyContent: 'center' }}>
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="admin-login" />}>
      <LoginForm />
    </Suspense>
  );
}
