import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertEvent } from '../api/traffic';
import { queryKeys } from './keys';

export function useInsertEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.countryVolume });
      queryClient.invalidateQueries({ queryKey: queryKeys.vehicleTypeCount });
    },

  });
}
