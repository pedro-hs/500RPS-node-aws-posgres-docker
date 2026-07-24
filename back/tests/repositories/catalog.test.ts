import { describe, it, vi } from 'vitest';
import { CatalogRepository } from '../../src/repositories/catalog';
import { expectRepositoryListsRows, expectRepositoryReturnsRow } from './expect-repository-query';

describe('CatalogRepository', () => {
  const pool = { query: vi.fn() } as any;
  const repository = new CatalogRepository(pool);

  it('listCountries returns all rows', () =>
    expectRepositoryListsRows(() => repository.listCountries(), pool, [{ id: 'BR', name: 'Brazil' }]));

  it('listVehicleTypes returns all rows', () =>
    expectRepositoryListsRows(() => repository.listVehicleTypes(), pool, [{ id: 1, name: 'Truck' }]));

  it('insertCountry returns the inserted row', () =>
    expectRepositoryReturnsRow(() => repository.insertCountry({ id: 'BR', name: 'Brazil' }), pool, {
      id: 'BR',
      name: 'Brazil',
    }));

  it('insertVehicleType returns the inserted row', () =>
    expectRepositoryReturnsRow(() => repository.insertVehicleType({ name: 'Truck' }), pool, {
      id: 1,
      name: 'Truck',
    }));
});
