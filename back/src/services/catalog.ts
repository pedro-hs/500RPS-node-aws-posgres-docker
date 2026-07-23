import { CatalogRepository } from '../repositories/catalog';
import type { ICatalogService, ICountry, IVehicleTypeRequest } from '../interfaces/catalog';

export class CatalogService implements ICatalogService {
  constructor(private readonly repository: CatalogRepository) {}

  async insertCountry(country: ICountry) {
    return this.repository.insertCountry(country);
  }

  async insertVehicleType(vehicleType: IVehicleTypeRequest) {
    return this.repository.insertVehicleType(vehicleType);
  }
}
