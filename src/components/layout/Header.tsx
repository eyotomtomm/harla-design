'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { useTheme } from '@/hooks/useTheme';
import ThemeToggle from '@/components/shared/ThemeToggle';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Thought Leadership', href: '/thought-leadership' },
  { label: 'Contact', href: '/contact' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const { isFixed } = useScrollHeader();
  const { theme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Escape closes the menu; lock body scroll while it is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const logoSrc = theme === 'light' ? '/images/logos/logo-light.png' : '/images/logos/logo-dark.png';

  const brand = (
    <Link href="/" className="brand" onClick={() => setMobileOpen(false)}>
      <img src={logoSrc} alt="" width={45} height={40} />
      <span className="brand-wordmark">Harla Design</span>
    </Link>
  );

  return (
    <header className={`main-header${isFixed ? ' fixed-header' : ''}`}>
      <div className="header-upper black-120-bg">
        <div className="container clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">{brand}</div>
            </div>

            <div className="nav-outer ms-auto clearfix">
              <nav className="main-menu navbar-expand-lg" aria-label="Main">
                <div className="navbar-header py-10">
                  <div className="mobile-logo">{brand}</div>
                  <button
                    type="button"
                    className="navbar-toggle"
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                    aria-controls="site-navigation"
                    onClick={() => setMobileOpen(open => !open)}
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                {mobileOpen && (
                  <div className="menu-backdrop" onClick={() => setMobileOpen(false)} aria-hidden="true" />
                )}

                <div id="site-navigation" className={`navbar-collapse${mobileOpen ? ' is-open' : ' collapse'} clearfix`}>
                  <button
                    type="button"
                    className="menu-close"
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <ul className="navigation clearfix">
                    {navItems.map((item) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <li key={item.href} className={active ? 'current' : undefined}>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
