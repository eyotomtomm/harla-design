'use client';
import { useState } from 'react';
import Link from 'next/link';

const tabs = [
  { id: 'who', label: 'Who We Are', content: 'Harla is an architecture and interior design consultancy crafting spaces across residential, hospitality, and commercial sectors.', content2: 'We bring clarity, craft, and enduring quality to every project we undertake.' },
  { id: 'mission', label: 'Mission', content: 'To transform how people experience the spaces they inhabit — through design that balances aesthetics, function, and emotion.' },
  { id: 'vision', label: 'Vision', content: 'To be the standard for design consultancy — where every structure tells a story and every interior holds meaning.', content2: 'We envision a world where architecture serves people, not the other way around.' },
];

export default function AboutStyleTwo() {
  const [activeTab, setActiveTab] = useState('who');

  return (
    <section className="about-style-2 py-128">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 left">
            <div className="section-title">
              <h2>Where imagination meets reality</h2>
              <div className="mb-45">
                <ul className="tab-style-one nav nav-pills nav-fill mb-32">
                  {tabs.map(tab => (
                    <li className="nav-item" key={tab.id}>
                      <a className={`nav-link${activeTab === tab.id ? ' active' : ''}`} onClick={() => setActiveTab(tab.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTab(tab.id); } }} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>{tab.label}</a>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  {tabs.map(tab => (
                    <div key={tab.id} className={`tab-pane fade${activeTab === tab.id ? ' show active' : ''}`}>
                      <p>{tab.content}</p>
                      {tab.content2 && <p>{tab.content2}</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="button">
                <Link className="btn-white-bg" href="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="imgs">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80" alt="Harla studio interior" />
              <img className="hovershow" src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80" alt="Harla studio detail" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
