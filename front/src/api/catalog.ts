import { apiFetch } from './client';

export interface Country {
  id: string;
  name: string;
}

export interface VehicleType {
  id: number;
  name: string;
}

export interface InsertCountryRequest {
  id: string;
  name: string;
}

export interface InsertVehicleTypeRequest {
  name: string;
}

export const listCountries = () => apiFetch<Country[]>('/catalog/countries');

export const listVehicleTypes = () => apiFetch<VehicleType[]>('/catalog/vehicle-types');

export const insertCountry = (body: InsertCountryRequest) =>
  apiFetch<Country>('/catalog/countries', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const insertVehicleType = (body: InsertVehicleTypeRequest) =>
  apiFetch<VehicleType>('/catalog/vehicle-types', {
    method: 'POST',
    body: JSON.stringify(body),
  });

