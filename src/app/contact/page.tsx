'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="contact-banner banner-area">
        <div className="container-fluid">
          <div className="contact-title row align-items-center text-center justify-content-between py-128">
            <h1>CONTACT</h1>
          </div>
        </div>
      </section>

      <section className="contact-area">
        <div className="container">
          <div className="row justify-content-between contact-content">
            <div className="col-lg-9 ct-form">
              <form className="contact-form rmt-55 contactForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows={9}
                    placeholder="Message"
                    required
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  ></textarea>
                </div>
                <div className="form-group mb-0">
                  <button type="submit" className="contact-btn" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send a message'}
                  </button>
                </div>
              </form>
            </div>
            <div className="contact-info">
              <div className="section-title mb-32">
                <h5 className="mb-32">Basic information</h5>
                <p>Get in touch with us to learn more about interior or architecture design. We&apos;d love to hear from you, here&apos;s how you can reach us...</p>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-phone-volume"></i> <span>+** *** *** ****</span>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-envelope"></i> <span className="text">****@****.com</span>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt"></i> <span className="text">****  ****</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-area">
        <div className="container-fluid">
          <div className="contact-page-map">
            <div className="our-location">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d96776.56071496992!2d-74.02420878160657!3d40.71212692665102!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1676287097391!5m2!1sen!2sbd"
                style={{ border: 0, width: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Harla office location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
