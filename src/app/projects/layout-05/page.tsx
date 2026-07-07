import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

export default function Projects05Page() {
  return (
    <>
      <PageBanner
        title="<em>PROJECTS</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects 05' }]}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
      />
      <section className="architecture-area py-128">
        <div className="container">
          <div className="row">
            {[
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
              'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
              'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80',
              'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80',
              'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
              'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80',
              'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
              'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
            ].map((img, i) => (
              <div key={i} className="col-lg-3 col-md-4 col-sm-6 mb-32">
                <div className="apartment-image">
                  <Link href="/projects/house-design">
                    <img src={img} alt={`Project ${i + 1}`} style={{ width: '100%' }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
