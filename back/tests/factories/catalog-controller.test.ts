import { describe, it, expect, vi } from 'vitest';
import { pool } from '../../src/db/pool';
import { CatalogRepository } from '../../src/repositories/catalog';
import { CatalogService } from '../../src/services/catalog';
import { CatalogController } from '../../src/controllers/catalog';
import { CatalogControllerFactory } from '../../src/factories/catalog-controller';
import { expectFactoryWiresLayers } from './expect-factory-wires-layers';

vi.mock('../../src/db/pool', () => ({ pool: {} }));
vi.mock('../../src/repositories/catalog');
vi.mock('../../src/services/catalog');
vi.mock('../../src/controllers/catalog');

describe('CatalogControllerFactory', () => {
  it('wires repository, service and controller', () => {
    expectFactoryWiresLayers(() => CatalogControllerFactory.create(), [
      { Class: CatalogRepository, args: [pool] },
      { Class: CatalogService, args: [expect.any(CatalogRepository)] },
      { Class: CatalogController, args: [expect.any(CatalogService)] },
    ]);
  });
});
