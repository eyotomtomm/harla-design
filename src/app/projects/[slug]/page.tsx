import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

const projectData = {
  title: 'VILLA DESIGN',
  projectName: 'Mountain Villa In US',
  projectDate: '15 January 2024',
  projectLocation: 'Manhattan NY',
  architect: 'Aaron Williams',
  description1: 'This project began with a clear brief: create a residence that feels open to the landscape while maintaining privacy and warmth. Every material was selected for longevity and tactile quality.',
  description2: 'The design draws on the natural topography of the site, with floor-to-ceiling glazing oriented to capture morning light and frame distant views. Interior volumes are generous but grounded — high ceilings balanced by warm timber and stone. The result is a home that breathes with its environment.',
  description3: 'Collaboration between architect, landscape designer, and client was central to achieving a seamless indoor-outdoor experience.',
  images: {
    detail1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    detail2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80', col: 'col-sm-8 col-lg-8' },
      { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=500&q=80', col: 'col-sm-4 col-lg-4' },
      { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80', col: 'col-sm-4 col-lg-4' },
      { src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=500&q=80', col: 'col-sm-4 col-lg-4' },
      { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=500&q=80', col: 'col-sm-4 col-lg-4' },
    ],
  },
  tags: ['Interior', 'Rooms', 'Conditions'],
  checkList: [
    'Natural stone and timber sourced from regional suppliers.',
    'Passive cooling and cross-ventilation integrated into the plan.',
    'Custom joinery designed for each room and its function.',
  ],
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <PageBanner
        title="PROJECT <em>DETAILS</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Project Details' }]}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
      />

      <section className="project-details py-128">
        <div className="container">
          <div className="content">
            <div className="mb-64 align-items-center">
              <div className="row detail-image mb-64">
                <img src={projectData.images.detail1} alt={projectData.title} />
              </div>
              <div className="row detail-info mb-64">
                <div className="col-lg-6 info text-left">
                  <h2 className="mb-16">{projectData.title}</h2>
                  <p>PROJECT NAME: {projectData.projectName}</p>
                  <p>PROJECT DATE: {projectData.projectDate}</p>
                  <p>PROJECT LOCATION: {projectData.projectLocation}</p>
                  <p>ARCHITECT: {projectData.architect}</p>
                </div>
                <div className="col-lg-6 text-right">
                  <p>{projectData.description1}</p>
                  <p>{projectData.description2}</p>
                  <p>{projectData.description3}</p>
                </div>
              </div>
            </div>

            <div className="mb-64 align-items-center">
              <div className="row detail-image mb-64">
                <img src={projectData.images.detail2} alt={projectData.title} />
              </div>
              <div className="row mb-64">
                <div className="col-lg-6 text-left">
                  <p>{projectData.description3}</p>
                  <ul className="list mb-16">
                    {projectData.checkList.map((item, i) => (
                      <li key={i}><i className="fa fa-check"></i> {item}</li>
                    ))}
                  </ul>
                  <p>{projectData.description1}</p>
                </div>
                <div className="col-lg-6 text-right">
                  <p>{projectData.description1}</p>
                  <p>{projectData.description2}</p>
                  <p>{projectData.description3}</p>
                </div>
              </div>
            </div>

            <div className="mb-64 galley text-center">
              <div className="row mb-30">
                {projectData.images.gallery.slice(0, 2).map((img, i) => (
                  <div key={i} className={`${img.col} img`}>
                    <img src={img.src} alt="Gallery" />
                  </div>
                ))}
              </div>
              <div className="row">
                {projectData.images.gallery.slice(2).map((img, i) => (
                  <div key={i} className={`${img.col} img`}>
                    <img src={img.src} alt="Gallery" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-64 align-items-center">
              <div className="row mb-64">
                <div className="col-lg-6 text-left">
                  <p>{projectData.description2}</p>
                  <p>{projectData.description3}</p>
                </div>
                <div className="col-lg-6 text-right">
                  <p>{projectData.description2}</p>
                  <p>{projectData.description3}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="pro-tags">
                <span>TAGS:</span>
                <ul className="tag-list">
                  {projectData.tags.map((tag, i) => (
                    <li key={i}><a href="#">{tag}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-projects py-128 black-10-bg">
        <div className="container">
          <div className="content align-items-center">
            <div className="row mb-64">
              <Link className="prev-pro" href="/projects/house-design">
                <i className="fa fa-long-arrow-left"></i> PREV
              </Link>
              <Link href="/projects"><i className="fa fa-table"></i></Link>
              <Link className="next-pro" href="/projects/house-design">
                NEXT <i className="fa fa-long-arrow-right"></i>
              </Link>
            </div>
            <div className="row">
              <div className="col-lg-6 related-left">
                <div className="row black-100-bg">
                  <div className="col-xs-12 col-sm-6 col-lg-6">
                    <Link href="/projects/house-design"><img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80" alt="Related" /></Link>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-lg-6 related-text">
                    <Link href="/projects/house-design"><h5 className="mb-16">COZY HOME</h5></Link>
                    <ul className="blog-meta mb-20">
                      <li><i className="fal fa-calendar-alt"></i> 15 July 2024</li>
                      <li><i className="fal fa-comment-dots"></i> 1 Comment</li>
                    </ul>
                    <p className="mt-16">A warm retreat designed around comfort and natural materials.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 related-right">
                <div className="row white-bg">
                  <div className="col-xs-12 col-sm-6 col-lg-6 related-text">
                    <Link href="/projects/house-design"><h5 className="mb-16">MODREN DESIGN</h5></Link>
                    <ul className="blog-meta mb-20">
                      <li><i className="fal fa-calendar-alt"></i> 15 July 2024</li>
                      <li><i className="fal fa-comment-dots"></i> 1 Comment</li>
                    </ul>
                    <p>Bold contemporary lines with a refined material palette.</p>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-lg-6">
                    <Link href="/projects/house-design"><img src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80" alt="Related" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
