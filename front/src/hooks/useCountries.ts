import { useQuery } from '@tanstack/react-query';
import { listCountries } from '../api/catalog';
import { queryKeys } from './keys';

export function useCountries() {
  return useQuery({
    queryKey: queryKeys.countries,
    queryFn: listCountries,
  });
}
