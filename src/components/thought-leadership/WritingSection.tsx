import AnimateOnScroll from '@/components/shared/AnimateOnScroll';
import { formatDate, type FeedPost } from '@/lib/feeds';
import { SUBSTACK_URL } from '@/data/links';

export default function WritingSection({ posts }: { posts: FeedPost[] }) {
  return (
    <section className="writing-section py-128" id="writing">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <AnimateOnScroll animation="fadeInUp" delay="delay-0-2s">
              <div className="section-title">
                <span className="sub-title mb-16">Writing</span>
                <h2>Beneath the Concrete</h2>
              </div>
              <p className="mb-32">
                Long-form writing on urbanism, design strategy, and the built environment across Africa and the GCC — published on Substack.
              </p>
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="read-more">
                Subscribe on Substack <i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
              </a>
            </AnimateOnScroll>
          </div>
          <div className="col-lg-7">
            <AnimateOnScroll animation="fadeInUp" delay="delay-0-4s">
              {posts.length > 0 ? (
                <ol className="writing-posts" aria-label="Latest posts">
                  {posts.map(post => (
                    <li key={post.url}>
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="writing-post">
                        <span className="writing-post-date">{formatDate(post.date)}</span>
                        <span className="writing-post-title">{post.title}</span>
                        <span className="writing-post-arrow" aria-hidden="true">&rarr;</span>
                      </a>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="writing-posts-empty">
                  The latest essays are on{' '}
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">beneatheconcrete.substack.com</a>.
                </p>
              )}
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
