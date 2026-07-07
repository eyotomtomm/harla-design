'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', organisation: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', organisation: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact-nujuma">
      <div className="container">
        <div className="contact-nujuma-grid">
          <div className="contact-nujuma-left">
            <span className="contact-nujuma-label">Contact</span>
            <h2 className="contact-nujuma-heading">
              Begin a<br />
              <em>conversation.</em>
            </h2>
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
            <form onSubmit={handleSubmit}>
              <div className="contact-nujuma-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="contact-nujuma-field">
                <label>Organisation</label>
                <input
                  type="text"
                  placeholder="Your organisation"
                  value={form.organisation}
                  onChange={e => setForm(prev => ({ ...prev, organisation: e.target.value }))}
                />
              </div>
              <div className="contact-nujuma-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="contact-nujuma-field">
                <label>Message *</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project or enquiry"
                  required
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                ></textarea>
              </div>
              <button type="submit" className="contact-nujuma-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
                <span className="contact-nujuma-submit-arrow">&rarr;</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
