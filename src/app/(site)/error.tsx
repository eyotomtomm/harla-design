'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="error-page">
      <div className="container">
        <span className="sub-title mb-16">Error</span>
        <h1>Something went wrong.</h1>
        <p>
          Please try again. If it keeps happening, write to{' '}
          <a href="mailto:contact@harladesign.com">contact@harladesign.com</a>
          {error.digest ? <> and quote <code>{error.digest}</code></> : null}.
        </p>
        <div className="error-page-actions">
          <button type="button" onClick={reset} className="theme-btn">Try again</button>
          <Link href="/" className="read-more">Back to home <i className="fas fa-long-arrow-alt-right"></i></Link>
        </div>
      </div>
    </section>
  );
}
