import Header from '@/components/layout/Header';
import Footer, { type FooterSettings } from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

/**
 * Public-site chrome: skip link, header, <main>, footer. Used by the (site)
 * route group layout and by the root not-found page.
 */
export default function SiteShell({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings?: FooterSettings;
}) {
  return (
    <div className="page-wrapper">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <ScrollToTop />
    </div>
  );
}
