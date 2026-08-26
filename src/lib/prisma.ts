import { PrismaClient } from '@prisma/client';

/**
 * Some hosts (Hostinger's Node runtime) inject environment variables with
 * shell-style escaping, turning `%40` into `\%40` and breaking the URL.
 * Undo that before handing the URL to Prisma.
 */
export function databaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  return raw.replace(/\\([%@?&=:#/])/g, '$1').replace(/^['"]|['"]$/g, '');
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const url = databaseUrl();
  return url ? new PrismaClient({ datasources: { db: { url } } }) : new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
