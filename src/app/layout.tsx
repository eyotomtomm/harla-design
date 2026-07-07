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
  title: 'Harla - Architecture and Interiors',
  description: 'The greatest architecture & interior design company, best in its industry.',
  icons: { icon: '/images/logos/favicon.png' },
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
