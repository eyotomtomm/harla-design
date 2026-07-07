'use client';
import Link from 'next/link';

export default function HeroCarousel() {
  return (
    <section className="hero-nujuma">
      <div className="hero-nujuma-bg">
        <img
          src="/images/projects/lobby-design/lobby-c.jpg"
          alt=""
        />
        <div className="hero-nujuma-overlay" />
      </div>

      <div className="container hero-nujuma-content">
        <div className="hero-nujuma-inner">
          <div className="hero-nujuma-left">
            <p className="hero-nujuma-subtitle">
              Built Environment Strategist &nbsp;&middot;&nbsp; Smart Cities Advisor
            </p>
            <h1 className="hero-nujuma-heading">
              Understanding
              <br />
              how people,
              <br />
              places, and
              <br />
              technology
              <br />
              <em>intersect.</em>
            </h1>
          </div>

          <div className="hero-nujuma-right">
            <Link href="/projects" className="hero-nujuma-btn-services">
              View Services
            </Link>
            <Link href="/contact" className="hero-nujuma-btn-touch">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-nujuma-bottom">
        <div className="container">
          <p>
            An advisory focused on strategy, design and delivery and user experience
            &mdash; operating across Africa and the GCC
          </p>
        </div>
      </div>
    </section>
  );
}
