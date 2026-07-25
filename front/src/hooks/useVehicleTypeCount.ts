import { useQuery } from '@tanstack/react-query';
import { getVehicleTypeCount } from '../api/traffic';
import type { ChartPoint } from '../components/charts';
import { queryKeys } from './keys';

export function useVehicleTypeCount(enabled = true) {
  return useQuery({
    queryKey: queryKeys.vehicleTypeCount,
    queryFn: getVehicleTypeCount,
    enabled,
    select: (data): ChartPoint[] =>
      data.map((d) => ({ label: d.vehicleType, total: d.total })),
  });
}
