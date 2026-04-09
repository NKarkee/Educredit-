import { SectionCard } from "components/SectionCard";
import { StatusBadge } from "components/StatusBadge";
import { Dashboard, Scholarship } from "types";
import { formatCurrency, formatDate } from "utils/format";

type ScholarshipPageProps = {
  dashboard: Dashboard;
  scholarships: Scholarship[];
  onApply: (scholarshipId: number) => Promise<void>;
};

export function ScholarshipPage({ dashboard, scholarships, onApply }: ScholarshipPageProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <SectionCard title="Aid Auto-Pay Preview" subtitle="Incoming scholarships are automatically allocated to outstanding EduCredit+ balances.">
        <div className="rounded-[30px] bg-gradient-to-br from-emerald-900 to-emerald-700 p-6 text-white">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-200">Auto-Pay Event</div>
          <div className="mt-4 text-4xl font-extrabold">{formatCurrency(dashboard.scholarship_summary.pending_amount)}</div>
          <div className="mt-2 max-w-md text-sm leading-6 text-emerald-100">
            If scholarship funds arrive as scheduled, the system will reduce the active semester balance before
            releasing any remaining aid to the student account.
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-200">Balance</div>
              <div className="mt-2 text-xl font-bold">{formatCurrency(dashboard.student.used_credit)}</div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-200">Due Date</div>
              <div className="mt-2 text-xl font-bold">{formatDate(dashboard.student.semester_due_date)}</div>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-200">Scheduled</div>
              <div className="mt-2 text-xl font-bold">{formatDate(dashboard.scholarship_summary.upcoming_disbursement_date)}</div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Scholarship Records" subtitle="Simulate how institutional aid offsets credit exposure.">
        <div className="space-y-4">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-lg font-bold text-ink">{scholarship.name}</div>
                  <div className="mt-1 text-sm text-slate-500">Disbursement {formatDate(scholarship.disbursement_date)}</div>
                </div>
                <StatusBadge value={scholarship.status} />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Award</div>
                  <div className="mt-2 font-bold text-ink">{formatCurrency(scholarship.amount)}</div>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Applied</div>
                  <div className="mt-2 font-bold text-ink">{formatCurrency(scholarship.applied_to_balance)}</div>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Remaining</div>
                  <div className="mt-2 font-bold text-ink">{formatCurrency(scholarship.remaining_amount)}</div>
                </div>
              </div>
              {scholarship.status === "Scheduled" ? (
                <button
                  onClick={() => onApply(scholarship.id)}
                  className="mt-4 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Apply scholarship to balance
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
