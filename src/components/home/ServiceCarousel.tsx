'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  linkUrl?: string;
}

export default function ServiceCarousel({ services }: { services: ServiceItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Build slide groups of 3 (replicating the original jQuery clone logic)
  // Each group: [prev peek, center featured, next peek]
  const groups = services.map((_, i) => {
    const items: ServiceItem[] = [];
    for (let j = 0; j < 3; j++) {
      items.push(services[(i + j) % services.length]);
    }
    return items;
  });

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev === 0 ? groups.length - 1 : prev - 1));
  }, [groups.length]);

  const handleNext = useCallback(() => {
    setActiveIndex(prev => (prev === groups.length - 1 ? 0 : prev + 1));
  }, [groups.length]);

  return (
    <section className="service-area black-120-bg py-128 justify-content-center">
      <div className="container-fluid">
        <div className="container d-flex section-heading mb-96">
          <div className="section-title">
            <h2>SERVICES</h2>
          </div>
          <div className="carousel-buttons">
            <button className="prev" type="button" onClick={handlePrev} aria-label="Previous service">
              <span className="carousel-control-prev-icon" aria-hidden="true"><i className="fa fa-long-arrow-left"></i></span>
            </button>
            <button type="button" onClick={handleNext} aria-label="Next service">
              <span className="carousel-control-next-icon" aria-hidden="true"><i className="fa fa-long-arrow-right"></i></span>
            </button>
          </div>
        </div>
        <div className="carousel slide justify-content-center">
          <div className="carousel-inner" role="listbox">
            {groups.map((group, gi) => (
              <div className={`carousel-item${gi === activeIndex ? ' active' : ''}`} key={gi}>
                {group.map((svc, si) => (
                  <div className="col-lg-6 service-act" key={`${gi}-${si}`}>
                    <Link href={svc.linkUrl || '/projects'}>
                      <img src={svc.image} alt={svc.title} loading="lazy" />
                    </Link>
                    <div className="carousel-caption">
                      <h3 className="mb-16">{svc.title}</h3>
                      <p className="mb-32">{svc.description}</p>
                      <Link href={svc.linkUrl || '/projects'}>
                        <span className="right-arrow"><i className="fa fa-long-arrow-right"></i></span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
