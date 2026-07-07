import HeroCarousel from '@/components/home/HeroCarousel';
import ServiceCarousel from '@/components/home/ServiceCarousel';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import CtaNewsletter from '@/components/home/CtaNewsletter';
import BlogPreview from '@/components/home/BlogPreview';

const testimonials = [
  { id: 1, quote: 'Harla understood our vision before we could fully articulate it. The result exceeded everything we imagined.', authorName: 'Olivia Carpenter', designation: 'Private Homeowner', authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80', rating: 5 },
  { id: 2, quote: 'Meticulous attention to detail and an unwavering commitment to quality. A truly exceptional partnership.', authorName: 'David Laurent', designation: 'Hotel Developer', authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', rating: 5 },
];

const blogPosts = [
  { id: 1, title: 'The Art of Boutique Hotel Design', slug: 'boutique-hotel-design', featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', publishedAt: '2024-07-15', author: 'Harla', commentCount: 1, excerpt: 'How thoughtful spatial planning transforms hospitality experiences.' },
  { id: 2, title: 'Material Palettes That Endure', slug: 'material-palettes', featuredImage: 'https://images.unsplash.com/photo-1616137466211-f736a1f8c7be?w=800&q=80', publishedAt: '2024-07-15', author: 'Harla', commentCount: 1, excerpt: 'Choosing finishes that age gracefully and tell a richer story over time.' },
  { id: 3, title: 'Designing for Natural Light', slug: 'designing-natural-light', featuredImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', publishedAt: '2024-07-15', author: 'Harla', commentCount: 1, excerpt: 'Why orientation and aperture are the most important design decisions.' },
];

export default function Home2Page() {
  return (
    <>
      <HeroCarousel />
      <ServiceCarousel />
      <TestimonialsSlider testimonials={testimonials} />
      <CtaNewsletter />
      <BlogPreview posts={blogPosts} />
    </>
  );
}
