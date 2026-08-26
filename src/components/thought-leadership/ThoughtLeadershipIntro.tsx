import AnimateOnScroll from '@/components/shared/AnimateOnScroll';

export default function ThoughtLeadershipIntro() {
  return (
    <section className="thought-leadership-intro py-128">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <AnimateOnScroll animation="fadeInUp" delay="delay-0-2s">
              <div className="section-title">
                <span className="sub-title mb-16">OUR PUBLIC VOICE</span>
                <h2>Shaping the conversation on cities</h2>
              </div>
              <p className="mb-32">
                Harla Design maintains a consistent, public voice on the future of cities in Africa and the GCC. Through our podcast and writing, we contribute to the discourse that shapes how places are imagined, funded, and built.
              </p>
              <p>
                Recognition begins before the brief lands. Thought leadership is how we ensure the right conversations happen with the right people — developers, investors, and policymakers who share our commitment to meaningful placemaking.
              </p>
            </AnimateOnScroll>
          </div>
          <div className="col-lg-5">
            <AnimateOnScroll animation="fadeInUp" delay="delay-0-4s">
              <div className="thought-leadership-intro-accent">
                <div className="thought-leadership-intro-stat">
                  <i className="fas fa-podcast"></i>
                  <span>Podcast</span>
                </div>
                <div className="thought-leadership-intro-stat">
                  <i className="fas fa-pen-nib"></i>
                  <span>Substack</span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
