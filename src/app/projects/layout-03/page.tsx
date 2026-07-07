import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

export default function Projects03Page() {
  return (
    <>
      <PageBanner
        title="<em>PROJECTS</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects 03' }]}
        backgroundImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
      />
      <section className="architecture-area py-128">
        <div className="container">
          <div className="row rel z-1 justify-content-center">
            <div className="section-title text-center mb-96">
              <span className="sub-title mb-16">OUR PROJECTS</span>
              <h2>LATEST WORKS</h2>
            </div>
          </div>
          <div className="row">
            {[
              { title: 'HOUSE DESIGN', cat: 'ARCHITECTURE / LANDSCAPE', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
              { title: 'VILLA', cat: 'ARCHITECTURE', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' },
              { title: 'HOUSE', cat: 'INTERIOR', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' },
              { title: 'MODERN HOUSE', cat: 'DESIGN', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80' },
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
