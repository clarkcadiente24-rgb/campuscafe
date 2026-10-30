export interface RoleHat {
  role: string;
  personality: string;
  responsibility: string;
  tools: string;
}

export const developer = {
  name: "Clark Cadiente",
  title: "Solo Full-Stack Developer",
  program: "BS Information Systems",
  location: "University Campus",
  email: "clarkcadiente24@gmail.com",
  bio: "I am the sole developer for CampusCafe, handling everything from project planning and UI design to development, testing, and deployment. I enjoy building clean, focused web experiences and turning a manual, queue-heavy cafeteria process into a fast digital workflow.",
};

export const roleHats: RoleHat[] = [
  {
    role: "Project Manager",
    personality: "Deliverer",
    responsibility:
      "Defines scope, builds the schedule and budget, tracks risks, and keeps the project on track.",
    tools: "GitHub Projects, Notion, Google Sheets",
  },
  {
    role: "Business / System Analyst",
    personality: "Prototype",
    responsibility:
      "Gathers requirements, maps user flows, writes use cases, and defines acceptance criteria.",
    tools: "Figma, Draw.io, Google Docs",
  },
  {
    role: "UI/UX Designer",
    personality: "Producer",
    responsibility:
      "Designs wireframes, the dark liquid-glass system, the logo, and validates usability.",
    tools: "Figma, Illustrator, Coolors",
  },
  {
    role: "Full-Stack Developer",
    personality: "Fixer",
    responsibility:
      "Builds the Next.js app, manages state and mock data, and deploys to Vercel.",
    tools: "Next.js, TypeScript, Tailwind CSS, Git, Vercel",
  },
  {
    role: "QA / Documentation",
    personality: "Perfector",
    responsibility:
      "Prepares test cases, runs functional and usability tests, and writes the user guide.",
    tools: "Manual testing, Lighthouse, Markdown",
  },
];

export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Git & GitHub",
  "Vercel",
  "Figma",
  "UI/UX Design",
  "Manual Testing",
];
