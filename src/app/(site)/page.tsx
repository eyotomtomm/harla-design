import HeroCarousel from '@/components/home/HeroCarousel';
import AboutTabs from '@/components/home/AboutTabs';
import ServiceCarousel from '@/components/home/ServiceCarousel';
import ApproachGrid from '@/components/home/ApproachGrid';
import SelectedWork from '@/components/home/SelectedWork';
import { getAbout, getApproach, getGallery } from '@/lib/content';

export const revalidate = 60;

export default async function HomePage() {
  const [about, approach, gallery] = await Promise.all([getAbout(), getApproach(), getGallery()]);

  return (
    <>
      <HeroCarousel />
      <AboutTabs copy={about} />
      <ServiceCarousel />
      <ApproachGrid items={approach} />
      <SelectedWork categories={gallery} />
    </>
  );
}
