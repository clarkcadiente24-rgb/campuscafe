# CampusCafe — Project Proposal

**Course:** IS Project Management
**Project type:** Software prototype (mock data)

---

## Title

**CampusCafe: A Web-Based Online Pre-Ordering & Pickup System for University
Cafeterias**

## Description

CampusCafe is a web-based ordering platform that lets students and staff
pre-order meals from the university cafeteria and pick them up at a chosen time
between classes. Customers browse the menu, customize quantities, select a
pickup slot, and track their order from preparation to pickup. Cafeteria staff
get a simple order board for incoming orders and menu availability. Built with
Next.js and deployed on Vercel, the project is planned and delivered by a solo
developer using IS project management practices — requirements gathering, scope
definition, WBS, scheduling, budgeting, and quality management — to replace
manual queuing with a faster, more predictable cafeteria experience.

---

## Stakeholders

| Stakeholder | Role / Interest | Influence |
|---|---|---|
| University Administration | Approves the project and expects improved student services and cafeteria efficiency | High |
| Cafeteria Manager / Staff | Owns menu availability, prepares orders, needs a clear order board | High |
| Students | Primary users; want fast ordering and pickup that fits class breaks | High |
| Faculty & Staff | Regular customers; value convenience and reliable pickup times | Medium |
| IT / Campus Network Office | Supports deployment, network access, and account integration | Medium |
| Finance Office | Handles cafeteria revenue, cashless payment integration | Medium |
| Project Adviser | Reviews scope, schedule, and deliverables | Medium |
| Hosting / Cloud Vendor | Provides uptime, deployment, and security | Low (external) |

**Summary:** The system affects students, faculty, cafeteria staff, and campus
administration, so it must be fast, intuitive, and reliable during peak lunch
hours while remaining simple for cafeteria staff to operate.

---

## Objectives

1. Reduce cafeteria queue and waiting time by allowing orders to be placed
   ahead of pickup.
2. Let customers choose a pickup time that fits their class schedule.
3. Give customers real-time order status from preparation to pickup.
4. Show accurate menu availability so sold-out items cannot be ordered.
5. Deliver a responsive, accessible web app deployed on Vercel and usable on
   phones, tablets, and desktops.

---

## Scope

### In scope

- Menu browsing with search and category filters
- Cart with item quantities and order summary
- Pickup time selection and mock checkout
- Order confirmation and status tracking
- Cafeteria staff order board and menu availability
- Responsive dark liquid-glass UI and deployment on Vercel

### Out of scope

- Real payment gateway integration
- Loyalty points and promotions
- Delivery to classrooms
- Native mobile applications (responsive web only)
- Multi-campus franchise management

---

## Success Criteria

- Order placement completes in under 2 minutes on a phone
- Pickup time is respected for at least 95% of demo orders
- Customers can see order status without refreshing
- Sold-out items cannot be added to the cart
- Key pages load in under 3 seconds and pass usability testing with students
  and cafeteria staff

---

## Prototype Status

The current build is a working prototype using mock menu data and browser
storage. Menu browsing, search and filtering, item customization, cart
quantities, multi-step checkout, pickup selection, order placement, and live
status tracking are functional. A staff order board manages incoming orders and
menu availability, and an analytics dashboard reports budget, effort, and risk.
A real database and authentication are planned for a later phase.
