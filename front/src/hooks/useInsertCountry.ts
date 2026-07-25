import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertCountry } from '../api/catalog';
import { queryKeys } from './keys';

export function useInsertCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.countries });
    },
  });
}
