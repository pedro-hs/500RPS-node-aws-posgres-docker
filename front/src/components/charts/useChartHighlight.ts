import { useState } from 'react';
import { DIM_OPACITY } from './constants';
import type { ChartPoint } from './types';

export function useChartHighlight(data: ChartPoint[]) {
  const [active, setActive] = useState<number | null>(null);
  const total = data.reduce((sum, point) => sum + point.total, 0);
  const opacity = (index: number) => (active === null || active === index ? 1 : DIM_OPACITY);

  return { active, setActive, total, opacity };
}
