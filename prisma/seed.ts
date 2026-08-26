/**
 * Seeds the database with the site's real content (the same content the
 * public pages currently ship in code). Safe to re-run: it upserts the admin
 * user and only inserts content into empty tables.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { projectCategories } from '../src/data/projects';

const prisma = new PrismaClient();

const services = [
  { title: 'Development', description: 'End-to-end service of how projects move from brief to delivery, and where the critical decisions actually happen.', icon: 'fas fa-project-diagram', sortOrder: 1 },
  { title: 'Strategy', description: 'Great places begin with great decisions. We develop strategic frameworks that align vision, investment, operations, and user experience to guide projects from ambition to execution.', icon: 'fas fa-compass', sortOrder: 2 },
  { title: 'Design', description: 'We develop strategy into spatial qualities that are purposeful, enhance experience, support operations, and create lasting value.', icon: 'fas fa-drafting-compass', sortOrder: 3 },
  { title: 'Experience', description: 'We design journeys, services, and interactions that make places intuitive, memorable, and people-centered.', icon: 'fas fa-route', sortOrder: 4 },
  { title: 'Smart Cities', description: 'We integrate a layer of emerging technologies and future-ready thinking to improve performance, resilience, and quality of life.', icon: 'fas fa-city', sortOrder: 5 },
  { title: 'Thought Leadership', description: 'A consistent, public voice on the future of cities in Africa and the GCC — building recognition before the brief lands.', icon: 'fas fa-podcast', sortOrder: 6 },
];

const workSteps = [
  { stepNumber: 1, title: 'DISCOVER', description: 'Understanding your vision, needs, and site context.', image: '' },
  { stepNumber: 2, title: 'BRIEF', description: 'Defining scope, timeline, and design direction.', image: '' },
  { stepNumber: 3, title: 'DESIGN', description: 'Plans, mood boards, materials, and spatial layouts.', image: '' },
  { stepNumber: 4, title: 'REFINE', description: 'Budgeting, detailing, and client alignment.', image: '' },
  { stepNumber: 5, title: 'BUILD', description: 'Construction oversight and quality assurance.', image: '' },
  { stepNumber: 6, title: 'DELIVER', description: 'Final walkthrough, handover, and lasting satisfaction.', image: '' },
];

const aboutPage = {
  heading: 'Strategy first, design for impact.',
  whoWeAre: 'We bring strategy to architectural projects, helping clients make better decisions, create greater value, and design for impact.',
  whoWeAre2: 'We are a small, senior advisory team that works directly alongside developers, public authorities, institutions, and investors across Africa and the GCC.',
  mission: 'Harla Design exists to make sure great development intentions become great built outcomes. We bring strategic clarity, design accountability, and rigorous coordination to every project we touch — so that what gets delivered reflects what was originally envisioned, for the people who will ultimately use it.',
  vision: 'To improve architectural design outcomes through thoughtful strategy, informed decisions, and attention from the first move to the last detail — with clients who understand that the quality of what you build actually matters.',
  vision2: 'Design for impact.',
  bannerImage: '/images/projects/abay-bank/lobby-2.jpg',
  aboutImage: '/images/projects/africa-cdc/headquarters.jpg',
  hoverImage: '/images/projects/abay-bank/tower.jpg',
};

const aboutTabs = [
  { tabLabel: 'Who We Are', paragraph1: aboutPage.whoWeAre, paragraph2: aboutPage.whoWeAre2, bigImage: aboutPage.aboutImage, smallImage: aboutPage.hoverImage, sortOrder: 1 },
  { tabLabel: 'Mission', paragraph1: aboutPage.mission, bigImage: aboutPage.aboutImage, smallImage: aboutPage.hoverImage, sortOrder: 2 },
  { tabLabel: 'Vision', paragraph1: aboutPage.vision, paragraph2: aboutPage.vision2, bigImage: aboutPage.aboutImage, smallImage: aboutPage.hoverImage, sortOrder: 3 },
];

const slugify = (s: string) => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeme123', 12);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@harladesign.com' },
    update: {},
    create: { email: process.env.ADMIN_EMAIL || 'admin@harladesign.com', hashedPassword, name: 'Admin' },
  });
  console.log('Admin user ready');

  if ((await prisma.aboutPage.count()) === 0) {
    await prisma.aboutPage.create({ data: aboutPage });
    for (const tab of aboutTabs) await prisma.aboutTab.create({ data: tab });
    console.log('About page created');
  }

  if ((await prisma.service.count()) === 0) {
    for (const svc of services) await prisma.service.create({ data: svc });
    console.log('Services (approach) created');
  }

  if ((await prisma.projectCategory.count()) === 0) {
    const catIds: Record<string, number> = {};
    for (const cat of projectCategories) {
      const created = await prisma.projectCategory.create({ data: { name: cat.title, slug: cat.id } });
      catIds[cat.id] = created.id;
    }
    let sortOrder = 1;
    const seen = new Set<string>();
    for (const cat of projectCategories) {
      for (const item of cat.items) {
        const slug = slugify(`${item.client}-${item.type}`);
        if (seen.has(slug)) continue;
        seen.add(slug);
        await prisma.project.create({
          data: {
            title: item.client,
            slug,
            description: item.type,
            featuredImage: item.image,
            location: item.location ?? null,
            sortOrder: sortOrder++,
            categories: { connect: [{ id: catIds[cat.id] }] },
            images: { create: [{ url: item.image, alt: item.alt, section: 'gallery' }] },
          },
        });
      }
    }
    console.log('Project categories and projects created');
  }

  if ((await prisma.workProcessStep.count()) === 0) {
    for (const step of workSteps) await prisma.workProcessStep.create({ data: step });
    console.log('Work process steps created');
  }

  if ((await prisma.siteSettings.count()) === 0) {
    await prisma.siteSettings.create({
      data: {
        siteName: 'Harla Design',
        logo: '/images/logos/logo-dark.png',
        logoBlack: '/images/logos/logo-light.png',
        logoWhite: '/images/logos/logo-dark.png',
        favicon: '/images/logos/favicon.png',
        contactPhone: '+971 523 797 567',
        contactEmail: 'contact@harladesign.com',
        contactAddress: 'SS Tower, 63rd Street',
        contactAddress2: 'Al Barsha South 3, Dubai UAE',
        mapEmbedUrl: '',
        footerText1: "Have a project in mind? Let's build something remarkable together.",
        footerText2: "Get in touch — we're ready when you are.",
        copyrightText: `© Copyright Harla Design ${new Date().getFullYear()}. All rights reserved.`,
        socialInstagram: 'https://www.instagram.com/harla_designs',
        socialFacebook: '',
        socialLinkedin: '',
        socialDribbble: '',
      },
    });
    console.log('Site settings created');
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
