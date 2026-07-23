import Fastify, { FastifyInstance } from 'fastify';
import { appRoutes } from './routes';

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true });
  app.register(appRoutes);
  return app;
}
