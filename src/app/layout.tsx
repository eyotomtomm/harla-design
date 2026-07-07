import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '@/styles/globals.css';
import ThemeProvider from '@/components/shared/ThemeProvider';
import PageWrapper from '@/components/layout/PageWrapper';
import Preloader from '@/components/layout/Preloader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});


export const metadata: Metadata = {
  title: {
    default: 'Harla | Built Environment Strategy & Design',
    template: '%s | Harla',
  },
  description: 'An advisory focused on strategy, design, delivery and user experience — operating across Africa and the GCC.',
  keywords: ['built environment', 'strategy', 'design advisory', 'smart cities', 'architecture', 'urban development', 'Africa', 'GCC', 'Dubai', 'Harla'],
  authors: [{ name: 'Harla' }],
  creator: 'Harla',
  metadataBase: new URL('https://harladesign.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harladesign.com',
    siteName: 'Harla',
    title: 'Harla | Built Environment Strategy & Design',
    description: 'An advisory focused on strategy, design, delivery and user experience — operating across Africa and the GCC.',
    images: [{ url: '/images/logos/logo-dark.png', width: 1200, height: 630, alt: 'Harla' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harla | Built Environment Strategy & Design',
    description: 'An advisory focused on strategy, design, delivery and user experience — operating across Africa and the GCC.',
    images: ['/images/logos/logo-dark.png'],
  },
  icons: { icon: '/images/logos/favicon.png' },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <ThemeProvider>
          <PageWrapper>
            <Preloader />
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
