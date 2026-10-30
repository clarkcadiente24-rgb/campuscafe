# CampusCafe — Setup & Deployment Plan

**Project:** CampusCafe — Online Pre-Ordering & Pickup System for University
Cafeterias
**Type:** Class / IS Project Management prototype (mock data, no real database)
**Stack:** Next.js (TypeScript, Tailwind, App Router) → GitHub → Vercel
**Delivery:** Solo developer

---

## Overview

Build a working prototype of a campus cafeteria pre-ordering system using mock
data, push it to GitHub, and deploy it on Vercel.

The prototype demonstrates the core flows:

- Browsing, searching, and filtering the menu
- Adding items to a cart and choosing a pickup time
- Placing a mock order and tracking status from preparing to picked up

Data is static/mock for this phase. A real database can be added later without
changing the deployment setup.

---

## Environment (verified)

| Tool | Status |
|------|--------|
| Git | Installed (2.56) |
| Node | Installed (v26) |
| npm | Working (11.20; execution policy fixed with RemoteSigned) |
| Git repo | Initialized on `main` |
| Project files | Next.js app scaffolded with `src/`, TypeScript, Tailwind v4 |

---

## Phase 1 — Scaffold the Next.js app

The app is already scaffolded in this repository. Options used:

- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **Yes**
- App Router: **Yes**
- Import alias: default (`@/*`)

---

## Phase 2 — Configure Git identity (one-time)

```powershell
git config --global user.name "Clark Cadiente"
git config --global user.email "clarkcadiente24@gmail.com"
```

---

## Phase 3 — Push to GitHub

```powershell
git init
git add .
git commit -m "Build CampusCafe ordering system prototype"
```

Then create an **empty** repository named `campuscafe` on GitHub
(no README, no .gitignore), and connect it:

```powershell
git branch -M main
git remote add origin https://github.com/<username>/campuscafe.git
git push -u origin main
```

The GitHub CLI (`gh`) is not installed, so repository creation and the first
push are done manually or with an existing remote.

---

## Phase 4 — Mock data (no database)

For this prototype phase, no database is required.

- Menu items live in `src/data/mockMenu.ts`.
- Project, schedule, and team data live in `src/data/project.ts`,
  `src/data/schedule.ts`, and `src/data/team.ts`.
- Demo interactions (cart, orders, pickup time) use **React state** with
  **localStorage** persistence.

### Important serverless note

Vercel runs serverless functions that are **stateless** and have a **read-only
filesystem**. Server-side mock writes will not persist between requests.
For a prototype:

- Keep data static, or
- Persist user interactions in the browser (`localStorage`).

A real database (Vercel Postgres/Neon, Supabase, or MongoDB Atlas) can be added
in a later phase without changing the GitHub/Vercel pipeline.

---

## Phase 5 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Select **Add New → Project**.
3. Import the `campuscafe` repository.
4. Framework is auto-detected as **Next.js** — keep default build settings.
5. Click **Deploy**.
6. No environment variables are needed for the mock-data prototype.

### Automatic deployments

- Push to `main` → automatic **production** deployment.
- Push to other branches / open PRs → automatic **preview** deployments.

---

## Phase 6 — Verify

- Run `npm run lint` and `npm run build` locally.
- Open the assigned `.vercel.app` URL.
- Click through the menu, cart, pickup selection, and order tracking flows.
- Review Vercel **Build Logs** if anything fails.
- Optional: add a custom domain under **Settings → Domains**.

---

## Security Checklist

- [ ] `.env.local` (when added later) stays in `.gitignore`.
- [ ] Never commit secrets or connection strings.
- [ ] Add environment variables in the Vercel dashboard, not in code.
- [ ] Optional: enable branch protection on `main`.

---

## Deliverables

1. A working Next.js prototype of CampusCafe (mock data).
2. A portfolio covering project overview, WBS, schedule, Gantt, and roles.
3. A GitHub repository containing the source code.
4. A live Vercel deployment URL.

---

## Future Enhancements (not in this phase)

- Real database with persistent orders and accounts.
- Role-based authentication for students, staff, and cafeteria managers.
- Cashless payment integration.
- Staff order board and preparation queue.
- Sales reports and menu performance analytics.
- Push or email notifications when an order is ready.
