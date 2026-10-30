import SectionHeading from "@/components/SectionHeading";
import { developer, roleHats, skills } from "@/data/team";

export default function TeamPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <section>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
          Project team
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          The developer behind CampusCafe
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          This project is delivered by a solo developer who covers every role in
          the project lifecycle. Each responsibility below maps directly to the
          phases and activities in the schedule.
        </p>
      </section>

      <section className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-2xl font-semibold text-white shadow-lg shadow-orange-900/40 ring-1 ring-white/25">
            CC
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">
                {developer.name}
              </h2>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-xs text-amber-200">
                {developer.title}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              {developer.program} · {developer.location}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {developer.bio}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
            <a
              href={`mailto:${developer.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-orange-900/30 transition hover:from-amber-300 hover:to-orange-400"
            >
              Contact developer
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Part 1"
          title="Role hats"
          description="One developer, five work personalities. Each hat defines how the work is approached in that phase."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roleHats.map((hat) => (
            <div key={hat.role} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-white">{hat.role}</p>
                <span className="shrink-0 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] text-amber-200">
                  {hat.personality}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {hat.responsibility}
              </p>
              <p className="mt-3 border-t border-white/10 pt-3 text-[11px] text-slate-500">
                Tools: {hat.tools}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Part 2"
          title="Project team organizational chart"
          description="A flat structure: one developer wearing all functional roles."
        />
        <div className="glass rounded-2xl p-6">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-center ring-1 ring-inset ring-amber-400/20">
              <p className="text-[11px] uppercase tracking-widest text-amber-200">
                Solo Full-Stack Developer
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {developer.name}
              </p>
            </div>
            <div className="h-6 w-px bg-white/15" />
            <div className="h-px w-3/4 max-w-3xl bg-white/15" />
            <div className="grid w-full gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-5">
              {roleHats.map((hat) => (
                <div
                  key={hat.role}
                  className="relative rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"
                >
                  <div className="absolute -top-4 left-1/2 h-4 w-px bg-white/15" />
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    {hat.role}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-200">
                    {hat.personality}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Part 3"
          title="Roles & responsibilities"
          description="How each hat connects to the activities in the project schedule."
        />
        <div className="glass overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Work personality</th>
                  <th className="px-5 py-3 font-medium">Responsibilities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {roleHats.map((hat) => (
                  <tr key={hat.role} className="hover:bg-white/[0.03]">
                    <td className="px-5 py-3 font-medium text-slate-100">
                      {hat.role}
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-xs text-amber-200">
                        {hat.personality}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400">
                      {hat.responsibility}
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
          eyebrow="Contact"
          title="Talk to the developer"
          description="Reach out for questions about scope, schedule, or the prototype."
        />
        <div className="glass max-w-md rounded-2xl p-5">
          <p className="text-sm font-semibold text-white">{developer.name}</p>
          <p className="text-xs text-amber-300">{developer.title}</p>
          <a
            href={`mailto:${developer.email}`}
            className="mt-3 inline-block break-all text-sm text-slate-400 underline-offset-4 transition hover:text-white hover:underline"
          >
            {developer.email}
          </a>
        </div>
      </section>
    </main>
  );
}
