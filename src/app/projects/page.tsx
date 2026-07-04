'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

const categories = ['ALL', 'COMMERCIAL', 'OFFICE', 'HOTEL', 'RESIDENTIAL'];

const projects = [
  {
    title: 'Abay Bank Headquarters',
    slug: 'abay-bank',
    category: 'COMMERCIAL',
    tags: ['COMMERCIAL', 'HOTEL'],
    image: '/images/projects/abay-bank/lobby-1.jpg',
    subtitle: 'COMMERCIAL',
    description: 'A grand lobby with double-height stone paneling and natural light.',
    size: 'full',
  },
  {
    title: 'Anbessa Office & Apartment',
    slug: 'anbessa-apartment',
    category: 'OFFICE',
    tags: ['OFFICE'],
    image: '/images/projects/anbessa-apartment/office-lounge.png',
    subtitle: 'OFFICE',
    description: 'Executive floors blending focus with hospitality.',
    size: 'half',
  },
  {
    title: 'Lobby Concept Design',
    slug: 'lobby-design',
    category: 'HOTEL',
    tags: ['HOTEL'],
    image: '/images/projects/lobby-design/lobby-b.jpg',
    subtitle: 'HOTEL',
    description: 'Sculptural forms in a soaring double-height atrium.',
    size: 'half',
  },
  {
    title: 'Anbessa Apartment Amenities',
    slug: 'anbessa-apartment',
    category: 'RESIDENTIAL',
    tags: ['RESIDENTIAL'],
    image: '/images/projects/anbessa-apartment/coffee-area.png',
    subtitle: 'RESIDENTIAL',
    description: 'Coffee lounge, gym, and communal spaces designed for living.',
    size: 'full',
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <>
      <PageBanner
        title="PROJECTS - 01"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'projects' }]}
        backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
        backgroundImageLight="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=70"
      />

      <section className="projects-01 py-128">
        <div className="container">
          <ul className="project-filter tab-style-one justify-content-center nav nav-pills nav-fill mb-96">
            {categories.map(cat => (
              <li
                key={cat}
                className={`nav-item${activeFilter === cat ? ' current' : ''}`}
                onClick={() => setActiveFilter(cat)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveFilter(cat); } }}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <a className="nav-link">{cat}</a>
              </li>
            ))}
          </ul>
          <div className="tab-content tab-pane project-active">
            {filtered.map((project, i) => (
              <div key={i} className={project.size === 'full' ? 'col-lg-12 item' : 'col-sm-6 col-lg-6 item'}>
                <div className="row apartment-image">
                  <Link href={`/projects/${project.slug}`}><img src={project.image} alt={project.title} /></Link>
                  <div className="carousel-caption d-md-block">
                    <span className="sub-title mb-16">{project.subtitle}</span>
                    <Link href={`/projects/${project.slug}`}><h5 className="mb-32">{project.title}</h5></Link>
                    <p className="mb-32">{project.description}</p>
                    <div>
                      <Link href={`/projects/${project.slug}`} className="hero-btn">
                        Read More
                        <span className="btn-icon">
                          <span className="circle"></span>
                          <span className="dot"></span>
                          <span className="line"></span>
                          <span className="fa fa-long-arrow-right"></span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-lg-12">
              <ul className="pagination mt-40 flex-wrap justify-content-center">
                <li className="page-item"><span className="page-link">Prev</span></li>
                <li className="page-item active"><span className="page-link">1</span></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><span className="page-link">Next</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
