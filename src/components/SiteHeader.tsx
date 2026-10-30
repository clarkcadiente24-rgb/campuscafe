"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMark from "@/components/LogoMark";
import { project } from "@/data/project";

const links = [
  { href: "/", label: "Overview" },
  { href: "/schedule", label: "Schedule" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/team", label: "Team" },
  { href: "/prototype", label: "Prototype" },
  { href: "/staff", label: "Staff" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#05060f]/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="text-sm font-semibold leading-tight text-white">
              {project.name}
            </p>
            <p className="text-[11px] text-slate-400">IS Project Portfolio</p>
          </div>
        </Link>

        <nav className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-white/10 text-white shadow-inner"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
