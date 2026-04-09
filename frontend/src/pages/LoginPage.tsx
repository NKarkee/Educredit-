import { ArrowRight, ShieldCheck, University } from "lucide-react";
import { motion } from "framer-motion";

import { Student } from "types";

type LoginPageProps = {
  students: Student[];
  onEnterStudent: (studentId: string) => void;
  onEnterAdmin: () => void;
  onApply: () => void;
};

export function LoginPage({ students, onEnterStudent, onEnterAdmin, onApply }: LoginPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr]">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[34px] border border-white/70 bg-slate-950 bg-hero-grid p-8 text-white shadow-panel lg:p-10"
        >
          <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
            Bank-Grade Student Credit Infrastructure
          </div>
          <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-tight">
            EduCredit+ turns campus behavior into a trusted credit identity.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Demonstrate dynamic credit assignment, semester repayment, scholarship auto-pay, and graduation into
            formal financial access.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Weighted trust scoring from institutional signals",
              "Semester-based repayment instead of monthly debt pressure",
              "Graduation pipeline toward external credit readiness",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass-panel rounded-[34px] border border-white/70 p-7 shadow-panel"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
              <University className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">Mock Access</div>
              <div className="text-2xl font-bold text-ink">Choose a role</div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onEnterAdmin}
              className="flex w-full items-center justify-between rounded-[28px] border border-slate-200 bg-slate-950 px-5 py-5 text-left text-white transition hover:translate-y-[-1px]"
            >
              <div>
                <div className="text-lg font-bold">University Admin / Financial Office</div>
                <div className="mt-1 text-sm text-slate-300">Portfolio risk, flagged transactions, scholarship events, and graduation review.</div>
              </div>
              <ShieldCheck className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={onApply}
              className="mb-4 flex w-full items-center justify-between rounded-[24px] border border-blue-200 bg-blue-50 px-4 py-4 text-left transition hover:bg-blue-100/70"
            >
              <div>
                <div className="font-semibold text-blue-950">New to EduCredit+?</div>
                <div className="text-sm text-blue-800">Apply for university approval and internal credit onboarding.</div>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-700" />
            </button>
            <div className="mb-3 text-sm font-semibold text-slate-500">Student Access</div>
            <div className="space-y-3">
              {students.map((student) => (
                <button
                  key={student.student_id}
                  onClick={() => onEnterStudent(student.student_id)}
                  className="flex w-full items-center justify-between rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-blue-200 hover:bg-blue-50/60"
                >
                  <div>
                    <div className="font-semibold text-ink">{student.full_name}</div>
                    <div className="text-sm text-slate-500">
                      {student.major} • {student.class_year}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
