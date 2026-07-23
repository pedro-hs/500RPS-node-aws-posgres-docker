import { loadSql } from '../db/load-sql';
import type { Pool } from 'pg';
import type { ICountry, IVehicleTypeRequest } from '../interfaces/catalog';

const INSERT_VEHICLE_TYPE = loadSql('catalog/insert_vehicle_type.sql');
const INSERT_COUNTRY = loadSql('catalog/insert_country.sql');


export class CatalogRepository {
  constructor(private readonly pool: Pool) {}

  async insertCountry(country: ICountry) {
    const { rows } = await this.pool.query(INSERT_COUNTRY, []);
    return rows[0];
  }

  async insertVehicleType(vehicleType: IVehicleTypeRequest) {
    const { rows } = await this.pool.query(INSERT_VEHICLE_TYPE, []);
    return rows[0];
  }
}
