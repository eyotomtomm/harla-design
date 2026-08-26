import Link from 'next/link';
import type { ProjectCategory } from '@/data/projects';

const EXCLUDED = new Set(['Lobby Concept']);

/** Where we work + who we've worked with, derived from the gallery data. */
export default function ClientsSection({ categories }: { categories: ProjectCategory[] }) {
  const clients = Array.from(
    new Set(categories.flatMap(cat => cat.items.map(i => i.client)).filter(c => !EXCLUDED.has(c))),
  );
  const locations = Array.from(
    new Set(categories.flatMap(cat => cat.items.map(i => i.location)).filter((l): l is string => !!l)),
  );

  return (
    <section className="clients-section py-128" id="clients">
      <div className="container">
        <div className="clients-grid">
          <div className="clients-where">
            <span className="sub-title mb-16">Where we work</span>
            <h2>Based in Dubai, working across Africa and the GCC</h2>
            <dl className="clients-facts">
              <div>
                <dt>Studio</dt>
                <dd>SS Tower, Al Barsha South 3, Dubai UAE</dd>
              </div>
              <div>
                <dt>Projects to date</dt>
                <dd>{locations.join(' · ')}</dd>
              </div>
              <div>
                <dt>Engagements</dt>
                <dd>Advisory retainers · Project mandates · Speaking</dd>
              </div>
            </dl>
          </div>

          <div className="clients-list">
            <span className="sub-title mb-16">Clients</span>
            <ul>
              {clients.map(client => (
                <li key={client}>{client}</li>
              ))}
            </ul>
            <Link href="/projects" className="read-more">
              See the work <i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
