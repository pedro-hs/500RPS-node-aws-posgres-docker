export interface ChartPoint {
  label: string;
  total: number;
}

export type ChartProps = {
  data: ChartPoint[];
};
