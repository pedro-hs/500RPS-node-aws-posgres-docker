import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import { CHART_COLOR, CHART_HEIGHT } from './utils/constants';
import type { ChartProps } from './utils/types';
import { useChartState } from './utils/useChartState';

export function BarTrafficChart({ data }: ChartProps) {
  const { setActive, total, opacity } = useChartState(data);

  return (
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <BarChart data={data} onMouseLeave={() => setActive(null)}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip content={(props) => <ChartTooltip {...props} total={total} />} />
        <Bar dataKey="total" fill={CHART_COLOR}>
          {data.map((point, index) => (
            <Cell
              key={point.label}
              opacity={opacity(index)}
              onMouseEnter={() => setActive(index)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
