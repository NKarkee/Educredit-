type ProgressBarProps = {
  value: number;
  color?: "blue" | "green" | "amber";
};

const colorMap = {
  blue: "bg-blue-600",
  green: "bg-emerald-600",
  amber: "bg-amber-500",
};

export function ProgressBar({ value, color = "blue" }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-full bg-slate-100">
      <div
        className={`h-3 rounded-full transition-all ${colorMap[color]}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
