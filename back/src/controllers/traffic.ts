import type { FastifyRequest, FastifyReply } from 'fastify';
import { isForeignKeyViolation } from '../db/sql-utils';
import type { ITrafficService, ITrafficEventRequest } from '../interfaces/traffic';

export class TrafficController {
  constructor(private readonly service: ITrafficService) {}

  public getCountryTrafficVolume = async (_request: FastifyRequest, reply: FastifyReply) => {
    const volume = await this.service.getCountryTrafficVolume();
    reply.send(volume);
  };

  public getVehicleTypeCount = async (_request: FastifyRequest, reply: FastifyReply) => {
    const count = await this.service.getVehicleTypeCount();
    reply.send(count);
  };

  public insertTrafficEvent = async (
    request: FastifyRequest<{ Body: ITrafficEventRequest }>,
    reply: FastifyReply,
  ) => {
    try {
      const event = await this.service.insertTrafficEvent(request.body);
      reply.code(201).send(event);
    } catch (err) {
      if (isForeignKeyViolation(err)) {
        reply.code(400).send({ message: 'countryId or vehicleTypeId does not exist' });
        return;
      }
      throw err;
    }
  };
}
