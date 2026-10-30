# UniAsset

A web-based university asset and inventory management system prototype. UniAsset
helps university departments track equipment, check items in and out, and keep
a clear record of asset status and location.

This is an IS Project Management class prototype built with **Next.js** and
deployed on **Vercel**. It uses **mock data** with browser storage, so no
database is required to run or demo it.

## Features

- Dashboard with live asset counts (total, available, checked out, in maintenance)
- Search by asset name, ID, serial number, or location
- Filter by category and status
- Check out, check in, and mark assets as repaired
- Recent activity log
- Responsive layout for desktop and mobile

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- Browser `localStorage` for demo persistence
- Vercel for deployment

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  app/
    layout.tsx        Root layout and metadata
    page.tsx          Asset dashboard (client component)
    globals.css       Tailwind and global styles
  data/
    mockAssets.ts     Asset types and sample data
```

## Mock Data

Assets live in `src/data/mockAssets.ts`. Demo changes are stored in the
browser's `localStorage` under `uniasset-assets-v1` and
`uniasset-activity-v1`. Use the **Reset demo** button in the header to restore
the original mock data.

Because Vercel runs stateless serverless functions, browser storage is used for
the prototype. A real database (e.g., Vercel Postgres/Neon or Supabase) can be
added later without changing the deployment pipeline.

## Deployment

1. Push this repository to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Keep the detected Next.js settings and click **Deploy**.

No environment variables are required for the mock-data prototype.

## Documentation

- [PLAN.md](PLAN.md) — setup and deployment plan
- [INFO.md](INFO.md) — project proposal (title, stakeholders, scope, objectives)
