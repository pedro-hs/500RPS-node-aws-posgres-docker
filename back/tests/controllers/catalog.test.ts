import { describe, it, expect, vi } from 'vitest';
import { CatalogController } from '../../src/controllers/catalog';
import { UNIQUE_VIOLATION } from '../../src/db/sql-utils';
import type { ICatalogService } from '../../src/interfaces/catalog';
import { expectControllerDelegatesToService } from './expect-controller-delegates-to-service';
import type { FastifyReply } from 'fastify';

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

  it('insertCountry returns 409 when country already exists', async () => {
    service.insertCountry = vi.fn().mockRejectedValue({ code: UNIQUE_VIOLATION });
    const request = { body: { id: 'BR', name: 'Brazil' } } as never;
    const reply = { send: vi.fn(), code: vi.fn().mockReturnThis() } as unknown as FastifyReply;

    await controller.insertCountry(request, reply);

    expect(reply.code).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith({ message: 'Country already exists' });
  });

  it('insertVehicleType delegates to service', () =>
    expectControllerDelegatesToService(controller.insertVehicleType, service, 'insertVehicleType', {
      requestBody: { name: 'Truck' },
      statusCode: 201,
    }));

  it('insertVehicleType returns 409 when vehicle type already exists', async () => {
    service.insertVehicleType = vi.fn().mockRejectedValue({ code: UNIQUE_VIOLATION });
    const request = { body: { name: 'Truck' } } as never;
    const reply = { send: vi.fn(), code: vi.fn().mockReturnThis() } as unknown as FastifyReply;

    await controller.insertVehicleType(request, reply);

    expect(reply.code).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith({ message: 'Vehicle type already exists' });
  });
});
