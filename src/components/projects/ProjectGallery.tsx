'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import type { ProjectCategory, ProjectItem } from '@/data/projects';

function metaLine(item: ProjectItem) {
  return item.location ? `${item.type} · ${item.location}` : item.type;
}

export default function ProjectGallery({ categories }: { categories: ProjectCategory[] }) {
  const [lightbox, setLightbox] = useState<{ categoryId: string; index: number } | null>(null);

  const openCategory = lightbox ? categories.find(c => c.id === lightbox.categoryId) : undefined;
  const tiles = (cat: ProjectCategory) => cat.items.filter(item => item.fit !== 'contain');
  const named = (cat: ProjectCategory) => cat.items.filter(item => item.fit === 'contain');

  return (
    <>
      <section className="project-gallery py-128">
        <div className="container">
          <nav className="project-gallery-nav" aria-label="Project categories">
            {categories.map((cat, i) => (
              <a key={cat.id} href={`#${cat.id}`}>
                <span>{String(i + 1).padStart(2, '0')}</span> {cat.title}
              </a>
            ))}
          </nav>

          {categories.map((cat, i) => (
            <div className="project-gallery-row" id={cat.id} key={cat.id}>
              <div className="project-gallery-head">
                <div>
                  <span className="sub-title mb-16">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="h3">{cat.title}</h2>
                </div>
                <p>{cat.description}</p>
              </div>

              <div className="project-gallery-grid">
                {tiles(cat).map((item, j) => (
                  <button
                    type="button"
                    className="project-gallery-item"
                    key={`${cat.id}-${j}`}
                    onClick={() => setLightbox({ categoryId: cat.id, index: j })}
                    aria-label={`${item.client} — ${metaLine(item)}. Open larger image.`}
                  >
                    <div className="project-gallery-image">
                      <img src={item.image} alt={item.alt} loading="lazy" />
                    </div>
                    <div className="project-gallery-caption">
                      <span className="project-gallery-client">{item.client}</span>
                      <span className="project-gallery-meta">{metaLine(item)}</span>
                      <span className="project-gallery-view" aria-hidden="true">View</span>
                    </div>
                  </button>
                ))}
              </div>
              {named(cat).length > 0 && (
                <p className="project-gallery-also">
                  Also in {cat.title.toLowerCase()}:{' '}
                  {named(cat).map(item => `${item.client} (${item.type})`).join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Lightbox
        open={lightbox !== null}
        close={() => setLightbox(null)}
        index={lightbox?.index ?? 0}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: 'center' }}
        slides={(openCategory ? tiles(openCategory) : []).map(item => ({
          src: item.image,
          alt: item.alt,
          title: item.client,
          description: metaLine(item),
        }))}
        styles={{ container: { backgroundColor: 'rgba(10, 22, 40, 0.96)' } }}
      />
    </>
  );
}
