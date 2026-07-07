import type { Metadata } from 'next';
import PageBanner from '@/components/layout/PageBanner';
import AboutStyleTwo from '@/components/about/AboutStyleTwo';
import ServiceGrid from '@/components/about/ServiceGrid';
import AchievementCounter from '@/components/about/AchievementCounter';
import TeamCarousel from '@/components/about/TeamCarousel';
import FaqTimeline from '@/components/about/FaqTimeline';

export const metadata: Metadata = {
  title: 'About',
  description: 'Harla is a senior advisory team bringing strategic clarity and design accountability to every stage of the built environment process.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Harla',
    description: 'A small, senior advisory team that works directly alongside developers across Africa and the GCC.',
    url: 'https://harladesign.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="ABOUT <em>US</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        backgroundImageLight="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=70"
      />
      <AboutStyleTwo />
      <ServiceGrid />
      <AchievementCounter />
      <TeamCarousel />
      <FaqTimeline />
    </>
  );
}
