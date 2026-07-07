import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Harla. Whether you are a developer, public authority, institution, or investor — let\'s talk.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Harla',
    description: 'Begin a conversation with Harla — advisory retainers, project mandates, and speaking engagements.',
    url: 'https://harladesign.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
