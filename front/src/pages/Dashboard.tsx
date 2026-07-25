import { useState } from 'react';
import { ButtonGroup } from '../components/ButtonGroup';
import { useCountryVolume } from '../hooks/useCountryVolume';
import { useVehicleTypeCount } from '../hooks/useVehicleTypeCount';
import { charts, CHART_TYPES, VIEWS, type ChartType, type View } from './dashboardConfig';

const viewOptions = VIEWS.map(({ id, label }) => ({ value: id, label }));
const chartOptions = CHART_TYPES.map((t) => ({ value: t, label: t }));

export default function Dashboard() {
  const [view, setView] = useState<View>('country');
  const [type, setType] = useState<ChartType>('bar');
  const country = useCountryVolume(view === 'country');
  const vehicle = useVehicleTypeCount(view === 'vehicle');

  const queries = { country, vehicle } as const;
  const query = queries[view];
  const data = query.data ?? [];
  const Chart = charts[type];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <ButtonGroup options={viewOptions} value={view} onChange={setView} />
      <div className="py-9">
        {query.isLoading && <p className="text-center">Loading...</p>}
        {query.isError && <p className="text-center">Failed to load traffic data.</p>}
        {!query.isLoading && !query.isError && <Chart data={data} />}
      </div>
      <ButtonGroup options={chartOptions} value={type} onChange={setType} />
    </div>
  );
}
