import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

const allProjects = [
  { title: 'Abay Bank Headquarters', slug: 'abay-bank', category: 'COMMERCIAL', image: '/images/projects/abay-bank/lobby-1.jpg', description: 'A grand lobby with double-height stone paneling and natural light.' },
  { title: 'Anbessa Office & Apartment', slug: 'anbessa-apartment', category: 'OFFICE', image: '/images/projects/anbessa-apartment/office-lounge.png', description: 'Executive floors blending focus with hospitality.' },
  { title: 'Lobby Concept Design', slug: 'lobby-design', category: 'HOTEL', image: '/images/projects/lobby-design/lobby-b.jpg', description: 'Sculptural forms in a soaring double-height atrium.' },
  { title: 'Anbessa Apartment Amenities', slug: 'anbessa-apartment', category: 'RESIDENTIAL', image: '/images/projects/anbessa-apartment/coffee-area.png', description: 'Coffee lounge, gym, and communal spaces designed for living.' },
];

const allBlogPosts = [
  { title: 'The Art of Boutique Hotel Design', slug: 'boutique-hotel-design', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', date: '15 July 2024', excerpt: 'How thoughtful spatial planning transforms hospitality experiences.' },
  { title: 'Material Palettes That Endure', slug: 'material-palettes', image: 'https://images.unsplash.com/photo-1616137466211-f736a1f8c7be?w=600&q=80', date: '15 July 2024', excerpt: 'Choosing finishes that age gracefully and tell a richer story over time.' },
  { title: 'Designing for Natural Light', slug: 'designing-natural-light', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', date: '15 July 2024', excerpt: 'Why orientation and aperture are the most important design decisions.' },
];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q || '').trim().toLowerCase();

  let projects: typeof allProjects = [];
  let blogPosts: typeof allBlogPosts = [];

  if (query) {
    // Try DB search first, fall back to static data
    try {
      const prisma = (await import('@/lib/prisma')).default;
      const dbProjects = await prisma.project.findMany({
        where: { OR: [{ title: { contains: query } }, { description: { contains: query } }] },
      });
      if (dbProjects.length > 0) {
        projects = dbProjects.map(p => ({ title: p.title, slug: p.slug, category: '', image: p.featuredImage, description: p.description }));
      } else {
        projects = allProjects.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
      }

      const dbPosts = await prisma.blogPost.findMany({
        where: { OR: [{ title: { contains: query } }, { content: { contains: query } }] },
      });
      if (dbPosts.length > 0) {
        blogPosts = dbPosts.map(p => ({ title: p.title, slug: p.slug, image: p.featuredImage, date: p.publishedAt.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }), excerpt: p.excerpt }));
      } else {
        blogPosts = allBlogPosts.filter(p => p.title.toLowerCase().includes(query));
      }
    } catch {
      projects = allProjects.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
      blogPosts = allBlogPosts.filter(p => p.title.toLowerCase().includes(query));
    }
  }

  const totalResults = projects.length + blogPosts.length;

  return (
    <>
      <PageBanner
        title="SEARCH RESULTS"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
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
                <Link href="/blog" className="primary-readmore">View Blog</Link>
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
                            <Link href={`/projects/${project.slug}`}>
                              <img src={project.image} alt={project.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                            </Link>
                          </div>
                          <div className="blog-desc black-120-bg" style={{ padding: '24px' }}>
                            <h6><Link href={`/projects/${project.slug}`}>{project.title}</Link></h6>
                            {project.category && <span className="sub-title">{project.category}</span>}
                            <p className="mt-16">{project.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {blogPosts.length > 0 && (
                <>
                  <h4 className="mb-32">Blog Posts</h4>
                  <div className="row">
                    {blogPosts.map((post, i) => (
                      <div key={i} className="col-lg-4 col-md-6 mb-32">
                        <div className="blog-item">
                          <div className="blog-thumb">
                            <Link href={`/blog/${post.slug}`}>
                              <img src={post.image} alt={post.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                            </Link>
                          </div>
                          <div className="blog-desc black-120-bg" style={{ padding: '24px' }}>
                            <h6><Link href={`/blog/${post.slug}`}>{post.title}</Link></h6>
                            <span><i className="fal fa-calendar-alt"></i> {post.date}</span>
                            <p className="mt-16">{post.excerpt}</p>
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
