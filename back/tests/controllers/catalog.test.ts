import { describe, it, vi } from 'vitest';
import { CatalogController } from '../../src/controllers/catalog';
import type { ICatalogService } from '../../src/interfaces/catalog';
import { expectControllerDelegatesToService } from './expect-controller-delegates-to-service';

describe('CatalogController', () => {
  const service: ICatalogService = {
    listCountries: vi.fn(),
    listVehicleTypes: vi.fn(),
    insertCountry: vi.fn(),
    insertVehicleType: vi.fn(),
  };
  const controller = new CatalogController(service);

  it('listCountries delegates to service', () =>
    expectControllerDelegatesToService(controller.listCountries, service, 'listCountries'));

  it('listVehicleTypes delegates to service', () =>
    expectControllerDelegatesToService(controller.listVehicleTypes, service, 'listVehicleTypes'));

  it('insertCountry delegates to service', () =>
    expectControllerDelegatesToService(controller.insertCountry, service, 'insertCountry', {
      requestBody: { id: 'BR', name: 'Brazil' },
      statusCode: 201,
    }));

  it('insertVehicleType delegates to service', () =>
    expectControllerDelegatesToService(controller.insertVehicleType, service, 'insertVehicleType', {
      requestBody: { name: 'Truck' },
      statusCode: 201,
    }));
});
