import AnimateOnScroll from '@/components/shared/AnimateOnScroll';
import type { PodcastInfo } from '@/lib/feeds';
import { SPOTIFY_EMBED_URL } from '@/data/links';

export default function PodcastSection({ podcast }: { podcast: PodcastInfo }) {
  return (
    <section className="podcast-section black-100-bg py-128" id="podcast">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <AnimateOnScroll animation="fadeInUp" delay="delay-0-2s">
              <div className="section-title">
                <span className="sub-title mb-16">Podcast</span>
                <h2>{podcast.name}</h2>
              </div>
              <p className="mb-32">
                {podcast.description ||
                  'Conversations on architecture, urbanism, and the forces shaping cities across Africa and the Gulf. Each episode brings together practitioners, developers, and thinkers who are building the next generation of places.'}
              </p>
              <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Listen on Spotify <i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
              </a>
            </AnimateOnScroll>
          </div>
          <div className="col-lg-7">
            <AnimateOnScroll animation="fadeInUp" delay="delay-0-4s">
              <div className="podcast-embed">
                <iframe
                  src={SPOTIFY_EMBED_URL}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`${podcast.name} on Spotify`}
                ></iframe>
                <p className="podcast-embed-fallback">
                  If the player doesn&apos;t load,{' '}
                  <a href={podcast.url} target="_blank" rel="noopener noreferrer">open the show on Spotify</a>.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
