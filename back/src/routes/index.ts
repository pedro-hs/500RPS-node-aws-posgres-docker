import { FastifyPluginAsync } from 'fastify';
import catalogRoutes from './catalog';
import trafficRoutes from './traffic';

export const appRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(trafficRoutes, { prefix: '/api/v1/traffic' });
  fastify.register(catalogRoutes, { prefix: '/api/v1/catalog' });
};
