import { Pool } from 'pg';
import { env } from '../config/env';

const MAX_CONNECTIONS = 20;
const IDLE_CLIENT_TIMEOUT = 30000;
const CONNECTION_TIMEOUT = 2000;
const QUERY_TIMEOUT = 5000;

export const pool = new Pool({
  connectionString: env.databaseUrl,
  max: MAX_CONNECTIONS,
  ssl: env.databaseUrl.includes('rds.amazonaws.com') ? { rejectUnauthorized: false } : undefined,
  idleTimeoutMillis: IDLE_CLIENT_TIMEOUT,
  connectionTimeoutMillis: CONNECTION_TIMEOUT,
  statement_timeout: QUERY_TIMEOUT,
});
