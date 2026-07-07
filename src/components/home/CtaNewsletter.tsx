'use client';
import { useState, type FormEvent } from 'react';

export default function CtaNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setEmail('');
    } catch {}
  };

  return (
    <section className="cta-area pt-140 pb-110 bgs-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="video-content-part text-center">
            <span className="sub-title">STAY INFORMED</span>
            <div className="cta-content">
              <h2>Design insights, <em>delivered.</em></h2>
              <h2>Join our newsletter for projects, <em>ideas</em> &amp; updates.</h2>
            </div>
            {submitted ? (
              <p className="mt-96" style={{ color: '#E1B78C' }}>Thank you for subscribing!</p>
            ) : (
              <form className="cta-form mt-96" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn-white-bg">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
