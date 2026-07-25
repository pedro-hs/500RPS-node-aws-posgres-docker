import { useMutation } from '@tanstack/react-query';
import { insertVehicleType } from '../api/catalog';

export function useInsertVehicleType() {
  return useMutation({
    mutationFn: insertVehicleType,
  });
}
