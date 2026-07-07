import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

const blogPosts = [
  {
    title: 'The Art of Boutique Hotel Design',
    slug: 'boutique-hotel-design',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80'],
    date: '15 July 2024',
    comments: 1,
    excerpt: 'How thoughtful spatial planning and material selection transform hospitality experiences from ordinary to memorable.',
    type: 'carousel',
  },
  {
    title: 'Material Palettes That Endure',
    slug: 'material-palettes',
    images: ['https://images.unsplash.com/photo-1616137466211-f736a1f8c7be?w=900&q=80'],
    date: '15 July 2024',
    comments: 1,
    excerpt: 'Choosing finishes that age gracefully and tell a richer story over time — from natural stone to patinated metals.',
    type: 'video',
    videoUrl: 'https://www.youtube.com/watch?v=9Y7ma241N8k',
  },
  {
    title: 'Designing for Natural Light',
    slug: 'designing-natural-light',
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80'],
    date: '15 July 2024',
    comments: 1,
    excerpt: 'Why orientation and aperture are the most important design decisions in residential architecture.',
    type: 'image',
  },
];

const recentPosts = [
  { title: 'Best bedroom design trends ideas 2024', slug: 'best-bedroom-design-trends', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80', date: '15 July 2024' },
  { title: 'Bedroom ideas to inspire a makeover', slug: 'modern-bedroom-ideas', image: 'https://images.unsplash.com/photo-1616137466211-f736a1f8c7be?w=300&q=80', date: '15 July 2024' },
  { title: 'Bedroom makeover ideas: 10 luxury looks', slug: 'bedroom-makeover-ideas', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&q=80', date: '15 July 2024' },
];

const categories = [
  { name: 'Web', count: 1 },
  { name: 'Office', count: 5 },
  { name: 'News', count: 3 },
  { name: 'Awards', count: 4 },
];

const tags = ['Photography', 'Trends', 'Interactive', 'Design', 'Interior', 'Awards'];

export default function BlogPage() {
  return (
    <>
      <PageBanner
        title="<em>BLOG</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
        backgroundImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
      />

      <section className="blog-content py-128 align-items-center">
        <div className="container">
          <div className="row detail-info">
            <div className="col-lg-8 left">
              {blogPosts.map((post, i) => (
                <div key={i} className="blog-item">
                  <div className={`blog-thumb${post.type === 'video' ? ' video' : ''}`}>
                    <img src={post.images[0]} alt={post.title} />
                    {post.type === 'video' && post.videoUrl && (
                      <a href={post.videoUrl} className="mfp-iframe video-play" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                      </a>
                    )}
                  </div>
                  <div className="blog-desc black-120-bg">
                    <h4>{post.title}</h4>
                    <ul className="blog-meta mb-16">
                      <li><i className="fal fa-calendar-alt"></i> {post.date}</li>
                      <li><i className="fal fa-comment-dots"></i> {post.comments} {post.comments === 1 ? 'Comment' : 'Comments'}</li>
                    </ul>
                    <p className="mb-32">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="primary-readmore">Read more</Link>
                  </div>
                </div>
              ))}

              <div className="col-lg-12">
                <ul className="pagination mt-96 flex-wrap justify-content-center">
                  <li className="page-item"><span className="page-link">Prev</span></li>
                  <li className="page-item active"><span className="page-link">1</span></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><span className="page-link">Next</span></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 sidebar">
              <div className="widget-wrapper search-wg">
                <form className="search-form">
                  <div className="form-input">
                    <input type="text" placeholder="Search..." />
                    <span className="form-button"><button type="button">Search</button></span>
                  </div>
                </form>
              </div>

              <div className="widget-wrapper black-120-bg">
                <h5>Recent Post</h5>
                <ul className="recent-posts">
                  {recentPosts.map((post, i) => (
                    <li key={i}>
                      <Link href={`/blog/${post.slug}`} className="recent-thumb"><img src={post.image} alt={post.title} loading="lazy" /></Link>
                      <div className="content">
                        <i className="fal fa-calendar-alt"></i> {post.date}
                        <Link href={`/blog/${post.slug}`}><h6>{post.title}</h6></Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="widget-wrapper widget-categories black-120-bg">
                <h5>Categories</h5>
                <ul className="widget-categories">
                  {categories.map((cat, i) => (
                    <li key={i}><a href="#">{cat.name}</a> ({cat.count})</li>
                  ))}
                </ul>
              </div>

              <div className="widget-wrapper widget-tags black-120-bg">
                <h5>Tags</h5>
                <ul className="tags">
                  {tags.map((tag, i) => (
                    <li key={i}><a className="link" href="#">{tag}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
