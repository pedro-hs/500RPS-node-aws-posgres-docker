import { useQuery } from '@tanstack/react-query';
import { listVehicleTypes } from '../api/catalog';
import { queryKeys } from './keys';

export function useVehicleTypes() {
  return useQuery({
    queryKey: queryKeys.vehicleTypes,
    queryFn: listVehicleTypes,
  });
}
