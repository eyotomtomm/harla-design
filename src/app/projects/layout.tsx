import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects by Harla — architecture, interior design, and built environment advisory across Africa and the GCC.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Harla',
    description: 'Selected projects by Harla — architecture, interior design, and built environment advisory.',
    url: 'https://harladesign.com/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
