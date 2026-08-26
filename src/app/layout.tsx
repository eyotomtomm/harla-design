import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '@/styles/globals.css';
import { THEME_INIT_SCRIPT } from '@/hooks/useTheme';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const SITE_URL = 'https://harladesign.com';
const DESCRIPTION = 'An advisory focused on strategy, design, delivery and user experience — operating across Africa and the GCC.';

export const metadata: Metadata = {
  title: {
    default: 'Harla Design | Built Environment Strategy & Design',
    template: '%s | Harla Design',
  },
  description: DESCRIPTION,
  authors: [{ name: 'Harla Design' }],
  creator: 'Harla Design',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Harla Design',
    title: 'Harla Design | Built Environment Strategy & Design',
    description: DESCRIPTION,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Harla Design' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harla Design | Built Environment Strategy & Design',
    description: DESCRIPTION,
    images: ['/images/og-image.jpg'],
  },
  icons: { icon: '/images/logos/favicon.png' },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Harla Design',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logos/logo-dark.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  description: DESCRIPTION,
  email: 'contact@harladesign.com',
  telephone: '+971523797567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SS Tower, 63rd Street, Al Barsha South 3',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  areaServed: ['Africa', 'GCC'],
  sameAs: [
    'https://www.instagram.com/harla_designs',
    'https://open.spotify.com/show/033jiFuYnZa19SQaeDLVtX',
    'https://beneatheconcrete.substack.com/',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
