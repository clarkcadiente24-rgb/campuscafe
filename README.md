# CampusCafe

A web-based pre-ordering and pickup system for university cafeterias. Students
and staff browse the menu, customize an order, choose a pickup time, and track it
from preparation to pickup — skipping the lunch line. Cafeteria staff manage
incoming orders and menu availability from a dedicated order board.

This repository is an **IS Project Management portfolio** built with **Next.js**
and deployed on **Vercel**. It includes the project overview, WBS and Gantt
schedule, analytics dashboard, developer profile, customer ordering prototype,
and staff order board. All demo data lives in the browser.

## Pages

| Route | Contents |
|---|---|
| `/` | Project overview, objectives, scope, budget, resources, quick timeline |
| `/schedule` | Work breakdown structure, sequencing, durations, Gantt chart |
| `/dashboard` | Budget allocation, effort by phase and role, risk register, success metrics |
| `/team` | Developer profile, role hats, org chart, responsibilities |
| `/prototype` | Customer ordering system (menu, cart, checkout, live tracking) |
| `/staff` | Staff order board and menu availability controls |

## Prototype Features

### Customer flow

- Menu browsing with search and category filters
- Item detail modal with sizes, add-ons, ratings, prep time, and quantity
- Cart with per-line customization and running total
- Multi-step checkout: name, dine-in/takeout, payment method, and kitchen notes
- Pickup time selection and mock checkout
- Confirmation receipt with order number and estimated prep time
- Live order tracking `Preparing → Ready → Picked up` with a countdown
- Automatic status change when prep time elapses, plus toast notifications
- Sold-out indicators driven by staff availability

### Staff flow

- Three-column order board (Preparing, Ready, Picked up)
- Advance orders and clear completed ones
- Live queue, revenue, and items-sold stats
- One-tap menu availability toggles that update the customer menu
- Toast notifications for orders that become ready

### Shared

- Responsive dark liquid-glass interface with smooth page transitions
- Demo state persisted in `localStorage` and synced across tabs
- One-click demo reset

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
    dashboard/page.tsx  Budget, effort, risks, success metrics
    team/page.tsx       Developer profile and roles
    prototype/page.tsx  Customer ordering system
    staff/page.tsx      Staff order board and availability
    globals.css         Tailwind, glass theme, animations
  components/
    AuroraBackground.tsx
    CheckoutSheet.tsx
    GanttChart.tsx
    LogoMark.tsx
    MenuItemModal.tsx
    Modal.tsx
    SectionHeading.tsx
    SiteFooter.tsx
    SiteHeader.tsx
    ToastStack.tsx
  data/
    project.ts          Project meta, goals, scope, budget, resources
    schedule.ts         Phases and activities
    team.ts             Developer profile and role hats
    mockMenu.ts         Menu items, sizes, add-ons, pickup slots
    risks.ts            Risk register and success metrics
  lib/
    availability.ts     Menu availability store
    cart.ts             Cart types and helpers
    orders.ts           Order store, status flow, countdown
    useToasts.ts        Toast notifications hook
```

## Demo Data

Menu items live in `src/data/mockMenu.ts`. Prototype changes are stored in the
browser under:

- `campuscafe-cart-v2` — cart lines and customizations
- `campuscafe-orders-v2` — orders and statuses
- `campuscafe-availability-v1` — staff availability overrides
- `campuscafe-pickup-v1` — selected pickup slot

Use the **Reset demo** button on the prototype or staff page to clear everything.

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
