import { loadSql, bindToPositionalParams } from '../db/sql-utils';
import type { Pool } from 'pg';
import type {
  ITrafficEvent,
  ITrafficEventRequest,
  ICountryTrafficVolume,
  IVehicleTypeCount,
} from '../interfaces/traffic';

const COUNTRY_TRAFFIC_VOLUME = loadSql('traffic/get_country_traffic_volume.sql');
const VEHICLE_TYPE_COUNT = loadSql('traffic/get_vehicle_type_count.sql');
const INSERT_TRAFFIC_EVENT = loadSql('traffic/insert_traffic_event.sql');

export class TrafficRepository {
  constructor(private readonly pool: Pool) {}

  async getCountryTrafficVolume(): Promise<ICountryTrafficVolume[]> {
    const { rows } = await this.pool.query<ICountryTrafficVolume>(COUNTRY_TRAFFIC_VOLUME);
    return rows;
  }

  async getVehicleTypeCount(): Promise<IVehicleTypeCount[]> {
    const { rows } = await this.pool.query<IVehicleTypeCount>(VEHICLE_TYPE_COUNT);
    return rows;
  }

  async insertTrafficEvent(event: ITrafficEventRequest): Promise<ITrafficEvent> {
    const queryWithParams = bindToPositionalParams<ITrafficEventRequest>(INSERT_TRAFFIC_EVENT, event);
    const { rows } = await this.pool.query<ITrafficEvent>(queryWithParams);
    return rows[0];
  }
}
