import { CatalogRepository } from '../repositories/catalog';
import type {
  ICatalogService,
  ICountry,
  IVehicleType,
  IVehicleTypeRequest,
} from '../interfaces/catalog';

export class CatalogService implements ICatalogService {
  constructor(private readonly repository: CatalogRepository) {}

  async listCountries(): Promise<ICountry[]> {
    return this.repository.listCountries();
  }

  async listVehicleTypes(): Promise<IVehicleType[]> {
    return this.repository.listVehicleTypes();
  }

  async insertCountry(country: ICountry): Promise<ICountry> {
    return this.repository.insertCountry(country);
  }

  async insertVehicleType(vehicleType: IVehicleTypeRequest): Promise<IVehicleType> {
    return this.repository.insertVehicleType(vehicleType);
  }
}
