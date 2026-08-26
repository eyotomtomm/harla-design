/**
 * Seeds the database with the site's real content (the same defaults the
 * public pages use when the database is empty). Safe to re-run: it upserts
 * the admin user and only fills tables that are empty.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { projectCategories } from '../src/data/projects';
import { defaultApproach } from '../src/data/approach';
import { defaultAbout } from '../src/data/about';
import { defaultWorkSteps } from '../src/data/process';

const prisma = new PrismaClient();

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
    await prisma.aboutPage.create({ data: defaultAbout });
    console.log('About copy created');
  }

  if ((await prisma.approachItem.count()) === 0) {
    let i = 1;
    for (const item of defaultApproach) await prisma.approachItem.create({ data: { ...item, sortOrder: i++ } });
    console.log('Approach items created');
  }

  if ((await prisma.projectCategory.count()) === 0) {
    let order = 1;
    for (const cat of projectCategories) {
      await prisma.projectCategory.create({
        data: {
          name: cat.title,
          slug: cat.id,
          description: cat.description,
          sortOrder: order++,
          images: {
            create: cat.items
              .filter(item => item.fit !== 'contain')
              .map((item, j) => ({
                client: item.client,
                type: item.type,
                location: item.location ?? null,
                image: item.image,
                alt: item.alt,
                sortOrder: j + 1,
              })),
          },
        },
      });
    }
    console.log('Gallery categories and images created');
  }

  if ((await prisma.workProcessStep.count()) === 0) {
    for (const step of defaultWorkSteps) {
      await prisma.workProcessStep.create({ data: { stepNumber: step.stepNumber, title: step.title, description: step.description } });
    }
    console.log('Work process steps created');
  }

  if ((await prisma.siteSettings.count()) === 0) {
    await prisma.siteSettings.create({ data: {} }); // column defaults hold the real values
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
