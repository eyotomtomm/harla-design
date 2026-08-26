import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';
import { projectCategories } from '@/data/projects';

const pages = [
  { title: 'About Harla Design', href: '/about', description: 'Who we are, our mission, and our vision.', keywords: 'about who we are mission vision strategy advisory' },
  { title: 'Our Approach', href: '/about#approach', description: 'Development, strategy, design, experience, smart cities, thought leadership.', keywords: 'approach development strategy design experience smart cities services' },
  { title: 'Thought Leadership', href: '/thought-leadership', description: 'The podcast on Spotify and our Substack, Beneath the Concrete.', keywords: 'thought leadership podcast spotify substack writing blog beneath the concrete' },
  { title: 'Contact', href: '/contact', description: 'Begin a conversation.', keywords: 'contact email phone get in touch dubai' },
];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q || '').trim().toLowerCase();

  const projects = query
    ? projectCategories.flatMap(cat =>
        cat.items
          .filter(item =>
            [item.client, item.type, item.location ?? '', cat.title].join(' ').toLowerCase().includes(query),
          )
          .map(item => ({ ...item, category: cat.title, href: `/projects#${cat.id}` })),
      )
    : [];

  const matchedPages = query
    ? pages.filter(p => `${p.title} ${p.description} ${p.keywords}`.toLowerCase().includes(query))
    : [];

  const totalResults = projects.length + matchedPages.length;

  return (
    <>
      <PageBanner
        title="SEARCH RESULTS"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
        backgroundImage="/images/projects/abay-bank/lobby-1.jpg"
      />

      <section className="blog-content py-128">
        <div className="container">
          {!query ? (
            <div className="text-center">
              <h3 className="mb-32">Please enter a search term.</h3>
              <Link href="/" className="primary-readmore">Back To Home</Link>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center">
              <h3 className="mb-32">No results found for &ldquo;{q}&rdquo;</h3>
              <p className="mb-32">Try a different search term or browse our pages.</p>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
                <Link href="/projects" className="primary-readmore">View Projects</Link>
                <Link href="/thought-leadership" className="primary-readmore">Thought Leadership</Link>
              </div>
            </div>
          ) : (
            <>
              <h3 className="mb-64">{totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;</h3>

              {projects.length > 0 && (
                <>
                  <h4 className="mb-32">Projects</h4>
                  <div className="row mb-64">
                    {projects.map((project, i) => (
                      <div key={i} className="col-lg-4 col-md-6 mb-32">
                        <div className="blog-item">
                          <div className="blog-thumb">
                            <Link href={project.href}>
                              <img src={project.image} alt={project.alt} style={{ width: '100%', height: '250px', objectFit: project.fit === 'contain' ? 'contain' : 'cover' }} />
                            </Link>
                          </div>
                          <div className="blog-desc black-120-bg" style={{ padding: '24px' }}>
                            <h6><Link href={project.href}>{project.client}</Link></h6>
                            <span className="sub-title">{project.category}</span>
                            <p className="mt-16">{project.type}{project.location ? ` · ${project.location}` : ''}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {matchedPages.length > 0 && (
                <>
                  <h4 className="mb-32">Pages</h4>
                  <div className="row">
                    {matchedPages.map((page, i) => (
                      <div key={i} className="col-lg-4 col-md-6 mb-32">
                        <div className="blog-item">
                          <div className="blog-desc black-120-bg" style={{ padding: '24px' }}>
                            <h6><Link href={page.href}>{page.title}</Link></h6>
                            <p className="mt-16">{page.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
