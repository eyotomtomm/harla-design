import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeme123', 12);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@harladesign.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@harladesign.com',
      hashedPassword,
      name: 'Admin',
    },
  });
  console.log('Admin user created');

  // Hero Slides
  const heroSlides = [
    { rotateWord: 'Design', description: 'Spectacular home in the Northern Crest of Nuevo Leon, Mexico', image: '/images/background/hero-bg.jpg', linkUrl: '/projects/house-design', sortOrder: 1, variant: 'home1' },
    { rotateWord: 'Decor', description: 'Beautiful home in the Northern Crest of Nuevo Leon, Mexico', image: '/images/background/hero-bg-2.jpg', linkUrl: '/projects/house-design', sortOrder: 2, variant: 'home1' },
    { rotateWord: 'Devise', description: 'Design spectacular home in the Northern Crest of Nuevo Leon.', image: '/images/background/hero-bg-3.jpg', linkUrl: '/projects/house-design', sortOrder: 3, variant: 'home1' },
    { rotateWord: 'Dream', description: 'Gorgeous home in the Northern Crest of Nuevo Leon, Mexico', image: '/images/background/hero-bg-4.jpg', linkUrl: '/projects/house-design', sortOrder: 4, variant: 'home1' },
    { rotateWord: 'Invent', description: 'Spectacular home in the Northern Crest of Nuevo Leon, Mexico', image: '/images/background/hero-bg-5.jpg', linkUrl: '/projects/house-design', sortOrder: 5, variant: 'home1' },
  ];
  for (const slide of heroSlides) {
    await prisma.heroSlide.create({ data: slide });
  }
  console.log('Hero slides created');

  // About Tabs
  const aboutTabs = [
    { tabLabel: 'WHO WE ARE', paragraph1: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.', paragraph2: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.', bigImage: '/images/about/1.png', smallImage: '/images/about/1-small.png', sortOrder: 1 },
    { tabLabel: 'OUR MISSION', paragraph1: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.', paragraph2: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.', bigImage: '/images/about/2.png', smallImage: '/images/about/2-small.png', sortOrder: 2 },
    { tabLabel: 'OUR VISSION', paragraph1: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.', paragraph2: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.', bigImage: '/images/about/3.png', smallImage: '/images/about/3-small.png', sortOrder: 3 },
  ];
  for (const tab of aboutTabs) {
    await prisma.aboutTab.create({ data: tab });
  }
  console.log('About tabs created');

  // About Page
  await prisma.aboutPage.create({
    data: {
      heading: 'Where imagination meets reality',
      whoWeAre: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.',
      whoWeAre2: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.',
      mission: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.',
      vision: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand.',
      vision2: 'Harla has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.',
      bannerImage: '/images/about/page-banner.png',
      bannerImageLight: '/images/about/page-banner-light.png',
      aboutImage: '/images/about/about-right.jpg',
      hoverImage: '/images/about/hover.png',
    },
  });
  console.log('About page created');

  // Services
  const services = [
    { title: 'ART', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', icon: 'fa-palette', image: '/images/services/5.jpg', sortOrder: 1 },
    { title: 'DECOR', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', icon: 'fa-couch', image: '/images/services/1.jpg', sortOrder: 2 },
    { title: 'INTERIOR', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', icon: 'fa-chair', image: '/images/services/2.jpg', sortOrder: 3 },
    { title: 'EXTERIOR', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', icon: 'fa-home', image: '/images/services/3.jpg', sortOrder: 4 },
    { title: 'DESIGN', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', icon: 'fa-drafting-compass', image: '/images/services/4.jpg', sortOrder: 5 },
    { title: 'ARCHITECTURE', description: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.', icon: 'fa-house', sortOrder: 6 },
    { title: 'DECORATION', description: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.', icon: 'fa-snowflake', sortOrder: 7 },
    { title: 'Building', description: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.', icon: 'fa-hammer', sortOrder: 8 },
    { title: 'Calculator', description: 'Our design team can make changes to any plan, big or small, to make it perfect for your needs.', icon: 'fa-dollar-sign', sortOrder: 9 },
  ];
  for (const svc of services) {
    await prisma.service.create({ data: svc });
  }
  console.log('Services created');

  // Project Categories
  const categories = [
    { name: 'Architecture', slug: 'architecture' },
    { name: 'Landscape', slug: 'landscape' },
    { name: 'Design', slug: 'design' },
    { name: 'Interior', slug: 'interior' },
  ];
  const catMap: Record<string, number> = {};
  for (const cat of categories) {
    const created = await prisma.projectCategory.create({ data: cat });
    catMap[cat.slug] = created.id;
  }
  console.log('Project categories created');

  // Projects
  const projects = [
    { title: 'HOUSE DESIGN', slug: 'house-design', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.", description2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.", featuredImage: '/images/architecture-projects/1.jpg', isFullWidth: true, sortOrder: 1, categorySlugs: ['architecture', 'landscape'] },
    { title: 'VILLA', slug: 'villa', description: 'Lorem Ipsum is simply dummy text of the printing.', featuredImage: '/images/architecture-projects/2.jpg', isFullWidth: false, sortOrder: 2, categorySlugs: ['architecture'] },
    { title: 'HOUSE', slug: 'house', description: 'Lorem Ipsum is simply dummy text of the printing.', featuredImage: '/images/architecture-projects/3.jpg', isFullWidth: false, sortOrder: 3, categorySlugs: ['interior'] },
    { title: 'MODERN HOUSE', slug: 'modern-house', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.", description2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.", featuredImage: '/images/architecture-projects/4.jpg', isFullWidth: true, sortOrder: 4, categorySlugs: ['design'] },
  ];
  for (const { categorySlugs, ...projData } of projects) {
    await prisma.project.create({
      data: {
        ...projData,
        categories: { connect: categorySlugs.map(s => ({ id: catMap[s] })) },
      },
    });
  }
  console.log('Projects created');

  // Project Images
  const houseDesignProject = await prisma.project.findUnique({ where: { slug: 'house-design' } });
  if (houseDesignProject) {
    const galleryImages = [
      { url: '/images/project-details/detail-1.jpg', alt: 'Detail 1', sortOrder: 1, section: 'main' },
      { url: '/images/project-details/detail-2.jpg', alt: 'Detail 2', sortOrder: 2, section: 'gallery' },
      { url: '/images/project-details/detail-3.jpg', alt: 'Detail 3', sortOrder: 3, section: 'gallery' },
      { url: '/images/project-details/detail-4.jpg', alt: 'Detail 4', sortOrder: 4, section: 'gallery' },
      { url: '/images/project-details/gal-1.jpg', alt: 'Gallery 1', sortOrder: 5, section: 'gallery' },
      { url: '/images/project-details/gal-2.jpg', alt: 'Gallery 2', sortOrder: 6, section: 'gallery' },
      { url: '/images/project-details/gal-3.jpg', alt: 'Gallery 3', sortOrder: 7, section: 'gallery' },
      { url: '/images/project-details/gal-4.jpg', alt: 'Gallery 4', sortOrder: 8, section: 'gallery' },
      { url: '/images/project-details/gal-5.jpg', alt: 'Gallery 5', sortOrder: 9, section: 'gallery' },
    ];
    for (const img of galleryImages) {
      await prisma.projectImage.create({ data: { ...img, projectId: houseDesignProject.id } });
    }
  }
  console.log('Project images created');

  // Interior Projects
  const interiorProjects = [
    { subtitle: 'VILLA ROOM', title: 'Villa Room Design Harla Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/1.jpg', linkUrl: '/projects/house-design', category: 'ALL', sortOrder: 1 },
    { subtitle: 'LIVING ROOM', title: 'Living Room Design Classic Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/2.jpg', linkUrl: '/projects/house-design', category: 'ALL', sortOrder: 2 },
    { subtitle: 'WORK ROOM', title: 'Work Room Design Modern Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/3.jpg', linkUrl: '/projects/house-design', category: 'ALL', sortOrder: 3 },
    { subtitle: 'OPEN SPACE', title: 'Open Space Minimalism Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/4.jpg', linkUrl: '/projects/house-design', category: 'ALL', sortOrder: 4 },
    { subtitle: 'KITCHEN', title: 'Kitchen Design Modern Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/5.jpg', linkUrl: '/projects/house-design', category: 'ALL', sortOrder: 5 },
    { subtitle: 'BEDROOM', title: 'Bedroom Design Classic Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/6.jpg', linkUrl: '/projects/house-design', category: 'HOUSE', sortOrder: 6 },
    { subtitle: 'LIVING ROOM', title: 'Living Room Minimalism Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/7.jpg', linkUrl: '/projects/house-design', category: 'HOUSE', sortOrder: 7 },
    { subtitle: 'COZY ROOM', title: 'Cozy Room Minimalism Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/8.jpg', linkUrl: '/projects/house-design', category: 'VILLA', sortOrder: 8 },
    { subtitle: 'ROOM DECOR', title: 'Room Decor Minimalism Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/9.jpg', linkUrl: '/projects/house-design', category: 'RESTAURANT', sortOrder: 9 },
    { subtitle: 'FURNITURE DECOR', title: 'Furniture Decor Minimalism Style', description: 'We have several strategic teaming arrangements with experienced to complete full design services.', image: '/images/interior/10.jpg', linkUrl: '/projects/house-design', category: 'HOTEL', sortOrder: 10 },
  ];
  for (const ip of interiorProjects) {
    await prisma.interiorProject.create({ data: ip });
  }
  console.log('Interior projects created');

  // Blog Categories
  const blogCategories = [
    { name: 'Web', slug: 'web' },
    { name: 'Office', slug: 'office' },
    { name: 'News', slug: 'news' },
    { name: 'Awards', slug: 'awards' },
  ];
  for (const bc of blogCategories) {
    await prisma.blogCategory.create({ data: bc });
  }
  console.log('Blog categories created');

  // Blog Posts
  const blogPosts = [
    {
      title: 'Best bedroom design trends ideas 2024',
      slug: 'hotel-design-ideas',
      content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p><blockquote><h5>\"You never really know what's coming. A small wave, or maybe a big one. All you can really do is hope that when it comes, you can surf over it, instead of drown in its monstrosity.\"</h5><cite>― Alysha Speer</cite></blockquote><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
      excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing.",
      featuredImage: '/images/blog/blog-1.jpg',
      author: 'Admin',
      tags: 'Interior,Rooms,Conditions',
    },
    {
      title: 'Modern bedroom ideas to inspire a makeover',
      slug: 'best-design-tips',
      content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>",
      excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing.",
      featuredImage: '/images/blog/2.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=9Y7ma241N8k',
      author: 'Admin',
      tags: 'Design,Trends',
    },
    {
      title: 'Bedroom makeover ideas: 10 luxury looks',
      slug: 'trending-house',
      content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>",
      excerpt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing.",
      featuredImage: '/images/blog/blog-3.png',
      author: 'Admin',
      tags: 'Photography,Creative',
    },
  ];
  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('Blog posts created');

  // Comments
  const firstPost = await prisma.blogPost.findFirst();
  if (firstPost) {
    const comment1 = await prisma.comment.create({
      data: { postId: firstPost.id, name: 'John Doe', email: 'john@example.com', content: 'Dictumst quisque sagittis purus sit amet volutpat. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate.', isApproved: true },
    });
    const comment2 = await prisma.comment.create({
      data: { postId: firstPost.id, name: 'April Curtis', email: 'april@example.com', content: 'Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nam libero justo laoreet sit.', isApproved: true },
    });
    await prisma.comment.create({
      data: { postId: firstPost.id, name: 'David', email: 'david@example.com', content: 'Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis.', isApproved: true, parentId: comment2.id },
    });
  }
  console.log('Comments created');

  // Team Members
  const team = [
    { name: 'Chris Evan', role: 'Architecture Design', image: '/images/team/1.png', rating: 5, sortOrder: 1 },
    { name: 'Chris Jobling', role: 'Interior Design', image: '/images/team/2.png', rating: 5, sortOrder: 2 },
    { name: 'Lara Smith', role: 'Interior Design', image: '/images/team/3.png', rating: 5, sortOrder: 3 },
    { name: 'Chris Norlan', role: 'Interior Design', image: '/images/team/4.png', rating: 5, sortOrder: 4 },
  ];
  for (const member of team) {
    await prisma.teamMember.create({ data: member });
  }
  console.log('Team members created');

  // Testimonials
  const testimonials = [
    { quote: 'We loved this company! Because the finished project not only beautiful but also exactly what we hoped. I give the project 5 out of 5 stars and strongly recommend.', authorName: 'Olivia Carpenter', designation: 'Business analyst at Apple', authorImage: '/images/testimonials/author-1.jpg', rating: 5 },
    { quote: 'I loved this company! And give the project 5 out of 5 stars and strongly recommend. Because the finished project not only beautiful but also exactly what we hoped.', authorName: 'David John', designation: 'Business analyst at Apple', authorImage: '/images/testimonials/author-2.jpg', rating: 5 },
    { quote: 'Love love love this company! I give the project 5 out of 5 stars and strongly recommend. Because the finished project not only beautiful but also exactly what we hoped.', authorName: 'Lara Smith', designation: 'Business analyst at Apple', authorImage: '/images/testimonials/author-3.jpg', rating: 5 },
    { quote: 'Highly recommended, We give the project 5 out of 5 stars and strongly recommend. Because the finished project not only beautiful but also exactly what we hoped.', authorName: 'Charlotte Shreya', designation: 'Business analyst at Apple', authorImage: '/images/testimonials/author-4.jpg', rating: 5 },
    { quote: 'This company is great! I give the project 5 out of 5 stars and strongly recommend. Because the finished project not only beautiful but also exactly what we hoped.', authorName: 'Isabella Swara', designation: 'Business analyst at Apple', authorImage: '/images/testimonials/author-5.jpg', rating: 5 },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('Testimonials created');

  // FAQ Items
  const faqs = [
    { question: 'When is the right time to design your lovely home?', subtitle: 'Lorem Ipsum is simply dummy text of the printing industry. It was recently with desktop publishing software', answer1: 'Lorem Ipsum is simply dummy text of the printing industry. It was more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', answer2: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", sortOrder: 1 },
    { question: 'What are the considerations of interior design?', subtitle: 'Lorem Ipsum is simply dummy text of the printing industry. It was recently with desktop publishing software', answer1: 'Lorem Ipsum is simply dummy text of the printing industry. It was more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', answer2: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", sortOrder: 2 },
    { question: 'How do I prepare for an interior designer meeting?', subtitle: 'Lorem Ipsum is simply dummy text of the printing industry. It was recently with desktop publishing software', answer1: 'Lorem Ipsum is simply dummy text of the printing industry. It was more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', answer2: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", sortOrder: 3 },
    { question: 'How do you work cross-functionally with developers, copywriters, project managers, etc.?', subtitle: 'Lorem Ipsum is simply dummy text of the printing industry. It was recently with desktop publishing software', answer1: 'Lorem Ipsum is simply dummy text of the printing industry. It was more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', answer2: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", sortOrder: 4 },
    { question: "Tell me about the projects you're most proud of and why?", subtitle: 'Lorem Ipsum is simply dummy text of the printing industry. It was recently with desktop publishing software', answer1: 'Lorem Ipsum is simply dummy text of the printing industry. It was more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', answer2: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", sortOrder: 5 },
  ];
  for (const faq of faqs) {
    await prisma.faqItem.create({ data: faq });
  }
  console.log('FAQ items created');

  // Work Process Steps
  const workSteps = [
    { stepNumber: 1, title: 'IDEAS', description: 'Problem statement, document, client review and approval. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: '/images/work-process/1.jpg' },
    { stepNumber: 2, title: 'CONCEPT', description: 'Find out your design ambitions. Your timescales, budgets. Build a detailed brief. Identify your design preferences. Develop architectural layouts for your property.', image: '/images/work-process/2.jpg' },
    { stepNumber: 3, title: 'DESIGN', description: 'Drawings, scaled floor plans showing furniture placement, mood boards, color, material,...', image: '/images/work-process/3.jpg' },
    { stepNumber: 4, title: 'CALCULATE', description: 'Defining price, providing the price of items upon which the final product will be built.', image: '/images/work-process/4.jpg' },
    { stepNumber: 5, title: 'EXECUTION', description: 'Prepares details of works, construction, installations and finishing.', image: '/images/work-process/5.jpg' },
    { stepNumber: 6, title: 'EVALUATION', description: 'Surveys, interviews, walkthroughs, compare and comment on design works.', image: '/images/work-process/6.jpg' },
  ];
  for (const step of workSteps) {
    await prisma.workProcessStep.create({ data: step });
  }
  console.log('Work process steps created');

  // Site Settings
  await prisma.siteSettings.create({
    data: {
      siteName: 'Harla',
      logo: '/images/logos/logo.png',
      logoBlack: '/images/logos/logo-black.png',
      logoWhite: '/images/logos/logo-white.png',
      favicon: '/images/logos/favicon.png',
      contactPhone: '+971 523 798 567',
      contactEmail: 'contact@harladesign.com',
      contactAddress: 'SS Tower, 63rd Street',
      contactAddress2: 'Al Barsha South 3, Dubai UAE',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d96776.56071496992!2d-74.02420878160657!3d40.71212692665102!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1676287097391!5m2!1sen!2sbd',
      footerText1: 'The greatest architecture & interior design company, best in its industry.',
      footerText2: 'Serving luxury services worldwide.',
      copyrightText: '© Copyright Harla 2025. All rights reserved.',
      socialDribbble: '#',
      socialFacebook: '#',
      socialInstagram: '#',
      socialLinkedin: '#',
    },
  });
  console.log('Site settings created');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
