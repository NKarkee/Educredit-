import { AlertTriangle, CalendarClock, GraduationCap, WalletCards } from "lucide-react";

import { ProgressBar } from "components/ProgressBar";
import { SectionCard } from "components/SectionCard";
import { StatusBadge } from "components/StatusBadge";
import { SummaryCard } from "components/SummaryCard";
import { SpendingChart } from "components/charts/SpendingChart";
import { TrendChart } from "components/charts/TrendChart";
import { Dashboard } from "types";
import { formatCurrency, formatDate, formatPercent } from "utils/format";

export function StudentDashboardPage({ dashboard }: { dashboard: Dashboard }) {
  const utilization = (dashboard.student.used_credit / dashboard.student.current_credit_limit) * 100;

  return (
    <div className="space-y-5">
      <div className="rounded-[30px] bg-slate-950 p-7 text-white shadow-panel">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-blue-200">Student Credit Command Center</div>
            <h2 className="mt-3 text-4xl font-extrabold">{dashboard.student.full_name}</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              {dashboard.student.major} at {dashboard.student.university_name}. Your internal credit line responds to
              academic stability, repayment reliability, and campus engagement.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-300">Semester Due Date</div>
              <div className="mt-2 flex items-center gap-2 text-lg font-bold">
                <CalendarClock className="h-5 w-5 text-blue-300" />
                {formatDate(dashboard.student.semester_due_date)}
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-300">Graduation Readiness</div>
              <div className="mt-2 flex items-center gap-2 text-lg font-bold">
                <GraduationCap className="h-5 w-5 text-emerald-300" />
                {dashboard.graduation_status.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Current Credit Limit" value={formatCurrency(dashboard.student.current_credit_limit)} subtitle="University-backed dynamic line" />
        <SummaryCard title="Used Credit" value={formatCurrency(dashboard.student.used_credit)} subtitle={`${formatPercent(utilization)} utilization`} accent="amber" />
        <SummaryCard title="Available Credit" value={formatCurrency(dashboard.student.available_credit)} subtitle="Instant approved capacity" accent="green" />
        <SummaryCard title="Internal Trust Score" value={`${dashboard.score_breakdown.trust_score.toFixed(1)}`} subtitle={dashboard.score_breakdown.risk_level + " portfolio risk"} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Spending Breakdown" subtitle="Approved spending by category across the active term.">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <SpendingChart data={dashboard.spending_breakdown} />
            <div className="space-y-3">
              {dashboard.spending_breakdown.map((item) => (
                <div key={item.name} className="rounded-2xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span>{formatCurrency(item.value)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Portfolio Signals" subtitle="Live recommendations and policy alerts.">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-500">
                <span>Credit Graduation Eligibility</span>
                <span>{dashboard.graduation_status.eligibility_score}%</span>
              </div>
              <ProgressBar value={dashboard.graduation_status.eligibility_score} color="green" />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-500">
                <span>Repayment Progress</span>
                <span>{dashboard.repayment_summary.progress}%</span>
              </div>
              <ProgressBar value={dashboard.repayment_summary.progress} />
            </div>
            <div className="rounded-3xl bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
                <WalletCards className="h-4 w-4" />
                Limit rationale
              </div>
              <div className="space-y-2 text-sm leading-6 text-blue-950">
                {dashboard.score_breakdown.explanation.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            {dashboard.alerts.length ? (
              <div className="space-y-3">
                {dashboard.alerts.map((alert) => (
                  <div key={alert} className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                    <div className="mb-1 flex items-center gap-2 font-semibold">
                      <AlertTriangle className="h-4 w-4" />
                      Action alert
                    </div>
                    {alert}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Credit Growth History" subtitle="Why your line changed over time.">
          <TrendChart data={dashboard.trust_score_trend} />
        </SectionCard>

        <SectionCard title="Scholarship Auto-Pay" subtitle="Upcoming aid applied directly to outstanding balance.">
          <div className="space-y-4">
            <div className="rounded-3xl bg-emerald-50 p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-emerald-700">Pending Scholarship</div>
              <div className="mt-3 text-3xl font-extrabold text-emerald-950">
                {formatCurrency(dashboard.scholarship_summary.pending_amount)}
              </div>
              <div className="mt-2 text-sm text-emerald-800">
                Scheduled for {formatDate(dashboard.scholarship_summary.upcoming_disbursement_date)}
              </div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="mb-3 text-sm font-semibold text-slate-500">Projected Auto-Pay Impact</div>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Outstanding balance</span>
                  <span>{formatCurrency(dashboard.student.used_credit)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total scholarship already applied</span>
                  <span>{formatCurrency(dashboard.scholarship_summary.total_applied)}</span>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Behavioral Insights" subtitle="Rule-based financial intelligence for the current profile.">
          <div className="space-y-3">
            {dashboard.insights.map((insight) => (
              <div key={insight} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                {insight}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Graduation Pipeline" subtitle={dashboard.graduation_status.summary}>
          <div className="mb-4">
            <StatusBadge value={dashboard.graduation_status.status} />
          </div>
          <div className="space-y-3">
            {dashboard.graduation_status.criteria.map((criterion) => (
              <div key={criterion.label} className="flex items-start justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span className="text-slate-700">{criterion.label}</span>
                <span className={`font-bold ${criterion.met ? "text-emerald-700" : "text-slate-400"}`}>
                  {criterion.met ? "Met" : "Open"}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
