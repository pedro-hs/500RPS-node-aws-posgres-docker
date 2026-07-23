export interface IVehicleType {
  id: number;
  name: string;
}

export interface IVehicleTypeRequest extends Omit<IVehicleType, 'id'> {}

export interface ICountry {
  id: string; // ISO 3166-1 alpha-2
  name: string;
}

export interface ICatalogService {
  insertCountry(country: ICountry): Promise<unknown>;
  insertVehicleType(vehicleType: IVehicleTypeRequest): Promise<unknown>;
}
