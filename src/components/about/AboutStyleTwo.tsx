'use client';
import { useState } from 'react';
import Link from 'next/link';

const tabs = [
  { id: 'who', label: 'Who We Are', content: 'We bring strategy to architectural projects, helping clients make better decisions, create greater value, and design for impact.', content2: 'We are a small, senior advisory team that works directly alongside developers, public authorities, institutions, and investors across Africa and the GCC.' },
  { id: 'mission', label: 'Mission', content: 'Harla Design exists to make sure great development intentions become great built outcomes. We bring strategic clarity, design accountability, and rigorous coordination to every project we touch — so that what gets delivered reflects what was originally envisioned, for the people who will ultimately use it.' },
  { id: 'vision', label: 'Vision', content: 'To improve architectural design outcomes through thoughtful strategy, informed decisions, and attention from the first move to the last detail — with clients who understand that the quality of what you build actually matters.', content2: 'Design for impact.' },
];

export default function AboutStyleTwo() {
  const [activeTab, setActiveTab] = useState('who');

  return (
    <section className="about-style-2 py-128">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 left">
            <div className="section-title">
              <h2>Strategy first, <em>design for impact.</em></h2>
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
              <img src="/images/projects/africa-cdc/headquarters.jpg" alt="Africa CDC headquarters, Addis Ababa" />
              <img className="hovershow" src="/images/projects/abay-bank/tower.jpg" alt="Abay Bank headquarters tower" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
