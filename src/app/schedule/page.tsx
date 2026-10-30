import { Fragment } from "react";
import GanttChart from "@/components/GanttChart";
import SectionHeading from "@/components/SectionHeading";
import { project } from "@/data/project";
import { activities, phases } from "@/data/schedule";

const totalDays = activities.reduce(
  (sum, activity) => sum + activity.durationDays,
  0,
);
const phaseMap = new Map(phases.map((phase) => [phase.id, phase]));

export default function SchedulePage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <section>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
          Project schedule plan
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Work breakdown, sequencing & Gantt
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {project.name} is planned across {phases.length} phases over{" "}
          {project.durationWeeks} weeks. The work breakdown structure decomposes
          the project into deliverables, the sequencing table shows
          dependencies, and the Gantt chart places every activity on the
          timeline.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <SummaryChip label="Duration" value={`${project.durationWeeks} weeks`} />
          <SummaryChip label="Phases" value={`${phases.length}`} />
          <SummaryChip label="Activities" value={`${activities.length}`} />
          <SummaryChip label="Effort" value={`${totalDays} person-days`} />
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="WBS"
          title="Work breakdown structure"
          description={`The project is decomposed into ${phases.length} phases, each with concrete deliverables the developer must produce.`}
        />
        <div className="glass rounded-2xl p-5 sm:p-6">
          <div className="mx-auto w-full max-w-sm rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-3 text-center ring-1 ring-inset ring-violet-400/20">
            <p className="text-[11px] font-medium uppercase tracking-widest text-violet-200">
              1.0
            </p>
            <p className="text-sm font-semibold text-white">
              {project.name} Project
            </p>
          </div>
          <div className="mx-auto my-5 h-6 w-px bg-white/15" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${phase.dotClass}`}
                  />
                  <p className="text-sm font-semibold text-white">
                    {phase.id}.0 {phase.name}
                  </p>
                </div>
                <p className="mt-1 text-xs text-slate-500">{phase.weeks}</p>
                <ul className="mt-3 space-y-1.5">
                  {phase.deliverables.map((deliverable, index) => (
                    <li
                      key={deliverable}
                      className="flex gap-2 text-xs text-slate-400"
                    >
                      <span className="w-7 shrink-0 text-slate-600">
                        {phase.id}.{index + 1}
                      </span>
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Activity sequencing"
          title="Order of work"
          description="Within each phase, activities flow in order. Cross-phase dependencies are listed in the table below."
        />
        <div className="glass space-y-5 rounded-2xl p-5 sm:p-6">
          {phases.map((phase) => {
            const phaseActivities = activities.filter(
              (activity) => activity.phaseId === phase.id,
            );
            return (
              <div key={phase.id}>
                <p className={`text-xs font-semibold uppercase tracking-wide ${phase.textClass}`}>
                  {phase.name}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {phaseActivities.map((activity, index) => (
                    <Fragment key={activity.id}>
                      <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                        <span className="mr-1 text-slate-500">
                          {activity.id}
                        </span>
                        {activity.name}
                      </span>
                      {index < phaseActivities.length - 1 && (
                        <span className="text-slate-600">→</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Activity</th>
                  <th className="px-5 py-3 font-medium">Phase</th>
                  <th className="px-5 py-3 font-medium">Predecessor(s)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-white/[0.03]">
                    <td className="px-5 py-3 font-mono text-xs text-violet-300">
                      {activity.id}
                    </td>
                    <td className="px-5 py-3 text-slate-200">{activity.name}</td>
                    <td className="px-5 py-3 text-slate-400">
                      {phaseMap.get(activity.phaseId)?.name}
                    </td>
                    <td className="px-5 py-3 text-slate-400">
                      {activity.predecessors.length > 0
                        ? activity.predecessors.join(", ")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Duration estimation"
          title="Activity durations"
          description="Estimated working days, start and end weeks, and the role responsible for each activity."
        />
        <div className="glass overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Activity</th>
                  <th className="px-5 py-3 text-right font-medium">Days</th>
                  <th className="px-5 py-3 text-center font-medium">Start</th>
                  <th className="px-5 py-3 text-center font-medium">End</th>
                  <th className="px-5 py-3 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-white/[0.03]">
                    <td className="px-5 py-3 font-mono text-xs text-violet-300">
                      {activity.id}
                    </td>
                    <td className="px-5 py-3 text-slate-200">{activity.name}</td>
                    <td className="px-5 py-3 text-right text-slate-300">
                      {activity.durationDays}
                    </td>
                    <td className="px-5 py-3 text-center text-slate-400">
                      W{activity.startWeek}
                    </td>
                    <td className="px-5 py-3 text-center text-slate-400">
                      W{activity.endWeek}
                    </td>
                    <td className="px-5 py-3 text-slate-400">
                      {activity.owner}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/[0.03]">
                  <td className="px-5 py-3 font-semibold text-white" colSpan={2}>
                    Total estimated effort
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-white">
                    {totalDays}
                  </td>
                  <td className="px-5 py-3 text-center text-slate-400">W1</td>
                  <td className="px-5 py-3 text-center text-slate-400">
                    W{project.durationWeeks}
                  </td>
                  <td className="px-5 py-3 text-slate-400">Solo Dev</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Durations are estimated in working days (5 days = 1 week) and assume a
          single developer working sequentially, with some overlapping tasks
          where dependencies allow.
        </p>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Visual timeline"
          title="Gantt chart"
          description="Each bar represents an activity. Overlapping bars show work that runs in parallel."
        />
        <GanttChart />
      </section>
    </main>
  );
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </span>
  );
}
