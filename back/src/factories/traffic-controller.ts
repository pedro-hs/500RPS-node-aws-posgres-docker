import { pool } from '../db/pool';
import { TrafficRepository } from '../repositories/traffic';
import { TrafficService } from '../services/traffic';
import { CacheService } from '../services/cache';
import { TrafficController } from '../controllers/traffic';

const THIRTY_SECONDS = 30;

export class TrafficControllerFactory {
  static create(): TrafficController {
    const repository = new TrafficRepository(pool);
    const cache = new CacheService(THIRTY_SECONDS);
    const service = new TrafficService(repository, cache);
    return new TrafficController(service);
  }
}
