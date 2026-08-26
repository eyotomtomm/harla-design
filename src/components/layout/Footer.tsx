'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { splitAccent } from '@/data/about';

export interface FooterSettings {
  contactAddress?: string;
  contactAddress2?: string;
  contactPhone?: string;
  contactEmail?: string;
  socialInstagram?: string;
  footerText1?: string;
  footerText2?: string;
  copyrightText?: string;
}

const DEFAULTS = {
  contactAddress: 'SS Tower, 63rd Street',
  contactAddress2: 'Al Barsha South 3, Dubai UAE',
  contactPhone: '+971 523 797 567',
  contactEmail: 'contact@harladesign.com',
  socialInstagram: 'https://www.instagram.com/harla_designs',
};

const usable = (value?: string) => (value && value !== '#' ? value : undefined);

export default function Footer({ settings }: { settings?: FooterSettings }) {
  const pathname = usePathname();
  const s = settings || {};
  const address = usable(s.contactAddress) ?? DEFAULTS.contactAddress;
  const address2 = usable(s.contactAddress2) ?? DEFAULTS.contactAddress2;
  const phone = usable(s.contactPhone) ?? DEFAULTS.contactPhone;
  const email = usable(s.contactEmail) ?? DEFAULTS.contactEmail;
  const instagram = usable(s.socialInstagram) ?? DEFAULTS.socialInstagram;
  const year = new Date().getFullYear();
  const showCta = pathname !== '/contact';

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer py-128 black-120-bg">
      {showCta && (
        <div className="footer-top mb-64">
          <div className="container">
            <div className="col-lg-10">
              <p className="footer-cta">
                {s.footerText1 ? (
                  (() => { const t = splitAccent(s.footerText1); return <>{t.before}{t.accent && <em>{t.accent}</em>}{t.after}</>; })()
                ) : (
                  <>Have a project in mind? Let&apos;s build something <em>remarkable</em> together.</>
                )}
              </p>
              <p className="footer-cta">
                {s.footerText2 && !s.footerText2.startsWith('Get in touch') ? s.footerText2 : (
                  <>
                    <Link href="/contact" className="white" style={{ textDecoration: 'underline', textUnderlineOffset: '8px' }}>Get in touch</Link>
                    {' '}{(s.footerText2 || "Get in touch — we're ready when you are.").replace(/^Get in touch\s*/, '')}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="copyright-area col-sm-12 col-md-4 col-lg-6">
              {s.copyrightText || `© Copyright Harla Design ${year}. All rights reserved.`}
            </div>

            <div className="col-xs-12 col-sm-8 col-md-4 col-lg-3">
              <div className="footer-bottom-text">
                <div className="d-flex content">
                  <div className="left">
                    <p className="h4-rotate">CONTACT</p>
                  </div>
                  <div className="right info">
                    <p>{address}<br />{address2}</p>
                    <p><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></p>
                    <p><a href={`mailto:${email}`}>{email}</a></p>
                    <div className="footer-social">
                      <span>Socials:</span>
                      <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
                      <a href="https://open.spotify.com/show/033jiFuYnZa19SQaeDLVtX" target="_blank" rel="noopener noreferrer" aria-label="Podcast on Spotify"><i className="fab fa-spotify" aria-hidden="true"></i></a>
                      <a href="https://beneatheconcrete.substack.com" target="_blank" rel="noopener noreferrer" aria-label="Beneath the Concrete on Substack"><i className="fas fa-newspaper" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
              <div className="footer-bottom-text">
                <div className="d-flex content">
                  <div className="left">
                    <p className="h4-rotate key-link">KEY LINKS</p>
                  </div>
                  <ul className="right links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href="/thought-leadership">Thought Leadership</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="sm-none col-md-1 col-lg-1">
              <div className="footer-bottom-text text-white">
                <button type="button" className="to-top scroll-to-target content" onClick={handleScrollToTop}>
                  <p>TO TOP</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
