import HeroCarousel from '@/components/home/HeroCarousel';
import AboutTabs from '@/components/home/AboutTabs';
import ServiceCarousel from '@/components/home/ServiceCarousel';
import ApproachGrid from '@/components/home/ApproachGrid';
import SelectedWork from '@/components/home/SelectedWork';
import ProcessSteps, { type ProcessStep } from '@/components/home/ProcessSteps';

const defaultWorkSteps: ProcessStep[] = [
  { id: 1, stepNumber: 1, title: 'DISCOVER', description: 'Understanding your vision, needs, and site context.' },
  { id: 2, stepNumber: 2, title: 'BRIEF', description: 'Defining scope, timeline, and design direction.' },
  { id: 3, stepNumber: 3, title: 'DESIGN', description: 'Plans, mood boards, materials, and spatial layouts.' },
  { id: 4, stepNumber: 4, title: 'REFINE', description: 'Budgeting, detailing, and client alignment.' },
  { id: 5, stepNumber: 5, title: 'BUILD', description: 'Construction oversight and quality assurance.' },
  { id: 6, stepNumber: 6, title: 'DELIVER', description: 'Final walkthrough, handover, and lasting satisfaction.' },
];

export default async function HomePage() {
  let workSteps = defaultWorkSteps;

  try {
    const prisma = (await import('@/lib/prisma')).default;
    const dbSteps = await prisma.workProcessStep.findMany({ orderBy: { stepNumber: 'asc' } });
    if (dbSteps.length > 0) {
      workSteps = dbSteps.map(s => ({ id: s.id, stepNumber: s.stepNumber, title: s.title, description: s.description }));
    }
  } catch {
    // DB not connected, use defaults
  }

  return (
    <>
      <HeroCarousel />
      <AboutTabs />
      <ServiceCarousel />
      <ApproachGrid />
      <SelectedWork />
      <ProcessSteps steps={workSteps} />
    </>
  );
}
