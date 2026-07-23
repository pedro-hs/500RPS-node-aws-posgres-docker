import type { FastifySchema } from 'fastify';

export const insertTrafficEventSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['countryId', 'vehicleTypeId'],
    properties: {
      countryId: { type: 'string' },
      vehicleTypeId: { type: 'number' },
    },
  },
};
