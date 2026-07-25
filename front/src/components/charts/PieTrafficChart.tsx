import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import { CHART_HEIGHT, PIE_COLORS, PIE_INNER_RADIUS, PIE_OUTER_RADIUS } from './constants';
import type { ChartProps } from './types';
import { useChartHighlight } from './useChartHighlight';

export function PieTrafficChart({ data }: ChartProps) {
  const { setActive, total, opacity } = useChartHighlight(data);

  return (
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <PieChart>
        <Tooltip content={(props) => <ChartTooltip {...props} total={total} />} />
        <Pie
          data={data}
          dataKey="total"
          nameKey="label"
          innerRadius={PIE_INNER_RADIUS}
          outerRadius={PIE_OUTER_RADIUS}
          onMouseEnter={(_, index) => setActive(index)}
          onMouseLeave={() => setActive(null)}
        >
          {data.map((point, index) => (
            <Cell
              key={point.label}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
              opacity={opacity(index)}
            />
          ))}
        </Pie>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-text text-2xl font-bold">
          {total}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}
