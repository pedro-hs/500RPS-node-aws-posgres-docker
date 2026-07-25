import { useQuery } from '@tanstack/react-query';
import { getCountryVolume } from '../api/traffic';
import { queryKeys } from './keys';

export function useCountryVolume() {
  return useQuery({
    queryKey: queryKeys.countryVolume,
    queryFn: getCountryVolume,
  });
}
