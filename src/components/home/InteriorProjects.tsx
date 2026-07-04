'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buildSlideGroups } from '@/lib/utils';

interface InteriorItem {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  linkUrl: string;
  category: string;
}

const CATEGORIES = ['ALL', 'HOUSE', 'VILLA', 'RESTAURANT', 'HOTEL'];

export default function InteriorProjects({ items }: { items: InteriorItem[] }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>(
    Object.fromEntries(CATEGORIES.map(c => [c, 0]))
  );

  const getItems = (cat: string) => cat === 'ALL' ? items : items.filter(it => it.category === cat);

  const handlePrev = (cat: string) => {
    const groups = buildSlideGroups(getItems(cat), 3);
    setSlideIndices(prev => ({
      ...prev,
      [cat]: prev[cat] === 0 ? groups.length - 1 : prev[cat] - 1,
    }));
  };

  const handleNext = (cat: string) => {
    const groups = buildSlideGroups(getItems(cat), 3);
    setSlideIndices(prev => ({
      ...prev,
      [cat]: prev[cat] === groups.length - 1 ? 0 : prev[cat] + 1,
    }));
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent, cat: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveCategory(cat);
    }
  };

  return (
    <section className="interior-area black-110-bg py-128 justify-content-center">
      <div className="container-fluid">
        <div className="container rel z-1 justify-content-center text-center">
          <div className="text-center mb-96">
            <span className="sub-title mb-16">INTERIOR PROJECTS</span>
            <h2>LATEST WORKS</h2>
          </div>
        </div>
        <div className="container section-heading">
          <div className="nav-fill-left">
            <ul className="tab-style-one nav nav-pills nav-fill mb-96">
              {CATEGORIES.map(cat => (
                <li className="nav-item" key={cat}>
                  <a
                    className={`nav-link${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    onKeyDown={(e) => handleCategoryKeyDown(e, cat)}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                  >
                    {cat}
                  </a>
                  {activeCategory === cat && (
                    <div className="carousel-buttons">
                      <button className="prev" type="button" onClick={() => handlePrev(cat)} aria-label="Previous project">
                        <span className="carousel-control-prev-icon" aria-hidden="true"><i className="fa fa-long-arrow-left"></i></span>
                      </button>
                      <button type="button" onClick={() => handleNext(cat)} aria-label="Next project">
                        <span className="carousel-control-next-icon" aria-hidden="true"><i className="fa fa-long-arrow-right"></i></span>
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tab-content">
          {CATEGORIES.map(cat => {
            const catItems = getItems(cat);
            const groups = buildSlideGroups(catItems, 3);
            const currentIndex = slideIndices[cat] || 0;

            return (
              <div
                key={cat}
                className={`tab-pane fade${activeCategory === cat ? ' show active' : ''}`}
              >
                <div className="carousel slide interior-nav">
                  <div className="carousel-inner" role="listbox">
                    {groups.map((group, gi) => (
                      <div className={`carousel-item${gi === currentIndex ? ' active' : ''}`} key={gi}>
                        {group.map((item, si) => (
                          <div className="col-lg-6 interior-act" key={`${gi}-${si}`}>
                            <Link href={item.linkUrl}><img src={item.image} alt={item.title} loading="lazy" /></Link>
                            <div className="carousel-caption">
                              <span className="sub-title mb-16">{item.subtitle}</span>
                              <Link href={item.linkUrl}><h5 className="mb-32">{item.title}</h5></Link>
                              <p className="mb-32">{item.description}</p>
                              <Link href={item.linkUrl} className="hero-btn">
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
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
