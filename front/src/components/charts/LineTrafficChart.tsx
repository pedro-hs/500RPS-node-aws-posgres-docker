import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import {
  CHART_COLOR,
  CHART_HEIGHT,
  LINE_ACTIVE_DOT_RADIUS,
  LINE_DOT_RADIUS,
  LINE_STROKE_WIDTH,
} from './constants';
import type { ChartProps } from './types';
import { useChartHighlight } from './useChartHighlight';

export function LineTrafficChart({ data }: ChartProps) {
  const { setActive, total, opacity } = useChartHighlight(data);

  return (
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <LineChart data={data} onMouseLeave={() => setActive(null)}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip content={(props) => <ChartTooltip {...props} total={total} />} />
        <Line
          type="monotone"
          dataKey="total"
          stroke={CHART_COLOR}
          strokeWidth={LINE_STROKE_WIDTH}
          activeDot={{ r: LINE_ACTIVE_DOT_RADIUS }}
          dot={({ index, cx, cy }) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={LINE_DOT_RADIUS}
              fill={CHART_COLOR}
              opacity={opacity(index ?? -1)}
              onMouseEnter={() => setActive(index ?? null)}
            />
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
