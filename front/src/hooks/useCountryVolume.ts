import { useQuery } from '@tanstack/react-query';
import { getCountryVolume } from '../api/traffic';
import type { ChartPoint } from '../components/charts';
import { queryKeys } from './keys';

export function useCountryVolume(enabled = true) {
  return useQuery({
    queryKey: queryKeys.countryVolume,
    queryFn: getCountryVolume,
    enabled,
    select: (data): ChartPoint[] =>
      data.map((d) => ({ label: d.country, total: d.total })),
  });
}
