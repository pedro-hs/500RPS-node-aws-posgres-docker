import { loadSql, bindToPositionalParams } from '../db/sql-utils';
import type { Pool } from 'pg';
import type { ICountry, IVehicleTypeRequest } from '../interfaces/catalog';

const INSERT_VEHICLE_TYPE = loadSql('catalog/insert_vehicle_type.sql');
const INSERT_COUNTRY = loadSql('catalog/insert_country.sql');

export class CatalogRepository {
  constructor(private readonly pool: Pool) {}

  async insertCountry(country: ICountry) {
    const queryWithParams = bindToPositionalParams<ICountry>(INSERT_COUNTRY, country);
    const { rows } = await this.pool.query(queryWithParams);
    return rows[0];
  }

  async insertVehicleType(vehicleType: IVehicleTypeRequest) {
    const queryWithParams = bindToPositionalParams<IVehicleTypeRequest>(INSERT_VEHICLE_TYPE, vehicleType);
    const { rows } = await this.pool.query(queryWithParams);
    return rows[0];
  }
}
