import AnimateOnScroll from '@/components/shared/AnimateOnScroll';

export default function PodcastSection() {
  return (
    <section className="podcast-section black-100-bg py-128">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <AnimateOnScroll animation="fadeInUp" delay="delay-0-2s">
              <div className="section-title">
                <span className="sub-title mb-16">LISTEN</span>
                <h2>The Podcast</h2>
              </div>
              <p className="mb-32">
                Conversations on architecture, urbanism, and the forces shaping cities across Africa and the Gulf. Each episode brings together practitioners, developers, and thinkers who are building the next generation of places.
              </p>
              <a
                href="https://open.spotify.com/show/033jiFuYnZa19SQaeDLVtX"
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Open in Spotify <i className="fa fa-long-arrow-right"></i>
              </a>
            </AnimateOnScroll>
          </div>
          <div className="col-lg-7">
            <AnimateOnScroll animation="fadeInUp" delay="delay-0-4s">
              <div className="podcast-embed">
                <iframe
                  src="https://open.spotify.com/embed/show/033jiFuYnZa19SQaeDLVtX?utm_source=generator&theme=0"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Harla Design Podcast on Spotify"
                  style={{ borderRadius: '12px' }}
                ></iframe>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
