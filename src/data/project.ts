export const project = {
  name: "CampusCafe",
  title: "Online Pre-Ordering & Pickup System for University Cafeterias",
  course: "IS Project Management",
  lab: "Laboratory Exercise 3",
  tagline:
    "Skip the line. Order ahead, pay online, and pick up your meal between classes.",
  description:
    "CampusCafe is a web-based pre-ordering platform for university cafeterias. Students and staff browse the menu, customize their order, choose a pickup time, and track its status from preparation to pickup. Cafeteria staff use a simple order board to manage incoming orders and menu availability. Built with Next.js and deployed on Vercel, the project is planned and delivered by a solo developer using IS project management practices for scope, scheduling, budgeting, and quality.",
  durationWeeks: 8,
  currency: "PHP",
};

export const goals = [
  {
    title: "Cut cafeteria queue times",
    detail:
      "Let students order ahead so peak-hour lines move faster and staff can prepare in batches.",
  },
  {
    title: "Fit busy campus schedules",
    detail:
      "Allow pickup time selection so meals are ready between classes and breaks.",
  },
  {
    title: "Give real-time order visibility",
    detail:
      "Show live status updates from preparing to ready for pickup.",
  },
  {
    title: "Make menu availability transparent",
    detail:
      "Display sold-out items instantly so customers do not order what is unavailable.",
  },
  {
    title: "Deliver a polished digital experience",
    detail:
      "Ship a responsive, accessible ordering flow with a modern dark liquid-glass interface.",
  },
];

export const inScope = [
  "Student and staff menu browsing with search and categories",
  "Cart with item quantities and order customization",
  "Pickup time selection and mock checkout",
  "Order confirmation and live status tracking",
  "Cafeteria staff order board and menu availability",
  "Deployment on Vercel with mock data",
];

export const outOfScope = [
  "Real payment gateway integration",
  "Loyalty points and promotions",
  "Delivery to classrooms",
  "Native mobile applications (responsive web only)",
  "Multi-campus franchise management",
];

export const budgetItems = [
  {
    category: "Solo developer stipend",
    amount: 20000,
    notes: "Project allowance for the solo developer",
  },
  {
    category: "Domain & cloud hosting",
    amount: 6000,
    notes: "Vercel and a custom domain for 12 months",
  },
  {
    category: "Design tools & assets",
    amount: 4000,
    notes: "Figma, icon packs, and fonts",
  },
  {
    category: "Testing devices & consumables",
    amount: 5000,
    notes: "Phone and tablet testing plus print materials",
  },
  {
    category: "Documentation & printing",
    amount: 2000,
    notes: "User guide and presentation materials",
  },
  {
    category: "Contingency (10%)",
    amount: 3000,
    notes: "Buffer for scope changes and delays",
  },
];

export const totalBudget = budgetItems.reduce(
  (sum, item) => sum + item.amount,
  0,
);

export const resources = [
  {
    category: "People",
    items: [
      "Solo developer covering all project roles",
      "Student and cafeteria staff testers",
      "Faculty adviser for reviews",
    ],
  },
  {
    category: "Software & tools",
    items: [
      "Next.js, TypeScript, Tailwind CSS",
      "GitHub for version control",
      "Vercel for deployment",
      "Figma for UI/UX design",
      "Browser localStorage for mock data",
    ],
  },
  {
    category: "Hardware",
    items: [
      "Development laptop",
      "Mobile phone and tablet for responsive testing",
    ],
  },
  {
    category: "Facilities",
    items: [
      "University library or computer laboratory",
      "Stable internet connection",
      "Space near the cafeteria for user testing",
    ],
  },
];

export function formatCurrency(amount: number) {
  return `₱${amount.toLocaleString("en-US")}`;
}
