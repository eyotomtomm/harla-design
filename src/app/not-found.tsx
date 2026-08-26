import Link from 'next/link';
import SiteShell from '@/components/layout/SiteShell';

export default function NotFound() {
  return (
    <SiteShell>
      <section className="error-page">
        <div className="container">
          <span className="sub-title mb-16">404</span>
          <h1>That page isn&apos;t here.</h1>
          <p>The link may be out of date. Try the projects, or write to us.</p>
          <div className="error-page-actions">
            <Link href="/projects" className="theme-btn">View projects</Link>
            <Link href="/contact" className="read-more">Get in touch <i className="fa fa-long-arrow-right"></i></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
