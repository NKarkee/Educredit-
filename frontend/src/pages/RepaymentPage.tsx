import { FormEvent, useState } from "react";

import { DataTable } from "components/DataTable";
import { ProgressBar } from "components/ProgressBar";
import { SectionCard } from "components/SectionCard";
import { Dashboard, Repayment } from "types";
import { formatCurrency, formatDate } from "utils/format";

type RepaymentPageProps = {
  dashboard: Dashboard;
  repayments: Repayment[];
  onSubmit: (payload: { amount: number; date: string; source: string; note: string }) => Promise<void>;
};

export function RepaymentPage({ dashboard, repayments, onSubmit }: RepaymentPageProps) {
  const [form, setForm] = useState({
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    source: "Bank Transfer",
    note: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit({
      amount: Number(form.amount),
      date: form.date,
      source: form.source,
      note: form.note,
    });
    setForm({ amount: "", date: new Date().toISOString().slice(0, 10), source: "Bank Transfer", note: "" });
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      <SectionCard title="Semester Repayment" subtitle="Balances can be carried until the end of the semester instead of monthly due dates.">
        <div className="rounded-3xl bg-slate-950 p-5 text-white">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Current Semester Balance</div>
          <div className="mt-3 text-4xl font-extrabold">{formatCurrency(dashboard.repayment_summary.amount_remaining)}</div>
          <div className="mt-2 text-sm text-slate-300">Due by {formatDate(dashboard.repayment_summary.semester_due_date)}</div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm font-semibold text-slate-500">
            <span>Repayment progress</span>
            <span>{dashboard.repayment_summary.progress}%</span>
          </div>
          <ProgressBar value={dashboard.repayment_summary.progress} />
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="number"
            min="1"
            step="0.01"
            value={form.amount}
            onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
            placeholder="Repayment amount"
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="date"
              value={form.date}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
              required
            />
            <input
              value={form.source}
              onChange={(event) => setForm((current) => ({ ...current, source: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
              placeholder="Source"
              required
            />
          </div>
          <textarea
            value={form.note}
            onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
            className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
            placeholder="Optional repayment note"
          />
          <button className="w-full rounded-2xl bg-blue-900 px-4 py-3 text-sm font-semibold text-white">Record repayment</button>
        </form>
      </SectionCard>

      <SectionCard title="Repayment History" subtitle="Consistent end-of-semester repayment improves trust and future credit access.">
        <DataTable
          data={repayments}
          columns={[
            { key: "date", header: "Date", render: (row) => formatDate(row.date) },
            { key: "amount", header: "Amount", render: (row) => formatCurrency(row.amount) },
            { key: "source", header: "Source", render: (row) => row.source },
            { key: "note", header: "Note", render: (row) => <span className="text-xs text-slate-500">{row.note || "Recorded payment"}</span> },
          ]}
        />
      </SectionCard>
    </div>
  );
}
