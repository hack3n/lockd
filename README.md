# Lockpicking Competition Tracker

A simple project using SvelteKit, Prisma, sqlite, Tailwind CSS, and TypeScript.

## Development

Run these following commands to try locally:

```bash
npm install
npm run dev
```

Migrate the database:

```bash
npx prisma migrate dev --name init
```

Database seeding:

```bash
npx prisma db seed
```

## Production

For production:

```bash
npm install
npx prisma migrate deploy
npm run build
npm run start
```
