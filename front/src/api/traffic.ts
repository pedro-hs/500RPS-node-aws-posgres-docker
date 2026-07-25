import { apiFetch } from './client';

export interface CountryVolume {
  country: string;
  total: number;
}

export interface InsertEventRequest {
  countryId: string;
  vehicleTypeId: number;
}

export const getCountryVolume = () =>
  apiFetch<CountryVolume[]>('/traffic/countries/volume');

export const insertEvent = (body: InsertEventRequest) =>
  apiFetch('/traffic/events', {
    method: 'POST',
    body: JSON.stringify(body),
  });
