import Link from 'next/link';
import type { ApproachItem } from '@/data/approach';
import { SPOTIFY_SHOW_URL, SUBSTACK_URL } from '@/data/links';

export default function ApproachGrid({ items }: { items: ApproachItem[] }) {
  return (
    <section className="approach-grid black-100-bg py-128" id="approach">
      <div className="container">
        <div className="section-title text-center mb-96">
          <span className="sub-title mb-16">What we do</span>
          <h2>Our <em>approach</em></h2>
        </div>
        <div className="approach-grid-items">
          {items.map((item) => {
            const isThoughtLeadership = item.link === '/thought-leadership';
            return (
              <div className="approach-grid-item" key={item.title}>
                <div className="approach-grid-icon">
                  <i className={item.icon} aria-hidden="true"></i>
                </div>
                <h3 className="approach-grid-title">{item.title}</h3>
                <p className="approach-grid-desc">{item.description}</p>
                {isThoughtLeadership ? (
                  <div className="approach-grid-links">
                    <Link href="/thought-leadership" className="approach-grid-link">
                      <i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i> Read &amp; listen
                    </Link>
                    <a href={SPOTIFY_SHOW_URL} className="approach-grid-link" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-spotify" aria-hidden="true"></i> Podcast
                    </a>
                    <a href={SUBSTACK_URL} className="approach-grid-link" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-pen-nib" aria-hidden="true"></i> Substack
                    </a>
                  </div>
                ) : (
                  <Link href={item.link} className="approach-grid-arrow" aria-label={`More about ${item.title}`}>
                    <i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
