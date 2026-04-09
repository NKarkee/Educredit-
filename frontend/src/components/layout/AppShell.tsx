import { Landmark, LayoutDashboard, LineChart, PiggyBank, ShieldCheck, Wallet } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

type AppShellProps = {
  role: "student" | "admin";
  studentName?: string;
  onResetRole: () => void;
};

const studentNav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Spending", icon: Wallet },
  { to: "/repayments", label: "Repayments", icon: PiggyBank },
  { to: "/scholarships", label: "Scholarships", icon: Landmark },
  { to: "/trust", label: "Trust & Growth", icon: LineChart },
  { to: "/graduation", label: "Graduation", icon: ShieldCheck },
];

const adminNav = [
  { to: "/admin", label: "Admin Command", icon: Landmark },
];

export function AppShell({ role, studentName, onResetRole }: AppShellProps) {
  const nav = role === "student" ? studentNav : adminNav;

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-4 py-4 lg:flex-row lg:px-6">
        <aside className="glass-panel mb-4 rounded-[28px] border border-white/70 bg-hero-grid p-5 shadow-panel lg:mb-0 lg:w-80">
          <div className="mb-10">
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.32em] text-blue-900/60">EduCredit+</div>
            <h1 className="text-3xl font-extrabold text-ink">Institutional credit intelligence</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              University-integrated smart credit for behavior-based financial identity.
            </p>
          </div>

          <div className="mb-6 rounded-3xl bg-slate-950 px-5 py-4 text-white">
            <div className="text-xs uppercase tracking-[0.28em] text-slate-400">{role === "student" ? "Student View" : "Admin View"}</div>
            <div className="mt-2 text-xl font-bold">{studentName ?? "Financial Office"}</div>
            <div className="mt-1 text-sm text-slate-300">
              {role === "student" ? "Behavior-based internal credit dashboard" : "Portfolio risk and graduation oversight"}
            </div>
          </div>

          <nav className="space-y-2">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-blue-900 text-white shadow-lg" : "text-slate-700 hover:bg-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={onResetRole}
            className="mt-8 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-900"
          >
            Switch role
          </button>
        </aside>

        <main className="flex-1 lg:pl-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
