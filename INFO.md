# UniAsset — Project Proposal

**Course:** IS Project Management
**Project type:** Software prototype (mock data)

---

## Title

**UniAsset: A Web-Based University Asset & Inventory Management System**

## Description

UniAsset is a web-based inventory and asset management system for university
departments to track equipment, supplies, and assigned assets in real time.
Students and staff can request, check out, and return items, while
administrators manage stock levels, asset locations, maintenance records, and
generate reports. Built with Next.js and deployed on Vercel, the system is
developed following IS project management practices—requirements gathering,
scope definition, scheduling, and risk management—to deliver a reliable,
centralized alternative to manual spreadsheets.

---

## Stakeholders

| Stakeholder | Role / Interest | Influence |
|---|---|---|
| University Administration | Approves project, funds it, expects cost savings and accountability for assets | High |
| Department Heads / Deans | Own department assets; need visibility into equipment and usage | High |
| IT / Facilities Department | Maintains equipment, integrates the system, manages deployments | High |
| Asset/Inventory Officers | Day-to-day users who record, assign, and reconcile assets | High |
| Lecturers / Staff | Request, borrow, and return equipment; need fast, accurate records | Medium |
| Students | End users who check out or request items; care about availability and ease of use | Medium |
| Procurement / Finance | Uses inventory data for purchasing decisions and audits | Medium |
| Auditors / Compliance | Require accurate records and reporting for accountability | Low–Medium |
| Database / Cloud Vendors | Provide hosting, storage, and uptime; security dependencies | Low (external) |

**Summary:** The entire university is affected—administration, departments,
staff, students, and support units—so the system must be intuitive, secure, and
centralized rather than department-specific.

---

## Objectives

1. Replace manual/spreadsheet-based asset tracking with a centralized,
   web-based system.
2. Provide real-time visibility of asset location, status, and availability
   across all university departments.
3. Enable students and staff to request, check out, and return assets with a
   clear audit trail.
4. Reduce asset loss, duplication, and unnecessary procurement through accurate
   records and reporting.
5. Deliver a secure, responsive system deployed on Vercel accessible to the
   whole university.

---

## Scope

### In scope

- User authentication with roles (admin, asset officer, staff, student)
- Asset registry (equipment, supplies) with categories, locations, and status
- Check-out / check-in and request workflows
- Maintenance and assignment history
- Dashboard and reports (inventory levels, overdue items, usage)
- Deployment on Vercel with a hosted relational database

### Out of scope

- Procurement/payment processing
- Full ERP or finance integration
- IoT / QR–RFID hardware scanning (Phase 2)
- Native mobile apps (web-responsive only)

---

## Success Criteria

- 100% of pilot department assets recorded in the system
- Check-out/return completed in under 2 minutes per transaction
- Accurate, real-time inventory dashboard with zero manual reconciliation for
  the pilot
- Role-based access enforced; no unauthorized asset changes
- System loads key pages in under 3 seconds and passes UAT with stakeholders

---

## Prototype Status

The current build is a working prototype using mock data and browser storage.
Check-out, check-in, maintenance updates, filtering, and activity logging are
functional. A live database and authentication are planned for the next phase.
