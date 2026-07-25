import { useState } from 'react';
import { useCountryVolume } from '../hooks/useCountryVolume';
import { useVehicleTypeCount } from '../hooks/useVehicleTypeCount';
import { charts, CHART_TYPES, VIEWS, type ChartType, type View } from './dashboardConfig';

const btnClass = (active: boolean) =>
  active ? 'font-bold capitalize' : 'capitalize';

export default function Dashboard() {
  const [view, setView] = useState<View>('country');
  const [type, setType] = useState<ChartType>('bar');
  const country = useCountryVolume(view === 'country');
  const vehicle = useVehicleTypeCount(view === 'vehicle');

  const queries = { country, vehicle } as const;
  const query = queries[view];
  const data = query.data ?? [];
  const Chart = charts[type];

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  if (query.isError) {
    return <p>Failed to load traffic data.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {VIEWS.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => setView(id)} className={btnClass(view === id)}>
            {label}
          </button>
        ))}
      </div>
      <div className="mb-4 flex gap-2">
        {CHART_TYPES.map((t) => (
          <button key={t} type="button" onClick={() => setType(t)} className={btnClass(type === t)}>
            {t}
          </button>
        ))}
      </div>
      <Chart data={data} />
    </div>
  );
}
