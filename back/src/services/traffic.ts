import { TrafficRepository } from '../repositories/traffic';
import { CacheService } from './cache';
import type {
  ITrafficService,
  ITrafficEvent,
  ITrafficEventRequest,
  ICountryTrafficVolume,
  IVehicleTypeCount,
} from '../interfaces/traffic';

const COUNTRY_TRAFFIC_VOLUME_CACHE_KEY = 'country-traffic-volume';
const VEHICLE_TYPE_COUNT_CACHE_KEY = 'vehicle-type-count';

export class TrafficService implements ITrafficService {
  constructor(
    private readonly repository: TrafficRepository,
    private readonly cache: CacheService,
  ) {}

  async getCountryTrafficVolume(): Promise<ICountryTrafficVolume[]> {
    const cached = this.cache.get<ICountryTrafficVolume[]>(COUNTRY_TRAFFIC_VOLUME_CACHE_KEY);
    if (cached) return cached;

    const volume = await this.repository.getCountryTrafficVolume();
    this.cache.set(COUNTRY_TRAFFIC_VOLUME_CACHE_KEY, volume);
    return volume;
  }

  async getVehicleTypeCount(): Promise<IVehicleTypeCount[]> {
    const cached = this.cache.get<IVehicleTypeCount[]>(VEHICLE_TYPE_COUNT_CACHE_KEY);
    if (cached) return cached;

    const count = await this.repository.getVehicleTypeCount();
    this.cache.set(VEHICLE_TYPE_COUNT_CACHE_KEY, count);
    return count;
  }

  async insertTrafficEvent(event: ITrafficEventRequest): Promise<ITrafficEvent> {
    const inserted = await this.repository.insertTrafficEvent(event);
    this.cache.invalidate(COUNTRY_TRAFFIC_VOLUME_CACHE_KEY);
    this.cache.invalidate(VEHICLE_TYPE_COUNT_CACHE_KEY);
    return inserted;
  }
}
