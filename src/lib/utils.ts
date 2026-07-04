export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function buildSlideGroups<T>(items: T[], groupSize: number = 3): T[][] {
  // For multi-item Bootstrap carousels: each "slide" shows groupSize items
  // wrapping around when we reach the end
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i++) {
    const group: T[] = [];
    for (let j = 0; j < groupSize; j++) {
      group.push(items[(i + j) % items.length]);
    }
    groups.push(group);
  }
  return groups;
}
