import AnimateOnScroll from '@/components/shared/AnimateOnScroll';

const channels = [
  {
    icon: 'fas fa-pen-nib',
    title: 'Beneath the Concrete',
    description:
      'Long-form writing on urbanism, design strategy, and the built environment across Africa and the GCC — published on Substack.',
    href: 'https://beneatheconcrete.substack.com/',
    linkLabel: 'Read on Substack',
  },
  {
    icon: 'fab fa-spotify',
    title: 'The Podcast',
    description:
      'Conversations with the practitioners, developers, and thinkers building the next generation of places.',
    href: 'https://open.spotify.com/show/033jiFuYnZa19SQaeDLVtX',
    linkLabel: 'Listen on Spotify',
  },
];

export default function WritingSection() {
  return (
    <section className="writing-section py-128">
      <div className="container">
        <div className="section-title text-center mb-64">
          <AnimateOnScroll animation="fadeInUp" delay="delay-0-2s">
            <span className="sub-title mb-16">FOLLOW</span>
            <h2>Writing &amp; Listening</h2>
          </AnimateOnScroll>
        </div>
        <div className="writing-cards">
          {channels.map((channel, i) => (
            <AnimateOnScroll
              key={channel.title}
              animation="fadeInUp"
              delay={i === 0 ? 'delay-0-2s' : 'delay-0-4s'}
            >
              <div className="writing-card">
                <div className="writing-card-icon">
                  <i className={channel.icon}></i>
                </div>
                <h4>{channel.title}</h4>
                <p>{channel.description}</p>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  {channel.linkLabel} <i className="fa fa-long-arrow-right"></i>
                </a>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
