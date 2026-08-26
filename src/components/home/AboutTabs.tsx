'use client';
import { useState } from 'react';

interface TabData {
  id: string;
  label: string;
  text?: string;
  paragraphs?: string[];
}

const tabs: TabData[] = [
  {
    id: 'vision',
    label: 'VISION',
    text: 'To improve architectural design outcomes through thoughtful strategy, informed decisions, and attention from the first move to the last detail — with clients who understand that the quality of what you build actually matters. Design for impact.',
  },
  {
    id: 'mission',
    label: 'MISSION',
    text: 'Harla Design exists to make sure great development intentions become great built outcomes. We bring strategic clarity, design accountability, and rigorous coordination to every project we touch — so that what gets delivered reflects what was originally envisioned, for the people who will ultimately use it.',
  },
  {
    id: 'about',
    label: 'ABOUT',
    paragraphs: [
      'Great developments start with a clear vision. Keeping that vision intact — through feasibility, through design, through the pressures of budget and programme — is where Harla Design comes in.',
      'We are a small, senior advisory team that works directly alongside developers, bringing strategic thinking and design accountability to every stage of the process. We help define what a project should be, coordinate the teams responsible for delivering it, and stay close enough to the work to make sure the original ambition survives contact with reality.',
      'Our clients are developers and investors who care deeply about what they build, how it gets built, and the people it will serve. That focus on quality and purpose is what every Harla Design engagement is built around.',
    ],
  },
];

const pillars = [
  {
    icon: 'fas fa-users',
    title: 'People',
    text: 'Every project ends with someone living, working, or gathering in it. We keep that person central to every decision — from programme definition through to design sign-off.',
  },
  {
    icon: 'fas fa-balance-scale',
    title: 'Rigor',
    text: 'Strong intentions need an equally strong process behind them. We bring the commercial discipline, coordination, and oversight that turns good ideas into decisions that hold up under pressure.',
  },
  {
    icon: 'fas fa-eye',
    title: 'Foresight',
    text: 'We think beyond opening day. Smart cities thinking, climate resilience, and long-term relevance are built into our advisory approach from the start — because the best developments are still performing decades later.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'Follow-Through',
    text: 'We stay in the room through every stage — through value engineering, through design development, through the hard conversations — until the vision is fully protected and the project is ready to deliver on it.',
  },
];

export default function AboutTabs() {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <section className="about-harla black-110-bg py-128">
      <div className="container">
        {/* Section header */}
        <div className="about-harla-header">
          <span className="sub-title mb-16">Who we are</span>
          <h2>Built on conviction,<br /><em>delivered with care.</em></h2>
          <p className="about-harla-intro">
            We bring strategy to architectural projects, helping clients make better decisions,
            create greater value, and design for impact.
          </p>
        </div>

        {/* Tab strip */}
        <div className="about-harla-tabs">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              className={`about-harla-tab${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="about-harla-tab-num">0{i + 1}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="about-harla-content">
          {current.paragraphs ? (
            <div className="about-harla-paragraphs">
              {current.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <p className="about-harla-single">{current.text}</p>
          )}
        </div>

        {/* Pillars */}
        <div className="about-harla-pillars">
          <div className="about-harla-pillars-header">
            <span className="sub-title mb-16">Our pillars</span>
          </div>
          <div className="about-harla-pillars-grid">
            {pillars.map((pillar, i) => (
              <div className="about-harla-pillar" key={i}>
                <div className="about-harla-pillar-icon">
                  <i className={pillar.icon}></i>
                </div>
                <h5>{pillar.title}</h5>
                <p>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
