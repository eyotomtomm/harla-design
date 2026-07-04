export interface HeroSlide {
  id: number;
  rotateWord: string;
  description: string;
  image: string;
  linkUrl: string;
  sortOrder: number;
  variant: string;
}

export interface AboutTab {
  id: number;
  tabLabel: string;
  paragraph1: string;
  paragraph2: string | null;
  bigImage: string;
  smallImage: string;
  sortOrder: number;
}

export interface AboutPageData {
  id: number;
  heading: string;
  whoWeAre: string;
  whoWeAre2: string | null;
  mission: string;
  mission2: string | null;
  vision: string;
  vision2: string | null;
  bannerImage: string;
  bannerImageLight: string | null;
  aboutImage: string;
  hoverImage: string | null;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string | null;
  sortOrder: number;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
  projectDate: string | null;
  location: string | null;
  architect: string | null;
  beforeImage: string | null;
  afterImage: string | null;
  categories: ProjectCategory[];
  images: ProjectImage[];
  tags: string[];
}

export interface ProjectImage {
  id: number;
  url: string;
  alt: string;
  sortOrder: number;
  section: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  videoUrl: string | null;
  author: string;
  publishedAt: string;
  categories: BlogCategory[];
  tags: string[];
  comments: Comment[];
  commentCount: number;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
  parentId: number | null;
  replies: Comment[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  sortOrder: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  designation: string;
  authorImage: string;
  rating: number;
}

export interface FaqItem {
  id: number;
  question: string;
  subtitle: string;
  answer1: string;
  answer2: string;
  sortOrder: number;
}

export interface WorkProcessStep {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  image: string;
}

export interface SiteSettings {
  id: number;
  siteName: string;
  logo: string;
  logoBlack: string;
  logoWhite: string;
  favicon: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  mapEmbedUrl: string;
  footerText1: string;
  footerText2: string;
  copyrightText: string;
  socialDribbble: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  createdAt: string;
}

export interface InteriorProject {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  linkUrl: string;
  category: string;
  sortOrder: number;
}
