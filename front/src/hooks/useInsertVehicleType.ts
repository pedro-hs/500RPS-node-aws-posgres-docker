import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertVehicleType } from '../api/catalog';
import { queryKeys } from './keys';

export function useInsertVehicleType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertVehicleType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicleTypes });
    },
  });
}
