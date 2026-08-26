export interface AboutCopy {
  /** Headings may mark one italic phrase with *asterisks*. */
  homeHeading: string;
  heading: string;
  intro: string;
  intro2?: string | null;
  mission: string;
  vision: string;
  vision2?: string | null;
  /** Paragraphs separated by blank lines */
  story: string;
  bannerImage: string;
  aboutImage: string;
  hoverImage?: string | null;
}

export const defaultAbout: AboutCopy = {
  homeHeading: 'Built on conviction, *delivered with care.*',
  heading: 'Strategy first, *design for impact.*',
  intro: 'We bring strategy to architectural projects, helping clients make better decisions, create greater value, and design for impact.',
  intro2: 'We are a small, senior advisory team that works directly alongside developers, public authorities, institutions, and investors across Africa and the GCC.',
  mission: 'Harla Design exists to make sure great development intentions become great built outcomes. We bring strategic clarity, design accountability, and rigorous coordination to every project we touch — so that what gets delivered reflects what was originally envisioned, for the people who will ultimately use it.',
  vision: 'To improve architectural design outcomes through thoughtful strategy, informed decisions, and attention from the first move to the last detail — with clients who understand that the quality of what you build actually matters.',
  vision2: 'Design for impact.',
  story: [
    'Great developments start with a clear vision. Keeping that vision intact — through feasibility, through design, through the pressures of budget and programme — is where Harla Design comes in.',
    'We are a small, senior advisory team that works directly alongside developers, bringing strategic thinking and design accountability to every stage of the process. We help define what a project should be, coordinate the teams responsible for delivering it, and stay close enough to the work to make sure the original ambition survives contact with reality.',
    'Our clients are developers and investors who care deeply about what they build, how it gets built, and the people it will serve. That focus on quality and purpose is what every Harla Design engagement is built around.',
  ].join('\n\n'),
  bannerImage: '/images/projects/abay-bank/lobby-2.jpg',
  aboutImage: '/images/projects/africa-cdc/headquarters.jpg',
  hoverImage: '/images/projects/abay-bank/tower.jpg',
};

/** Split "Built on conviction, *delivered with care.*" into plain + italic parts. */
export function splitAccent(heading: string): { before: string; accent: string; after: string } {
  const m = heading.match(/^([\s\S]*?)\*([\s\S]+?)\*([\s\S]*)$/);
  if (!m) return { before: heading, accent: '', after: '' };
  return { before: m[1], accent: m[2], after: m[3] };
}

export function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
}
