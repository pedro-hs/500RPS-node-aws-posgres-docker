import { pool } from '../db/pool';
import { TrafficRepository } from '../repositories/traffic';
import { TrafficService } from '../services/traffic';
import { TrafficController } from '../controllers/traffic';

export class TrafficControllerFactory {
  static create(): TrafficController {
    const repository = new TrafficRepository(pool);
    const service = new TrafficService(repository);
    return new TrafficController(service);
  }
}
