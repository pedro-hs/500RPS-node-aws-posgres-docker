import type { FastifySchema } from 'fastify';

export const insertCountrySchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', minLength: 2, maxLength: 2 },
      name: { type: 'string' },
    },
  },
};

export const insertVehicleTypeSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
    },
  },
};
