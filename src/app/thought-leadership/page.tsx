import type { Metadata } from 'next';
import PageBanner from '@/components/layout/PageBanner';
import ThoughtLeadershipIntro from '@/components/thought-leadership/ThoughtLeadershipIntro';
import PodcastSection from '@/components/thought-leadership/PodcastSection';
import WritingSection from '@/components/thought-leadership/WritingSection';

export const metadata: Metadata = {
  title: 'Thought Leadership',
  description: 'A consistent, public voice on the future of cities in Africa and the GCC — the Harla Design podcast and Substack.',
  alternates: { canonical: '/thought-leadership' },
  openGraph: {
    title: 'Thought Leadership | Harla Design',
    description: 'Podcast and writing shaping the conversation on cities in Africa and the GCC.',
    url: 'https://harladesign.com/thought-leadership',
  },
};

export default function ThoughtLeadershipPage() {
  return (
    <>
      <PageBanner
        title="THOUGHT <em>LEADERSHIP</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Thought Leadership' }]}
        backgroundImage="/images/projects/glorious-group-hq/exterior.jpg"
      />
      <ThoughtLeadershipIntro />
      <PodcastSection />
      <WritingSection />
    </>
  );
}
