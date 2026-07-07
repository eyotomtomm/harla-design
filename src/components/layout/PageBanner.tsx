'use client';

import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import AnimateOnScroll from '@/components/shared/AnimateOnScroll';

interface PageBannerProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  backgroundImage?: string;
  backgroundImageLight?: string;
  className?: string;
}

export default function PageBanner({
  title,
  breadcrumbs,
  backgroundImage,
  backgroundImageLight,
  className = '',
}: PageBannerProps) {
  const { theme } = useTheme();
  const bgImage = theme === 'light' && backgroundImageLight ? backgroundImageLight : backgroundImage;

  return (
    <section
      className={`banner-area text-black pt-324 pb-250 ${className}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      <div className="container text-center">
        <div className="row align-items-center justify-content-between">
          <AnimateOnScroll animation="fadeInUp" delay="delay-0-2s" className="banner-content">
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            <div className="mt-32">
              <AnimateOnScroll animation="fadeInUp" delay="delay-0-4s">
                <ul className="breadcrumb">
                  {breadcrumbs.map((crumb, i) => (
                    <li key={i} className="breadcrumb-item">
                      {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
                    </li>
                  ))}
                </ul>
              </AnimateOnScroll>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
