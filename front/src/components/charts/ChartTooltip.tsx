import type { TooltipContentProps } from 'recharts';
import type { ChartPoint } from './types';

type Props = Pick<TooltipContentProps, 'active' | 'payload'> & {
  total: number;
};

function formatPercent(value: number, total: number) {
  if (total === 0) {
    return '0%';
  }
  return `${((value / total) * 100).toFixed(1)}%`;
}

export function ChartTooltip({ active, payload, total }: Props) {
  const point = payload?.[0]?.payload as ChartPoint | undefined;

  if (!active || !point) {
    return null;
  }

  return (
    <div className="rounded border bg-white px-2 py-1 text-sm shadow">
      <p className="font-medium">{point.label}</p>
      <p>{point.total} ({formatPercent(point.total, total)})</p>
    </div>
  );
}
