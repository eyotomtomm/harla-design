'use client';

import Link from 'next/link';

interface FooterProps {
  settings?: {
    contactAddress?: string;
    contactAddress2?: string;
    contactPhone?: string;
    contactEmail?: string;
    socialDribbble?: string;
    socialFacebook?: string;
    socialInstagram?: string;
    socialLinkedin?: string;
    footerText1?: string;
    footerText2?: string;
    copyrightText?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const s = settings || {};

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTopKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleScrollToTop();
    }
  };

  return (
    <footer className="main-footer py-128 black-120-bg">
      <div className="footer-top mb-96">
        <div className="container">
          <div className="col-lg-10">
            <h2>
              {s.footerText1 || (
                <>Have a project in mind? Let&apos;s build something <em>remarkable</em> together.</>
              )}
            </h2>
            <h2>{s.footerText2 || <><Link href="/contact" className="white" style={{ textDecoration: 'underline', textUnderlineOffset: '8px' }}>Get in touch</Link> — we&apos;re ready when you are.</>}</h2>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="copyright-area col-sm-12 col-md-4 col-lg-6">
              {s.copyrightText || '© Copyright Harla 2026. All rights reserved.'}
            </div>

            <div className="col-xs-12 col-sm-8 col-md-4 col-lg-3">
              <div className="footer-bottom-text">
                <div className="d-flex content">
                  <div className="left">
                    <h4 className="h4-rotate">CONTACT</h4>
                  </div>
                  <div className="right info">
                    <p>{s.contactAddress || 'SS Tower, 63rd Street'}<br />{s.contactAddress2 || 'Al Barsha South 3, Dubai UAE'}</p>
                    <p><a href={`tel:${(s.contactPhone || '+971 523 798 567').replace(/\s/g, '')}`}>{s.contactPhone || '+971 523 798 567'}</a></p>
                    <p><a href={`mailto:${s.contactEmail || 'contact@harladesign.com'}`}>{s.contactEmail || 'contact@harladesign.com'}</a></p>
                    <div className="footer-social">
                      <span>Socials:</span>
                      <a href="https://www.instagram.com/harla_designs" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                      <a href="https://open.spotify.com/show/033jiFuYnZa19SQaeDLVtX" target="_blank" rel="noopener noreferrer"><i className="fab fa-spotify"></i></a>
                      <a href="https://beneatheconcrete.substack.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-newspaper"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
              <div className="footer-bottom-text">
                <div className="d-flex content">
                  <div className="left">
                    <h4 className="h4-rotate key-link">KEY LINKS</h4>
                  </div>
                  <ul className="right links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="sm-none col-md-1 col-lg-1">
              <div className="footer-bottom-text text-white">
                <a
                  className="to-top scroll-to-target content"
                  onClick={handleScrollToTop}
                  onKeyDown={handleScrollToTopKeyDown}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                >
                  <p>TO TOP</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
