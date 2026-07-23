import type { Pool } from 'pg';
import { loadSql } from '../db/load-sql';

const COUNTRY_TRAFFIC_VOLUME = loadSql('traffic/get_country_traffic_volume.sql');
const VEHICLE_TYPE_COUNT = loadSql('traffic/get_vehicle_type_count.sql');
const INSERT_TRAFFIC_EVENT = loadSql('traffic/insert_traffic_event.sql');

interface ITrafficEvent {
  // TODO
}

export class TrafficRepository {
  constructor(private readonly pool: Pool) {}

  async getCountryTrafficVolume() {
    const { rows } = await this.pool.query(COUNTRY_TRAFFIC_VOLUME);
    return rows;
  }

  async getVehicleTypeCount() {
    const { rows } = await this.pool.query(VEHICLE_TYPE_COUNT);
    return rows;
  }

  async insertTrafficEvent(event: ITrafficEvent) {
    const { rows } = await this.pool.query(INSERT_TRAFFIC_EVENT, []);
    return rows[0];
  }
}
