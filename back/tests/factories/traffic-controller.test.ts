import { describe, it, expect, vi } from 'vitest';
import { pool } from '../../src/db/pool';
import { TrafficRepository } from '../../src/repositories/traffic';
import { TrafficService } from '../../src/services/traffic';
import { CacheService } from '../../src/services/cache';
import { TrafficController } from '../../src/controllers/traffic';
import { TrafficControllerFactory } from '../../src/factories/traffic-controller';
import { env } from '../../src/config/env';
import { expectFactoryWiresLayers } from './expect-factory-wires-layers';

vi.mock('../../src/db/pool', () => ({ pool: {} }));
vi.mock('../../src/repositories/traffic');
vi.mock('../../src/services/traffic');
vi.mock('../../src/services/cache');
vi.mock('../../src/controllers/traffic');

describe('TrafficControllerFactory', () => {
  it('wires repository, cache, service and controller', () => {
    expectFactoryWiresLayers(() => TrafficControllerFactory.create(), [
      { Class: TrafficRepository, args: [pool] },
      { Class: CacheService, args: [env.cacheTtlSeconds, env.cacheEnabled] },
      { Class: TrafficService, args: [expect.any(TrafficRepository), expect.any(CacheService)] },
      { Class: TrafficController, args: [expect.any(TrafficService)] },
    ]);
  });
});
