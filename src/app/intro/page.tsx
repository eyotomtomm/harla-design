'use client';

import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';

export default function IntroPage() {
  const { theme } = useTheme();
  const bgImage = theme === 'light'
    ? 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80'
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80';

  return (
    <section
      className="intro-area"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container text-center">
        <div className="intro-content">
          <img src="/images/logos/logo-dark.png" alt="Harla" style={{ maxWidth: '120px', marginBottom: '40px' }} />
          <h1 style={{ fontSize: '48px', marginBottom: '20px', letterSpacing: '8px', fontWeight: 200 }}>HARLA</h1>
          <p style={{ fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Architecture &amp; Interior Design Consultancy
          </p>
          <Link href="/" className="theme-btn">
            Enter Site
          </Link>
        </div>
      </div>
    </section>
  );
}
