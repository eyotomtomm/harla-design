'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

const beforeAfterPairs = [
  { before: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=60&sat=-100', after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { before: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=60&sat=-100', after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
  { before: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=60&sat=-100', after: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80' },
  { before: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=60&sat=-100', after: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80' },
  { before: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=60&sat=-100', after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { before: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=60&sat=-100', after: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80' },
  { before: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=60&sat=-100', after: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' },
];

function BeforeAfterSlider({ before, after, index }: { before: string; after: string; index: number }) {
  const [position, setPosition] = useState(50);

  return (
    <div className={`pro-02-images pro-02-images-${index + 1}`} style={{ '--position': `${position}%`, position: 'relative', overflow: 'hidden' } as React.CSSProperties}>
      <img src={after} alt="After" style={{ width: '100%', display: 'block' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: `${position}%`, height: '100%', overflow: 'hidden' }}>
        <img src={before} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className={`buttonslider buttonslider${index + 1}`}
        style={{ position: 'absolute', bottom: '20px', left: '10%', width: '80%', zIndex: 10 }}
      />
    </div>
  );
}

const TABS = ['ALL', 'HOUSE', 'VILLA', 'RESTAURANT', 'HOTEL'];

export default function Projects02Page() {
  const [activeTab, setActiveTab] = useState('ALL');

  return (
    <>
      <PageBanner
        title="<em>PROJECTS</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects 02' }]}
        backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
        backgroundImageLight="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=70"
      />
      <section className="projects-02 py-128">
        <div className="container">
          <div className="row rel z-1 justify-content-center">
            <div className="section-title text-center mb-96">
              <span className="sub-title mb-16">BEFORE &amp; AFTER</span>
              <h2>PROJECT TRANSFORMATIONS</h2>
            </div>
          </div>
          <ul className="tab-style-one nav nav-pills nav-fill mb-96 justify-content-center">
            {TABS.map(tab => (
              <li className="nav-item" key={tab}>
                <a className={`nav-link${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)} style={{ cursor: 'pointer' }}>{tab}</a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div className="row">
              {beforeAfterPairs.map((pair, i) => (
                <div className="col-lg-6 mb-64" key={i}>
                  <BeforeAfterSlider before={pair.before} after={pair.after} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
