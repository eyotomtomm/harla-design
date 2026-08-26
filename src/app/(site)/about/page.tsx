import type { Metadata } from 'next';
import PageBanner from '@/components/layout/PageBanner';
import AboutStyleTwo from '@/components/about/AboutStyleTwo';
import ProcessSteps from '@/components/home/ProcessSteps';
import ClientsSection from '@/components/about/ClientsSection';
import { getAbout, getGallery, getWorkSteps } from '@/lib/content';

export const revalidate = 60;

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

export default async function AboutPage() {
  const [about, steps, gallery] = await Promise.all([getAbout(), getWorkSteps(), getGallery()]);
  return (
    <>
      <PageBanner
        title="About <em>us</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        backgroundImage={about.bannerImage}
      />
      <AboutStyleTwo copy={about} />
      <ProcessSteps steps={steps} />
      <ClientsSection categories={gallery} />
    </>
  );
}
