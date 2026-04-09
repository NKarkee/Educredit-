import { ProgressBar } from "components/ProgressBar";
import { SectionCard } from "components/SectionCard";
import { StatusBadge } from "components/StatusBadge";
import { GraduationStatus } from "types";

export function GraduationPage({ graduation }: { graduation: GraduationStatus }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Credit Graduation Pipeline" subtitle="Transition readiness from university-backed internal credit to formal financial identity.">
        <div className="rounded-[30px] bg-slate-950 p-6 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Eligibility Score</div>
              <div className="mt-3 text-5xl font-extrabold">{graduation.eligibility_score}%</div>
            </div>
            <StatusBadge value={graduation.status} />
          </div>
          <div className="mt-5">
            <ProgressBar value={graduation.eligibility_score} color="green" />
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-300">{graduation.summary}</p>
        </div>
      </SectionCard>

      <SectionCard title="Readiness Checklist" subtitle="Simulated criteria for future bureau reporting consideration.">
        <div className="space-y-3">
          {graduation.criteria.map((criterion) => (
            <div key={criterion.label} className="flex items-start justify-between gap-3 rounded-3xl bg-slate-50 px-5 py-4">
              <div className="text-sm leading-6 text-slate-700">{criterion.label}</div>
              <div className={`rounded-full px-3 py-1 text-xs font-bold ${criterion.met ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                {criterion.met ? "Met" : "Pending"}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
