import type { Metadata } from 'next';
import PageBanner from '@/components/layout/PageBanner';
import ThoughtLeadershipIntro from '@/components/thought-leadership/ThoughtLeadershipIntro';
import PodcastSection from '@/components/thought-leadership/PodcastSection';
import WritingSection from '@/components/thought-leadership/WritingSection';
import { getPodcast, getSubstackPosts } from '@/lib/feeds';

export const revalidate = 3600;

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

export default async function ThoughtLeadershipPage() {
  const [podcast, posts] = await Promise.all([getPodcast(), getSubstackPosts(3)]);
  return (
    <>
      <PageBanner
        title="Thought <em>leadership</em>"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Thought Leadership' }]}
        backgroundImage="/images/projects/glorious-group-hq/exterior.jpg"
      />
      <ThoughtLeadershipIntro />
      <PodcastSection podcast={podcast} />
      <WritingSection posts={posts} />
    </>
  );
}
