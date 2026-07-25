import type { FastifyRequest, FastifyReply } from 'fastify';
import { isUniqueViolation } from '../db/sql-utils';
import type { ICatalogService, ICountry, IVehicleTypeRequest } from '../interfaces/catalog';

export class CatalogController {
  constructor(private readonly service: ICatalogService) {}

  public listCountries = async (_request: FastifyRequest, reply: FastifyReply) => {
    const countries = await this.service.listCountries();
    reply.send(countries);
  };

  public listVehicleTypes = async (_request: FastifyRequest, reply: FastifyReply) => {
    const vehicleTypes = await this.service.listVehicleTypes();
    reply.send(vehicleTypes);
  };

  public insertCountry = async (
    request: FastifyRequest<{ Body: ICountry }>,
    reply: FastifyReply,
  ) => {
    try {
      const country = await this.service.insertCountry(request.body);
      reply.code(201).send(country);
    } catch (err) {
      if (isUniqueViolation(err)) {
        reply.code(409).send({ message: 'Country already exists' });
        return;
      }
      throw err;
    }
  };

  public insertVehicleType = async (
    request: FastifyRequest<{ Body: IVehicleTypeRequest }>,
    reply: FastifyReply,
  ) => {
    try {
      const vehicleType = await this.service.insertVehicleType(request.body);
      reply.code(201).send(vehicleType);
    } catch (err) {
      if (isUniqueViolation(err)) {
        reply.code(409).send({ message: 'Vehicle type already exists' });
        return;
      }
      throw err;
    }
  };
}
