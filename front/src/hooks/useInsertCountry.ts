import { useMutation } from '@tanstack/react-query';
import { insertCountry } from '../api/catalog';

export function useInsertCountry() {
  return useMutation({
    mutationFn: insertCountry,
  });
}
