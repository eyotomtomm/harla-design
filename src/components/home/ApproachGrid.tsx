'use client';
import Link from 'next/link';

const approaches = [
  {
    icon: 'fas fa-project-diagram',
    title: 'Development',
    description:
      'End-to-end service of how projects move from brief to delivery, and where the critical decisions actually happen.',
    link: '/about',
  },
  {
    icon: 'fas fa-compass',
    title: 'Strategy',
    description:
      'Great places begin with great decisions. We develop strategic frameworks that align vision, investment, operations, and user experience to guide projects from ambition to execution.',
    link: '/about',
  },
  {
    icon: 'fas fa-drafting-compass',
    title: 'Design',
    description:
      'We translate strategy into purposeful environments that enhance experience, support operations, and create lasting value.',
    link: '/projects',
  },
  {
    icon: 'fas fa-route',
    title: 'Experience',
    description:
      'We design journeys, services, and interactions that make places intuitive, memorable, and people-centered.',
    link: '/about',
  },
  {
    icon: 'fas fa-lightbulb',
    title: 'Innovation',
    description:
      'We integrate emerging technologies and future-ready thinking to improve performance, resilience, and quality of life.',
    link: '/about',
  },
  {
    icon: 'fas fa-podcast',
    title: 'Thought Leadership',
    description:
      'A consistent, public voice on the future of cities in Africa and the GCC — building recognition before the brief lands.',
    link: '/blog',
    extraLinks: [
      { label: 'Podcast', href: 'https://open.spotify.com', icon: 'fab fa-spotify' },
      { label: 'Blog', href: '/blog', icon: 'fas fa-pen-nib' },
    ],
  },
];

export default function ApproachGrid() {
  return (
    <section className="approach-grid black-100-bg py-128">
      <div className="container">
        <div className="section-title text-center mb-96">
          <span className="sub-title mb-16">WHAT WE DO</span>
          <h2>OUR APPROACH</h2>
        </div>
        <div className="approach-grid-items">
          {approaches.map((item, i) => (
            <div className="approach-grid-item" key={i}>
              <div className="approach-grid-icon">
                <i className={item.icon}></i>
              </div>
              <h5 className="approach-grid-title">{item.title}</h5>
              <p className="approach-grid-desc">{item.description}</p>
              {item.extraLinks ? (
                <div className="approach-grid-links">
                  {item.extraLinks.map((el, j) => (
                    <Link
                      key={j}
                      href={el.href}
                      className="approach-grid-link"
                      target={el.href.startsWith('http') ? '_blank' : undefined}
                      rel={el.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <i className={el.icon}></i> {el.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link href={item.link} className="approach-grid-arrow">
                  <i className="fa fa-long-arrow-right"></i>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
