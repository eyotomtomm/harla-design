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

```bash
npx prisma migrate deploy   # apply migrations
npm run seed                # admin user + real site content (only fills empty tables)
```

## Content

- **Projects gallery:** `src/data/projects.ts` — add an item to a category row.
- **Approach / who we are / hero copy:** the components in `src/components/home`.
- **Admin (`/admin`):** Work Process steps and Settings (footer contact details)
  are live on the site. Other admin sections are stored but not yet read by the
  public pages.

## Build & deploy

```bash
npm run build   # standalone output in .next/standalone
npm start
```

`public/uploads/` (admin image uploads) is git-ignored; use persistent storage
in production.
