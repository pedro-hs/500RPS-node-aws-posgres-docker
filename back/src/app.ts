import Fastify, { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { appRoutes } from './routes';
import { pool } from './db/pool';
import { env } from './config/env';

function handleDB(app: FastifyInstance) {
  pool.on('error', (err) => {
    app.log.error({ err }, 'Postgres: idle client error');
  });
  app.addHook('onClose', async () => await pool.end());
}

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true, trustProxy: true });

  app.register(helmet);
  app.register(cors, { origin: env.corsOrigin });
  app.register(rateLimit, { max: env.rateLimitMax, timeWindow: '1 second' });

  app.get('/health', async () => ({ status: 'ok' }));
  app.register(appRoutes);
  handleDB(app);

  return app;
}
