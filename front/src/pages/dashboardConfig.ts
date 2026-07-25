import { BarTrafficChart, LineTrafficChart, PieTrafficChart } from '../components/charts';

export type View = 'country' | 'vehicle';
export type ChartType = 'bar' | 'line' | 'pie';

export const VIEWS = [
  { id: 'country' as const, label: 'Country-wise Traffic' },
  { id: 'vehicle' as const, label: 'Vehicle Type Distribution' },
];

export const CHART_TYPES = ['bar', 'line', 'pie'] as const;

export const charts = {
  bar: BarTrafficChart,
  line: LineTrafficChart,
  pie: PieTrafficChart,
} as const;
