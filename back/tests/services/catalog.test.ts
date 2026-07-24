import { describe, it, expect, vi } from 'vitest';
import { CatalogService } from '../../src/services/catalog';

describe('CatalogService', () => {
  const repository = {
    listCountries: vi.fn(),
    listVehicleTypes: vi.fn(),
    insertCountry: vi.fn(),
    insertVehicleType: vi.fn(),
  } as any;
  const service = new CatalogService(repository);

  const expectListDelegatesToRepository = async (
    method: 'listCountries' | 'listVehicleTypes',
    items: unknown[],
  ) => {
    repository[method].mockResolvedValue(items);

    expect(await service[method]()).toBe(items);
  };

  const expectInsertDelegatesToRepository = async (
    method: 'insertCountry' | 'insertVehicleType',
    payload: unknown,
  ) => {
    repository[method].mockResolvedValue(payload);

    expect(await service[method](payload as any)).toBe(payload);
    expect(repository[method]).toHaveBeenCalledWith(payload);
  };

  it('listCountries delegates to repository', () =>
    expectListDelegatesToRepository('listCountries', [{ id: 'BR', name: 'Brazil' }]));

  it('listVehicleTypes delegates to repository', () =>
    expectListDelegatesToRepository('listVehicleTypes', [{ id: 1, name: 'Truck' }]));

  it('insertCountry delegates to repository', () =>
    expectInsertDelegatesToRepository('insertCountry', { id: 'BR', name: 'Brazil' }));

  it('insertVehicleType delegates to repository', () =>
    expectInsertDelegatesToRepository('insertVehicleType', { name: 'Truck' }));
});
