# Harla Design — website

Next.js 16 (App Router) · React 19 · TypeScript · Prisma/MySQL · NextAuth.

## Run locally

```bash
npm install            # runs `prisma generate`
cp .env.example .env   # or create .env — see below
npm run dev            # http://localhost:3000
```

The public site works without a database (content is in code). The admin
(`/admin`) needs `DATABASE_URL` and `NEXTAUTH_SECRET`.

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | MySQL connection string for Prisma |
| `NEXTAUTH_SECRET` | Secret for admin sessions |
| `NEXTAUTH_URL` | Public URL of the site (e.g. `https://harladesign.com`) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin login created by the seed |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Contact-form email delivery |

## Database

Set `DATABASE_URL` to a MySQL database, then:

```bash
npx prisma migrate deploy   # creates the tables (prisma/migrations)
npm run seed                # admin user + the real site content (only fills empty tables)
```

Without a database the public site still renders from the defaults in
`src/data/`; the admin needs the database.

## Content

- **Projects gallery:** `src/data/projects.ts` — add an item to a category row.
- **Approach / who we are / hero copy:** the components in `src/components/home`.
- **Admin (`/admin`):** gallery images and rows, approach items, About copy,
  process steps, contact-form messages and footer settings. Every section is
  live on the public site (pages revalidate within a minute). While a table is
  empty the site falls back to the defaults in `src/data/`.
- **Thought Leadership:** latest Substack posts and the podcast name are
  fetched from the live feeds and cached for an hour.

## Build & deploy

```bash
npm run build   # standalone output in .next/standalone
npm start
```

`public/uploads/` (admin image uploads) is git-ignored; use persistent storage
in production.
