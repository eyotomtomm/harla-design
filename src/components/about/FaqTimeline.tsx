'use client';

import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

const faqItems = [
  {
    question: 'When is the right time to start designing your home?',
    subtitle: 'The best time is during the planning phase — before construction begins.',
    answer1: 'Engaging a design consultancy early ensures that structural decisions, spatial flow, and material choices are aligned from the start. Retrofitting design after construction is costly and limiting.',
    answer2: 'Whether you are building new or renovating, early collaboration leads to more cohesive, efficient, and beautiful results.',
  },
  {
    question: 'What should I consider before an interior design project?',
    subtitle: 'Start with how you want the space to feel, not just how it should look.',
    answer1: 'Key considerations include lifestyle needs, natural light, traffic flow, material longevity, and budget allocation. A good design brief captures all of these before the first sketch.',
    answer2: 'We guide clients through this process to ensure every decision is intentional and informed.',
  },
  {
    question: 'How should I prepare for a design consultation?',
    subtitle: 'Gather inspiration, define your priorities, and be open to possibilities.',
    answer1: 'Collect images of spaces you admire, note what you like about your current home, and identify what frustrates you. This gives your designer a clear starting point.',
    answer2: 'Knowing your budget range and timeline expectations also helps us tailor our approach from the very first meeting.',
  },
  {
    question: 'How does Harla collaborate with contractors and builders?',
    subtitle: 'We work as an integrated team throughout the project lifecycle.',
    answer1: 'Our consultancy coordinates closely with builders, engineers, and tradespeople to ensure design intent is preserved through construction. We provide detailed specifications and regular site oversight.',
    answer2: 'This hands-on collaboration minimizes errors, controls costs, and delivers results that match the original vision.',
  },
  {
    question: 'What types of projects does Harla take on?',
    subtitle: 'Residential, hospitality, commercial, and bespoke private commissions.',
    answer1: 'From private homes and villas to boutique hotels and restaurant interiors, we bring the same level of care and craft to every scale of project.',
    answer2: 'Each project is treated as unique — we do not apply templates or one-size-fits-all solutions.',
  },
];

export default function FaqTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();
  const rulerSrc = theme === 'light' ? '/images/work-process/ruler-black.png' : '/images/work-process/ruler.png';

  return (
    <section className="faq-area py-128 black-110-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-1 col-lg-1">
            <p className="faq-p-rotate">FREQUENTLY ASKED QUESTIONS</p>
          </div>
          <div className="mobile-ml-96 col-sm-3 col-lg-3">
            <div className="timeline-content">
              {faqItems.map((_, i) => (
                <div
                  key={i}
                  className={`timeline-item${activeIndex === i ? ' active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveIndex(i); } }}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                >
                  <img className="ishow" src={rulerSrc} alt="ruler" />
                  <img className="ifade" src="/images/work-process/ruler-3.png" alt="ruler" />
                  <div className="icon h2">{String(i + 1).padStart(2, '0')}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-sm-8 col-lg-8">
            <div className="timeline-images">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="content"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=60)',
                    display: activeIndex === i ? 'block' : 'none',
                  }}
                >
                  <div className="faq-text">
                    <span className="h5 title mb-32">{item.question}</span>
                    <h6 className="mb-32">{item.subtitle}</h6>
                    <p>{item.answer1}</p>
                    <p>{item.answer2}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
