type StatusBadgeProps = {
  value: string;
};

export function StatusBadge({ value }: StatusBadgeProps) {
  const normalized = value.toLowerCase();
  const className =
    normalized.includes("eligible") || normalized.includes("low") || normalized.includes("approved")
      ? "bg-emerald-100 text-emerald-700"
      : normalized.includes("progress") || normalized.includes("flag")
        ? "bg-amber-100 text-amber-700"
        : "bg-rose-100 text-rose-700";

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${className}`}>{value}</span>;
}
