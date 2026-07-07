import HeroCarousel from '@/components/home/HeroCarousel';
import AboutTabs from '@/components/home/AboutTabs';
import ServiceCarousel from '@/components/home/ServiceCarousel';
import ArchitectureProjects from '@/components/home/ArchitectureProjects';
import InteriorProjects from '@/components/home/InteriorProjects';
import WorkProcessTimeline from '@/components/home/WorkProcessTimeline';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import CtaNewsletter from '@/components/home/CtaNewsletter';
import BlogPreview from '@/components/home/BlogPreview';


const defaultAboutTabs = [
  { id: 1, tabLabel: 'WHO WE ARE', paragraph1: 'Harla is an architecture and interior design consultancy delivering thoughtful, detail-driven spaces across residential, hospitality, and commercial sectors.', paragraph2: 'We partner with clients who value craft, clarity, and enduring quality in every project we undertake.', bigImage: '/images/projects/lobby-design/lobby-b.jpg', smallImage: '/images/projects/anbessa-apartment/waiting-area.png' },
  { id: 2, tabLabel: 'OUR MISSION', paragraph1: 'To transform how people experience the spaces they inhabit — through design that balances aesthetics, function, and emotion.', paragraph2: 'Every project begins with listening and ends with a space that feels unmistakably right.', bigImage: '/images/projects/abay-bank/lobby-6.jpg', smallImage: '/images/projects/abay-bank/lobby-2.jpg' },
  { id: 3, tabLabel: 'OUR VISION', paragraph1: 'To be the standard for design consultancy — where every structure tells a story and every interior holds meaning.', paragraph2: 'We envision a world where architecture serves people, not the other way around.', bigImage: '/images/projects/lobby-design/lobby-c.jpg', smallImage: '/images/projects/anbessa-apartment/office-waiting.png' },
];

const defaultServices = [
  { id: 1, title: 'ART DIRECTION', description: 'Curating the visual identity of every space we design.', image: '/images/projects/lobby-design/lobby-a.jpg' },
  { id: 2, title: 'INTERIOR DESIGN', description: 'Interiors that feel intentional, refined, and lived-in.', image: '/images/projects/anbessa-apartment/office-lounge.png' },
  { id: 3, title: 'ARCHITECTURE', description: 'Structural design rooted in context and craft.', image: '/images/projects/abay-bank/lobby-3.jpg' },
  { id: 4, title: 'COMMERCIAL', description: 'Functional spaces designed for performance and atmosphere.', image: '/images/projects/anbessa-apartment/meeting-room.png' },
  { id: 5, title: 'CONSULTATION', description: 'Strategic guidance from concept to completion.', image: '/images/projects/anbessa-apartment/waiting-area.png' },
];

const defaultArchProjects = [
  { id: 1, title: 'ABAY BANK HQ', categories: ['ARCHITECTURE', 'COMMERCIAL'], description: 'A double-height lobby where natural stone and light define arrival.', description2: 'Marble reception, timber paneling, and seamless spatial flow.', image: '/images/projects/abay-bank/lobby-1.jpg', linkUrl: '/projects/abay-bank', isFullWidth: true },
  { id: 2, title: 'ANBESSA OFFICE', categories: ['INTERIOR'], description: 'Executive floors designed for both focus and hospitality.', image: '/images/projects/anbessa-apartment/office-waiting.png', linkUrl: '/projects/anbessa-apartment', isFullWidth: false },
  { id: 3, title: 'LOBBY CONCEPT', categories: ['INTERIOR'], description: 'Sculptural chandelier and organic forms in a grand atrium.', image: '/images/projects/lobby-design/lobby-b.jpg', linkUrl: '/projects/lobby-design', isFullWidth: false },
  { id: 4, title: 'ANBESSA APARTMENT', categories: ['DESIGN'], description: 'Residential amenities from coffee lounge to private gym.', description2: 'Every communal space treated with the same care as the units above.', image: '/images/projects/anbessa-apartment/coffee-area.png', linkUrl: '/projects/anbessa-apartment', isFullWidth: true },
];

