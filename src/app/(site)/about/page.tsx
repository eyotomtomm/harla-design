import type { Metadata } from 'next';
import PageBanner from '@/components/layout/PageBanner';
import AboutStyleTwo from '@/components/about/AboutStyleTwo';
import ApproachGrid from '@/components/home/ApproachGrid';

export const metadata: Metadata = {
  title: 'About',
  description: 'Harla Design is a senior advisory team bringing strategic clarity and design accountability to every stage of the built environment process.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Harla Design',
    description: 'A small, senior advisory team that works directly alongside developers across Africa and the GCC.',
    url: 'https://harladesign.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About <em>us</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        backgroundImage="/images/projects/abay-bank/lobby-2.jpg"
      />
      <AboutStyleTwo />
      <ApproachGrid />
    </>
  );
}
