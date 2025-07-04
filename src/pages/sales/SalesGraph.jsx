import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesGraph({ transactions }) {
  const salesData = transactions
    ?.filter(t => t.type === "sale")
    .map(t => ({
      date: new Date(t.date).toLocaleDateString(),
      amount: t.amount
    }));

  return (
    <div className="w-full h-72 mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sales Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
