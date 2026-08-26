import HeroCarousel from '@/components/home/HeroCarousel';
import AboutTabs from '@/components/home/AboutTabs';
import ServiceCarousel from '@/components/home/ServiceCarousel';
import ApproachGrid from '@/components/home/ApproachGrid';
import ArchitectureProjects from '@/components/home/ArchitectureProjects';
import WorkProcessTimeline from '@/components/home/WorkProcessTimeline';


const defaultArchProjects = [
  { id: 1, title: 'ABAY BANK HQ', categories: ['ARCHITECTURE', 'INTERIOR'], description: 'A double-height lobby where natural stone and light define arrival.', description2: 'Marble reception, timber paneling, and seamless spatial flow.', image: '/images/projects/abay-bank/lobby-1.jpg', linkUrl: '/projects#institutions', isFullWidth: true },
  { id: 2, title: 'AFRICA CDC', categories: ['ARCHITECTURE'], description: 'Headquarters for the Africa Centres for Disease Control and Prevention.', image: '/images/projects/africa-cdc/headquarters.jpg', linkUrl: '/projects#institutions', isFullWidth: false },
  { id: 3, title: 'ARADA MALL', categories: ['ARCHITECTURE', 'DESIGN'], description: 'A luxury retail destination organised around a central public plaza.', image: '/images/projects/arada-mall/exterior.jpg', linkUrl: '/projects#retail', isFullWidth: false },
  { id: 4, title: 'GLORIOUS GROUP HQ', categories: ['ARCHITECTURE', 'DESIGN'], description: 'A compact corporate headquarters with layered timber and steel facades.', image: '/images/projects/glorious-group-hq/exterior.jpg', linkUrl: '/projects#commercial', isFullWidth: false },
  { id: 5, title: 'LOBBY CONCEPT', categories: ['INTERIOR'], description: 'Sculptural chandelier and organic forms in a grand atrium.', image: '/images/projects/lobby-design/lobby-b.jpg', linkUrl: '/projects#hospitality', isFullWidth: false },
  { id: 6, title: 'ANBESSA APARTMENT', categories: ['DESIGN', 'INTERIOR'], description: 'Residential amenities from coffee lounge to private gym.', description2: 'Every communal space treated with the same care as the units above.', image: '/images/projects/anbessa-apartment/coffee-area.png', linkUrl: '/projects#lifestyle', isFullWidth: true },
];

const defaultWorkSteps = [
  { id: 1, stepNumber: 1, title: 'DISCOVER', description: 'Understanding your vision, needs, and site context.', image: '/images/projects/anbessa-apartment/waiting-area.png' },
  { id: 2, stepNumber: 2, title: 'BRIEF', description: 'Defining scope, timeline, and design direction.', image: '/images/projects/anbessa-apartment/meeting-room.png' },
  { id: 3, stepNumber: 3, title: 'DESIGN', description: 'Plans, mood boards, materials, and spatial layouts.', image: '/images/projects/lobby-design/lobby-a.jpg' },
  { id: 4, stepNumber: 4, title: 'REFINE', description: 'Budgeting, detailing, and client alignment.', image: '/images/projects/abay-bank/lobby-6.jpg' },
  { id: 5, stepNumber: 5, title: 'BUILD', description: 'Construction oversight and quality assurance.', image: '/images/projects/abay-bank/lobby-3.jpg' },
  { id: 6, stepNumber: 6, title: 'DELIVER', description: 'Final walkthrough, handover, and lasting satisfaction.', image: '/images/projects/lobby-design/lobby-b.jpg' },
];

export default async function HomePage() {
  let workSteps = defaultWorkSteps;

  try {
    const prisma = (await import('@/lib/prisma')).default;
    const dbSteps = await prisma.workProcessStep.findMany({ orderBy: { stepNumber: 'asc' } });
    if (dbSteps.length > 0) workSteps = dbSteps;
  } catch {
    // DB not connected, use defaults
  }

  return (
    <>
      <HeroCarousel />
      <AboutTabs />
      <ServiceCarousel />
      <ApproachGrid />
      <ArchitectureProjects projects={defaultArchProjects} />
      <WorkProcessTimeline steps={workSteps} />
    </>
  );
}
