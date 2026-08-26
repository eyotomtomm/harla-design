'use client';
import { useState } from 'react';
import Link from 'next/link';
import { splitAccent, type AboutCopy } from '@/data/about';

export default function AboutStyleTwo({ copy }: { copy: AboutCopy }) {
  const [activeTab, setActiveTab] = useState('who');
  const heading = splitAccent(copy.heading);

  const tabs = [
    { id: 'who', label: 'Who We Are', content: copy.intro, content2: copy.intro2 },
    { id: 'mission', label: 'Mission', content: copy.mission },
    { id: 'vision', label: 'Vision', content: copy.vision, content2: copy.vision2 },
  ];

  return (
    <section className="about-style-2 py-128">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 left">
            <div className="section-title">
              <h2>
                {heading.before}
                {heading.accent && <em>{heading.accent}</em>}
                {heading.after}
              </h2>
              <div className="mb-45">
                <ul className="tab-style-one nav nav-pills nav-fill mb-32" role="tablist">
                  {tabs.map(tab => (
                    <li className="nav-item" key={tab.id} role="presentation">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        className={`nav-link${activeTab === tab.id ? ' active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  {tabs.map(tab => (
                    <div key={tab.id} role="tabpanel" className={`tab-pane fade${activeTab === tab.id ? ' show active' : ''}`}>
                      <p>{tab.content}</p>
                      {tab.content2 && <p>{tab.content2}</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="button">
                <Link className="theme-btn" href="/contact">Contact us</Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="imgs">
              <img src={copy.aboutImage} alt="" />
              {copy.hoverImage && <img className="hovershow" src={copy.hoverImage} alt="" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
