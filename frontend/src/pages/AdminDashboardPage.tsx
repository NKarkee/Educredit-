import { SectionCard } from "components/SectionCard";
import { StatusBadge } from "components/StatusBadge";
import { DataTable } from "components/DataTable";
import { AdminStudentRow, CreditApplication, FlaggedTransaction, GraduationCandidate, LimitBreakdown } from "types";
import { formatCurrency } from "utils/format";

type AdminDashboardPageProps = {
  students: AdminStudentRow[];
  flaggedTransactions: FlaggedTransaction[];
  graduationCandidates: GraduationCandidate[];
  applications: CreditApplication[];
  limitBreakdown: LimitBreakdown | null;
  selectedStudentId: string;
  onSelectStudent: (studentId: string) => void;
};

export function AdminDashboardPage({
  students,
  flaggedTransactions,
  graduationCandidates,
  applications,
  limitBreakdown,
  selectedStudentId,
  onSelectStudent,
}: AdminDashboardPageProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Portfolio Overview" subtitle="Institutional risk, credit assignment, and graduation readiness across the student cohort.">
          <DataTable
            data={students}
            columns={[
              {
                key: "student",
                header: "Student",
                render: (row) => (
                  <button onClick={() => onSelectStudent(row.student_id)} className="text-left">
                    <div className={`font-semibold ${selectedStudentId === row.student_id ? "text-blue-900" : "text-ink"}`}>{row.full_name}</div>
                    <div className="text-xs text-slate-500">{row.student_id}</div>
                  </button>
                ),
              },
              { key: "gpa", header: "GPA", render: (row) => row.gpa.toFixed(2) },
              { key: "attendance", header: "Attendance", render: (row) => `${row.attendance_percentage}%` },
              { key: "trust", header: "Trust", render: (row) => row.trust_score.toFixed(1) },
              { key: "limit", header: "Limit", render: (row) => formatCurrency(row.credit_limit) },
              { key: "risk", header: "Risk", render: (row) => <StatusBadge value={row.risk_level} /> },
              { key: "grad", header: "Graduation", render: (row) => <StatusBadge value={row.graduation_status} /> },
            ]}
          />
        </SectionCard>

        <SectionCard title="Selected Student Breakdown" subtitle="Why the model assigned the current line and status.">
          {limitBreakdown ? (
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{limitBreakdown.student_name}</div>
                <div className="mt-3 text-4xl font-extrabold">{formatCurrency(limitBreakdown.recommended_credit_limit)}</div>
                <div className="mt-2">
                  <StatusBadge value={limitBreakdown.risk_level} />
                </div>
              </div>
              <div className="space-y-3">
                {limitBreakdown.explanation.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-500">Select a student to review the full limit calculation.</div>
          )}
        </SectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="Flagged Transactions" subtitle="Purchases requiring intervention or review.">
          <DataTable
            data={flaggedTransactions}
            columns={[
              {
                key: "student",
                header: "Student",
                render: (row) => (
                  <div>
                    <div className="font-semibold text-ink">{row.student_name}</div>
                    <div className="text-xs text-slate-500">{row.student_id}</div>
                  </div>
                ),
              },
              { key: "merchant", header: "Merchant", render: (row) => row.merchant_name },
              { key: "amount", header: "Amount", render: (row) => formatCurrency(row.amount) },
              { key: "status", header: "Status", render: (row) => <StatusBadge value={row.approval_status} /> },
            ]}
          />
        </SectionCard>

        <SectionCard title="Review Notes" subtitle="Operational context for financial office teams.">
          <div className="space-y-4">
            {flaggedTransactions.map((item) => (
              <div key={`${item.student_id}-${item.merchant_name}-${item.date}`} className="rounded-3xl bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-ink">{item.student_name}</div>
                    <div className="text-sm text-slate-500">
                      {item.merchant_name} • {item.category}
                    </div>
                  </div>
                  <StatusBadge value={item.approval_status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.reason}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Graduation Candidates" subtitle="Students approaching eligibility for formal financial identity progression.">
        <DataTable
          data={graduationCandidates}
          columns={[
            {
              key: "name",
              header: "Student",
              render: (row) => (
                <div>
                  <div className="font-semibold text-ink">{row.full_name}</div>
                  <div className="text-xs text-slate-500">{row.student_id}</div>
                </div>
              ),
            },
            { key: "score", header: "Eligibility", render: (row) => `${row.eligibility_score}%` },
            { key: "trust", header: "Trust", render: (row) => row.trust_score.toFixed(1) },
            { key: "terms", header: "Semesters", render: (row) => row.semesters_in_program },
            { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
          ]}
        />
      </SectionCard>

      <SectionCard title="Incoming Applications" subtitle="New student requests submitted to university servers for approval.">
        <DataTable
          data={applications}
          columns={[
            { key: "name", header: "Applicant", render: (row) => <div><div className="font-semibold text-ink">{row.full_name}</div><div className="text-xs text-slate-500">{row.student_number}</div></div> },
            { key: "major", header: "Academic Profile", render: (row) => <div><div>{row.major}</div><div className="text-xs text-slate-500">{row.classification}</div></div> },
            { key: "limit", header: "Requested", render: (row) => formatCurrency(row.requested_limit) },
            { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
            { key: "notes", header: "Review Notes", render: (row) => <span className="text-xs text-slate-500">{row.review_notes}</span> },
          ]}
        />
      </SectionCard>
    </div>
  );
}