const defaultInteriorProjects = [
  { id: 1, subtitle: 'LOBBY', title: 'Abay Bank Grand Lobby', description: 'Double-height stone and timber with natural light flooding in.', image: '/images/projects/abay-bank/lobby-1.jpg', linkUrl: '/projects/abay-bank', category: 'ALL' },
  { id: 2, subtitle: 'RECEPTION', title: 'Abay Bank Reception', description: 'Marble reception desk with illuminated timber paneling.', image: '/images/projects/abay-bank/lobby-6.jpg', linkUrl: '/projects/abay-bank', category: 'ALL' },
  { id: 3, subtitle: 'WAITING AREA', title: 'Anbessa 4th Floor Lounge', description: 'Warm timber screens and soft seating for a refined wait.', image: '/images/projects/anbessa-apartment/waiting-area.png', linkUrl: '/projects/anbessa-apartment', category: 'ALL' },
  { id: 4, subtitle: 'OFFICE LOUNGE', title: 'Anbessa Executive Suite', description: 'Where work meets warmth — terracotta and navy.', image: '/images/projects/anbessa-apartment/office-lounge.png', linkUrl: '/projects/anbessa-apartment', category: 'ALL' },
  { id: 5, subtitle: 'MEETING ROOM', title: 'Anbessa Boardroom', description: 'Recessed lighting and clean lines for focused discussion.', image: '/images/projects/anbessa-apartment/meeting-room.png', linkUrl: '/projects/anbessa-apartment', category: 'ALL' },
  { id: 6, subtitle: 'LOBBY', title: 'Atrium Lobby Concept', description: 'Sculptural chandelier above organic furniture forms.', image: '/images/projects/lobby-design/lobby-b.jpg', linkUrl: '/projects/lobby-design', category: 'HOTEL' },
  { id: 7, subtitle: 'LOBBY', title: 'Lobby Waterfall View', description: 'Nature art and fluid seating in a soaring atrium.', image: '/images/projects/lobby-design/lobby-c.jpg', linkUrl: '/projects/lobby-design', category: 'HOTEL' },
  { id: 8, subtitle: 'GYM', title: 'Abay Bank Fitness Center', description: 'Blue accents and industrial wall art in a bright gym.', image: '/images/projects/abay-bank/gym-1.jpg', linkUrl: '/projects/abay-bank', category: 'VILLA' },
  { id: 9, subtitle: 'COFFEE AREA', title: 'Anbessa Coffee Lounge', description: 'A communal space blending comfort with modern design.', image: '/images/projects/anbessa-apartment/coffee-area.png', linkUrl: '/projects/anbessa-apartment', category: 'RESTAURANT' },
  { id: 10, subtitle: 'GYM', title: 'Anbessa Private Gym', description: 'Bold red ceiling and lion mural — energy by design.', image: '/images/projects/anbessa-apartment/gym-1.jpg', linkUrl: '/projects/anbessa-apartment', category: 'HOTEL' },
];

const defaultWorkSteps = [
  { id: 1, stepNumber: 1, title: 'DISCOVER', description: 'Understanding your vision, needs, and site context.', image: '/images/projects/anbessa-apartment/waiting-area.png' },
  { id: 2, stepNumber: 2, title: 'BRIEF', description: 'Defining scope, timeline, and design direction.', image: '/images/projects/anbessa-apartment/meeting-room.png' },
  { id: 3, stepNumber: 3, title: 'DESIGN', description: 'Plans, mood boards, materials, and spatial layouts.', image: '/images/projects/lobby-design/lobby-a.jpg' },
  { id: 4, stepNumber: 4, title: 'REFINE', description: 'Budgeting, detailing, and client alignment.', image: '/images/projects/abay-bank/lobby-6.jpg' },
  { id: 5, stepNumber: 5, title: 'BUILD', description: 'Construction oversight and quality assurance.', image: '/images/projects/abay-bank/lobby-3.jpg' },
  { id: 6, stepNumber: 6, title: 'DELIVER', description: 'Final walkthrough, handover, and lasting satisfaction.', image: '/images/projects/lobby-design/lobby-b.jpg' },
];

