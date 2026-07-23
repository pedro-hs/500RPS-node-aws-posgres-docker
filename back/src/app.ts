import Fastify, { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import { appRoutes } from './routes';
import { pool } from './db/pool';

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true });
  app.register(helmet);
  app.register(appRoutes);
  pool.on('error', (err) => {
    app.log.error({ err }, 'Postgres: idle client error');
  });
  app.addHook('onClose', async () => await pool.end());

  return app;
}
