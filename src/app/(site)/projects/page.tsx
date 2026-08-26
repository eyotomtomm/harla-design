import PageBanner from '@/components/layout/PageBanner';
import ProjectGallery from '@/components/projects/ProjectGallery';
import { getGallery } from '@/lib/content';

export const revalidate = 60;

export default async function ProjectsPage() {
  const categories = await getGallery();
  return (
    <>
      <PageBanner
        title="Projects"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
        backgroundImage="/images/projects/arada-mall/exterior.jpg"
      />
      <ProjectGallery categories={categories} />
    </>
  );
}
