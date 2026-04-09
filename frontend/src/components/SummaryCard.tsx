type SummaryCardProps = {
  title: string;
  value: string;
  subtitle: string;
  accent?: "blue" | "green" | "amber" | "red";
};

const accentClasses = {
  blue: "from-blue-600/12 to-blue-100 text-blue-950",
  green: "from-emerald-600/12 to-emerald-100 text-emerald-950",
  amber: "from-amber-500/12 to-amber-100 text-amber-950",
  red: "from-rose-600/12 to-rose-100 text-rose-950",
};

export function SummaryCard({ title, value, subtitle, accent = "blue" }: SummaryCardProps) {
  return (
    <div className={`rounded-[26px] border border-white/70 bg-gradient-to-br ${accentClasses[accent]} glass-panel p-5 shadow-panel`}>
      <div className="text-sm font-semibold text-slate-500">{title}</div>
      <div className="mt-4 text-3xl font-extrabold tracking-tight">{value}</div>
      <div className="mt-2 text-sm text-slate-600">{subtitle}</div>
    </div>
  );
}
