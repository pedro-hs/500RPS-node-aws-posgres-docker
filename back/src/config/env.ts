export const env = {
  port: Number(process.env.PORT ?? 3000),
  host: process.env.HOST ?? '0.0.0.0',
  databaseUrl: process.env.DATABASE_URL ?? '',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 1000),
  clusterEnabled: process.env.CLUSTER_ENABLED !== 'false',
};
