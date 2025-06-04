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

Opprett og start postgres database med docker desktop

```bash
docker run -d --name NAME -p 5432:5432 -e POSTGRES_PASSWORD=YOUR_PASSWORD postgres
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
