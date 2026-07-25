import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useCountryVolume } from '../hooks/useCountryVolume';

export default function Dashboard() {
  const { data, isLoading, isError } = useCountryVolume();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load country traffic.</p>;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Country Traffic</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="country" />
          <YAxis />
          <Bar dataKey="total" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
