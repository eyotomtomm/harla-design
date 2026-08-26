'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY = { name: '', organisation: '', email: '', message: '', website: '' };

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentName, setSentName] = useState('');

  const update = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSentName(form.name.trim().split(/\s+/)[0]);
        setStatus('sent');
        setForm(EMPTY);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Your message could not be sent.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Your message could not be sent.');
      setStatus('error');
    }
  };

  return (
    <section className="contact-nujuma">
      <div className="container">
        <div className="contact-nujuma-grid">
          <div className="contact-nujuma-left">
            <span className="contact-nujuma-label">Contact</span>
            <h1 className="contact-nujuma-heading">
              Begin a<br />
              <em>conversation.</em>
            </h1>
            <p className="contact-nujuma-desc">
              Whether you are a developer, public authority, institution, or
              investor — if the intersection of people, place, and technology
              matters to your work, let&apos;s talk.
            </p>

            <div className="contact-nujuma-divider" />

            <div className="contact-nujuma-meta">
              <span className="contact-nujuma-meta-label">Based In</span>
              <p>Available across Africa &amp; the GCC</p>
            </div>

            <div className="contact-nujuma-divider" />

            <div className="contact-nujuma-meta">
              <span className="contact-nujuma-meta-label">Engagements</span>
              <p>Advisory retainers &middot; Project mandates &middot; Speaking</p>
            </div>

            <div className="contact-nujuma-divider" />

            <div className="contact-nujuma-meta">
              <span className="contact-nujuma-meta-label">Email</span>
              <p><a href="mailto:contact@harladesign.com">contact@harladesign.com</a></p>
            </div>
          </div>

          <div className="contact-nujuma-right">
            {status === 'sent' ? (
              <div className="contact-nujuma-success" role="status" aria-live="polite">
                <span className="contact-nujuma-label">Message sent</span>
                <h2>Thanks{sentName ? `, ${sentName}` : ''}.</h2>
                <p>We reply to every enquiry, usually within two working days.</p>
                <button type="button" className="read-more" onClick={() => setStatus('idle')}>
                  Send another message <i className="fas fa-long-arrow-alt-right"></i>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false}>
                <div className="contact-nujuma-field">
                  <label htmlFor="contact-name">Full name <span aria-hidden="true">*</span></label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                    aria-required="true"
                    maxLength={120}
                    value={form.name}
                    onChange={update('name')}
                  />
                </div>
                <div className="contact-nujuma-field">
                  <label htmlFor="contact-organisation">Organisation</label>
                  <input
                    id="contact-organisation"
                    name="organisation"
                    type="text"
                    autoComplete="organization"
                    placeholder="Your organisation"
                    maxLength={160}
                    value={form.organisation}
                    onChange={update('organisation')}
                  />
                </div>
                <div className="contact-nujuma-field">
                  <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    required
                    aria-required="true"
                    maxLength={200}
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
                <div className="contact-nujuma-field">
                  <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project or enquiry"
                    required
                    aria-required="true"
                    maxLength={4000}
                    value={form.message}
                    onChange={update('message')}
                  ></textarea>
                </div>
                {/* Honeypot — hidden from people, filled by bots */}
                <div className="contact-nujuma-hp" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
                </div>

                {status === 'error' && (
                  <p className="contact-nujuma-error" role="alert">
                    {errorMessage} Please try again, or email{' '}
                    <a href="mailto:contact@harladesign.com">contact@harladesign.com</a> directly.
                  </p>
                )}

                <button type="submit" className="contact-nujuma-submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <span className="contact-nujuma-submit-arrow" aria-hidden="true">&rarr;</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
