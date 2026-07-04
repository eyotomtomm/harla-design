'use client';

import { useInView, useCountUp } from '@/hooks/useInView';

const counters = [
  { target: 1200, suffix: 'K', title: 'Happy Clients', delay: '0.2s' },
  { target: 15, suffix: '', title: 'Years Experience', delay: '0.4s' },
  { target: 46, suffix: '+', title: 'Best Partners', delay: '0.2s' },
  { target: 1600, suffix: '', title: 'Projects Done', delay: '0.4s' },
];

function CounterItem({ target, suffix, title }: { target: number; suffix: string; title: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useCountUp(target, 3000, inView);

  return (
    <div className="mobile-mb col-xs-3 col-lg-3" ref={ref}>
      <div className="counter-text-wrap">
        <div className="d-flex">
          <h2 className="count-text mb-32">{count}</h2>
          {suffix && <span className="h2">{suffix}</span>}
        </div>
        <h5 className="counter-title">{title}</h5>
      </div>
    </div>
  );
}

export default function AchievementCounter() {
  return (
    <section className="achievement-area text-white" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)' }}>
      <div className="container">
        <div className="row">
          <div className="counter-wrap">
            <div className="row">
              {counters.map((c, i) => (
                <CounterItem key={i} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
