# UniAsset — Setup & Deployment Plan

**Project:** UniAsset — A Web-Based University Asset & Inventory Management System
**Type:** Class / IS Project Management prototype (mock data, no real database)
**Stack:** Next.js (TypeScript, Tailwind, App Router) → GitHub → Vercel

---

## Overview

Build a working prototype of a university-wide asset and inventory management
system using mock data, push it to GitHub, and deploy it on Vercel.

The prototype demonstrates the core flows:

- Browsing and searching assets
- Check-out / check-in of equipment
- Admin asset overview and simple reporting

Data will be static/mock for this phase. A real database can be added later
without changing the deployment setup.

---

## Environment (verified)

| Tool | Status |
|------|--------|
| Git  | ✅ Installed (2.56) |
| Node | ✅ Installed (v26) |
| npm  | ⚠️ Blocked by PowerShell execution policy |
| Git repo | ❌ Not initialized |
| Project files | `INFO.md` (empty), `PLAN.md` |

---

## Phase 0 — Unblock npm

PowerShell currently blocks npm scripts. Run once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Alternative (no policy change): use `npm.cmd` / `npx.cmd` instead of `npm` / `npx`.

---

## Phase 1 — Scaffold the Next.js app

From the project root:

```powershell
npx create-next-app@latest .
```

Recommended options:

- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **Yes**
- App Router: **Yes**
- Import alias: default (`@/*`)

This generates a `.gitignore`, `README.md`, and the base app structure.

---

## Phase 2 — Configure Git identity (one-time)

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Phase 3 — Push to GitHub

```powershell
git init
git add .
git commit -m "Initial commit: UniAsset prototype"
```

Then create an **empty** repository named `uniasset` on GitHub
(no README, no .gitignore), and connect it:

```powershell
git branch -M main
git remote add origin https://github.com/<username>/uniasset.git
git push -u origin main
```

---

## Phase 4 — Mock data (no database)

For this prototype phase, no database is required.

- Store sample assets and users in `src/data/mockAssets.ts`.
- Import mock data at build time (static data ships with the app).
- For demo interactions (check-out / check-in), use **client-side state**
  or **localStorage**.

### Important serverless note

Vercel runs serverless functions that are **stateless** and have a **read-only
filesystem**. Server-side mock writes will not persist between requests.
For a prototype:

- Keep data static, or
- Persist user interactions in the browser (`localStorage`).

A real database (Vercel Postgres/Neon, Supabase, or MongoDB Atlas) can be
added in a later phase without changing the GitHub/Vercel pipeline.

---

## Phase 5 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Select **Add New → Project**.
3. Import the `uniasset` repository.
4. Framework is auto-detected as **Next.js** — keep default build settings.
5. Click **Deploy**.
6. No environment variables are needed for the mock-data prototype.

### Automatic deployments

- Push to `main` → automatic **production** deployment.
- Push to other branches / open PRs → automatic **preview** deployments.

---

## Phase 6 — Verify

- Open the assigned `.vercel.app` URL.
- Click through the asset list, search, and check-out/check-in flows.
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

1. A working Next.js prototype of UniAsset (mock data).
2. A GitHub repository containing the source code.
3. A live Vercel deployment URL.

---

## Future Enhancements (not in this phase)

- Real database with persistent check-out/check-in records.
- Role-based authentication (admin, asset officer, staff, student).
- Reports and analytics dashboard.
- QR code / barcode scanning for assets.
- Email notifications for overdue items.
