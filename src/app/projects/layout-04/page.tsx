import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

export default function Projects04Page() {
  return (
    <>
      <PageBanner
        title="<em>PROJECTS</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects 04' }]}
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
      />
      <section className="architecture-area py-128">
        <div className="container">
          <div className="row">
            {[
              { title: 'HOUSE DESIGN', cat: 'ARCHITECTURE', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80' },
              { title: 'VILLA DESIGN', cat: 'INTERIOR', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80' },
              { title: 'MODERN HOUSE', cat: 'LANDSCAPE', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
              { title: 'OFFICE DESIGN', cat: 'DESIGN', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80' },
            ].map((p, i) => (
              <div key={i} className="col-lg-6 mb-64">
                <div className="apartment-image">
                  <Link href="/projects/house-design"><img src={p.image} alt={p.title} style={{ width: '100%' }} /></Link>
                </div>
                <div className="apartment-content mt-32">
                  <Link href="/projects/house-design"><h3>{p.title}</h3></Link>
                  <span className="category">{p.cat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
