export interface ApproachItem {
  title: string;
  description: string;
  icon: string;
  link: string;
}

/** Default "Our approach" items — used when the database has none. */
export const defaultApproach: ApproachItem[] = [
  { icon: 'fas fa-project-diagram', title: 'Development', description: 'End-to-end service of how projects move from brief to delivery, and where the critical decisions actually happen.', link: '/about#process' },
  { icon: 'fas fa-compass', title: 'Strategy', description: 'Great places begin with great decisions. We develop strategic frameworks that align vision, investment, operations, and user experience to guide projects from ambition to execution.', link: '/about' },
  { icon: 'fas fa-drafting-compass', title: 'Design', description: 'We develop strategy into spatial qualities that are purposeful, enhance experience, support operations, and create lasting value.', link: '/projects' },
  { icon: 'fas fa-route', title: 'Experience', description: 'We design journeys, services, and interactions that make places intuitive, memorable, and people-centered.', link: '/about' },
  { icon: 'fas fa-city', title: 'Smart Cities', description: 'We integrate a layer of emerging technologies and future-ready thinking to improve performance, resilience, and quality of life.', link: '/about' },
  { icon: 'fas fa-podcast', title: 'Thought Leadership', description: 'A consistent, public voice on the future of cities in Africa and the GCC — building recognition before the brief lands.', link: '/thought-leadership' },
];
