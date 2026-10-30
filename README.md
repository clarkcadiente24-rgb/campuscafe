# CampusCafe

A web-based pre-ordering and pickup system for university cafeterias. Students
and staff browse the menu, build an order, choose a pickup time, and track it
from preparation to pickup — skipping the lunch line.

This repository is an **IS Project Management portfolio** built with **Next.js**
and deployed on **Vercel**. It includes the project overview, WBS and Gantt
schedule, developer profile, and a working ordering prototype that uses mock
data with browser storage.

## Pages

| Route | Contents |
|---|---|
| `/` | Project overview, objectives, scope, budget, resources, quick timeline |
| `/schedule` | Work breakdown structure, sequencing, durations, Gantt chart |
| `/team` | Developer profile, role hats, org chart, responsibilities |
| `/prototype` | Working ordering system (menu, cart, pickup, order tracking) |

## Prototype Features

- Menu browsing with search and category filters
- Cart with quantity controls and running subtotal
- Pickup time selection and mock checkout
- Order tracking with status flow `Preparing → Ready → Picked up`
- Sold-out indicators on unavailable items
- Persistent demo state via `localStorage`
- Responsive dark liquid-glass interface with smooth page transitions

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
    layout.tsx          Root layout and metadata
    template.tsx        Page transition wrapper
    page.tsx            Overview
    schedule/page.tsx   WBS, sequencing, durations, Gantt
    team/page.tsx       Developer profile and roles
    prototype/page.tsx  Ordering system (client component)
    globals.css         Tailwind, glass theme, animations
  components/
    AuroraBackground.tsx
    GanttChart.tsx
    LogoMark.tsx
    SectionHeading.tsx
    SiteFooter.tsx
    SiteHeader.tsx
  data/
    project.ts          Project meta, goals, scope, budget, resources
    schedule.ts         Phases and activities
    team.ts             Developer profile and role hats
    mockMenu.ts         Menu items, categories, pickup slots
```

## Demo Data

Menu items live in `src/data/mockMenu.ts`. Prototype changes are stored in the
browser under `campuscafe-cart-v1`, `campuscafe-orders-v1`, and
`campuscafe-pickup-v1`. Use the **Reset demo** button on the prototype page to
clear the stored cart and orders.

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
