'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

interface BlogPreviewItem {
  id: number;
  title: string;
  slug: string;
  featuredImage: string;
  publishedAt: string;
  author: string;
  commentCount: number;
  excerpt: string;
}

export default function BlogPreview({ posts }: { posts: BlogPreviewItem[] }) {
  const bgClasses = ['black-30-bg', 'black-120-bg', 'black-30-bg'];
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: posts.length > 3,
    autoplay: false,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="blog-area blog-home py-128 black-100-bg">
      <div className="container">
        <div className="row section-heading mb-96">
          <div className="section-title col-sm-6 col-lg-6">
            <h2>LATEST NEWS</h2>
          </div>
          <div className="button col-sm-6 col-lg-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
            {posts.length > 3 && (
              <div className="carousel-buttons">
                <button className="prev" type="button" onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous blog post">
                  <span className="carousel-control-prev-icon" aria-hidden="true"><i className="fa fa-long-arrow-left"></i></span>
                </button>
                <button type="button" onClick={() => sliderRef.current?.slickNext()} aria-label="Next blog post">
                  <span className="carousel-control-next-icon" aria-hidden="true"><i className="fa fa-long-arrow-right"></i></span>
                </button>
              </div>
            )}
            <Link className="theme-btn" href="/blog">More News</Link>
          </div>
        </div>
        <div className="row">
          <Slider ref={sliderRef} {...settings}>
            {posts.map((post, i) => (
              <div key={post.id} className="px-2">
                <div className="item text-center">
                  <div className={`blog-item ${bgClasses[i % 3]}`}>
                    <div className="content">
                      <h6><Link href={`/blog/${post.slug}`}>{post.title}</Link></h6>
                      <hr />
                      <span><i className="fal fa-calendar-alt"></i> {new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <div className="image">
                        <img src={post.featuredImage} alt={post.title} loading="lazy" />
                      </div>
                      <ul className="blog-meta mb-16">
                        <li><i className="fal fa-user"></i><span>{post.author}</span></li>
                        <li><i className="fal fa-comment-dots"></i> {post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}</li>
                      </ul>
                      <p>{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="theme-btn">Read more</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
