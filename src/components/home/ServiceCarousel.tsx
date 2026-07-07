'use client';
import { useState, useCallback } from 'react';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const items: ServiceItem[] = [
  { id: 1, title: 'Research', description: 'Deep-dive analysis into context, users, and market dynamics.', image: '/images/projects/lobby-design/lobby-a.jpg' },
  { id: 2, title: 'Strategy', description: 'Frameworks that align vision with measurable outcomes.', image: '/images/projects/abay-bank/lobby-1.jpg' },
  { id: 3, title: 'Design', description: 'Spatial and visual solutions shaped by insight.', image: '/images/projects/lobby-design/lobby-b.jpg' },
  { id: 4, title: 'UX Journey', description: 'End-to-end experience mapping from entry to engagement.', image: '/images/projects/anbessa-apartment/office-lounge.png' },
  { id: 5, title: 'Innovate', description: 'Emerging tools and methods applied to built environments.', image: '/images/projects/lobby-design/lobby-c.jpg' },
];

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
  }, []);

  const active = items[activeIndex];
  const num = String(activeIndex + 1).padStart(2, '0');

  return (
    <section className="services-fullbleed">
      <div className="services-fullbleed-slide">
        {items.map((item, i) => (
          <div
            className={`services-fullbleed-img${i === activeIndex ? ' active' : ''}`}
            key={item.id}
          >
            <img src={item.image} alt={item.title} />
          </div>
        ))}
        <div className="services-fullbleed-overlay" />

        <div className="container services-fullbleed-content">
          <div className="services-fullbleed-number">{num}.</div>
          <h2 className="services-fullbleed-title">{active.title}</h2>
          <p className="services-fullbleed-desc">{active.description}</p>

          <div className="services-fullbleed-nav">
            <button type="button" onClick={handlePrev} aria-label="Previous">
              <i className="fa fa-long-arrow-left"></i>
            </button>
            <span className="services-fullbleed-counter">
              {num} / {String(items.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={handleNext} aria-label="Next">
              <i className="fa fa-long-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="services-fullbleed-tabs">
          {items.map((item, i) => (
            <button
              key={item.id}
              className={i === activeIndex ? 'active' : ''}
              onClick={() => setActiveIndex(i)}
              type="button"
            >
              {String(i + 1).padStart(2, '0')}. {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