const defaultTestimonials = [
  { id: 1, quote: 'Harla understood our vision before we could fully articulate it. The result exceeded everything we imagined.', authorName: 'Olivia Carpenter', designation: 'Private Homeowner', authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80', rating: 5 },
  { id: 2, quote: 'Meticulous attention to detail and an unwavering commitment to quality. A truly exceptional partnership.', authorName: 'David Laurent', designation: 'Hotel Developer', authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', rating: 5 },
  { id: 3, quote: 'They transformed a complex brief into a space that feels effortless. That takes real expertise.', authorName: 'Lara Nguyen', designation: 'Restaurant Owner', authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80', rating: 5 },
  { id: 4, quote: 'From concept to completion, the process was seamless. Our home feels exactly as it should.', authorName: 'Charlotte Moreau', designation: 'Villa Owner', authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80', rating: 5 },
  { id: 5, quote: 'Working with Harla felt like a collaboration, not a transaction. The difference shows in every detail.', authorName: 'Isabella Reyes', designation: 'Creative Director', authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80', rating: 5 },
];

const defaultBlogPosts = [
  { id: 1, title: 'The Art of Boutique Hotel Design', slug: 'boutique-hotel-design', featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', publishedAt: '2024-07-15', author: 'Harla', commentCount: 1, excerpt: 'How thoughtful spatial planning transforms hospitality experiences.' },
  { id: 2, title: 'Material Palettes That Endure', slug: 'material-palettes', featuredImage: 'https://images.unsplash.com/photo-1616137466211-f736a1f8c7be?w=800&q=80', publishedAt: '2024-07-15', author: 'Harla', commentCount: 1, excerpt: 'Choosing finishes that age gracefully and tell a richer story over time.' },
  { id: 3, title: 'Designing for Natural Light', slug: 'designing-natural-light', featuredImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', publishedAt: '2024-07-15', author: 'Harla', commentCount: 1, excerpt: 'Why orientation and aperture are the most important design decisions.' },
];

export default async function HomePage() {
  let aboutTabs = defaultAboutTabs;
  let services = defaultServices;
  let archProjects = defaultArchProjects;
  let interiorProjects = defaultInteriorProjects;
  let workSteps = defaultWorkSteps;
  let testimonials = defaultTestimonials;
  let blogPosts = defaultBlogPosts;

  try {
    const prisma = (await import('@/lib/prisma')).default;
    const dbTabs = await prisma.aboutTab.findMany({ orderBy: { sortOrder: 'asc' } });
    if (dbTabs.length > 0) aboutTabs = dbTabs.map(t => ({ ...t, paragraph2: t.paragraph2 || '' }));
    const dbServices = await prisma.service.findMany({ where: { image: { not: null } }, orderBy: { sortOrder: 'asc' } });
    if (dbServices.length > 0) services = dbServices.map(s => ({ ...s, image: s.image || '' }));
    const dbInterior = await prisma.interiorProject.findMany({ orderBy: { sortOrder: 'asc' } });
    if (dbInterior.length > 0) interiorProjects = dbInterior;
    const dbSteps = await prisma.workProcessStep.findMany({ orderBy: { stepNumber: 'asc' } });
    if (dbSteps.length > 0) workSteps = dbSteps;
    const dbTestimonials = await prisma.testimonial.findMany();
    if (dbTestimonials.length > 0) testimonials = dbTestimonials;
    const dbPosts = await prisma.blogPost.findMany({ take: 3, orderBy: { publishedAt: 'desc' }, include: { _count: { select: { comments: true } } } });
    if (dbPosts.length > 0) {
      blogPosts = dbPosts.map(p => ({ id: p.id, title: p.title, slug: p.slug, featuredImage: p.featuredImage, publishedAt: p.publishedAt.toISOString(), author: p.author, commentCount: p._count.comments, excerpt: p.excerpt }));
    }
  } catch {
    // DB not connected, use defaults
  }

  return (
    <>
      <HeroCarousel />
      <AboutTabs tabs={aboutTabs} />
      <ServiceCarousel services={services} />
      <ArchitectureProjects projects={archProjects} />
      <InteriorProjects items={interiorProjects} />
      <WorkProcessTimeline steps={workSteps} />
      <TestimonialsSlider testimonials={testimonials} />
      <CtaNewsletter />
      <BlogPreview posts={blogPosts} />
    </>
  );
}
