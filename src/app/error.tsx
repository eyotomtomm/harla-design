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
    <section className="error-area">
      <div className="container">
        <div className="error-content text-center">
          <span className="error-img">
            <img src="/images/projects/abay-bank/lobby-6.jpg" alt="" />
          </span>
          <div className="error-desc ow py-128 justify-content-center">
            <p>SOMETHING WENT WRONG. PLEASE TRY AGAIN.</p>
          </div>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
            <button onClick={reset} className="primary-readmore" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Try Again
            </button>
            <Link href="/" className="primary-readmore">Back To Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
