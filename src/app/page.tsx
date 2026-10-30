import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import {
  budgetItems,
  formatCurrency,
  goals,
  inScope,
  outOfScope,
  project,
  resources,
  totalBudget,
} from "@/data/project";
import { activities, phases } from "@/data/schedule";

const quickFacts = [
  { label: "Duration", value: `${project.durationWeeks} weeks` },
  { label: "Phases", value: `${phases.length}` },
  { label: "Activities", value: `${activities.length}` },
  { label: "Estimated budget", value: formatCurrency(totalBudget) },
];

export default function OverviewPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <section className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {project.course} · {project.lab}
          </span>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">
            <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
              {project.name}
            </span>
          </h1>
          <p className="mt-3 max-w-3xl text-lg font-medium text-slate-200 sm:text-xl">
            {project.title}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {project.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/schedule"
              className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-900/40 transition hover:from-violet-400 hover:to-fuchsia-400"
            >
              View project schedule
            </Link>
            <Link
              href="/team"
              className="glass-soft rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Meet the team
            </Link>
            <Link
              href="/prototype"
              className="glass-soft rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Open the prototype
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickFacts.map((fact) => (
          <div key={fact.label} className="glass rounded-2xl p-5">
            <p className="text-sm font-medium text-slate-400">{fact.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {fact.value}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="What we want to achieve"
          title="Project goals & objectives"
          description={`The measurable outcomes that define a successful ${project.name} deployment.`}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <div key={goal.title} className="glass rounded-2xl p-5">
              <span className="text-xs font-semibold tracking-widest text-violet-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-semibold text-white">
                {goal.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {goal.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Boundaries"
          title="Scope of the project"
          description="What the team will deliver in this cycle, and what is intentionally deferred."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              In scope
            </h3>
            <ul className="mt-4 space-y-3">
              {inScope.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-300">
              Out of scope
            </h3>
            <ul className="mt-4 space-y-3">
              {outOfScope.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={`${project.durationWeeks}-week delivery`}
            title="Timeline & schedule"
            description={`${phases.length} phases take ${project.name} from planning to a deployed system.`}
          />
          <Link
            href="/schedule"
            className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            See the full schedule and Gantt chart →
          </Link>
        </div>
        <div className="glass rounded-2xl p-6">
          <ol className="space-y-5">
            {phases.map((phase) => (
              <li key={phase.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className={`h-3 w-3 rounded-full ${phase.dotClass}`} />
                  <span className="mt-1 w-px flex-1 bg-white/10" />
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-base font-semibold text-white">
                      {phase.name}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
                      {phase.weeks}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{phase.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Financial plan"
          title="Estimated budget"
          description="A modest budget covering people, tools, hosting, and a contingency reserve."
        />
        <div className="glass overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Notes</th>
                  <th className="px-5 py-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {budgetItems.map((item) => (
                  <tr key={item.category}>
                    <td className="px-5 py-3 font-medium text-slate-200">
                      {item.category}
                    </td>
                    <td className="px-5 py-3 text-slate-400">{item.notes}</td>
                    <td className="px-5 py-3 text-right text-slate-200">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/[0.03]">
                  <td className="px-5 py-3 font-semibold text-white" colSpan={2}>
                    Total estimated budget
                  </td>
                  <td className="px-5 py-3 text-right text-base font-semibold text-white">
                    {formatCurrency(totalBudget)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="What we need"
          title="Resources required"
          description="The people, tools, hardware, and facilities that make delivery possible."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((group) => (
            <div key={group.category} className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white">
                {group.category}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/15 p-8 backdrop-blur-xl sm:p-10">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          See {project.name} in action
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          The working prototype demonstrates menu browsing, cart and quantity
          controls, pickup scheduling, and live order tracking using mock data.
        </p>
        <Link
          href="/prototype"
          className="mt-6 inline-flex rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 transition hover:bg-white/20"
        >
          Open the prototype →
        </Link>
      </section>
    </main>
  );
}
