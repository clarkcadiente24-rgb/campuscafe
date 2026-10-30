import Link from "next/link";
import { project } from "@/data/project";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#05060f]/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          {project.name} — IS Project Management Portfolio · Built with Next.js ·
          Deployed on Vercel
        </p>
        <div className="flex gap-4">
          <Link href="/schedule" className="transition hover:text-slate-300">
            Schedule
          </Link>
          <Link href="/team" className="transition hover:text-slate-300">
            Team
          </Link>
          <Link href="/prototype" className="transition hover:text-slate-300">
            Prototype
          </Link>
        </div>
      </div>
    </footer>
  );
}
