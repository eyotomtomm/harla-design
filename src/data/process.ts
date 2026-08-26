export interface ProcessStep {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
}

export const defaultWorkSteps: ProcessStep[] = [
  { id: 1, stepNumber: 1, title: 'Discover', description: 'Understanding your vision, needs, and site context.' },
  { id: 2, stepNumber: 2, title: 'Brief', description: 'Defining scope, timeline, and design direction.' },
  { id: 3, stepNumber: 3, title: 'Design', description: 'Plans, mood boards, materials, and spatial layouts.' },
  { id: 4, stepNumber: 4, title: 'Refine', description: 'Budgeting, detailing, and client alignment.' },
  { id: 5, stepNumber: 5, title: 'Build', description: 'Construction oversight and quality assurance.' },
  { id: 6, stepNumber: 6, title: 'Deliver', description: 'Final walkthrough, handover, and lasting satisfaction.' },
];
