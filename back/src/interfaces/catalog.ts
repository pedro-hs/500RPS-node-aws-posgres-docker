export interface IVehicleType {
  id: number;
  name: string;
}

export type IVehicleTypeRequest = Omit<IVehicleType, 'id'>;

export interface ICountry {
  id: string; // ISO 3166-1 alpha-2
  name: string;
}

export interface ICatalogService {
  listCountries(): Promise<ICountry[]>;
  listVehicleTypes(): Promise<IVehicleType[]>;
  insertCountry(country: ICountry): Promise<ICountry>;
  insertVehicleType(vehicleType: IVehicleTypeRequest): Promise<IVehicleType>;
}
