import type { FastifyRequest, FastifyReply } from 'fastify';
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
    const event = await this.service.insertTrafficEvent(request.body);
    reply.code(201).send(event);
  };
}
