'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

interface ArchProject {
  id: number;
  title: string;
  categories: string[];
  description: string;
  description2?: string;
  image: string;
  linkUrl: string;
  isFullWidth: boolean;
}

const FILTERS = ['*', 'ARCHITECTURE', 'LANDSCAPE', 'DESIGN', 'INTERIOR'];

export default function ArchitectureProjects({ projects }: { projects: ArchProject[] }) {
  const [filter, setFilter] = useState('*');
  const sliderRef = useRef<Slider | null>(null);

  const filtered = filter === '*' ? projects : projects.filter(p => p.categories.includes(filter));

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  const handleFilterKeyDown = (e: React.KeyboardEvent, f: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFilter(f);
      sliderRef.current?.slickGoTo(0);
    }
  };

  return (
    <section className="architecture-area py-128">
      <div className="container">
        <div className="row rel z-1 justify-content-center">
          <div className="section-title text-center mb-96">
            <span className="sub-title mb-16">ARCHITECTURE PROJECTS</span>
            <h2>LATEST WORKS</h2>
          </div>
        </div>
        <ul className="project-filter tab-style-one justify-content-center nav nav-pills nav-fill mb-96">
          {FILTERS.map(f => (
            <li
              key={f}
              className={`nav-item${filter === f ? ' current' : ''}`}
              onClick={() => { setFilter(f); sliderRef.current?.slickGoTo(0); }}
              onKeyDown={(e) => handleFilterKeyDown(e, f)}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              <a className="nav-link">{f === '*' ? 'ALL' : f}</a>
            </li>
          ))}
        </ul>
        <div className="tab-content tab-pane project-active" style={{ position: 'relative' }}>
          {filtered.length > 1 ? (
            <>
              <Slider ref={sliderRef} {...settings}>
                {filtered.map(project => (
                  <div key={project.id}>
                    <div className={`${project.isFullWidth ? 'col-lg-12' : 'col-lg-12'} item`}>
                      <div className="row apartment-image">
                        <Link href={project.linkUrl}><img src={project.image} alt={project.title} loading="lazy" /></Link>
                      </div>
                      <div className="row apartment-content rp-0">
                        {project.isFullWidth ? (
                          <>
                            <div className="col-lg-6 pro-title">
                              <Link href={project.linkUrl}><h3>{project.title}</h3></Link>
                              <span className="category">{project.categories.join(' / ')}</span>
                            </div>
                            <div className="col-lg-6 pro-desc">
                              <p>{project.description}</p>
                              {project.description2 && <p>{project.description2}</p>}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-lg-6 pro-title">
                              <Link href={project.linkUrl}><h3>{project.title}</h3></Link>
                              <span className="category">{project.categories.join(' / ')}</span>
                            </div>
                            <div className="col-lg-6 pro-desc">
                              <p>{project.description}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="arch-slider-nav" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '40px' }}>
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => sliderRef.current?.slickPrev()}
                  style={{ background: 'none', border: '1px solid var(--heading-color)', padding: '12px 24px', color: 'var(--heading-color)', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  <i className="fa fa-long-arrow-left"></i>
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => sliderRef.current?.slickNext()}
                  style={{ background: 'none', border: '1px solid var(--heading-color)', padding: '12px 24px', color: 'var(--heading-color)', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  <i className="fa fa-long-arrow-right"></i>
                </button>
              </div>
            </>
          ) : filtered.length === 1 ? (
            <div className="col-lg-12 item">
              <div className="row apartment-image">
                <Link href={filtered[0].linkUrl}><img src={filtered[0].image} alt={filtered[0].title} loading="lazy" /></Link>
              </div>
              <div className="row apartment-content rp-0">
                <div className="col-lg-6 pro-title">
                  <Link href={filtered[0].linkUrl}><h3>{filtered[0].title}</h3></Link>
                  <span className="category">{filtered[0].categories.join(' / ')}</span>
                </div>
                <div className="col-lg-6 pro-desc">
                  <p>{filtered[0].description}</p>
                  {filtered[0].description2 && <p>{filtered[0].description2}</p>}
                </div>
              </div>
            </div>
          ) : null}
          <div className="col-lg-12 text-center" style={{ marginTop: '48px' }}>
            <Link href="/projects" className="loadmore primary-readmore mt-0">MORE PROJECTS</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
