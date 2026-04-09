import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#1d4ed8", "#0f766e", "#0891b2", "#f59e0b", "#7c3aed", "#dc2626"];

export function SpendingChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={106} innerRadius={58}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`$${value}`, "Spend"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
