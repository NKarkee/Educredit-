import { FormEvent, useState } from "react";

type ApplicationFormPageProps = {
  onSubmit: (payload: {
    full_name: string;
    student_number: string;
    university_name: string;
    major: string;
    classification: string;
    email: string;
    phone: string;
    gpa?: number;
    expected_graduation_term: string;
    requested_limit: number;
    housing_status: string;
    aid_status: string;
    statement: string;
  }) => Promise<void>;
  onBack: () => void;
};

export function ApplicationFormPage({ onSubmit, onBack }: ApplicationFormPageProps) {
  const [form, setForm] = useState({
    full_name: "",
    student_number: "",
    university_name: "Midwest State University",
    major: "",
    classification: "Freshman",
    email: "",
    phone: "",
    gpa: "",
    expected_graduation_term: "",
    requested_limit: "800",
    housing_status: "On-campus",
    aid_status: "Scholarship / Aid recipient",
    statement: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        gpa: form.gpa ? Number(form.gpa) : undefined,
        requested_limit: Number(form.requested_limit),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="glass-panel max-w-2xl rounded-[34px] border border-white/70 p-8 shadow-panel">
          <div className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-700">Application Submitted</div>
          <h1 className="mt-3 text-3xl font-extrabold text-ink">Your EduCredit+ application has been sent for university review.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            The financial office will verify your student record, academic standing, and institutional eligibility before approving access.
          </p>
          <button onClick={onBack} className="mt-6 rounded-2xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white">
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <form onSubmit={handleSubmit} className="glass-panel max-w-4xl rounded-[34px] border border-white/70 p-8 shadow-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-700">New Student Application</div>
            <h1 className="mt-2 text-3xl font-extrabold text-ink">Apply for EduCredit+</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Submit your academic and enrollment details to the university financial office for institutional approval.
            </p>
          </div>
          <button type="button" onClick={onBack} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
            Back
          </button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["full_name", "Full name"],
            ["student_number", "Student number"],
            ["university_name", "University"],
            ["major", "Major"],
            ["classification", "Classification"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["expected_graduation_term", "Expected graduation term"],
            ["requested_limit", "Requested credit limit"],
            ["housing_status", "Housing status"],
            ["aid_status", "Financial aid status"],
            ["gpa", "Current GPA"],
          ].map(([key, label]) => (
            <input
              key={key}
              value={form[key as keyof typeof form]}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              placeholder={label}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
              required={key !== "gpa"}
            />
          ))}
        </div>
        <textarea
          value={form.statement}
          onChange={(event) => setForm((current) => ({ ...current, statement: event.target.value }))}
          placeholder="Briefly explain how you would use EduCredit+ responsibly for academic and living essentials."
          className="mt-4 min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
          required
        />
        <button disabled={submitting} className="mt-6 w-full rounded-2xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white">
          {submitting ? "Submitting..." : "Submit application to university review"}
        </button>
      </form>
    </div>
  );
}
