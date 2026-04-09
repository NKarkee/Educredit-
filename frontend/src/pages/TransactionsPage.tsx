import { FormEvent, useState } from "react";

import { DataTable } from "components/DataTable";
import { SectionCard } from "components/SectionCard";
import { StatusBadge } from "components/StatusBadge";
import { Transaction } from "types";
import { formatCurrency, formatDate } from "utils/format";

const categories = [
  "books",
  "tuition-related expenses",
  "food",
  "housing",
  "transportation",
  "academic tools/software",
  "emergency expenses",
  "luxury",
  "gambling",
];

type TransactionsPageProps = {
  transactions: Transaction[];
  onSubmit: (payload: { merchant_name: string; amount: number; category: string; date: string }) => Promise<void>;
};

export function TransactionsPage({ transactions, onSubmit }: TransactionsPageProps) {
  const [form, setForm] = useState({
    merchant_name: "",
    amount: "",
    category: "books",
    date: new Date().toISOString().slice(0, 10),
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        merchant_name: form.merchant_name,
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
      });
      setForm({
        merchant_name: "",
        amount: "",
        category: "books",
        date: new Date().toISOString().slice(0, 10),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Simulate Transaction" subtitle="University-linked credit can be used only for approved or reviewable categories.">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={form.merchant_name}
            onChange={(event) => setForm((current) => ({ ...current, merchant_name: event.target.value }))}
            placeholder="Merchant name"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 transition focus:border-blue-400"
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={form.amount}
              onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
              placeholder="Amount"
              type="number"
              min="1"
              step="0.01"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
              required
            />
            <input
              value={form.date}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
              type="date"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
              required
            />
          </div>
          <select
            value={form.category}
            onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Approved academic purchases reduce available credit immediately. Risky merchants can be flagged or blocked,
            which also affects the spending responsibility score.
          </div>
          <button
            disabled={submitting}
            className="w-full rounded-2xl bg-blue-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            {submitting ? "Processing..." : "Submit transaction"}
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Recent Transactions" subtitle="Approved, flagged, and blocked transaction activity.">
        <DataTable
          data={transactions}
          columns={[
            {
              key: "merchant",
              header: "Merchant",
              render: (row) => (
                <div>
                  <div className="font-semibold text-ink">{row.merchant_name}</div>
                  <div className="text-xs text-slate-500">{row.category}</div>
                </div>
              ),
            },
            { key: "date", header: "Date", render: (row) => formatDate(row.date) },
            { key: "amount", header: "Amount", render: (row) => formatCurrency(row.amount) },
            { key: "status", header: "Status", render: (row) => <StatusBadge value={row.approval_status} /> },
            { key: "reason", header: "Review Notes", render: (row) => <span className="text-xs leading-5 text-slate-500">{row.reason}</span> },
          ]}
        />
      </SectionCard>
    </div>
  );
}
