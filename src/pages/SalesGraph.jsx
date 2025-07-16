import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesGraph({ transactions }) {
  const salesData = transactions
    ?.filter((t) => t.type === "sale")
    .map((t) => ({
      date: t.date ? new Date(t.date) : new Date(), // Use today if null/undefined
      amount: t.amount,
    }))
    .sort((a, b) => a.date - b.date); // Ensure chronological order

  return (
    <div className="w-full h-72 bg-white shadow-md rounded-lg">
      <h2 className="text-sm font-semibold mb-2 text-gray-700">
        Sales Over Time
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            type="number"
            domain={["auto", "auto"]}
            scale="time"
            tickFormatter={(tick) =>
              new Date(tick).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })
            }
            tick={{ fontSize: 10 }}
          />
          <YAxis tick={{ fontSize: 10 }} width={40} />
          <Tooltip
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString("en-IN", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            }
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}