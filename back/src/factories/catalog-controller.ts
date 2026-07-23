import { pool } from '../db/pool';
import { CatalogRepository } from '../repositories/catalog';
import { CatalogService } from '../services/catalog';
import { CatalogController } from '../controllers/catalog';

export class CatalogControllerFactory {
  static create(): CatalogController {
    const repository = new CatalogRepository(pool);
    const service = new CatalogService(repository);
    return new CatalogController(service);
  }
}
