function envString(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

function envNumber(name: string, fallback: number): number {
  return Number(process.env[name] ?? fallback);
}

function envBoolean(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  return value === undefined ? fallback : value !== 'false';
}

export const env = {
  port: envNumber('PORT', 3000),
  host: envString('HOST', '0.0.0.0'),
  databaseUrl: envString('DATABASE_URL', ''),
  corsOrigin: envString('CORS_ORIGIN', '*'),
  rateLimitMax: envNumber('RATE_LIMIT_MAX', 1000),
  clusterEnabled: envBoolean('CLUSTER_ENABLED', true),
  cacheEnabled: envBoolean('CACHE_ENABLED', true),
  cacheTtlSeconds: envNumber('CACHE_TTL_SECONDS', 30),
};
