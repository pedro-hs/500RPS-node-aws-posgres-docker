import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import { CHART_COLOR, CHART_COLOR_LIGHT, CHART_HEIGHT } from './constants';
import type { ChartProps } from './types';
import { useChartHighlight } from './useChartHighlight';

export function BarTrafficChart({ data }: ChartProps) {
  const { setActive, total, opacity } = useChartHighlight(data);

  return (
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <BarChart data={data} onMouseLeave={() => setActive(null)}>
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLOR_LIGHT} />
            <stop offset="100%" stopColor={CHART_COLOR} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip content={(props) => <ChartTooltip {...props} total={total} />} />
        <Bar dataKey="total" fill="url(#barGrad)">
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
