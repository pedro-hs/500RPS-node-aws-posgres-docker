import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ICatalogService, ICountry, IVehicleTypeRequest } from '../interfaces/catalog';

export class CatalogController {
  constructor(private readonly service: ICatalogService) {}

  public insertCountry = async (
    request: FastifyRequest<{ Body: ICountry }>,
    reply: FastifyReply,
  ) => {
    const country = await this.service.insertCountry(request.body);
    reply.code(201).send(country);
  };

  public insertVehicleType = async (
    request: FastifyRequest<{ Body: IVehicleTypeRequest }>,
    reply: FastifyReply,
  ) => {
    const vehicleType = await this.service.insertVehicleType(request.body);
    reply.code(201).send(vehicleType);
  };
}
