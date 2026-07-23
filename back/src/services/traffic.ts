import { TrafficRepository } from '../repositories/traffic';
import { CacheService } from './cache';
import type { ITrafficService, ITrafficEventRequest } from '../interfaces/traffic';

const COUNTRY_TRAFFIC_VOLUME_CACHE_KEY = 'country-traffic-volume';
const VEHICLE_TYPE_COUNT_CACHE_KEY = 'vehicle-type-count';

export class TrafficService implements ITrafficService {
  constructor(
    private readonly repository: TrafficRepository,
    private readonly cache: CacheService,
  ) {}

  async getCountryTrafficVolume() {
    const cached = this.cache.get<unknown[]>(COUNTRY_TRAFFIC_VOLUME_CACHE_KEY);
    if (cached) return cached;

    const volume = await this.repository.getCountryTrafficVolume();
    this.cache.set(COUNTRY_TRAFFIC_VOLUME_CACHE_KEY, volume);
    return volume;
  }

  async getVehicleTypeCount() {
    const cached = this.cache.get<unknown[]>(VEHICLE_TYPE_COUNT_CACHE_KEY);
    if (cached) return cached;

    const count = await this.repository.getVehicleTypeCount();
    this.cache.set(VEHICLE_TYPE_COUNT_CACHE_KEY, count);
    return count;
  }

  async insertTrafficEvent(event: ITrafficEventRequest) {
    const inserted = await this.repository.insertTrafficEvent(event);
    this.cache.invalidate(COUNTRY_TRAFFIC_VOLUME_CACHE_KEY);
    this.cache.invalidate(VEHICLE_TYPE_COUNT_CACHE_KEY);
    return inserted;
  }
}
