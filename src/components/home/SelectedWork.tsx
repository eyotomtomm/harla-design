import Link from 'next/link';
import type { ProjectCategory } from '@/data/projects';

/**
 * One tile per project category, drawn from the same data as the gallery so
 * the site has a single taxonomy. Each tile links to its gallery row.
 */
export default function SelectedWork({ categories }: { categories: ProjectCategory[] }) {
  const tiles = categories
    .map(cat => ({ cat, item: cat.items.find(i => i.fit !== 'contain') ?? cat.items[0] }))
    .filter(t => t.item);

  return (
    <section className="selected-work py-128" id="work">
      <div className="container">
        <div className="section-title selected-work-head">
          <div>
            <span className="sub-title mb-16">Selected work</span>
            <h2>Projects across Africa and the GCC</h2>
          </div>
          <Link href="/projects" className="read-more">
            All projects <i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="selected-work-grid">
          {tiles.map(({ cat, item }, i) => (
            <Link
              href={`/projects#${cat.id}`}
              className={`selected-work-tile${i === 0 ? ' is-wide' : ''}`}
              key={cat.id}
            >
              <div className="selected-work-image">
                <img src={item.image} alt={item.alt} loading={i < 2 ? 'eager' : 'lazy'} />
              </div>
              <div className="selected-work-caption">
                <span className="selected-work-category">{String(i + 1).padStart(2, '0')} &middot; {cat.title}</span>
                <span className="selected-work-client">{item.client}</span>
                <span className="selected-work-meta">{item.type}{item.location ? ` · ${item.location}` : ''}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
