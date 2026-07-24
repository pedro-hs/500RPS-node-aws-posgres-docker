import { describe, it, vi } from 'vitest';
import { TrafficRepository } from '../../src/repositories/traffic';
import { expectRepositoryListsRows, expectRepositoryReturnsRow } from './expect-repository-query';

describe('TrafficRepository', () => {
  const pool = { query: vi.fn() } as any;
  const repository = new TrafficRepository(pool);

  it('getCountryTrafficVolume returns all rows', () =>
    expectRepositoryListsRows(() => repository.getCountryTrafficVolume(), pool, [{ country: 'BR', total: 10 }]));

  it('getVehicleTypeCount returns all rows', () =>
    expectRepositoryListsRows(() => repository.getVehicleTypeCount(), pool, [{ vehicleType: 'Truck', total: 5 }]));

  it('insertTrafficEvent returns the inserted row', () =>
    expectRepositoryReturnsRow(() => repository.insertTrafficEvent({ countryId: 'BR', vehicleTypeId: 1 }), pool, {
      id: 1,
      countryId: 'BR',
      vehicleTypeId: 1,
      occurredAt: new Date(),
    }));
});
