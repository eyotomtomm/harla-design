import Link from 'next/link';
import PageBanner from '@/components/layout/PageBanner';

const blogPost = {
  title: 'The Art of Boutique Hotel Design',
  date: '15 July 2024',
  author: 'Harla',
  image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80',
  content: [
    'Boutique hotel design is about creating an atmosphere that feels both curated and effortless. Every surface, every sightline, every transition between spaces should serve the guest experience without demanding attention.',
    'At Harla, we approach hospitality projects with the same intimacy we bring to private residences. The lobby should feel like a living room. The corridors should feel like galleries. The rooms should feel like home — only better.',
    'The most successful hotel interiors balance three things: local context, material honesty, and spatial generosity. When these align, the design disappears and the experience takes over.',
  ],
  tags: ['Hospitality', 'Design', 'Interiors'],
};

const comments = [
  {
    name: 'Sarah Johnson',
    date: '20 July 2024',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    text: 'Great article! Really inspired me to redesign my bedroom.',
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

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <PageBanner
        title="BLOG DETAILS"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Blog Details' }]}
        backgroundImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
      />

      <section className="blog-content blog-details py-128 align-items-center">
        <div className="container">
          <div className="row detail-info">
            <div className="col-lg-8 left">
              <div className="blog-item">
                <div className="blog-thumb">
                  <img src={blogPost.image} alt={blogPost.title} />
                </div>
                <div className="blog-desc black-120-bg">
                  <h4>{blogPost.title}</h4>
                  <ul className="blog-meta mb-16">
                    <li><i className="fal fa-calendar-alt"></i> {blogPost.date}</li>
                    <li><i className="fal fa-user"></i> {blogPost.author}</li>
                  </ul>
                  {blogPost.content.map((p, i) => (
                    <p key={i} className="mb-16">{p}</p>
                  ))}
                </div>
              </div>

              <div className="pro-tags mt-32">
                <span>TAGS:</span>
                <ul className="tag-list">
                  {blogPost.tags.map((tag, i) => (
                    <li key={i}><a href="#">{tag}</a></li>
                  ))}
                </ul>
              </div>

              <div className="comments-area mt-64">
                <h4 className="mb-32">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h4>
                {comments.map((comment, i) => (
                  <div key={i} className="comment-item d-flex mb-32">
                    <div className="comment-author-img">
                      <img src={comment.image} alt={comment.name} style={{ width: 80, height: 80, borderRadius: '50%' }} />
                    </div>
                    <div className="comment-content ms-3">
                      <h6>{comment.name}</h6>
                      <span className="comment-date"><i className="fal fa-calendar-alt"></i> {comment.date}</span>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="comment-form-area mt-64">
                <h4 className="mb-32">Leave a Comment</h4>
                <form className="comment-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" required />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" rows={5} placeholder="Comment" required></textarea>
                  </div>
                  <button type="submit" className="contact-btn">Post Comment</button>
                </form>
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
