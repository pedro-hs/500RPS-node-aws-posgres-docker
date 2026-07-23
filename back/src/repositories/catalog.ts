import type { Pool } from 'pg';
import { loadSql } from '../db/load-sql';

const INSERT_VEHICLE_TYPE = loadSql('catalog/insert_vehicle_type.sql');
const INSERT_COUNTRY = loadSql('catalog/insert_country.sql');

interface IVehicleType {
  id: number;
  name: string;
}

interface ICountry {
  id: number; // ISO 3166-1 alpha-2
  name: string;
}

export class CatalogRepository {
  constructor(private readonly pool: Pool) {}

  async insertCountry(country: ICountry) {
    const { rows } = await this.pool.query(INSERT_COUNTRY, []);
    return rows[0];
  }

  async insertVehicleType(vehicleType: Omit<IVehicleType, 'id'>) {
    const { rows } = await this.pool.query(INSERT_VEHICLE_TYPE, []);
    return rows[0];
  }
}
