'use client';
import { useState } from 'react';
import { splitAccent, paragraphs, type AboutCopy } from '@/data/about';

const pillars = [
  { icon: 'fas fa-users', title: 'People', text: 'Every project ends with someone living, working, or gathering in it. We keep that person central to every decision — from programme definition through to design sign-off.' },
  { icon: 'fas fa-balance-scale', title: 'Rigor', text: 'Strong intentions need an equally strong process behind them. We bring the commercial discipline, coordination, and oversight that turns good ideas into decisions that hold up under pressure.' },
  { icon: 'fas fa-eye', title: 'Foresight', text: 'We think beyond opening day. Smart cities thinking, climate resilience, and long-term relevance are built into our advisory approach from the start — because the best developments are still performing decades later.' },
  { icon: 'fas fa-handshake', title: 'Follow-Through', text: 'We stay in the room through every stage — through value engineering, through design development, through the hard conversations — until the vision is fully protected and the project is ready to deliver on it.' },
];

export default function AboutTabs({ copy }: { copy: AboutCopy }) {
  const [active, setActive] = useState(0);
  const heading = splitAccent(copy.homeHeading);

  const tabs = [
    { id: 'vision', label: 'Vision', paragraphs: [copy.vision, copy.vision2].filter((p): p is string => !!p) },
    { id: 'mission', label: 'Mission', paragraphs: [copy.mission] },
    { id: 'about', label: 'About', paragraphs: paragraphs(copy.story) },
  ];
  const current = tabs[active];

  return (
    <section className="about-harla black-110-bg py-128">
      <div className="container">
        <div className="about-harla-header">
          <span className="sub-title mb-16">Who we are</span>
          <h2>
            {heading.before}
            {heading.accent && <><br /><em>{heading.accent}</em></>}
            {heading.after}
          </h2>
          <p className="about-harla-intro">{copy.intro}</p>
        </div>

        <div className="about-harla-tabs" role="tablist" aria-label="About Harla Design">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`about-panel-${tab.id}`}
              id={`about-tab-${tab.id}`}
              className={`about-harla-tab${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="about-harla-tab-num">0{i + 1}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="about-harla-content" role="tabpanel" id={`about-panel-${current.id}`} aria-labelledby={`about-tab-${current.id}`}>
          {current.paragraphs.length > 1 ? (
            <div className="about-harla-paragraphs">
              {current.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ) : (
            <p className="about-harla-single">{current.paragraphs[0]}</p>
          )}
        </div>

        <div className="about-harla-pillars">
          <div className="about-harla-pillars-header">
            <span className="sub-title mb-16">Our pillars</span>
          </div>
          <div className="about-harla-pillars-grid">
            {pillars.map((pillar) => (
              <div className="about-harla-pillar" key={pillar.title}>
                <div className="about-harla-pillar-icon">
                  <i className={pillar.icon} aria-hidden="true"></i>
                </div>
                <h3 className="h5">{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
