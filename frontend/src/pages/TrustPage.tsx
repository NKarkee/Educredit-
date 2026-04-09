import { SectionCard } from "components/SectionCard";
import { Dashboard, LimitBreakdown } from "types";
import { formatCurrency } from "utils/format";

export function TrustPage({ dashboard, limitBreakdown }: { dashboard: Dashboard; limitBreakdown: LimitBreakdown | null }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Trust Score Factors" subtitle="Weighted institutional and behavior signals behind the assigned limit.">
        <div className="space-y-4">
          {Object.entries(dashboard.score_breakdown.factor_breakdown).map(([key, value]) => (
            <div key={key} className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold capitalize text-slate-700">{key.replace("_", " ")}</div>
                <div className="text-lg font-bold text-ink">{value.toFixed(1)}</div>
              </div>
            </div>
          ))}
          <div className="rounded-3xl bg-blue-950 p-5 text-white">
            <div className="text-xs uppercase tracking-[0.25em] text-blue-200">Current Recommendation</div>
            <div className="mt-3 text-4xl font-extrabold">{formatCurrency(dashboard.score_breakdown.recommended_credit_limit)}</div>
            <div className="mt-2 text-sm text-blue-100">{dashboard.student.last_limit_change_reason}</div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Limit Change Timeline" subtitle="Positive reinforcement and corrective adjustments over time.">
        <div className="space-y-4">
          {limitBreakdown?.limit_history.map((item) => (
            <div key={`${item.date}-${item.new_limit}`} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-bold text-ink">{formatCurrency(item.new_limit)}</div>
                  <div className="text-sm text-slate-500">{item.date}</div>
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-bold ${item.delta >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                  {item.delta >= 0 ? "+" : ""}
                  {formatCurrency(item.delta)}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.reason}</p>
            </div>
          )) ?? <div className="text-sm text-slate-500">No credit history available.</div>}
        </div>
      </SectionCard>
    </div>
  );
}
