## .ENV

```env
DATABASE_URL=postgresql://postgres:your_password@ip_address:5432/name?schema=public

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_string
```

## Getting Started

Innstaller moduler

```bash
npm i
```

Run prisma opp i mot postgres database kjørt lokalt.

```bash
npx prisma generate
npx prisma push
```

Create the /public/uploads folder since it's empty github ignores it.

Start tjenesten.

```bash
npm run dev
```
