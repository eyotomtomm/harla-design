'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { useTheme } from '@/hooks/useTheme';
import ThemeToggle from '@/components/shared/ThemeToggle';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Projects',
    href: '#',
    children: [
      { label: 'All Projects', href: '/projects' },
      { label: 'Before & After', href: '/projects/layout-02' },
      { label: 'Grid View', href: '/projects/layout-03' },
      { label: 'Detailed View', href: '/projects/layout-04' },
      { label: 'Gallery', href: '/projects/layout-05' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
};

const harlaTextStyle: React.CSSProperties = {
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 200,
  fontSize: '22px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
};

export default function Header() {
  const { isFixed } = useScrollHeader();
  const { theme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const logoSrc = theme === 'light' ? '/images/logos/logo-light.png' : '/images/logos/logo-dark.png';
  const harlaColor = theme === 'light' ? '#3D5A80' : '#C9A84C';

  return (
    <header className={`main-header${isFixed ? ' fixed-header' : ''}`}>
      <div className="header-upper black-120-bg">
        <div className="container clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link href="/" style={logoStyle}>
                  <img src={logoSrc} alt="Harla" title="Harla" style={{ height: '45px', width: 'auto' }} />
                  <span style={{ ...harlaTextStyle, color: harlaColor }}>Harla</span>
                </Link>
              </div>
            </div>

            <div className="nav-outer ms-auto clearfix">
              <nav className="main-menu navbar-expand-lg">
                <div className="navbar-header py-10">
                  <div className="mobile-logo">
                    <Link href="/" style={logoStyle}>
                      <img src={logoSrc} alt="Harla" title="Harla" style={{ height: '35px', width: 'auto' }} />
                      <span style={{ ...harlaTextStyle, fontSize: '18px', color: harlaColor }}>Harla</span>
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="navbar-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div className={`navbar-collapse${mobileOpen ? '' : ' collapse'} clearfix`}>
                  <ul className="navigation clearfix">
                    {navItems.map((item, i) => (
                      <li
                        key={i}
                        className={item.children ? 'dropdown' : ''}
                        onMouseEnter={() => item.children && setOpenDropdown(i)}
                        onMouseLeave={() => item.children && setOpenDropdown(null)}
                      >
                        {item.children ? (
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href}>{item.label}</Link>
                        )}
                        {item.children && (
                          <>
                            <ul style={{ display: openDropdown === i ? 'block' : undefined }}>
                              {item.children.map((child, j) => (
                                <li key={j}>
                                  <Link href={child.href}>{child.label}</Link>
                                </li>
                              ))}
                            </ul>
                            <div
                              className="dropdown-btn"
                              onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                            >
                              <span className="fas fa-chevron-down"></span>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            <div className="search-btns" onClick={() => setSearchOpen(!searchOpen)}>
              <span className="search-icon"><i className="far fa-search"></i></span>
            </div>

            <ThemeToggle />
          </div>

          <form
            className={`search-project search-form mt-96${searchOpen ? ' current' : ''}`}
            id="project-search"
            action="/search"
            method="GET"
          >
            <input type="search" name="q" required placeholder="Type to search..." />
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
      </div>
    </header>
  );
}
