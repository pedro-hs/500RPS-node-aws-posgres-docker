import { describe, it, expect, vi } from 'vitest';
import { TrafficController } from '../../src/controllers/traffic';
import { FOREIGN_KEY_VIOLATION } from '../../src/db/sql-utils';
import type { ITrafficService } from '../../src/interfaces/traffic';
import { expectControllerDelegatesToService } from './expect-controller-delegates-to-service';
import { FastifyReply } from 'fastify';

describe('TrafficController', () => {
  const service: ITrafficService = {
    getCountryTrafficVolume: vi.fn(),
    getVehicleTypeCount: vi.fn(),
    insertTrafficEvent: vi.fn(),
  };
  const controller = new TrafficController(service);

  it('getCountryTrafficVolume delegates to service', () =>
    expectControllerDelegatesToService(controller.getCountryTrafficVolume, service, 'getCountryTrafficVolume'));

  it('getVehicleTypeCount delegates to service', () =>
    expectControllerDelegatesToService(controller.getVehicleTypeCount, service, 'getVehicleTypeCount'));

  it('insertTrafficEvent delegates to service', () =>
    expectControllerDelegatesToService(controller.insertTrafficEvent, service, 'insertTrafficEvent', {
      requestBody: { countryId: 'BR', vehicleTypeId: 1 },
      statusCode: 201,
    }));

  it('insertTrafficEvent returns 400 when countryId or vehicleTypeId does not exist', async () => {
    service.insertTrafficEvent = vi.fn().mockRejectedValue({ code: FOREIGN_KEY_VIOLATION });
    const request = { body: { countryId: 'BR', vehicleTypeId: 1 } } as never;
    const reply = { send: vi.fn(), code: vi.fn().mockReturnThis() } as unknown as FastifyReply;

    await controller.insertTrafficEvent(request, reply);

    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({ message: 'countryId or vehicleTypeId does not exist' });
  });
});
