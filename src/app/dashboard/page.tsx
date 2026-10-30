import {
  budgetItems,
  formatCurrency,
  project,
  totalBudget,
} from "@/data/project";
import {
  riskLevel,
  riskScore,
  risks,
  successMetrics,
} from "@/data/risks";
import { activities, phases } from "@/data/schedule";

const totalEffort = activities.reduce(
  (sum, activity) => sum + activity.durationDays,
  0,
);

const effortByPhase = phases.map((phase) => {
  const phaseActivities = activities.filter(
    (activity) => activity.phaseId === phase.id,
  );
  return {
    ...phase,
    count: phaseActivities.length,
    days: phaseActivities.reduce(
      (sum, activity) => sum + activity.durationDays,
      0,
    ),
  };
});

const maxPhaseDays = Math.max(...effortByPhase.map((phase) => phase.days));

const roleTotals = new Map<string, number>();
for (const activity of activities) {
  const role = activity.owner.split("—")[1]?.trim() ?? "General";
  roleTotals.set(role, (roleTotals.get(role) ?? 0) + activity.durationDays);
}
const roleEffort = [...roleTotals.entries()].sort((a, b) => b[1] - a[1]);
const maxRoleDays = Math.max(...roleEffort.map(([, days]) => days));

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      <section>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
          Project controls
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Project analytics
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Budget allocation, effort distribution, risk exposure, and success
          metrics for {project.name}. Figures are derived from the project plan
          and schedule.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat label="Duration" value={`${project.durationWeeks} weeks`} />
        <Stat label="Phases" value={`${phases.length}`} />
        <Stat label="Activities" value={`${activities.length}`} />
        <Stat label="Effort" value={`${totalEffort} days`} />
        <Stat label="Budget" value={formatCurrency(totalBudget)} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Budget allocation</h2>
          <p className="mt-1 text-xs text-slate-400">
            {formatCurrency(totalBudget)} total estimated cost
          </p>
          <ul className="mt-5 space-y-4">
            {budgetItems.map((item) => {
              const share = (item.amount / totalBudget) * 100;
              return (
                <li key={item.category}>
                  <div className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="text-slate-300">{item.category}</span>
                    <span className="text-slate-400">
                      {formatCurrency(item.amount)} · {share.toFixed(0)}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                      style={{ width: `${share}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {item.notes}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Effort by phase</h2>
          <p className="mt-1 text-xs text-slate-400">
            {totalEffort} person-days across {activities.length} activities
          </p>
          <ul className="mt-5 space-y-4">
            {effortByPhase.map((phase) => {
              const width = maxPhaseDays ? (phase.days / maxPhaseDays) * 100 : 0;
              return (
                <li key={phase.id}>
                  <div className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="text-slate-300">{phase.name}</span>
                    <span className="text-slate-400">
                      {phase.days} days · {phase.count} tasks
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${phase.barClass}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-400">
            Development carries the largest share because menu, cart, checkout,
            order tracking, and the staff board are all built in that phase.
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Effort by role</h2>
          <p className="mt-1 text-xs text-slate-400">
            One developer, five role hats
          </p>
          <ul className="mt-5 space-y-4">
            {roleEffort.map(([role, days]) => {
              const width = maxRoleDays ? (days / maxRoleDays) * 100 : 0;
              return (
                <li key={role}>
                  <div className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="text-slate-300">{role}</span>
                    <span className="text-slate-400">{days} days</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white">Milestones</h2>
          <p className="mt-1 text-xs text-slate-400">
            Phase gates across {project.durationWeeks} weeks
          </p>
          <ol className="mt-5 space-y-4 border-l border-white/10 pl-5">
            {effortByPhase.map((phase) => (
              <li key={phase.id} className="relative">
                <span
                  className={`absolute -left-[26px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-[#05060f] ${phase.dotClass}`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-white">{phase.name}</p>
                  <span className={`text-xs ${phase.textClass}`}>
                    {phase.weeks}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {phase.days} days · {phase.count} activities
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold text-white">Risk register</h2>
            <p className="mt-1 text-xs text-slate-400">
              Score = likelihood × impact (1–5 scale)
            </p>
          </div>
          <div className="flex gap-2 text-[11px]">
            <RiskLegend label="High (15+)" className="text-rose-300" />
            <RiskLegend label="Medium (8–14)" className="text-amber-300" />
            <RiskLegend label="Low (1–7)" className="text-emerald-300" />
          </div>
        </div>
        <div className="glass overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Score</th>
                  <th className="px-5 py-3 font-medium">Level</th>
                  <th className="px-5 py-3 font-medium">Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {risks.map((risk) => {
                  const score = riskScore(risk);
                  const level = riskLevel(score);
                  return (
                    <tr key={risk.id} className="hover:bg-white/[0.03]">
                      <td className="px-5 py-3 text-slate-500">{risk.id}</td>
                      <td className="px-5 py-3 text-slate-200">{risk.risk}</td>
                      <td className="px-5 py-3 text-slate-400">
                        {risk.category}
                      </td>
                      <td className="px-5 py-3 text-slate-300">
                        {score}{" "}
                        <span className="text-[11px] text-slate-500">
                          ({risk.likelihood}×{risk.impact})
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs ring-1 ring-inset ${
                            level === "High"
                              ? "bg-rose-400/10 text-rose-300 ring-rose-400/30"
                              : level === "Medium"
                                ? "bg-amber-400/10 text-amber-300 ring-amber-400/30"
                                : "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30"
                          }`}
                        >
                          {level}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-400">
                        {risk.response}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-white">Success metrics</h2>
          <p className="mt-1 text-xs text-slate-400">
            Targets used to judge the prototype and the pilot
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {successMetrics.map((metric) => (
            <div key={metric.metric} className="glass rounded-xl p-4">
              <p className="text-xs text-slate-400">{metric.metric}</p>
              <p className="mt-2 text-sm font-semibold text-white">
                {metric.target}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-4 py-3">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function RiskLegend({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return <span className={className}>{label}</span>;
}
