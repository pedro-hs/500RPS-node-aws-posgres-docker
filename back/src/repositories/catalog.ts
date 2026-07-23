import { loadSql, bindToPositionalParams } from '../db/sql-utils';
import type { Pool } from 'pg';
import type { ICountry, IVehicleType, IVehicleTypeRequest } from '../interfaces/catalog';

const LIST_COUNTRIES = loadSql('catalog/list_countries.sql');
const LIST_VEHICLE_TYPES = loadSql('catalog/list_vehicle_types.sql');
const INSERT_COUNTRY = loadSql('catalog/insert_country.sql');
const INSERT_VEHICLE_TYPE = loadSql('catalog/insert_vehicle_type.sql');

export class CatalogRepository {
  constructor(private readonly pool: Pool) {}

  async listCountries(): Promise<ICountry[]> {
    const { rows } = await this.pool.query<ICountry>(LIST_COUNTRIES);
    return rows;
  }

  async listVehicleTypes(): Promise<IVehicleType[]> {
    const { rows } = await this.pool.query<IVehicleType>(LIST_VEHICLE_TYPES);
    return rows;
  }

  async insertCountry(country: ICountry): Promise<ICountry> {
    const queryWithParams = bindToPositionalParams<ICountry>(INSERT_COUNTRY, country);
    const { rows } = await this.pool.query<ICountry>(queryWithParams);
    return rows[0];
  }

  async insertVehicleType(vehicleType: IVehicleTypeRequest): Promise<IVehicleType> {
    const queryWithParams = bindToPositionalParams<IVehicleTypeRequest>(INSERT_VEHICLE_TYPE, vehicleType);
    const { rows } = await this.pool.query<IVehicleType>(queryWithParams);
    return rows[0];
  }
}
