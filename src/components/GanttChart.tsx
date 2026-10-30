import { Fragment } from "react";
import { activities, phases } from "@/data/schedule";

const totalWeeks = Math.max(...activities.map((activity) => activity.endWeek));
const weeks = Array.from({ length: totalWeeks }, (_, index) => index + 1);
const phaseMap = new Map(phases.map((phase) => [phase.id, phase]));

export default function GanttChart() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 p-5">
        <div>
          <h3 className="text-base font-semibold text-white">Gantt chart</h3>
          <p className="text-xs text-slate-400">
            Week 1 to {totalWeeks} · bars show the estimated duration of each
            activity
          </p>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {phases.map((phase) => (
            <span
              key={phase.id}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-400"
            >
              <span className={`h-2 w-2 rounded-full ${phase.dotClass}`} />
              {phase.name}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto p-4 sm:p-5">
        <div className="min-w-[840px]">
          <div
            className="grid items-center gap-y-2"
            style={{
              gridTemplateColumns: `240px repeat(${totalWeeks}, minmax(0, 1fr))`,
            }}
          >
            <div />
            {weeks.map((week) => (
              <div
                key={week}
                className="pb-2 text-center text-[11px] font-medium text-slate-500"
              >
                W{week}
              </div>
            ))}

            {activities.map((activity) => {
              const phase = phaseMap.get(activity.phaseId);
              return (
                <Fragment key={activity.id}>
                  <div
                    className="truncate pr-4 text-xs text-slate-300"
                    title={`${activity.id} ${activity.name}`}
                  >
                    <span className="mr-1.5 text-slate-500">{activity.id}</span>
                    {activity.name}
                  </div>
                  <div
                    className="grid h-7"
                    style={{
                      gridColumn: "2 / -1",
                      gridTemplateColumns: `repeat(${totalWeeks}, minmax(0, 1fr))`,
                      backgroundImage: `repeating-linear-gradient(to right, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent calc(100% / ${totalWeeks}))`,
                    }}
                  >
                    <div
                      className={`my-auto h-4 rounded-full ${
                        phase?.barClass ?? "bg-slate-400/70"
                      } shadow-sm shadow-black/30`}
                      style={{
                        gridColumn: `${activity.startWeek} / ${
                          activity.endWeek + 1
                        }`,
                      }}
                      title={`${activity.name}: week ${activity.startWeek}–${activity.endWeek}`}
                    />
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
