export interface Risk {
  id: string;
  risk: string;
  category: string;
  likelihood: number;
  impact: number;
  response: string;
}

export const risks: Risk[] = [
  {
    id: "R-01",
    risk: "Scope creep from new menu customization requests",
    category: "Scope",
    likelihood: 4,
    impact: 4,
    response:
      "Freeze the in-scope list, log change requests, and defer extras to a later phase.",
  },
  {
    id: "R-02",
    risk: "Solo developer unavailable due to illness or school load",
    category: "Resource",
    likelihood: 3,
    impact: 5,
    response:
      "Keep documentation current, use a one-week buffer, and hold contingency budget.",
  },
  {
    id: "R-03",
    risk: "Vercel build fails due to dependency or Node version drift",
    category: "Technical",
    likelihood: 2,
    impact: 4,
    response:
      "Pin package versions, run production builds before every push, set the Node version on Vercel.",
  },
  {
    id: "R-04",
    risk: "Menu availability does not match actual cafeteria stock",
    category: "Operational",
    likelihood: 3,
    impact: 3,
    response:
      "Give staff a one-tap availability toggle and review sold-out items each shift.",
  },
  {
    id: "R-05",
    risk: "Slow performance during the lunch peak",
    category: "Technical",
    likelihood: 2,
    impact: 3,
    response:
      "Use static rendering, lightweight assets, and local demo data with no heavy queries.",
  },
  {
    id: "R-06",
    risk: "Cafeteria staff find the order board hard to use",
    category: "Usability",
    likelihood: 3,
    impact: 3,
    response:
      "Keep the board to three status columns and run a usability test with staff.",
  },
  {
    id: "R-07",
    risk: "Payment integration takes longer than planned",
    category: "Scope",
    likelihood: 3,
    impact: 2,
    response:
      "Keep payments out of scope for the prototype and use a mock checkout instead.",
  },
];

export function riskScore(risk: Risk) {
  return risk.likelihood * risk.impact;
}

export function riskLevel(score: number) {
  if (score >= 15) return "High";
  if (score >= 8) return "Medium";
  return "Low";
}

export interface SuccessMetric {
  metric: string;
  target: string;
}

export const successMetrics: SuccessMetric[] = [
  { metric: "Order placement time", target: "Under 2 minutes on mobile" },
  { metric: "Pickup time honored", target: "95% of demo orders" },
  { metric: "Order status visibility", target: "Live without page refresh" },
  { metric: "Sold-out protection", target: "100% of unavailable items blocked" },
  { metric: "Page load time", target: "Under 3 seconds on key pages" },
];
